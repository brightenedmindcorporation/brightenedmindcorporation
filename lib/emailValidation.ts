import "server-only";
import { Resolver } from "node:dns/promises";

/**
 * Server-side check that an e-mail address is a REAL, usable one:
 *  1. strict format (length limits, no consecutive dots…),
 *  2. not a throw-away/disposable provider (mailinator, yopmail…),
 *  3. not a reserved/test domain (example.com…) and not a classic typo
 *     (gmial.com → gmail.com is refused with a suggestion),
 *  4. the domain actually accepts mail (MX record, or an A/AAAA fallback).
 *
 * This proves the domain is real, not that this particular mailbox exists —
 * only an e-mail the person must open can prove that (see the verification
 * e-mail sent at registration). Every endpoint that collects an address
 * calls this on the server, so it can't be bypassed from the browser.
 */

export type EmailCheck =
  | { valid: true; email: string }
  | { valid: false; reason: "format" | "disposable" | "reserved" | "typo" | "no-mx"; message: string; suggestion?: string };

const EMAIL_REGEX = /^[a-z0-9._%+'-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;

const DISPOSABLE = new Set(
  `mailinator.com guerrillamail.com guerrillamail.net guerrillamail.org guerrillamail.biz guerrillamail.de sharklasers.com grr.la 10minutemail.com 10minutemail.net 10minutemail.org 20minutemail.com tempmail.com temp-mail.org temp-mail.io tempmail.net tempmailo.com tempail.com tmpmail.org tmpmail.net throwawaymail.com throwaway.email yopmail.com yopmail.net yopmail.fr cool.fr.nf jetable.fr.nf nospam.ze.tc nomail.xl.cx mega.zik.dj speed.1s.fr courriel.fr.nf moncourrier.fr.nf monemail.fr.nf monmail.fr.nf trashmail.com trashmail.net trashmail.de trash-mail.com trash-mail.at dispostable.com maildrop.cc mailnesia.com mailcatch.com mintemail.com getnada.com nada.email fakeinbox.com fakemail.net fakemailgenerator.com emailondeck.com getairmail.com mohmal.com mytemp.email spam4.me spamgourmet.com spambox.us spamex.com tempinbox.com tempr.email discard.email discardmail.com discardmail.de dropmail.me harakirimail.com incognitomail.org inboxbear.com mailforspam.com mailmoat.com mailnull.com mailsac.com mailtemp.info meltmail.com mt2015.com notsharingmy.info nowmymail.com objectmail.com one-time.email owlpic.com pookmail.com proxymail.eu rcpt.at rmqkr.net safetymail.info sendspamhere.com sneakemail.com snkmail.com sogetthis.com soodonims.com superrito.com suremail.info teleworm.us tempomail.fr thankyou2010.com thisisnotmyrealemail.com trbvm.com trialmail.de tyldd.com uroid.com vomoto.com wegwerfmail.de wegwerfmail.net wegwerfmail.org wh4f.org yepmail.fr zehnminutenmail.de zoemail.net zoemail.org 33mail.com anonbox.net binkmail.com bobmail.info chacuo.net clrmail.com crazymailing.com deadaddress.com despam.it dingbone.com disposableemailaddresses.com e4ward.com emailsensei.com emailtemporanea.net emailtemporario.com.br ephemail.net etranquil.com fastacura.com fudgerub.com get2mail.fr gishpuppy.com great-host.in guerrillamailblock.com haltospam.com hidemail.de imails.info incognitomail.com inoutmail.de jourrapide.com kasmail.com klzlk.com kurzepost.de lifebyfood.com lookugly.com lroid.com lyfestylecreditsolutions.com mailexpire.com mailfreeonline.com mailguard.me mailin8r.com mailinater.com mailslite.com mailzilla.com makemetheking.com messagebeamer.de mierdamail.com ministry-of-silly-walks.de mobi.web.id mycleaninbox.net mypartyclip.de myphantomemail.com nepwk.com neverbox.com no-spam.ws nobulk.com noclickemail.com nogmailspam.info nomail2me.com nospamfor.us nospamthanks.info nurfuerspam.de oneoffemail.com onewaymail.com online.ms otherinbox.com pjjkp.com plexolan.de politikerclub.de poofy.org pookmail.com privacy.net privy-mail.com putthisinyourspamdatabase.com quickinbox.com rcpt.at reallymymail.com recode.me regbypass.com rejectmail.com rppkn.com rtrtr.com s0ny.net safe-mail.net selfdestructingmail.com sharklasers.com shieldedmail.com shiftmail.com skeefmail.com slopsbox.com smellfear.com spamavert.com spambob.com spambog.com spamcero.com spamcon.org spamcorptastic.com spamday.com spamevader.com spamfree24.com spamfree24.de spamfree24.org spamhole.com spamify.com spaml.com spammotel.com spamobox.com spamspot.com spamthis.co.uk spamtroll.net supergreatmail.com supermailer.jp tafmail.com tagyourself.com techemail.com thanksnospam.info tradermail.info trash2009.com trashdevil.com trashymail.com turual.com twinmail.de tyldd.com venompen.com veryrealemail.com viditag.com vubby.com webm4il.info wetrainbayarea.com wilemail.com willhackforfood.biz wuzupmail.net xagloo.com xemaps.com xents.com xmaily.com yapped.net zippymail.info mailbox.in.ua emltmp.com tmail.ws tmailor.com moakt.com moakt.cc moakt.ws temp.mail inboxkitten.com`
    .split(/\s+/)
    .filter(Boolean)
);

const RESERVED = new Set(["example.com", "example.org", "example.net", "test.com", "test.test", "localhost", "invalid", "email.com.invalid", "domain.com", "mail.com.test"]);

const TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmail.om": "gmail.com",
  "gmal.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "hotmil.com": "hotmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "yahou.com": "yahoo.com",
  "outlok.com": "outlook.com",
  "outlook.con": "outlook.com",
  "outloo.com": "outlook.com",
  "icloud.con": "icloud.com",
  "iclod.com": "icloud.com",
};

const resolver = new Resolver({ timeout: 3000, tries: 2 });
const mxCache = new Map<string, { ok: boolean; at: number }>();
const CACHE_MS = 60 * 60 * 1000;

async function domainAcceptsMail(domain: string): Promise<boolean> {
  const cached = mxCache.get(domain);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.ok;

  let ok = false;
  try {
    const mx = await resolver.resolveMx(domain);
    // "null MX" (RFC 7505): a single "." exchange means "never accepts mail".
    ok = mx.some((r) => r.exchange && r.exchange !== ".");
  } catch (error: any) {
    if (error?.code === "ENODATA" || error?.code === "ENOTFOUND") {
      // No MX: per RFC 5321 mail can still go to the domain's A/AAAA host.
      try {
        const a = await resolver.resolve4(domain);
        ok = a.length > 0;
      } catch {
        try {
          const aaaa = await resolver.resolve6(domain);
          ok = aaaa.length > 0;
        } catch {
          ok = false;
        }
      }
    } else {
      // Resolver trouble (timeout, SERVFAIL): don't punish a real person for
      // our DNS hiccup — and don't cache the unknown.
      return true;
    }
  }
  mxCache.set(domain, { ok, at: Date.now() });
  return ok;
}

export async function checkRealEmail(input: unknown): Promise<EmailCheck> {
  const email = typeof input === "string" ? input.trim().toLowerCase() : "";
  const bad = (reason: "format" | "disposable" | "reserved" | "typo" | "no-mx", message: string, suggestion?: string): EmailCheck => ({
    valid: false,
    reason,
    message,
    suggestion,
  });

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email) || email.includes("..")) {
    return bad("format", "Le format de l'adresse e-mail n'est pas valide.");
  }
  const [local, domain] = email.split("@");
  if (local.length > 64 || local.startsWith(".") || local.endsWith(".")) {
    return bad("format", "Le format de l'adresse e-mail n'est pas valide.");
  }

  if (RESERVED.has(domain) || domain.endsWith(".invalid") || domain.endsWith(".test") || domain.endsWith(".example") || domain.endsWith(".localhost")) {
    return bad("reserved", "Cette adresse e-mail n'est pas une vraie adresse. Utilisez votre adresse personnelle ou professionnelle.");
  }
  if (TYPOS[domain]) {
    return bad("typo", `Cette adresse semble contenir une faute de frappe. Vouliez-vous dire ${local}@${TYPOS[domain]} ?`, `${local}@${TYPOS[domain]}`);
  }
  // Also catch subdomains of a disposable provider (x.mailinator.com).
  const parts = domain.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    if (DISPOSABLE.has(parts.slice(i).join("."))) {
      return bad("disposable", "Les adresses e-mail temporaires ou jetables ne sont pas acceptées. Utilisez votre vraie adresse e-mail.");
    }
  }

  if (!(await domainAcceptsMail(domain))) {
    return bad("no-mx", "Cette adresse e-mail semble invalide : son domaine ne peut pas recevoir d'e-mails. Vérifiez qu'il n'y a pas de faute de frappe.");
  }
  return { valid: true, email };
}

/** For route handlers: returns a ready-made 400 response when the address is
 * not acceptable, or null when it is. */
export async function rejectIfFakeEmail(email: unknown): Promise<Response | null> {
  const check = await checkRealEmail(email);
  if (check.valid) return null;
  return Response.json({ error: check.message, reason: check.reason, suggestion: check.suggestion }, { status: 400 });
}
