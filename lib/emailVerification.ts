import "server-only";
import { getAdminAuth } from "@/lib/firebase-admin";
import { requiresEmailVerification } from "@/lib/emailVerificationPolicy";

/** Message to show the admin when a student's address was never confirmed;
 * null when approval may proceed (verified, grandfathered, or unknown). */
export async function unverifiedEmailMessage(uid: string): Promise<string | null> {
  try {
    const user = await getAdminAuth().getUser(uid);
    if (requiresEmailVerification(user.metadata.creationTime) && !user.emailVerified) {
      return "Cette adresse e-mail n'est pas encore vérifiée : l'étudiant doit cliquer sur le lien reçu à l'inscription (vous pouvez lui demander de se reconnecter pour recevoir un nouvel e-mail). Approbation refusée tant que l'adresse n'est pas confirmée.";
    }
  } catch {
    // Account not found in Auth (legacy data): don't block.
  }
  return null;
}
