"use client";

import ProgramSwitches from "@/components/admin/ProgramSwitches";
import ProgressAudit from "@/components/admin/ProgressAudit";
import RenameIdsButton from "@/components/admin/RenameIdsButton";
import RecomputePassButton from "@/components/admin/RecomputePassButton";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  LogOut,
  Video,
  Mail,
  CheckCircle2,
  X,
  Link2,
  Inbox,
  SquarePen,
  Paperclip,
  ArrowLeft,
  Forward,
  Printer,
  Share2,
  BellRing,
  Trophy,
  Download,
  Star,
  Archive,
  Trash2,
  ShieldAlert,
  MailOpen,
  RotateCcw,
  Search,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { availableLanguages, findProgramByCode, programLevels } from "@/content/curriculum";
import { getOtherProgramLabel, isOtherProgramCode as isOtherCode, otherPrograms } from "@/content/programs";

// A program without levels. Bureautique, Logiciels and Visuel have levels, lessons and quizzes like a language.
const isOtherProgramCode = (code?: string) => isOtherCode(code) && !findProgramByCode(code);
import { getJaasAppId, getLiveRoomName, isJitsiConfigured } from "@/lib/academy/liveRooms";
import JitsiEmbed from "@/components/academy/JitsiEmbed";
import PasswordInput from "@/components/academy/PasswordInput";
import NotificationBell from "@/components/academy/NotificationBell";
import { generateCertificatePdf, getCertificatePreviewUrl } from "@/lib/academy/certificatePdf";
import TeachersTab from "@/components/admin/TeachersTab";
import VisitsTab from "@/components/admin/VisitsTab";
import ActivityTab from "@/components/admin/ActivityTab";
import StatsTab from "@/components/admin/StatsTab";
import AddStudentModal from "@/components/admin/AddStudentModal";
import PlacementTab from "@/components/admin/PlacementTab";
import CorrectionsTab from "@/components/admin/CorrectionsTab";
import DomesticaTab from "@/components/admin/DomesticaTab";
import ShipmentsTab from "@/components/admin/ShipmentsTab";
import TrucksTab from "@/components/admin/TrucksTab";
import { TRACKING_ENABLED } from "@/lib/features";
import LiveAudiencePicker, { audienceLabel } from "@/components/LiveAudiencePicker";
import { levelNumber } from "@/lib/academy/levelAccess";
import StudentDossier from "@/components/academy/StudentDossier";
import { DEFAULT_DOCUMENT_SETTINGS, loadDocumentSettings, type DocumentSettings } from "@/lib/academy/documentSettings";

export const dynamic = "force-dynamic";

type MailFolderId = "inbox" | "sent" | "starred" | "drafts" | "spam" | "trash" | "all";

const MAIL_FOLDERS: { id: MailFolderId; label: string }[] = [
  { id: "inbox", label: "Réception" },
  { id: "starred", label: "Favoris" },
  { id: "sent", label: "Envoyés" },
  { id: "drafts", label: "Brouillons" },
  { id: "all", label: "Tous" },
  { id: "spam", label: "Spam" },
  { id: "trash", label: "Corbeille" },
];

const MAIL_SENDERS = ["info@bmcorporation-cd.com", "brightenedmindcorporation@gmail.com"];

type Tab = "students" | "live" | "payments" | "announcements" | "applications" | "projects" | "devis" | "mail" | "requests" | "progress" | "certificates" | "teachers" | "visits" | "activity" | "stats" | "placement" | "corrections" | "domestica" | "shipments" | "trucks";

export default function AdminPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<Tab>("students");

  // --- Inline admin login (no detour through /login) ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // --- Student list filters ---
  const [langFilter, setLangFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  // --- Account diagnostic (check if a Firebase Auth user exists) ---
  const [checkEmail, setCheckEmail] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<any>(null);

  // --- Message to students ---
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState("__all__");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [messageAttachments, setMessageAttachments] = useState<File[]>([]);
  const [messageSending, setMessageSending] = useState(false);

  // --- Sent messages management (view/edit/delete past broadcasts) ---
  const [sentMessagesOpen, setSentMessagesOpen] = useState(false);
  const [sentMessages, setSentMessages] = useState<any[]>([]);
  const [sentMessagesLoading, setSentMessagesLoading] = useState(false);
  const [editingSentMessageId, setEditingSentMessageId] = useState<string | null>(null);
  const [editSentSubject, setEditSentSubject] = useState("");
  const [editSentBody, setEditSentBody] = useState("");
  const [sentMessageSaving, setSentMessageSaving] = useState(false);

  // --- Live sessions ---
  const [liveSessions, setLiveSessions] = useState<any[]>([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [sessionLangCode, setSessionLangCode] = useState(availableLanguages[0].code);
  const [sessionLevel, setSessionLevel] = useState("1");
  // Who may attend the class being scheduled (null = every student concerned) and the "Participants" editor.
  const [sessionAudience, setSessionAudience] = useState<string[] | null>(null);
  const [audienceEdit, setAudienceEdit] = useState<{ id: string; langCode: string; value: string[] | null } | null>(null);
  const audienceCandidates = (langCode: string) => {
    const seen = new Set<string>();
    const rows: { uid: string; name: string; email?: string }[] = [];
    for (const r of students) {
      const uid = r.uid || r.id?.split("_")[0];
      if (!uid || r.langCode !== langCode || r.status !== "Approved" || seen.has(uid)) continue;
      seen.add(uid);
      rows.push({ uid, name: r.name || "", email: r.email });
    }
    return rows.sort((a, b) => a.name.localeCompare(b.name));
  };
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState("60");
  const [sessionTitle, setSessionTitle] = useState("");
  const [hostingSession, setHostingSession] = useState<{ id: string; langCode: string; level: number; title?: string } | null>(null);
  const [roomToggling, setRoomToggling] = useState(false);
  const [hostingToken, setHostingToken] = useState<string | null>(null);
  const [hostingTokenError, setHostingTokenError] = useState<string | null>(null);

  // --- Payments ---
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  // --- Announcements ---
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);
  const [annTitle, setAnnTitle] = useState("");
  const [annDescription, setAnnDescription] = useState("");
  const [annType, setAnnType] = useState<"normal" | "job">("normal");
  const [annDetails, setAnnDetails] = useState("");
  const [annDuration, setAnnDuration] = useState("");
  const [annDurationCustom, setAnnDurationCustom] = useState("");
  const [annShowInTicker, setAnnShowInTicker] = useState(true);
  const [annImage, setAnnImage] = useState<File | null>(null);
  const [annVideo, setAnnVideo] = useState<File | null>(null);
  const [annSubmitting, setAnnSubmitting] = useState(false);

  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);
  const [editAnnTitle, setEditAnnTitle] = useState("");
  const [editAnnDescription, setEditAnnDescription] = useState("");
  const [editAnnType, setEditAnnType] = useState<"normal" | "job">("normal");
  const [editAnnDetails, setEditAnnDetails] = useState("");
  const [editAnnDuration, setEditAnnDuration] = useState("");
  const [editAnnDurationCustom, setEditAnnDurationCustom] = useState("");
  const [editAnnShowInTicker, setEditAnnShowInTicker] = useState(true);
  const [editAnnImage, setEditAnnImage] = useState<File | null>(null);
  const [editAnnVideo, setEditAnnVideo] = useState<File | null>(null);
  const [editAnnSubmitting, setEditAnnSubmitting] = useState(false);

  // --- Job applications ---
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [jobApplicationsLoading, setJobApplicationsLoading] = useState(false);

  // --- Project requests (Contact "Parlons de votre projet") ---
  const [projectRequests, setProjectRequests] = useState<any[]>([]);
  const [projectRequestsLoading, setProjectRequestsLoading] = useState(false);

  // --- Devis requests ---
  const [devisRequests, setDevisRequests] = useState<any[]>([]);
  const [devisRequestsLoading, setDevisRequestsLoading] = useState(false);

  // --- Student requests (plaintes / inquiétudes / demandes) ---
  const [studentRequests, setStudentRequests] = useState<any[]>([]);
  const [studentRequestsLoading, setStudentRequestsLoading] = useState(false);

  // --- Progress tracking ---
  const [progressList, setProgressList] = useState<any[]>([]);
  const [dossierOf, setDossierOf] = useState<{ uid: string; langCode: string } | null>(null);
  const [progressLoading, setProgressLoading] = useState(false);

  // --- Certificates ---
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certificatesLoading, setCertificatesLoading] = useState(false);
  const [certGenerateOpen, setCertGenerateOpen] = useState(false);
  const [docSettings, setDocSettings] = useState<DocumentSettings>(DEFAULT_DOCUMENT_SETTINGS);
  const [docSettingsOpen, setDocSettingsOpen] = useState(false);
  const [docSettingsSaving, setDocSettingsSaving] = useState(false);
  const [certName, setCertName] = useState("");
  const [certEmail, setCertEmail] = useState("");
  const [certMatricule, setCertMatricule] = useState("");
  const [certLangCode, setCertLangCode] = useState(availableLanguages[0].code);
  const [certLevel, setCertLevel] = useState("1");
  const [certLevelTitle, setCertLevelTitle] = useState("");
  const [certAverage, setCertAverage] = useState("100");
  const [certSending, setCertSending] = useState(false);
  const [certEditingId, setCertEditingId] = useState<string | null>(null);
  const [certEditName, setCertEditName] = useState("");
  const [certEditEmail, setCertEditEmail] = useState("");
  const [certEditLangCode, setCertEditLangCode] = useState("");
  const [certEditLevel, setCertEditLevel] = useState("1");
  const [certEditLevelTitle, setCertEditLevelTitle] = useState("");
  const [certEditAverage, setCertEditAverage] = useState("");
  const [certPreviewUrl, setCertPreviewUrl] = useState<string | null>(null);

  // --- Inline reply (Projets / Devis / Candidatures) ---
  const [replyTarget, setReplyTarget] = useState<{ collection: string; docId: string; to: string } | null>(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyAttachments, setReplyAttachments] = useState<File[]>([]);
  const [replyVia, setReplyVia] = useState<"gmail" | "resend">("gmail");
  const [replySending, setReplySending] = useState(false);

  // --- Gmail inbox tab ---
  const [mailConfigured, setMailConfigured] = useState(false);
  // null until the first answer; then the reason when the mailbox cannot be read (instead of a misleading "not configured").
  const [mailChecked, setMailChecked] = useState(false);
  const [mailError, setMailError] = useState<{ message: string; reauth: boolean } | null>(null);
  const [mailConnected, setMailConnected] = useState(false);
  const [mailMessages, setMailMessages] = useState<any[]>([]);
  const [mailLoading, setMailLoading] = useState(false);
  const [mailConnecting, setMailConnecting] = useState(false);
  const [mailNotice, setMailNotice] = useState<string | null>(null);
  const [selectedMail, setSelectedMail] = useState<any | null>(null);
  const [mailDetailLoading, setMailDetailLoading] = useState(false);
  const [mailReplyBody, setMailReplyBody] = useState("");
  const [mailReplyAttachments, setMailReplyAttachments] = useState<File[]>([]);
  const [mailReplySending, setMailReplySending] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeFrom, setComposeFrom] = useState(MAIL_SENDERS[0]);
  const [replyFrom, setReplyFrom] = useState(MAIL_SENDERS[0]);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [composeAttachments, setComposeAttachments] = useState<File[]>([]);
  const [composeSending, setComposeSending] = useState(false);
  const [mailFilter, setMailFilter] = useState<"all" | "unread" | "read">("all");
  const [mailSearch, setMailSearch] = useState("");
  const [mailFolder, setMailFolder] = useState<MailFolderId>("inbox");
  const [mailQuery, setMailQuery] = useState("");
  const [mailNextToken, setMailNextToken] = useState<string | null>(null);
  const [mailLoadingMore, setMailLoadingMore] = useState(false);
  const [mailUnreadInbox, setMailUnreadInbox] = useState(0);
  const [composeCc, setComposeCc] = useState("");
  const [composeBcc, setComposeBcc] = useState("");
  const [composeShowCc, setComposeShowCc] = useState(false);
  // Polled refreshes run from an interval closure created once per tab, so
  // they read the current folder/search through refs, not stale state.
  const mailFolderRef = useRef<MailFolderId>("inbox");
  const mailQueryRef = useRef("");

  // Rows come from two sources: the new `enrollments` collection (one doc
  // per uid+language — how every registration works since multi-language
  // accounts were added) and any `students/{uid}` doc that still carries
  // its langCode/level/status/matricule directly (accounts created before
  // that change, which never got an enrollments doc). Both are normalized
  // to the same shape so the existing stats/filter/list code below doesn't
  // need to know which source a row came from — only approve/reject branch
  // on `row.kind` to hit the matching API route.
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const fetchStudents = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/students", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setStudents(result.students || []);
      else console.error("Error fetching students:", result.error);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "brightenedmindcorporation@gmail.com") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

      setChecking(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (authorized) {
      fetchStudents();
    }
  }, [authorized]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      if (cred.user.email !== "brightenedmindcorporation@gmail.com") {
        await signOut(auth);
        setLoginError("Cet email n'est pas autorisé en tant qu'administrateur.");
      }
      // Sur succès, onAuthStateChanged ci-dessus détecte la session et
      // bascule authorized à true automatiquement.
    } catch (error: any) {
      if (["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found"].includes(error.code)) {
        setLoginError("Email ou mot de passe incorrect.");
      } else {
        setLoginError("Une erreur est survenue lors de la connexion.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Teacher opens/closes the room to students (students wait in a waiting
  // room until this is pressed; the server also withholds their video
  // token while the room is closed).
  const setRoomOpen = async (sessionId: string, open: boolean) => {
    setRoomToggling(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/live-sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ open }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setLiveSessions((prev) => prev.map((x) => (x.id === sessionId ? { ...x, open } : x)));
      return true;
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
      return false;
    } finally {
      setRoomToggling(false);
    }
  };

  const leaveHostedRoom = async () => {
    if (hostingSession) {
      const current = liveSessions.find((x) => x.id === hostingSession.id);
      if (current?.open) {
        const ok = confirm("Le cours est encore ouvert aux étudiants. Le clôturer en quittant ?");
        if (ok) await setRoomOpen(hostingSession.id, false);
        else return;
      }
    }
    setHostingSession(null);
  };

  const fetchLiveSessions = async (silent = false) => {
    if (!silent) setLiveLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/live-sessions", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setLiveSessions(result.sessions || []);
    } catch (error) {
      console.error("Error fetching live sessions:", error);
    } finally {
      if (!silent) setLiveLoading(false);
    }
  };

  const fetchPayments = async (silent = false) => {
    if (!silent) setPaymentsLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/payments", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setPayments(result.payments || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      if (!silent) setPaymentsLoading(false);
    }
  };

  // Views / clicks per announcement over the last 90 days (shown on each announcement's card).
  const [annStats, setAnnStats] = useState<Record<string, { views: number; clicks: number; plays: number }>>({});
  const fetchAnnStats = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/content-stats?days=90", { headers: { Authorization: `Bearer ${idToken}` } });
      const result = await response.json();
      if (!response.ok) return;
      const map: Record<string, { views: number; clicks: number; plays: number }> = {};
      for (const it of result.items || []) {
        if (it.type === "ann") map[it.key] = { views: it.n.views || 0, clicks: (it.n.click_detail || 0) + (it.n.click_apply || 0), plays: it.n.plays || 0 };
      }
      setAnnStats(map);
    } catch {
      // statistics are optional here
    }
  };

  const fetchAnnouncements = async (silent = false) => {
    if (!silent) setAnnouncementsLoading(true);
    fetchAnnStats();
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/announcements", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setAnnouncements(result.announcements || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      if (!silent) setAnnouncementsLoading(false);
    }
  };

  const createAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annDescription.trim()) {
      alert("Titre et description requis.");
      return;
    }
    const resolvedDuration = annDuration === "custom" ? annDurationCustom : annDuration;
    if (annDuration === "custom" && (!resolvedDuration || Number(resolvedDuration) <= 0)) {
      alert("Indiquez un nombre de jours valide pour la durée personnalisée.");
      return;
    }
    setAnnSubmitting(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const form = new FormData();
      form.append("idToken", idToken || "");
      form.append("title", annTitle);
      form.append("description", annDescription);
      form.append("type", annType);
      form.append("details", annDetails);
      form.append("showInTicker", String(annShowInTicker));
      if (resolvedDuration) form.append("durationDays", resolvedDuration);
      if (annImage) form.append("image", annImage);
      if (annVideo) form.append("video", annVideo);

      const response = await fetch("/api/admin/announcements", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      setAnnTitle("");
      setAnnDescription("");
      setAnnType("normal");
      setAnnDetails("");
      setAnnDuration("");
      setAnnShowInTicker(true);
      setAnnDurationCustom("");
      setAnnImage(null);
      setAnnVideo(null);
      fetchAnnouncements();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setAnnSubmitting(false);
    }
  };

  const openEditAnnouncement = (a: any) => {
    setEditingAnnouncement(a);
    setEditAnnTitle(a.title || "");
    setEditAnnDescription(a.description || "");
    setEditAnnType(a.type === "job" ? "job" : "normal");
    setEditAnnDetails(a.details || "");
    setEditAnnDuration("");
    setEditAnnDurationCustom("");
    setEditAnnShowInTicker(a.showInTicker !== false);
    setEditAnnImage(null);
    setEditAnnVideo(null);
  };

  const updateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;
    if (!editAnnTitle.trim() || !editAnnDescription.trim()) {
      alert("Titre et description requis.");
      return;
    }
    const resolvedEditDuration = editAnnDuration === "custom" ? editAnnDurationCustom : editAnnDuration;
    if (editAnnDuration === "custom" && (!resolvedEditDuration || Number(resolvedEditDuration) <= 0)) {
      alert("Indiquez un nombre de jours valide pour la durée personnalisée.");
      return;
    }
    setEditAnnSubmitting(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const form = new FormData();
      form.append("title", editAnnTitle);
      form.append("description", editAnnDescription);
      form.append("type", editAnnType);
      form.append("details", editAnnDetails);
      form.append("showInTicker", String(editAnnShowInTicker));
      if (resolvedEditDuration) form.append("durationDays", resolvedEditDuration);
      if (editAnnImage) form.append("image", editAnnImage);
      if (editAnnVideo) form.append("video", editAnnVideo);

      const response = await fetch(`/api/admin/announcements/${editingAnnouncement.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${idToken}` },
        body: form,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      setEditingAnnouncement(null);
      fetchAnnouncements();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setEditAnnSubmitting(false);
    }
  };

  const fetchJobApplications = async (silent = false) => {
    if (!silent) setJobApplicationsLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/job-applications", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setJobApplications(result.applications || []);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      if (!silent) setJobApplicationsLoading(false);
    }
  };

  const toggleAnnouncement = async (id: string, active: boolean) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/announcements/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ active }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchAnnouncements();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm("Supprimer cette annonce ?")) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchAnnouncements();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const fetchProjectRequests = async (silent = false) => {
    if (!silent) setProjectRequestsLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/project-requests", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setProjectRequests(result.requests || []);
    } catch (error) {
      console.error("Error fetching project requests:", error);
    } finally {
      if (!silent) setProjectRequestsLoading(false);
    }
  };

  const fetchDevisRequests = async (silent = false) => {
    if (!silent) setDevisRequestsLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/devis-requests", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setDevisRequests(result.requests || []);
    } catch (error) {
      console.error("Error fetching devis requests:", error);
    } finally {
      if (!silent) setDevisRequestsLoading(false);
    }
  };

  const updateJobApplicationStatus = async (id: string, status: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/job-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, status }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchJobApplications();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const updateProjectRequestStatus = async (id: string, status: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/project-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, status }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchProjectRequests();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const deleteProjectRequest = async (id: string) => {
    if (!confirm("Supprimer cette demande ?")) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/project-requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchProjectRequests();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const sendStudentMessage = async () => {
    if (!messageSubject.trim() || !messageBody.trim()) return;
    setMessageSending(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const pool = students.filter((s) => s.status === "Approved" && s.email && s.uid);
      const targets =
        messageRecipient === "__all__"
          ? pool
          : pool.filter((s) => s.uid === messageRecipient);

      // Dedupe by uid — the same student can have several approved
      // enrollment rows (one per language/program).
      const recipients = Array.from(new Map(targets.map((s) => [s.uid, { uid: s.uid, email: s.email }])).values());

      if (recipients.length === 0) {
        alert("Aucun destinataire approuvé trouvé.");
        return;
      }

      const form = new FormData();
      form.append("idToken", idToken || "");
      form.append("subject", messageSubject);
      form.append("body", messageBody);
      form.append("recipients", JSON.stringify(recipients));
      messageAttachments.forEach((file) => form.append("attachments", file));

      const response = await fetch("/api/admin/message-students", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      setMessageOpen(false);
      setMessageSubject("");
      setMessageBody("");
      setMessageAttachments([]);
      setMessageRecipient("__all__");
      alert(
        result.emailWarning
          ? `Notification envoyée à ${result.sentTo} étudiant(s) (visible dans leur tableau de bord).\n\n⚠️ Email : ${result.emailWarning}`
          : `Message envoyé à ${result.sentTo} destinataire(s), par notification et par email.`
      );
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setMessageSending(false);
    }
  };

  const fetchSentMessages = async () => {
    setSentMessagesLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/sent-messages", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setSentMessages(result.messages || []);
    } catch (error) {
      console.error("Error fetching sent messages:", error);
    } finally {
      setSentMessagesLoading(false);
    }
  };

  const startEditSentMessage = (m: any) => {
    setEditingSentMessageId(m.id);
    setEditSentSubject(m.subject || "");
    setEditSentBody(m.body || "");
  };

  const saveSentMessageEdit = async (id: string) => {
    if (!editSentSubject.trim() || !editSentBody.trim()) return;
    setSentMessageSaving(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/sent-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ subject: editSentSubject, body: editSentBody }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setEditingSentMessageId(null);
      fetchSentMessages();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setSentMessageSaving(false);
    }
  };

  const deleteSentMessage = async (id: string) => {
    if (!confirm("Retirer ce message ? Il disparaîtra aussi du tableau de bord des destinataires.")) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/sent-messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      setSentMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const fetchProgress = async (silent = false) => {
    if (!silent) setProgressLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/progress", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setProgressList(result.progress || []);
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      if (!silent) setProgressLoading(false);
    }
  };

  const saveDocSettings = async () => {
    setDocSettingsSaving(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/document-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, settings: docSettings }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setDocSettings(result.settings);
      alert("Modèle du certificat enregistré. Il s'applique aux prochains PDF générés.");
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setDocSettingsSaving(false);
    }
  };

  const fetchCertificates = async (silent = false) => {
    if (!silent) setCertificatesLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/certificates", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setCertificates(result.certificates || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      if (!silent) setCertificatesLoading(false);
    }
  };

  const generateCertificateManually = async () => {
    if (!certName.trim()) return;
    setCertSending(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const average = Number(certAverage) || 0;
      const levelTitle = certLevelTitle.trim() || `${languageLabel(certLangCode)} — Niveau ${certLevel}`;
      const studentId = certMatricule.trim();

      // The server attributes the certificate its own number (CERT-…),
      // distinct from the Student ID; the PDF is then built with it.
      const response = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          studentName: certName.trim(),
          studentEmail: certEmail.trim() || null,
          langCode: certLangCode,
          level: certLevel,
          levelTitle,
          average,
          studentId: studentId || null,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      await generateCertificatePdf({ studentName: certName.trim(), levelTitle, average, certificateId: result.certificateId, studentId: studentId || undefined });

      setCertGenerateOpen(false);
      setCertName("");
      setCertEmail("");
      setCertMatricule("");
      setCertLevelTitle("");
      setCertAverage("100");
      fetchCertificates();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setCertSending(false);
    }
  };

  const toggleCertificateRevoked = async (cert: any) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/certificates/${cert.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, revoked: !cert.revoked }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchCertificates();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const saveCertificateEdit = async (id: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/certificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          studentName: certEditName,
          studentEmail: certEditEmail || null,
          langCode: certEditLangCode,
          level: certEditLevel,
          levelTitle: certEditLevelTitle,
          average: Number(certEditAverage) || 0,
        }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      setCertEditingId(null);
      fetchCertificates();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const openCertificatePreview = async (opts: { studentName: string; levelTitle: string; average: number; certificateId: string; studentId?: string; settings?: DocumentSettings }) => {
    if (certPreviewUrl) URL.revokeObjectURL(certPreviewUrl);
    setCertPreviewUrl(await getCertificatePreviewUrl(opts));
  };

  const closeCertificatePreview = () => {
    if (certPreviewUrl) URL.revokeObjectURL(certPreviewUrl);
    setCertPreviewUrl(null);
  };

  const deleteCertificate = async (id: string) => {
    if (!confirm("Supprimer définitivement ce certificat ?")) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/certificates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchCertificates();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const checkAccount = async () => {
    if (!checkEmail.trim()) return;
    setCheckLoading(true);
    setCheckResult(null);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/check-account?email=${encodeURIComponent(checkEmail.trim())}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setCheckResult(result);
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setCheckLoading(false);
    }
  };

  const fetchStudentRequests = async (silent = false) => {
    if (!silent) setStudentRequestsLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/student-requests", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) setStudentRequests(result.requests || []);
    } catch (error) {
      console.error("Error fetching student requests:", error);
    } finally {
      if (!silent) setStudentRequestsLoading(false);
    }
  };

  const updateStudentRequestStatus = async (id: string, status: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/student-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, status }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchStudentRequests();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const updateDevisRequestStatus = async (id: string, status: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/devis-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, status }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchDevisRequests();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const deleteDevisRequest = async (id: string) => {
    if (!confirm("Supprimer cette demande ?")) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/devis-requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchDevisRequests();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const openReply = (collection: string, docId: string, to: string, subject: string) => {
    setReplyTarget({ collection, docId, to });
    setReplySubject(subject);
    setReplyMessage("");
    setReplyAttachments([]);
  };

  const sendReply = async () => {
    if (!replyTarget || !replyMessage.trim()) return;
    setReplySending(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const form = new FormData();
      form.append("idToken", idToken || "");
      form.append("to", replyTarget.to);
      form.append("subject", replySubject);
      form.append("message", replyMessage);
      form.append("collection", replyTarget.collection);
      form.append("docId", replyTarget.docId);
      form.append("via", replyVia);
      replyAttachments.forEach((file) => form.append("attachments", file));

      const response = await fetch("/api/admin/send-reply", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      if (replyVia === "gmail" && result.sentVia === "resend") {
        alert("Gmail n'étant pas disponible, le message est parti par l'adresse BM Corporation (noreply). Reconnectez Gmail dans l'onglet Mail pour de meilleurs résultats.");
      }

      setReplyTarget(null);
      setReplyMessage("");
      setReplyAttachments([]);
      if (replyTarget.collection === "projectRequests") fetchProjectRequests();
      if (replyTarget.collection === "devisRequests") fetchDevisRequests();
      if (replyTarget.collection === "jobApplications") fetchJobApplications();
      if (replyTarget.collection === "studentRequests") fetchStudentRequests();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setReplySending(false);
    }
  };

  const fetchMailMessages = async (silent = false, pageToken?: string) => {
    if (pageToken) setMailLoadingMore(true);
    else if (!silent) setMailLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const params = new URLSearchParams({ folder: mailFolderRef.current });
      if (mailQueryRef.current) params.set("q", mailQueryRef.current);
      if (pageToken) params.set("pageToken", pageToken);
      const response = await fetch(`/api/admin/gmail/messages?${params}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      setMailChecked(true);
      if (!response.ok) {
        setMailError({ message: result.error || "Erreur serveur.", reauth: Boolean(result.reauth) });
      } else {
        setMailError(null);
      }
      if (response.ok) {
        setMailConfigured(Boolean(result.configured));
        setMailConnected(Boolean(result.connected));
        setMailMessages((prev) => (pageToken ? [...prev, ...(result.messages || [])] : result.messages || []));
        setMailNextToken(result.nextPageToken ?? null);
        setMailUnreadInbox(result.unreadInbox ?? 0);
      }
    } catch (error) {
      console.error("Error fetching Gmail messages:", error);
      setMailChecked(true);
      setMailError({ message: "Impossible de joindre le serveur. Vérifie ta connexion et réessaie.", reauth: false });
    } finally {
      if (pageToken) setMailLoadingMore(false);
      else if (!silent) setMailLoading(false);
    }
  };

  const changeMailFolder = (folder: MailFolderId) => {
    mailFolderRef.current = folder;
    setMailFolder(folder);
    setSelectedMail(null);
    fetchMailMessages();
  };

  const submitMailSearch = () => {
    mailQueryRef.current = mailSearch.trim();
    setMailQuery(mailSearch.trim());
    setSelectedMail(null);
    fetchMailMessages();
  };

  const clearMailSearch = () => {
    setMailSearch("");
    mailQueryRef.current = "";
    setMailQuery("");
    fetchMailMessages();
  };

  // Mailbox actions (same toolbar as Gmail): update the UI optimistically,
  // roll back by refetching if the server refuses.
  const mailAction = async (id: string, action: "read" | "unread" | "star" | "unstar" | "archive" | "trash" | "untrash" | "spam" | "notspam") => {
    const leavesFolder = ["archive", "trash", "untrash", "spam", "notspam"].includes(action);
    setMailMessages((prev) =>
      leavesFolder
        ? prev.filter((m) => m.id !== id)
        : prev.map((m) =>
            m.id === id
              ? { ...m, unread: action === "unread" ? true : action === "read" ? false : m.unread, starred: action === "star" ? true : action === "unstar" ? false : m.starred }
              : m
          )
    );
    setSelectedMail((prev: any) => {
      if (!prev || prev.id !== id) return prev;
      if (leavesFolder) return null;
      return { ...prev, starred: action === "star" ? true : action === "unstar" ? false : prev.starred };
    });
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/gmail/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ action }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Erreur serveur");
      }
      if (leavesFolder || action === "read" || action === "unread") fetchMailMessages(true);
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
      fetchMailMessages(true);
    }
  };

  const [downloadingAttachmentId, setDownloadingAttachmentId] = useState<string | null>(null);

  const downloadGmailAttachment = async (messageId: string, att: { attachmentId: string; filename: string; mimeType: string }) => {
    setDownloadingAttachmentId(att.attachmentId);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const params = new URLSearchParams({ filename: att.filename, mimeType: att.mimeType });
      const response = await fetch(`/api/admin/gmail/messages/${messageId}/attachments/${att.attachmentId}?${params}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Erreur serveur");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = att.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setDownloadingAttachmentId(null);
    }
  };

  const connectGmail = async () => {
    setMailConnecting(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/gmail/auth-url", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      window.location.href = result.url;
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
      setMailConnecting(false);
    }
  };

  const openMail = async (id: string) => {
    setMailDetailLoading(true);
    setSelectedMail(null);
    setMailReplyBody("");
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/gmail/messages/${id}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setSelectedMail(result.message);
      setReplyFrom(MAIL_SENDERS[0]);
      setMailMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setMailDetailLoading(false);
    }
  };

  const sendMailReply = async () => {
    if (!selectedMail || !mailReplyBody.trim()) return;
    setMailReplySending(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const fromMatch = selectedMail.from.match(/<(.+)>/);
      const to = fromMatch ? fromMatch[1] : selectedMail.from;
      const form = new FormData();
      form.append("idToken", idToken || "");
      form.append("from", replyFrom);
      form.append("threadId", selectedMail.threadId);
      form.append("to", to);
      form.append("subject", selectedMail.subject.startsWith("Re:") ? selectedMail.subject : `Re: ${selectedMail.subject}`);
      form.append("body", mailReplyBody);
      form.append("inReplyToMessageId", selectedMail.id);
      form.append("references", selectedMail.id);
      mailReplyAttachments.forEach((file) => form.append("attachments", file));

      const response = await fetch("/api/admin/gmail/reply", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setMailReplyBody("");
      setMailReplyAttachments([]);
      alert("Réponse envoyée !");
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setMailReplySending(false);
    }
  };

  const openCompose = (prefillTo = "", prefillSubject = "", prefillBody = "") => {
    setComposeTo(prefillTo);
    setComposeSubject(prefillSubject);
    setComposeBody(prefillBody);
    setComposeAttachments([]);
    setComposeFrom(MAIL_SENDERS[0]);
    setComposeCc("");
    setComposeBcc("");
    setComposeShowCc(false);
    setComposeOpen(true);
  };

  const forwardMail = () => {
    if (!selectedMail) return;
    const plainBody = String(selectedMail.body || selectedMail.snippet || "").replace(/<[^>]*>/g, " ").trim();
    const quoted = `\n\n---------- Message transféré ----------\nDe : ${selectedMail.from}\nDate : ${selectedMail.date}\nSujet : ${selectedMail.subject}\n\n${plainBody}`;
    openCompose("", selectedMail.subject.startsWith("Fwd:") ? selectedMail.subject : `Fwd: ${selectedMail.subject}`, quoted);
  };

  const printMail = () => {
    if (!selectedMail) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>${selectedMail.subject}</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: system-ui, sans-serif; padding: 32px; color: #1a1a1a; max-width: 720px; margin: 0 auto; }
            h1 { font-size: 20px; margin-bottom: 4px; }
            .meta { color: #666; font-size: 13px; margin-bottom: 24px; }
            .body { border-top: 1px solid #ddd; padding-top: 16px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>${selectedMail.subject}</h1>
          <div class="meta">De : ${selectedMail.from}<br/>Date : ${selectedMail.date}</div>
          <div class="body">${selectedMail.body || selectedMail.snippet}</div>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  const shareMail = async () => {
    if (!selectedMail) return;
    const plainBody = String(selectedMail.body || selectedMail.snippet || "").replace(/<[^>]*>/g, " ").trim();
    const text = `${selectedMail.subject}\n\nDe : ${selectedMail.from}\n\n${plainBody}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: selectedMail.subject, text });
        return;
      } catch {
        // User cancelled or share failed — fall through to WhatsApp link.
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const sendCompose = async () => {
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) return;
    setComposeSending(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const form = new FormData();
      form.append("idToken", idToken || "");
      form.append("from", composeFrom);
      form.append("to", composeTo);
      form.append("subject", composeSubject);
      form.append("body", composeBody);
      if (composeCc.trim()) form.append("cc", composeCc.trim());
      if (composeBcc.trim()) form.append("bcc", composeBcc.trim());
      composeAttachments.forEach((file) => form.append("attachments", file));

      const response = await fetch("/api/admin/gmail/send", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      setComposeOpen(false);
      alert("Message envoyé !");
      fetchMailMessages();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setComposeSending(false);
    }
  };

  // Mail notification templates (EmailJS, form providers…) often put the
  // real person's address as plain text inside the body rather than as
  // the Gmail "From" header, which belongs to the sending service instead
  // — surfacing addresses found in the body lets the admin start a message
  // to the actual person with one click.
  const filteredMailMessages = useMemo(() => {
    return mailMessages.filter((m) => {
      if (mailFilter === "unread" && !m.unread) return false;
      if (mailFilter === "read" && m.unread) return false;
      return true;
    });
  }, [mailMessages, mailFilter]);

  const detectedAddresses = useMemo(() => {
    if (!selectedMail) return [];
    const text = String(selectedMail.body || selectedMail.snippet || "").replace(/<[^>]*>/g, " ");
    const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    const fromAddress = selectedMail.from?.match(/<(.+)>/)?.[1] || selectedMail.from;
    return Array.from(new Set(matches)).filter((addr) => addr.toLowerCase() !== fromAddress?.toLowerCase());
  }, [selectedMail]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gmailStatus = params.get("gmail");
    if (gmailStatus === "success") setMailNotice("Gmail connecté avec succès !");
    else if (gmailStatus === "error") setMailNotice(`Échec de connexion Gmail : ${params.get("gmail_error") || "erreur inconnue"}`);
    if (gmailStatus) {
      params.delete("gmail");
      params.delete("gmail_error");
      const newUrl = window.location.pathname + (params.toString() ? `?${params}` : "");
      window.history.replaceState({}, "", newUrl);
      setTab("mail");
      return;
    }

    // Deep-links from notifications (?tab=…) — e.g. a new candidature's
    // notification should open straight on the Candidatures tab, not
    // always land on the default Students tab.
    const requestedTab = params.get("tab");
    const validTabs: Tab[] = ["students", "live", "payments", "announcements", "applications", "projects", "devis", "mail", "requests", "progress", "certificates", "teachers", "visits", "activity", "stats", "placement", "corrections", "domestica", "shipments", "trucks"];
    if (requestedTab && (validTabs as string[]).includes(requestedTab)) {
      setTab(requestedTab as Tab);
    }
  }, []);

  useEffect(() => {
    if (!authorized) return;
    if (tab === "live" && liveSessions.length === 0) fetchLiveSessions();
    if (tab === "payments" && payments.length === 0) fetchPayments();
    if (tab === "announcements" && announcements.length === 0) fetchAnnouncements();
    if (tab === "applications" && jobApplications.length === 0) fetchJobApplications();
    if (tab === "projects" && projectRequests.length === 0) fetchProjectRequests();
    if (tab === "devis" && devisRequests.length === 0) fetchDevisRequests();
    if (tab === "mail" && mailMessages.length === 0) fetchMailMessages();
    if (tab === "requests" && studentRequests.length === 0) fetchStudentRequests();
    if (tab === "progress" && progressList.length === 0) fetchProgress();
    if (tab === "certificates" && certificates.length === 0) fetchCertificates();
    if (tab === "certificates") loadDocumentSettings().then(setDocSettings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, tab]);

  // Actualisation automatique : la liste du tableau actuellement affiché se
  // remet à jour toute seule en arrière-plan, sans que l'admin ait besoin de
  // cliquer sur "Actualiser" ou de changer d'onglet. "silent" évite de
  // réafficher le spinner "Chargement…" par-dessus des données déjà là.
  useEffect(() => {
    if (!authorized) return;
    const fetchForTab: Partial<Record<Tab, () => void>> = {
      students: fetchStudents,
      live: () => fetchLiveSessions(true),
      payments: () => fetchPayments(true),
      announcements: () => fetchAnnouncements(true),
      applications: () => fetchJobApplications(true),
      projects: () => fetchProjectRequests(true),
      devis: () => fetchDevisRequests(true),
      mail: () => fetchMailMessages(true),
      requests: () => fetchStudentRequests(true),
      progress: () => fetchProgress(true),
      certificates: () => fetchCertificates(true),
    };
    const interval = setInterval(() => {
      fetchForTab[tab]?.();
    }, 30_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, tab]);

  // Fetches a fresh moderator JaaS token whenever the admin opens a
  // live-room panel, so moderator status is explicit instead of relying
  // on "whoever joins first".
  useEffect(() => {
    if (!hostingSession) {
      setHostingToken(null);
      setHostingTokenError(null);
      return;
    }
    setHostingToken(null);
    setHostingTokenError(null);
    (async () => {
      try {
        const idToken = await auth.currentUser?.getIdToken();
        const response = await fetch("/api/academy/live-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, langCode: hostingSession.langCode, level: hostingSession.level, sessionId: hostingSession.id }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Erreur serveur");
        setHostingToken(result.token);
      } catch (error: any) {
        setHostingTokenError(error.message || "Erreur serveur.");
      }
    })();
  }, [hostingSession]);

  const sendEmail = async (email: string, name: string, matricule: string, langLabel: string, level: string, studyDays?: number) => {
    const idToken = await auth.currentUser?.getIdToken();
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ email, name, matricule, langLabel, level, studyDays }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Email failed");
    }

    return result;
  };

  // Both actions go through server routes using the Admin SDK (see
  // app/api/admin/{approve,reject}-student/route.ts) instead of writing
  // directly to Firestore from the browser. The previous client-side
  // writes silently failed or got stuck whenever the project's Firestore
  // rules didn't grant the admin account write access to another user's
  // students/{uid} doc (a common and correct rule for "users can only
  // write their own document") — and that client-side email check was
  // never real security anyway, just a UI gate. The server route verifies
  // the caller's ID token server-side instead.
  // Changes a student's study plan (3 <-> 5 days/week). Takes effect at once:
  // the lesson-unlock pacing is computed from it, and the student is notified.
  const changeStudyDays = async (student: any, studyDays: 3 | 5) => {
    const current = student.studyDays === 5 ? 5 : 3;
    if (studyDays === current) return;
    if (!confirm(`Passer ${student.name} de ${current} à ${studyDays} jours par semaine ?\n\nSes prochaines leçons seront débloquées toutes les ${studyDays === 5 ? "24 h" : "48 h"} et il/elle en sera informé(e).`)) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/update-enrollment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ id: student.id, kind: student.kind, studyDays }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      fetchStudents();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  // Sets the level the student started at (no access to the levels below it).
  const changeStartLevel = async (student: any, startLevel: number) => {
    const current = Number(String(student.level ?? "").slice(-1)) || 1;
    if (startLevel > current) {
      alert("Le niveau de départ ne peut pas dépasser le niveau actuel. Ouvrez d'abord le niveau voulu.");
      return;
    }
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/update-enrollment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ id: student.id, kind: student.kind, startLevel }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      fetchStudents();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  // Puts the student at a given level, up or down; the student is notified and keeps the same Student ID.
  const changeLevel = async (student: any, level: number) => {
    const current = levelNumber(student.level);
    if (level === current) return;
    const direction = level > current ? "monte" : "redescend";
    if (!confirm(`Placer ${student.name} au niveau ${level} (il/elle ${direction} depuis le niveau ${current}) ?\n\nSes leçons déjà faites restent enregistrées, son Student ID ne change pas, et il/elle en sera informé(e).${level > current ? "\n\nVérifiez d'abord que ses frais sont réglés si ce niveau est payant." : ""}`)) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/update-enrollment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ id: student.id, kind: student.kind, level }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      fetchStudents();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  // Sets the civility (Monsieur / Madame) used to address the student in e-mails.
  const changeGender = async (student: any, gender: "M" | "F") => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/update-enrollment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ id: student.id, kind: student.kind, gender }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      fetchStudents();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  // Unlocks the next level (same account and Student ID, new level registration number).
  const unlockLevel = async (student: any) => {
    const next = levelNumber(student.level) + 1;
    if (!confirm(`Débloquer le niveau ${next} pour ${student.name} ?

Vérifiez d'abord que l'étudiant a réglé ses frais si ce niveau est payant. Son Student ID ne change pas.`)) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/approve-level", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ id: student.id, kind: student.kind }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");
      alert(`Niveau ${result.level} débloqué${result.emailSent ? " — e-mail envoyé." : ". E-mail non envoyé : informez l'étudiant."}`);
      fetchStudents();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const approveStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;
    setProcessingIds((prev) => new Set(prev).add(student.id));

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const isEnrollment = student.kind === "enrollment";
      const response = await fetch(isEnrollment ? "/api/admin/approve-enrollment" : "/api/admin/approve-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEnrollment ? { idToken, enrollmentId: student.id } : { idToken, studentId: student.id }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur serveur inconnue");
      }

      try {
        if (!student.email) throw new Error("adresse e-mail manquante sur ce dossier");
        await sendEmail(student.email, student.name, result.matricule, languageLabel(student.langCode), student.level, student.studyDays);
        alert(result.reinstated ? "Accès rétabli + Email envoyé !" : "Approuvé + Email envoyé !");
      } catch (emailError: any) {
        console.error("EMAIL ERROR:", emailError);
        alert(`Étudiant approuvé, mais l'e-mail de confirmation n'est PAS parti : ${emailError?.message || emailError}\n\nCommuniquez-lui son Student ID (${result.matricule}) par un autre moyen.`);
      }

      fetchStudents();
    } catch (error: any) {
      console.error(error);
      alert(`Error approving student: ${error.message || error}`);
      fetchStudents();
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(student.id);
        return next;
      });
    }
  };

  /** Access control of one enrollment: suspend, give back, or set an end date. */
  const accessAction = async (student: any, action: "suspend" | "reactivate" | "setExpiry") => {
    if (processingIds.has(student.id)) return;
    const body: Record<string, unknown> = { enrollmentId: student.id, action };
    if (action === "suspend") {
      const reason = window.prompt(`Suspendre l'accès de ${student.name} à ${languageLabel(student.langCode)} ? Motif (visible par l'élève) :`, "");
      if (reason === null) return;
      body.reason = reason;
    } else if (action === "setExpiry") {
      const date = window.prompt("Date de fin d'accès (AAAA-MM-JJ), vide pour la retirer :", student.accessUntil || "");
      if (date === null) return;
      body.accessUntil = date.trim();
    } else if (student.accessUntil && student.accessUntil < new Date().toISOString().slice(0, 10)) {
      const date = window.prompt("La date de fin d'accès est dépassée. Nouvelle date (AAAA-MM-JJ), vide pour la retirer :", "");
      if (date === null) return;
      body.accessUntil = date.trim();
    }
    setProcessingIds((prev) => new Set(prev).add(student.id));
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/enrollment-access", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur inconnue");
      fetchStudents();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(student.id);
        return next;
      });
    }
  };

  const rejectStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;

    if (student.status === "Approved") {
      const confirmed = confirm(
        `${student.name} est actuellement approuvé(e) et a accès à la plateforme. Révoquer son accès (ex. frais non payés) ?`
      );
      if (!confirmed) return;
    }

    // A refused request carries a reason the student can read (optional).
    let reason = "";
    if (student.kind === "enrollment" && student.status === "Pending") {
      const asked = window.prompt("Motif du refus (visible par l'élève, facultatif) :", "");
      if (asked === null) return;
      reason = asked;
    }

    setProcessingIds((prev) => new Set(prev).add(student.id));

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const isEnrollment = student.kind === "enrollment";
      const response = await fetch(isEnrollment ? "/api/admin/reject-enrollment" : "/api/admin/reject-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEnrollment ? { idToken, enrollmentId: student.id, reason } : { idToken, studentId: student.id }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur serveur inconnue");
      }

      alert(student.status === "Approved" ? "Accès révoqué." : "Rejeté !");
      fetchStudents();
    } catch (error: any) {
      console.error(error);
      alert(`Erreur lors du rejet : ${error.message || error}`);
      fetchStudents();
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(student.id);
        return next;
      });
    }
  };

  const removeStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;
    if (!confirm(`Supprimer définitivement le dossier de ${student.name} ? Cette action est irréversible.`)) return;

    setProcessingIds((prev) => new Set(prev).add(student.id));
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const isEnrollment = student.kind === "enrollment";
      const response = await fetch(isEnrollment ? "/api/admin/remove-enrollment" : "/api/admin/remove-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEnrollment ? { idToken, enrollmentId: student.id } : { idToken, studentId: student.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur inconnue");
      fetchStudents();
    } catch (error: any) {
      console.error(error);
      alert(`Erreur lors de la suppression : ${error.message || error}`);
    } finally {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(student.id);
        return next;
      });
    }
  };

  const createLiveSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionDate || !sessionTime) {
      alert("Date et heure requises.");
      return;
    }

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const scheduledAt = new Date(`${sessionDate}T${sessionTime}:00`).toISOString();

      const response = await fetch("/api/admin/live-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          langCode: sessionLangCode,
          // Les formations hors langues (Bureautique, Visuel, Logiciels)
          // n'ont pas de niveaux 1/2/3 — une seule salle "Niveau 1" leur
          // sert de salle unique.
          level: isOtherProgramCode(sessionLangCode) ? "1" : sessionLevel,
          scheduledAt,
          durationMinutes: sessionDuration,
          title: sessionTitle,
          studentUids: sessionAudience,
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      setSessionDate("");
      setSessionTime("");
      setSessionTitle("");
      setSessionAudience(null);
      fetchLiveSessions();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const deleteLiveSession = async (id: string) => {
    if (!confirm("Supprimer cette session programmée ?")) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch(`/api/admin/live-sessions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erreur serveur");
      }
      fetchLiveSessions();
    } catch (error: any) {
      alert(`Erreur : ${error.message || error}`);
    }
  };

  const refreshTab = (t: Tab) => {
    if (t === "students") fetchStudents();
    else if (t === "live") fetchLiveSessions();
    else if (t === "payments") fetchPayments();
    else if (t === "announcements") fetchAnnouncements();
    else if (t === "applications") fetchJobApplications();
    else if (t === "projects") fetchProjectRequests();
    else if (t === "devis") fetchDevisRequests();
    else if (t === "mail") fetchMailMessages();
    else if (t === "requests") fetchStudentRequests();
    else if (t === "progress") fetchProgress();
    else if (t === "certificates") fetchCertificates();
  };

  const parseFromHeader = (from?: string) => {
    if (!from) return { name: "Inconnu", email: "" };
    const match = from.match(/^"?([^"<]*)"?\s*<(.+)>$/);
    if (match) {
      const name = match[1].trim();
      return { name: name || match[2], email: match[2] };
    }
    return { name: from, email: from };
  };

  const formatMailDate = (date?: string) => {
    if (!date) return "";
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return date;
    return parsed.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
  };

  const avatarColor = (seed: string) => {
    const palette = ["bg-red-600", "bg-amber-600", "bg-emerald-600", "bg-sky-600", "bg-violet-600", "bg-pink-600"];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % palette.length;
    return palette[Math.abs(hash) % palette.length];
  };

  // --- Derived data ---
  const languageLabel = (code?: string) =>
    availableLanguages.find((l) => l.code === code)?.label ?? getOtherProgramLabel(code) ?? code ?? "EN (legacy)";

  const stats = useMemo(() => {
    const byLang: Record<string, number> = {};
    let pending = 0;
    let approved = 0;
    let rejected = 0;
    for (const s of students) {
      const code = s.langCode || "EN";
      byLang[code] = (byLang[code] || 0) + 1;
      if (s.status === "Pending") pending++;
      else if (s.status === "Approved") approved++;
      else if (s.status === "Rejected" || s.status === "Suspended" || s.status === "Expired") rejected++;
    }
    return { total: students.length, byLang, pending, approved, rejected };
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (langFilter !== "all" && (s.langCode || "EN") !== langFilter) return false;
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const haystack = `${s.name || ""} ${s.email || ""} ${s.matricule || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [students, langFilter, statusFilter, search]);

  const paymentsStats = useMemo(() => {
    let paid = 0;
    let pendingAmount = 0;
    let totalAmount = 0;
    for (const p of payments) {
      if (p.status === "paid") {
        paid++;
        totalAmount += Number(p.amount) || 0;
      } else if (p.status === "pending") {
        pendingAmount += Number(p.amount) || 0;
      }
    }
    return { paid, totalAmount, pendingAmount, count: payments.length };
  }, [payments]);

  if (checking) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-surface-sunken text-ink-soft">
        Loading...
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page px-4 py-24">
        <div className="bg-surface-sunken border border-line p-8 shadow-xl shadow-black/40 rounded-2xl w-full max-w-md text-ink">
          <h1 className="text-2xl font-bold text-center mb-1">Connexion Administrateur</h1>
          <p className="text-sm text-ink-faint text-center mb-6">Accès réservé à l'administration BM Corporation</p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-200 text-sm rounded-lg">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Email administrateur</label>
              <input
                type="email"
                required
                placeholder="admin@exemple.com"
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-soft mb-1">Mot de passe</label>
              <PasswordInput
                required
                autoComplete="current-password"
                className="w-full border border-line bg-surface p-3 rounded-lg text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-red-600"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white p-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loginLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-6 md:px-10 pt-36 md:pt-36 pb-10 min-h-screen bg-surface-sunken text-ink font-sans overflow-x-hidden [overflow-wrap:anywhere]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap bg-surface border border-line rounded-2xl px-4 py-3">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-ink">Admin Panel</h1>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <NotificationBell scope="admin" />
            <button
              onClick={() => refreshTab(tab)}
              className="flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink border border-line hover:border-red-600/50 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 bg-surface whitespace-nowrap"
            >
              <RefreshCw size={15} /> Actualiser
            </button>
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-red-700 hover:bg-red-600 border border-red-700 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              <LogOut size={15} /> Déconnexion
            </button>
          </div>
        </div>

        {/* TABS: a list on phones (17 tabs would fill the screen), a tab bar from tablet size up */}
        {(() => {
          const tabItems = [
            { id: "students", label: "Étudiants", badge: stats.pending },
            { id: "live", label: "Cours en direct", badge: 0 },
            { id: "payments", label: "Paiements", badge: 0 },
            { id: "announcements", label: "Publicité", badge: 0 },
            { id: "applications", label: "Candidatures", badge: jobApplications.filter((a) => a.status === "new").length },
            { id: "projects", label: "Projets", badge: projectRequests.filter((r) => r.status === "new").length },
            { id: "devis", label: "Devis", badge: devisRequests.filter((r) => r.status === "new").length },
            { id: "mail", label: "Mail", badge: mailUnreadInbox },
            { id: "requests", label: "Messages Étudiants", badge: studentRequests.filter((r) => r.status === "new").length },
            { id: "progress", label: "Progression", badge: 0 },
            { id: "certificates", label: "Certificats", badge: 0 },
            { id: "teachers", label: "Professeurs", badge: 0 },
            { id: "visits", label: "Visites", badge: 0 },
            { id: "activity", label: "Activité", badge: 0 },
            { id: "corrections", label: "Corrections", badge: 0 },
            { id: "placement", label: "Tests de niveau", badge: 0 },
            { id: "domestica", label: "Domestica", badge: 0 },
            ...(TRACKING_ENABLED ? [{ id: "shipments" as const, label: "Suivi colis", badge: 0 }, { id: "trucks" as const, label: "Camions (carte)", badge: 0 }] : []),
            { id: "stats", label: "Statistiques", badge: 0 },
          ] as { id: Tab; label: string; badge: number }[];
          return (
            <>
              <div className="md:hidden mb-6">
                <label className="block text-xs font-bold uppercase tracking-wide text-ink-soft mb-1.5">Section</label>
                <select
                  value={tab}
                  onChange={(e) => setTab(e.target.value as Tab)}
                  className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-base font-bold text-ink focus:outline-none focus:border-red-600/60"
                >
                  {tabItems.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                      {t.badge > 0 ? ` (${t.badge})` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden md:flex gap-2 mb-8 border-b border-line flex-wrap">
                {tabItems.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`px-4 py-2.5 text-sm font-bold transition border-b-2 -mb-px inline-flex items-center gap-1.5 ${
                      tab === t.id ? "border-red-600 text-red-500" : "border-transparent text-ink-soft hover:text-ink"
                    }`}
                  >
                    {t.label}
                    {t.badge > 0 && (
                      <span className="text-[10px] font-black bg-red-600 text-white rounded-full min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center">
                        {t.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          );
        })()}

        {/* ================= STUDENTS TAB ================= */}
        {tab === "students" && (
          <div>
            <ProgramSwitches />
            <ProgressAudit />
            <div className="mb-4 flex flex-wrap justify-end gap-2"><RecomputePassButton /><RenameIdsButton /></div>
            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-ink">{stats.total}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Total</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-amber-400">{stats.pending}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">En attente</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-emerald-400">{stats.approved}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Approuvés</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-red-500">{stats.rejected}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Rejetés / Retirés</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(stats.byLang).map(([code, count]) => (
                <span key={code} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface border border-line text-ink-soft">
                  {languageLabel(code)} : <span className="text-red-500">{count}</span>
                </span>
              ))}
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={() => setAddStudentOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center gap-2"
              >
                + Inscrire un étudiant
              </button>
              <button
                onClick={() => setMessageOpen(true)}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center gap-2"
              >
                <Mail size={15} /> Message aux étudiants
              </button>
              <button
                onClick={() => {
                  setSentMessagesOpen(true);
                  fetchSentMessages();
                }}
                className="bg-surface-alt hover:bg-surface text-ink-soft hover:text-ink border border-line text-sm font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center gap-2"
              >
                <SquarePen size={15} /> Messages envoyés
              </button>
            </div>

            {/* VÉRIFICATION DE COMPTE FIREBASE — diagnostic pour "mot de passe incorrect" */}
            <div className="bg-surface border border-line rounded-2xl p-5 mb-8">
              <p className="text-sm font-bold text-ink mb-1">Vérifier un compte (connexion impossible)</p>
              <p className="text-xs text-ink-soft mb-3">
                Si un étudiant dit que son mot de passe est refusé, vérifie d'abord ici si un compte existe vraiment pour son email —
                ça distingue "mauvais mot de passe" de "ce compte n'a jamais été créé".
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={checkEmail}
                  onChange={(e) => setCheckEmail(e.target.value)}
                  placeholder="email@exemple.com"
                  className="flex-1 bg-surface-alt border border-line rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                />
                <button
                  onClick={checkAccount}
                  disabled={checkLoading || !checkEmail.trim()}
                  className="bg-surface-alt hover:bg-surface text-ink font-bold px-5 py-2.5 rounded-xl border border-line transition disabled:opacity-50 whitespace-nowrap"
                >
                  {checkLoading ? "Vérification…" : "Vérifier"}
                </button>
              </div>
              {checkResult && (
                <div className={`mt-4 p-4 rounded-xl text-sm border text-white ${
                  checkResult.exists ? "bg-emerald-700 border-emerald-600" : "bg-red-700 border-red-600"
                }`}>
                  {checkResult.exists ? (
                    <>
                      <p className="font-bold">✓ Ce compte existe bien dans Firebase.</p>
                      <p className="mt-1 text-xs opacity-80">
                        Créé le {checkResult.createdAt ? new Date(checkResult.createdAt).toLocaleString("fr-FR") : "?"}
                        {checkResult.lastSignInAt ? ` · Dernière connexion réussie : ${new Date(checkResult.lastSignInAt).toLocaleString("fr-FR")}` : " · Jamais connecté avec succès"}
                        {checkResult.disabled ? " · ⚠ Compte désactivé" : ""}
                      </p>
                      <p className="mt-2 text-xs opacity-80">
                        Le compte existe donc le souci vient du mot de passe saisi : demande à l'étudiant d'utiliser "Mot de passe oublié ?" sur la page de connexion.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold">✗ Aucun compte Firebase pour cet email.</p>
                      <p className="mt-1 text-xs opacity-80">
                        L'inscription n'a jamais abouti côté authentification (ou l'email est différent de celui réellement utilisé). L'étudiant doit se réinscrire via /register avec cet email.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* FILTERS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Rechercher par nom, email, matricule…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-surface border border-line rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
              />
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="bg-surface border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
              >
                <option value="all">Toutes les formations</option>
                {availableLanguages.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
                {otherPrograms.map((p) => (
                  <option key={p.code} value={p.code}>{p.label}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-surface border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
              >
                <option value="all">Tous les statuts</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Suspended">Suspendu</option>
                <option value="Expired">Accès terminé</option>
              </select>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucun étudiant ne correspond à ces filtres.
              </div>
            ) : (
              filteredStudents.map((s) => (
                <div key={s.id} className="p-5 mb-4 rounded-2xl border border-line bg-surface shadow-xl">
                  <p className="text-ink"><b className="text-ink">Nom :</b> {s.name}</p>
                  <p className="text-ink"><b className="text-ink">Email :</b> {s.email}</p>
                  <p className="text-ink"><b className="text-ink">Formation :</b> {languageLabel(s.langCode)}</p>
                  <p className="text-ink"><b className="text-ink">Niveau :</b> {s.level}</p>
                  <p className="text-ink">
                    <b className="text-ink">Statut :</b>{" "}
                    {s.status === "Approved" ? "Approuvé" : s.status === "Rejected" ? "Rejeté" : s.status === "Suspended" ? "Suspendu" : s.status === "Expired" ? "Accès terminé" : "En attente"}
                    {s.addedFromAccount && <span className="ml-2 rounded-full border border-red-600/40 bg-red-500/10 px-2 py-0.5 text-[11px] font-bold text-red-500">Formation supplémentaire</span>}
                    {s.statusReason && s.status !== "Approved" && <span className="ml-2 text-xs text-ink-soft">— {s.statusReason}</span>}
                  </p>
                  {s.kind === "enrollment" && (s.accessUntil || (s.history?.length ?? 0) > 0) && (
                    <div className="mt-1 text-xs text-ink-soft">
                      {s.accessUntil && <p>Accès jusqu'au <b className="text-ink">{s.accessUntil}</b></p>}
                      {(s.history?.length ?? 0) > 0 && (
                        <details className="mt-1">
                          <summary className="cursor-pointer font-semibold">Historique ({s.history.length})</summary>
                          <ul className="mt-1 space-y-0.5">
                            {[...s.history].reverse().map((h: any, i: number) => (
                              <li key={i}>
                                {new Date(h.at).toLocaleDateString("fr-FR", { dateStyle: "medium" })} · {h.by} · {({ requested: "demande", approved: "approuvée", rejected: "refusée", suspended: "suspendue", reactivated: "rétablie", expired: "accès terminé", expiry: "date de fin" } as Record<string, string>)[h.action] ?? h.action}
                                {h.reason ? ` : ${h.reason}` : ""}
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  )}
                  <p className="text-ink"><b className="text-ink">Student ID :</b> {s.matricule || "-"}</p>
                  <p className="text-ink">
                    <b className="text-ink">Dernière connexion :</b>{" "}
                    {s.lastSignInAt || s.lastSeenAt
                      ? new Date([s.lastSignInAt, s.lastSeenAt].filter(Boolean).sort().pop() as string).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })
                      : "jamais"}
                    <button onClick={() => setTab("activity")} className="ml-2 text-xs font-semibold text-red-500 hover:text-red-400">Voir l'activité</button>
                  </p>
                  <div className="text-ink flex flex-wrap items-center gap-2 mt-1">
                    <b className="text-ink">Civilité :</b>
                    <select
                      value={s.gender === "M" || s.gender === "F" ? s.gender : ""}
                      onChange={(e) => e.target.value && changeGender(s, e.target.value as "M" | "F")}
                      className="bg-surface-alt border border-line rounded-lg px-2 py-1 text-sm text-ink focus:outline-none focus:border-red-600/60"
                    >
                      <option value="">Non renseignée</option>
                      <option value="M">Monsieur</option>
                      <option value="F">Madame</option>
                    </select>
                  </div>
                  {!isOtherProgramCode(s.langCode) && s.status === "Approved" && (
                    <div className="mt-1 space-y-1">
                      {s.levelRequest && (
                        <p className="text-amber-500 text-xs font-semibold">⏳ L'étudiant demande le niveau {s.levelRequest.level} (quiz final du niveau précédent réussi).</p>
                      )}
                      {levelNumber(s.level) < (findProgramByCode(s.langCode) ? programLevels(findProgramByCode(s.langCode)!.slug).length || 3 : 3) && (
                        <button
                          onClick={() => unlockLevel(s)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${s.levelRequest ? "bg-green-600 text-white border-green-600 hover:bg-green-700" : "border-line text-ink-soft hover:text-ink hover:border-red-600/50"}`}
                        >
                          Débloquer le niveau {levelNumber(s.level) + 1}
                        </button>
                      )}
                    </div>
                  )}
                  {!isOtherProgramCode(s.langCode) && s.status === "Approved" && (
                    <div className="text-ink flex flex-wrap items-center gap-2 mt-1">
                      <b className="text-ink">Niveau actuel :</b>
                      <select
                        value={levelNumber(s.level)}
                        onChange={(e) => changeLevel(s, Number(e.target.value))}
                        className="bg-surface-alt border border-line rounded-lg px-2 py-1 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      >
                        {Array.from({ length: findProgramByCode(s.langCode) ? programLevels(findProgramByCode(s.langCode)!.slug).length || 3 : 3 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            Niveau {n}
                          </option>
                        ))}
                      </select>
                      <span className="text-xs text-ink-faint">(modifiable vers le haut ou vers le bas)</span>
                    </div>
                  )}
                  {!isOtherProgramCode(s.langCode) && (
                    <div className="text-ink flex flex-wrap items-center gap-2 mt-1">
                      <b className="text-ink">Accès aux niveaux :</b>
                      <span className="text-sm text-ink-soft">du niveau</span>
                      <select
                        value={Number(s.startLevel) >= 1 && Number(s.startLevel) <= 3 ? Number(s.startLevel) : 1}
                        onChange={(e) => changeStartLevel(s, Number(e.target.value))}
                        className="bg-surface-alt border border-line rounded-lg px-2 py-1 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                      <span className="text-sm text-ink-soft">au niveau {Number(String(s.level ?? "").slice(-1)) || 1}</span>
                    </div>
                  )}
                  {!isOtherProgramCode(s.langCode) && (
                    <div className="text-ink flex flex-wrap items-center gap-2 mt-1">
                      <b className="text-ink">Rythme d'étude :</b>
                      <select
                        value={s.studyDays === 5 ? 5 : 3}
                        onChange={(e) => changeStudyDays(s, Number(e.target.value) as 3 | 5)}
                        className="bg-surface-alt border border-line rounded-lg px-2 py-1 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      >
                        <option value={3}>3 jours / semaine</option>
                        <option value={5}>5 jours / semaine</option>
                      </select>
                    </div>
                  )}
                  {s.paid && s.status !== "Approved" && (
                    <p className="text-emerald-500 text-xs font-semibold">💰 Paiement reçu : l&apos;inscription attend votre approbation.</p>
                  )}
                  {!s.lastSignInAt && (
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-amber-500 text-xs font-semibold">🔑 Ne s&apos;est jamais connecté : il n&apos;a peut-être pas encore choisi son mot de passe.</p>
                      <button
                        onClick={async () => {
                          try {
                            const idToken = await auth.currentUser?.getIdToken();
                            const response = await fetch("/api/admin/send-password-link", {
                              method: "POST",
                              headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
                              body: JSON.stringify({ uid: s.uid || s.id?.split("_")[0] }),
                            });
                            const result = await response.json();
                            if (!response.ok) throw new Error(result.error || "Erreur serveur");
                            if (result.emailSent) alert("E-mail envoyé avec le lien pour choisir son mot de passe.");
                            else window.prompt(`L'e-mail n'a pas pu partir${result.emailError ? ` (${result.emailError})` : ""}. Copiez ce lien et envoyez-le-lui par WhatsApp :`, result.link);
                          } catch (error: any) {
                            alert(`Erreur : ${error.message || error}`);
                          }
                        }}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink hover:border-red-600/60 hover:text-red-500"
                      >
                        Renvoyer le lien du mot de passe
                      </button>
                    </div>
                  )}
                  {s.emailUnverified && (
                    <p className="text-amber-500 text-xs font-semibold">✉ E-mail non confirmé par l'étudiant (information — vous pouvez approuver quand même)</p>
                  )}

                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={() => approveStudent(s)}
                      disabled={processingIds.has(s.id) || s.status === "Approved" || s.status === "Suspended" || s.status === "Expired"}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {processingIds.has(s.id) ? "Traitement..." : s.status === "Rejected" ? "Réintégrer (approuver)" : "Approuver"}
                    </button>

                    {s.kind === "enrollment" && (s.status === "Suspended" || s.status === "Expired") ? (
                      <button
                        onClick={() => accessAction(s, "reactivate")}
                        disabled={processingIds.has(s.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40"
                      >
                        Réactiver l'accès
                      </button>
                    ) : s.kind === "enrollment" && s.status === "Approved" ? (
                      <>
                        <button
                          onClick={() => accessAction(s, "suspend")}
                          disabled={processingIds.has(s.id)}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Suspendre l'accès
                        </button>
                        <button
                          onClick={() => accessAction(s, "setExpiry")}
                          disabled={processingIds.has(s.id)}
                          className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition disabled:opacity-40"
                        >
                          Date de fin d'accès
                        </button>
                      </>
                    ) : s.status === "Approved" ? (
                      <button
                        onClick={() => rejectStudent(s)}
                        disabled={processingIds.has(s.id)}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Révoquer
                      </button>
                    ) : (
                      <button
                        onClick={() => rejectStudent(s)}
                        disabled={processingIds.has(s.id) || s.status === "Rejected"}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Rejeter
                      </button>
                    )}

                    <button
                      onClick={() => removeStudent(s)}
                      disabled={processingIds.has(s.id)}
                      className="bg-surface-alt hover:bg-surface text-ink-soft hover:text-red-500 font-bold px-4 py-2 rounded-xl border border-line transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= LIVE SESSIONS TAB ================= */}
        {tab === "live" && (
          <div>
            <form onSubmit={createLiveSession} className="bg-surface border border-line rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Formation</label>
                <select
                  value={sessionLangCode}
                  onChange={(e) => {
                    setSessionLangCode(e.target.value);
                    setSessionAudience(null);
                  }}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                >
                  <optgroup label="Langues">
                    {availableLanguages.map((l) => (
                      <option key={l.code} value={l.code}>{l.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Autres formations">
                    {otherPrograms.map((p) => (
                      <option key={p.code} value={p.code}>{p.label}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Niveau</label>
                {isOtherProgramCode(sessionLangCode) ? (
                  <div className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink-faint">
                    Salle unique
                  </div>
                ) : (
                  <select
                    value={sessionLevel}
                    onChange={(e) => setSessionLevel(e.target.value)}
                    className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                  >
                    <option value="1">Niveau 1</option>
                    <option value="2">Niveau 2</option>
                    <option value="3">Niveau 3</option>
                  </select>
                )}
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Date</label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Heure</label>
                <input
                  type="time"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  required
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Durée (min)</label>
                <input
                  type="number"
                  min="15"
                  step="15"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                />
              </div>

              <button
                type="submit"
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition lg:col-span-1"
              >
                Programmer
              </button>

              <div className="sm:col-span-2 lg:col-span-6">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Titre (optionnel)</label>
                <input
                  type="text"
                  placeholder="Ex. Session de conversation hebdomadaire"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-6">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Qui peut entrer ?</label>
                <LiveAudiencePicker candidates={audienceCandidates(sessionLangCode)} value={sessionAudience} onChange={setSessionAudience} />
              </div>
            </form>

            <p className="text-xs text-ink-soft mb-4">
              Le bouton « Classe en direct » des étudiants reste verrouillé jusqu'à 10 minutes avant l'heure programmée, et se referme 10 minutes après la fin.
            </p>

            {liveLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : liveSessions.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucune session programmée pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {liveSessions.map((session) => {
                  const date = new Date(session.scheduledAt);
                  const isPast = Date.now() > date.getTime() + (session.durationMinutes || 60) * 60_000;
                  return (
                    <div
                      key={session.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-line bg-surface ${isPast ? "opacity-50" : ""}`}
                    >
                      <div>
                        <p className="font-bold text-ink">
                          {languageLabel(session.langCode)} — Niveau {session.level}
                          {session.title ? ` · ${session.title}` : ""}
                        </p>
                        <p className="text-xs text-ink-soft mt-1">
                          {date.toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })} · {session.durationMinutes} min
                          {isPast && " · Terminée"}
                          {session.open && !isPast && " · 🟢 Ouvert aux étudiants"}
                        </p>
                        <p className="text-xs text-ink-soft mt-1">
                          {audienceLabel(session.studentUids)}
                          {session.teacherName ? ` · Prof : ${session.teacherName}` : ""}
                          <button
                            type="button"
                            onClick={() => setAudienceEdit({ id: session.id, langCode: session.langCode, value: Array.isArray(session.studentUids) ? session.studentUids : null })}
                            className="ml-2 font-bold text-red-500 hover:text-red-400"
                          >
                            Modifier
                          </button>
                        </p>
                      </div>
                      <div className="flex items-center gap-4 self-start sm:self-center">
                        <button
                          onClick={() => setHostingSession({ id: session.id, langCode: session.langCode || "EN", level: session.level, title: session.title })}
                          className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-4 py-2 rounded-xl transition inline-flex items-center gap-2"
                        >
                          <Video size={15} /> Rejoindre en tant qu'enseignant
                        </button>
                        <button
                          onClick={() => deleteLiveSession(session.id)}
                          className="text-red-500 hover:text-red-400 text-sm font-semibold"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {hostingSession && (
              <div className="mt-8 bg-surface border border-line rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <p className="font-bold text-ink">
                      Salle en direct — {languageLabel(hostingSession.langCode)} — Niveau {hostingSession.level}
                      {hostingSession.title ? ` · ${hostingSession.title}` : ""}
                    </p>
                    <p className="text-xs text-ink-soft mt-1">
                      Vous rejoignez en tant qu'enseignant/modérateur. Contrôle total de la session : micro, caméra, partage d'écran, mise en sourdine et exclusion des participants.
                    </p>
                  </div>
                  <button
                    onClick={leaveHostedRoom}
                    className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition whitespace-nowrap"
                  >
                    Quitter
                  </button>
                </div>

                {(() => {
                  const live = liveSessions.find((x) => x.id === hostingSession.id);
                  const isOpen = Boolean(live?.open);
                  return (
                    <div
                      className={`mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border ${
                        isOpen ? "border-emerald-600/40 bg-emerald-500/10" : "border-amber-600/40 bg-amber-500/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="relative flex h-3 w-3 mt-1.5 shrink-0">
                          {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? "bg-emerald-500" : "bg-amber-500"}`} />
                        </span>
                        <div>
                          <p className="font-bold text-ink text-sm">
                            {isOpen ? "Cours ouvert — les étudiants peuvent entrer" : "Cours fermé — les étudiants sont en salle d'attente"}
                          </p>
                          <p className="text-xs text-ink-soft mt-0.5">
                            {isOpen
                              ? "Les étudiants voient la vidéo, peuvent lever la main et écrire dans le chat. Clôturez à la fin du cours."
                              : "Préparez-vous (micro, caméra, supports), puis ouvrez le cours : l'accès démarre aussitôt chez les étudiants."}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRoomOpen(hostingSession.id, !isOpen)}
                        disabled={roomToggling || !hostingToken}
                        className={`text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shrink-0 disabled:opacity-50 ${
                          isOpen ? "bg-red-700 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-500"
                        }`}
                      >
                        {roomToggling ? "…" : isOpen ? "Clôturer le cours" : "Ouvrir le cours aux étudiants"}
                      </button>
                    </div>
                  );
                })()}

                {hostingTokenError ? (
                  <div className="p-6 rounded-2xl border border-line bg-surface-sunken text-ink-soft text-center">
                    {hostingTokenError}
                  </div>
                ) : isJitsiConfigured() && getJaasAppId() && hostingToken ? (
                  <JitsiEmbed
                    appId={getJaasAppId()!}
                    roomName={getLiveRoomName(hostingSession.langCode, hostingSession.level, hostingSession.id)}
                    displayName="Enseignant — BM Academia"
                    jwt={hostingToken}
                    role="teacher"
                  />
                ) : isJitsiConfigured() && getJaasAppId() ? (
                  <div className="p-6 rounded-2xl border border-line bg-surface-sunken text-ink-soft text-center">
                    Connexion à la salle…
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border border-line bg-surface-sunken text-ink-soft text-center">
                    Le service de visioconférence n'est pas encore configuré (variable NEXT_PUBLIC_JAAS_APP_ID manquante).
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TEACHERS TAB ================= */}
        {tab === "teachers" && <TeachersTab />}
        {tab === "visits" && <VisitsTab />}
        {tab === "activity" && <ActivityTab />}
        {tab === "stats" && <StatsTab scope="admin" />}
        {tab === "placement" && <PlacementTab />}
        {tab === "corrections" && <CorrectionsTab />}
        {tab === "domestica" && <DomesticaTab />}
        {TRACKING_ENABLED && tab === "shipments" && <ShipmentsTab />}
        {TRACKING_ENABLED && tab === "trucks" && <TrucksTab />}

        {/* ================= PAYMENTS TAB ================= */}
        {tab === "payments" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-ink">{paymentsStats.count}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Total</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-emerald-400">{paymentsStats.paid}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Payés</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-red-500">${paymentsStats.totalAmount}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">Revenu confirmé</p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-surface">
                <p className="text-2xl font-black text-amber-400">${paymentsStats.pendingAmount}</p>
                <p className="text-xs text-ink-soft uppercase tracking-wide mt-1">En attente</p>
              </div>
            </div>

            {paymentsLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : payments.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucun paiement enregistré pour le moment.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left text-ink-soft border-b border-line">
                      <th className="py-2 pr-4">Étudiant</th>
                      <th className="py-2 pr-4">Langue</th>
                      <th className="py-2 pr-4">Montant</th>
                      <th className="py-2 pr-4">Statut</th>
                      <th className="py-2 pr-4">Student ID</th>
                      <th className="py-2 pr-4">Référence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-b border-line/60">
                        <td className="py-2 pr-4 text-ink">{p.studentName || "-"}</td>
                        <td className="py-2 pr-4 text-ink-soft">{languageLabel(p.langCode)}</td>
                        <td className="py-2 pr-4 text-ink">{p.amount} {p.currency || "USD"}</td>
                        <td className="py-2 pr-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            p.status === "paid" ? "bg-emerald-700 text-white" :
                            p.status === "failed" ? "bg-red-700 text-white" :
                            "bg-amber-700 text-white"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-2 pr-4 text-ink-soft font-mono text-xs">{p.matricule || "-"}</td>
                        <td className="py-2 pr-4 text-ink-faint font-mono text-xs">{p.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= ANNOUNCEMENTS TAB ================= */}
        {tab === "announcements" && (
          <div>
            <p className="text-xs text-ink-soft mb-6">
              Les annonces actives s'affichent dans un bandeau bien visible juste sous l'en-tête de la page d'accueil
              du site (offres d'emploi, promotions, informations diverses...).
            </p>

            <form onSubmit={createAnnouncement} className="bg-surface border border-line rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Type</label>
                <select
                  value={annType}
                  onChange={(e) => setAnnType(e.target.value as "normal" | "job")}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                >
                  <option value="normal">Annonce normale (bouton "Voir le détail")</option>
                  <option value="job">Offre d'emploi (bouton "Postuler")</option>
                </select>
              </div>
              <div className="hidden sm:block" />
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Titre</label>
                <input
                  type="text"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="Ex: Nous recrutons !"
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">
                  Description courte (affichée dans le bandeau de la page d'accueil)
                </label>
                <textarea
                  value={annDescription}
                  onChange={(e) => setAnnDescription(e.target.value)}
                  rows={2}
                  placeholder="Ex: BM Corporation recrute un(e) formateur/formatrice en anglais. Postulez dès maintenant."
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">
                  Détails complets (affichés uniquement sur la page "Voir le détail" / "Postuler")
                </label>
                <textarea
                  value={annDetails}
                  onChange={(e) => setAnnDetails(e.target.value)}
                  rows={5}
                  placeholder="Description complète de l'offre ou de l'annonce..."
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Durée de publication</label>
                <select
                  value={annDuration}
                  onChange={(e) => setAnnDuration(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                >
                  <option value="">Illimitée (jusqu'à masquage manuel)</option>
                  <option value="3">3 jours</option>
                  <option value="7">7 jours</option>
                  <option value="14">14 jours</option>
                  <option value="30">30 jours</option>
                  <option value="60">60 jours</option>
                  <option value="90">90 jours</option>
                  <option value="custom">Personnalisée…</option>
                </select>
                {annDuration === "custom" && (
                  <input
                    type="number"
                    min={1}
                    value={annDurationCustom}
                    onChange={(e) => setAnnDurationCustom(e.target.value)}
                    placeholder="Nombre de jours"
                    className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 mt-2"
                  />
                )}
                <p className="text-xs text-ink-faint mt-1">L'annonce se masque automatiquement du site public à la fin de cette durée.</p>
              </div>
              <div className="sm:col-span-2">
                <label className="inline-flex items-center gap-2 text-sm text-ink-soft cursor-pointer">
                  <input
                    type="checkbox"
                    checked={annShowInTicker}
                    onChange={(e) => setAnnShowInTicker(e.target.checked)}
                    className="rounded border-line accent-red-600"
                  />
                  Afficher dans la bande défilante de la page d'accueil
                </label>
                <p className="text-xs text-ink-faint mt-1">Décochez pour que cette annonce apparaisse dans le carrousel mais pas dans le bandeau défilant.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Photo (optionnel)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAnnImage(e.target.files?.[0] ?? null)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-xs text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Vidéo (optionnel)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setAnnVideo(e.target.files?.[0] ?? null)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-xs text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-surface file:text-ink file:font-semibold"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={annSubmitting}
                  className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {annSubmitting ? "Publication..." : "Publier l'annonce"}
                </button>
              </div>
            </form>

            {announcementsLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : announcements.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucune annonce pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-line bg-surface ${a.active ? "" : "opacity-50"}`}
                  >
                    <div className="flex items-start gap-3">
                      {a.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover border border-line shrink-0" />
                      )}
                      <div>
                        <p className="font-bold text-ink">
                          {a.title}
                          <span className="ml-2 text-xs font-semibold text-ink-faint">
                            {a.type === "job" ? "· Offre d'emploi" : "· Annonce"}
                          </span>
                          {!a.active && <span className="ml-2 text-xs font-semibold text-ink-faint">(masquée)</span>}
                        </p>
                        <p className="text-xs text-ink-soft mt-1">{a.description}</p>
                        <p className="text-xs font-semibold text-ink-soft mt-1">
                          👁 {annStats[a.id]?.views ?? 0} vues · 🖱 {annStats[a.id]?.clicks ?? 0} clics
                          {(annStats[a.id]?.plays ?? 0) > 0 && ` · ▶️ ${annStats[a.id].plays} lectures`}
                          <span className="font-normal text-ink-faint"> (90 jours)</span>
                        </p>
                        {a.expiresAt && (
                          <p className="text-xs text-ink-faint mt-1">
                            {a.expiresAt > new Date().toISOString()
                              ? `Expire le ${new Date(a.expiresAt).toLocaleDateString("fr-FR")}`
                              : `Expirée le ${new Date(a.expiresAt).toLocaleDateString("fr-FR")}`}
                          </p>
                        )}
                        {a.showInTicker === false && (
                          <p className="text-xs text-ink-faint mt-1">Pas dans la bande défilante</p>
                        )}
                        <Link href={`/annonces/${a.id}`} className="text-xs text-red-500 hover:text-red-400 hover:underline mt-1 inline-block">
                          Voir la page publique →
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-start sm:self-center">
                      <button
                        onClick={() => openEditAnnouncement(a)}
                        className="flex items-center gap-1.5 bg-surface-alt hover:bg-surface text-ink-soft text-sm font-bold px-4 py-2 rounded-xl border border-line transition"
                      >
                        <SquarePen size={14} /> Modifier
                      </button>
                      <button
                        onClick={() => toggleAnnouncement(a.id, !a.active)}
                        className="bg-surface-alt hover:bg-surface text-ink-soft text-sm font-bold px-4 py-2 rounded-xl border border-line transition"
                      >
                        {a.active ? "Masquer" : "Afficher"}
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(a.id)}
                        className="text-red-500 hover:text-red-400 text-sm font-semibold"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= JOB APPLICATIONS TAB ================= */}
        {tab === "applications" && (
          <div>
            {jobApplicationsLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : jobApplications.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucune candidature pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {jobApplications.map((app) => (
                  <div key={app.id} className="p-5 rounded-2xl border border-line bg-surface">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-ink-faint font-semibold uppercase tracking-wide mb-1">{app.announcementTitle}</p>
                        <p className="text-ink font-bold">{app.name}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        app.status === "accepted" ? "bg-emerald-700 text-white" :
                        app.status === "rejected" ? "bg-red-700 text-white" :
                        app.status === "reviewing" ? "bg-amber-700 text-white" :
                        "bg-surface-alt text-ink-soft"
                      }`}>
                        {app.status === "accepted" ? "Accepté" : app.status === "rejected" ? "Rejeté" : app.status === "reviewing" ? "En étude" : "Nouveau"}
                      </span>
                    </div>
                    <p className="text-ink-soft text-sm mt-1">{app.email}{app.phone ? ` · ${app.phone}` : ""}</p>
                    {app.message && <p className="text-ink-soft text-sm mt-2">{app.message}</p>}
                    {app.attachments?.some((a: any) => a.url) ? (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {app.attachments.filter((a: any) => a.url).map((a: any, i: number) => (
                          <a
                            key={i}
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 bg-red-500/10 border border-red-700/30 px-2.5 py-1 rounded-lg"
                          >
                            <Paperclip size={12} /> {a.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-ink-faint mt-3 flex items-center gap-1.5">
                        <Mail size={12} /> Fichiers envoyés par email à l'administration
                        {app.attachmentNames?.length ? ` — ${app.attachmentNames.join(", ")}` : ""}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => updateJobApplicationStatus(app.id, "reviewing")}
                        disabled={app.status === "reviewing"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          app.status === "reviewing" ? "bg-amber-600 border-amber-600 text-white" : "bg-surface-alt hover:bg-surface text-ink-soft border-line"
                        }`}
                      >
                        {app.status === "reviewing" ? (<><CheckCircle2 size={13} /> En étude</>) : "En étude"}
                      </button>
                      <button
                        onClick={() => updateJobApplicationStatus(app.id, "accepted")}
                        disabled={app.status === "accepted"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          app.status === "accepted" ? "bg-green-800 text-white/80" : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        {app.status === "accepted" ? (<><CheckCircle2 size={13} /> Accepté</>) : "Accepter"}
                      </button>
                      <button
                        onClick={() => updateJobApplicationStatus(app.id, "rejected")}
                        disabled={app.status === "rejected"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          app.status === "rejected" ? "bg-red-900 text-white/80" : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                      >
                        {app.status === "rejected" ? (<><CheckCircle2 size={13} /> Rejeté</>) : "Rejeter"}
                      </button>
                      <button
                        onClick={() => openReply("jobApplications", app.id, app.email, `Votre candidature — ${app.announcementTitle}`)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold px-3 py-1.5 self-center inline-flex items-center gap-1.5"
                      >
                        <Mail size={13} /> Répondre sur le site
                      </button>
                      <a href={`mailto:${app.email}`} className="text-ink-faint hover:text-ink text-xs font-semibold px-3 py-1.5 self-center">Email →</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= PROJECT REQUESTS TAB ================= */}
        {tab === "projects" && (
          <div>
            <p className="text-xs text-ink-soft mb-6">
              Demandes envoyées depuis le formulaire « Parlons de votre projet » de la page d'accueil.
            </p>
            {projectRequestsLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : projectRequests.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucune demande pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {projectRequests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl border border-line bg-surface">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-ink font-bold">{req.name}</p>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        req.status === "contacted" ? "bg-emerald-700 text-white" :
                        req.status === "closed" ? "bg-surface-alt text-ink-faint" :
                        "bg-amber-700 text-white"
                      }`}>
                        {req.status === "contacted" ? "Contacté" : req.status === "closed" ? "Clôturé" : "Nouveau"}
                      </span>
                    </div>
                    <p className="text-ink-soft text-sm mt-1">{req.email}</p>
                    {req.message && <p className="text-ink-soft text-sm mt-2">{req.message}</p>}
                    {req.attachmentUrl && (
                      <a
                        href={req.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 bg-red-500/10 border border-red-700/30 px-2.5 py-1 rounded-lg mt-3"
                      >
                        <Paperclip size={12} /> {req.attachmentName || "Pièce jointe"}
                      </a>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => updateProjectRequestStatus(req.id, "contacted")}
                        disabled={req.status === "contacted"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          req.status === "contacted" ? "bg-green-800 text-white/80" : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        {req.status === "contacted" ? (<><CheckCircle2 size={13} /> Contacté</>) : "Marquer contacté"}
                      </button>
                      <button
                        onClick={() => updateProjectRequestStatus(req.id, "closed")}
                        disabled={req.status === "closed"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          req.status === "closed" ? "bg-surface text-ink-faint border-line" : "bg-surface-alt hover:bg-surface text-ink-soft border-line"
                        }`}
                      >
                        {req.status === "closed" ? (<><CheckCircle2 size={13} /> Clôturé</>) : "Clôturer"}
                      </button>
                      <button
                        onClick={() => openReply("projectRequests", req.id, req.email, "Votre demande — BM Corporation")}
                        className="text-red-500 hover:text-red-400 text-xs font-bold px-3 py-1.5 self-center inline-flex items-center gap-1.5"
                      >
                        <Mail size={13} /> Répondre sur le site
                      </button>
                      <a href={`mailto:${req.email}`} className="text-ink-faint hover:text-ink text-xs font-semibold px-3 py-1.5 self-center">Email →</a>
                      <button onClick={() => deleteProjectRequest(req.id)} className="text-ink-faint hover:text-red-500 text-xs font-semibold px-3 py-1.5 self-center">Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= DEVIS REQUESTS TAB ================= */}
        {tab === "devis" && (
          <div>
            <p className="text-xs text-ink-soft mb-6">
              Demandes envoyées depuis le formulaire de devis (/devis), tous départements confondus.
            </p>
            {devisRequestsLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : devisRequests.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucune demande de devis pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {devisRequests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl border border-line bg-surface">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-ink-faint font-semibold uppercase tracking-wide mb-1">{req.service}</p>
                        <p className="text-ink font-bold">{req.name}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        req.status === "contacted" ? "bg-emerald-700 text-white" :
                        req.status === "closed" ? "bg-surface-alt text-ink-faint" :
                        "bg-amber-700 text-white"
                      }`}>
                        {req.status === "contacted" ? "Contacté" : req.status === "closed" ? "Clôturé" : "Nouveau"}
                      </span>
                    </div>
                    <p className="text-ink-soft text-sm mt-1">{req.email}{req.phone ? ` · ${req.phone}` : ""}</p>
                    {req.message && <p className="text-ink-soft text-sm mt-2">{req.message}</p>}
                    {req.attachmentUrl && (
                      <a
                        href={req.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 bg-red-500/10 border border-red-700/30 px-2.5 py-1 rounded-lg mt-3"
                      >
                        <Paperclip size={12} /> {req.attachmentName || "Pièce jointe"}
                      </a>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => updateDevisRequestStatus(req.id, "contacted")}
                        disabled={req.status === "contacted"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          req.status === "contacted" ? "bg-green-800 text-white/80" : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        {req.status === "contacted" ? (<><CheckCircle2 size={13} /> Contacté</>) : "Marquer contacté"}
                      </button>
                      <button
                        onClick={() => updateDevisRequestStatus(req.id, "closed")}
                        disabled={req.status === "closed"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          req.status === "closed" ? "bg-surface text-ink-faint border-line" : "bg-surface-alt hover:bg-surface text-ink-soft border-line"
                        }`}
                      >
                        {req.status === "closed" ? (<><CheckCircle2 size={13} /> Clôturé</>) : "Clôturer"}
                      </button>
                      <button
                        onClick={() => openReply("devisRequests", req.id, req.email, `Votre demande de devis — ${req.service}`)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold px-3 py-1.5 self-center inline-flex items-center gap-1.5"
                      >
                        <Mail size={13} /> Répondre sur le site
                      </button>
                      <a href={`mailto:${req.email}`} className="text-ink-faint hover:text-ink text-xs font-semibold px-3 py-1.5 self-center">Email →</a>
                      {req.phone && (
                        <a
                          href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-500 hover:text-emerald-400 text-xs font-bold px-3 py-1.5 self-center"
                        >
                          WhatsApp →
                        </a>
                      )}
                      <button onClick={() => deleteDevisRequest(req.id)} className="text-ink-faint hover:text-red-500 text-xs font-semibold px-3 py-1.5 self-center">Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= STUDENT REQUESTS (PLAINTES) TAB ================= */}
        {tab === "requests" && (
          <div>
            <p className="text-xs text-ink-soft mb-6">
              Plaintes, inquiétudes et demandes particulières soumises par les étudiants depuis leur dashboard.
            </p>
            {studentRequestsLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : studentRequests.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucune plainte ou demande pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {studentRequests.map((req) => (
                  <div key={req.id} className="p-5 rounded-2xl border border-line bg-surface">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-ink-faint font-semibold uppercase tracking-wide mb-1">
                          {req.type === "complaint" ? "Plainte" : req.type === "concern" ? "Inquiétude" : req.type === "request" ? "Demande particulière" : "Autre"}
                        </p>
                        <p className="text-ink font-bold">{req.subject}</p>
                        <p className="text-xs text-ink-soft mt-0.5">{req.name} · {req.email}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        req.status === "resolved" ? "bg-emerald-700 text-white" :
                        req.status === "reviewing" ? "bg-amber-700 text-white" :
                        "bg-surface-alt text-ink-soft"
                      }`}>
                        {req.status === "resolved" ? "Résolu" : req.status === "reviewing" ? "En étude" : "Nouveau"}
                      </span>
                    </div>
                    {req.message && <p className="text-ink-soft text-sm mt-2">{req.message}</p>}
                    {req.attachmentNames?.length > 0 && (
                      <p className="text-xs text-ink-faint mt-2 flex items-center gap-1.5">
                        <Paperclip size={12} /> Envoyé par email avec : {req.attachmentNames.join(", ")}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => updateStudentRequestStatus(req.id, "reviewing")}
                        disabled={req.status === "reviewing"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          req.status === "reviewing" ? "bg-amber-600 border-amber-600 text-white" : "bg-surface-alt hover:bg-surface text-ink-soft border-line"
                        }`}
                      >
                        {req.status === "reviewing" ? (<><CheckCircle2 size={13} /> En étude</>) : "En étude"}
                      </button>
                      <button
                        onClick={() => updateStudentRequestStatus(req.id, "resolved")}
                        disabled={req.status === "resolved"}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition disabled:cursor-default inline-flex items-center gap-1.5 ${
                          req.status === "resolved" ? "bg-green-800 text-white/80" : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        {req.status === "resolved" ? (<><CheckCircle2 size={13} /> Résolu</>) : "Marquer résolu"}
                      </button>
                      <button
                        onClick={() => openReply("studentRequests", req.id, req.email, `Re: ${req.subject}`)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold px-3 py-1.5 self-center inline-flex items-center gap-1.5"
                      >
                        <Mail size={13} /> Répondre sur le site
                      </button>
                      <a href={`mailto:${req.email}`} className="text-ink-faint hover:text-ink text-xs font-semibold px-3 py-1.5 self-center">Email →</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= PROGRESS TAB ================= */}
        {tab === "progress" && (
          <div>
            <p className="text-xs text-ink-soft mb-6">
              Évolution des étudiants : leçons complétées, résultats de quiz et quiz final, par langue et par niveau.
              Synchronisé automatiquement à chaque quiz réussi — les étudiants qui n'ont pas encore passé de quiz depuis
              ce déploiement n'apparaîtront qu'après leur prochain quiz.
            </p>
            {progressLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : progressList.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucune donnée de progression pour le moment.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left text-ink-soft border-b border-line">
                      <th className="py-2 pr-4">Étudiant</th>
                      <th className="py-2 pr-4">Langue</th>
                      <th className="py-2 pr-4">Niveau</th>
                      <th className="py-2 pr-4">Quiz réussis</th>
                      <th className="py-2 pr-4">Quiz final</th>
                      <th className="py-2 pr-4">Certificat</th>
                      <th className="py-2 pr-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {progressList.map((p) => {
                      const owner = students.find((s) => s.uid === p.uid);
                      return (
                        <tr key={p.id} className="border-b border-line/60">
                          <td className="py-2 pr-4 text-ink">{owner?.name || p.uid}</td>
                          <td className="py-2 pr-4 text-ink-soft">{languageLabel(p.langCode)}</td>
                          <td className="py-2 pr-4 text-ink-soft">{p.level}</td>
                          <td className="py-2 pr-4 text-ink-soft">{(p.completedQuizzes || []).length}</td>
                          <td className="py-2 pr-4">
                            {p.finalQuizPassed ? (
                              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-700 text-white">Réussi ({p.finalQuizScore})</span>
                            ) : p.finalQuizScore != null ? (
                              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-700 text-white">Échoué ({p.finalQuizScore})</span>
                            ) : (
                              <span className="text-xs text-ink-faint">—</span>
                            )}
                          </td>
                          <td className="py-2 pr-4 text-ink-faint font-mono text-xs">{p.certificateId || "—"}</td>
                          <td className="py-2 pr-4">
                            <button
                              onClick={() => setDossierOf({ uid: p.uid, langCode: p.langCode })}
                              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-line text-ink hover:border-red-600/60 hover:text-red-500 transition"
                            >
                              Ouvrir
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= CERTIFICATES TAB ================= */}
        {tab === "certificates" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <p className="text-xs text-ink-soft max-w-xl">
                Certificats auto-générés en fin de niveau, et certificats émis manuellement ici (sans passer par le parcours d'apprentissage).
              </p>
              <button
                onClick={() => setCertGenerateOpen(true)}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center gap-2 shrink-0"
              >
                <Trophy size={15} /> Générer un certificat
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-line bg-surface">
              <button
                onClick={() => setDocSettingsOpen((o) => !o)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span>
                  <span className="block font-bold text-ink">Modèle du certificat (modifier tous les textes)</span>
                  <span className="block text-xs text-ink-soft mt-0.5">
                    Nom de l'entreprise, signataires, intitulés, libellé de l'identifiant… Appliqué à tous les nouveaux PDF.
                  </span>
                </span>
                <span className="text-xs font-bold text-red-500 shrink-0 ml-4">{docSettingsOpen ? "Fermer" : "Modifier"}</span>
              </button>
              {docSettingsOpen && (
                <div className="px-5 pb-5 space-y-5 border-t border-line pt-5">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Nom de l'entreprise</label>
                      <input
                        value={docSettings.companyName}
                        onChange={(e) => setDocSettings((d) => ({ ...d, companyName: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Département / sous-titre</label>
                      <input
                        value={docSettings.department}
                        onChange={(e) => setDocSettings((d) => ({ ...d, department: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Titre du certificat</label>
                      <input
                        value={docSettings.certificateTitle}
                        onChange={(e) => setDocSettings((d) => ({ ...d, certificateTitle: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Libellé du numéro de certificat</label>
                      <input
                        value={docSettings.certificateNumberLabel}
                        onChange={(e) => setDocSettings((d) => ({ ...d, certificateNumberLabel: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Libellé de l'identifiant étudiant</label>
                      <input
                        value={docSettings.studentIdLabel}
                        onChange={(e) => setDocSettings((d) => ({ ...d, studentIdLabel: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Texte « décerné à »</label>
                      <input
                        value={docSettings.presentedToText}
                        onChange={(e) => setDocSettings((d) => ({ ...d, presentedToText: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Texte « pour avoir réussi »</label>
                      <input
                        value={docSettings.completionText}
                        onChange={(e) => setDocSettings((d) => ({ ...d, completionText: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Libellé de la moyenne</label>
                      <input
                        value={docSettings.averageLabel}
                        onChange={(e) => setDocSettings((d) => ({ ...d, averageLabel: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Libellé de la date</label>
                      <input
                        value={docSettings.issuedLabel}
                        onChange={(e) => setDocSettings((d) => ({ ...d, issuedLabel: e.target.value }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-ink uppercase tracking-wide">Signature de gauche</p>
                      <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Nom</label>
                      <input
                        value={docSettings.signatory1.name}
                        onChange={(e) => setDocSettings((d) => ({ ...d, signatory1: { ...d.signatory1, name: e.target.value } }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                      <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Fonction</label>
                      <input
                        value={docSettings.signatory1.role}
                        onChange={(e) => setDocSettings((d) => ({ ...d, signatory1: { ...d.signatory1, role: e.target.value } }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-ink uppercase tracking-wide">Signature de droite</p>
                      <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Nom</label>
                      <input
                        value={docSettings.signatory2.name}
                        onChange={(e) => setDocSettings((d) => ({ ...d, signatory2: { ...d.signatory2, name: e.target.value } }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                      <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">Fonction</label>
                      <input
                        value={docSettings.signatory2.role}
                        onChange={(e) => setDocSettings((d) => ({ ...d, signatory2: { ...d.signatory2, role: e.target.value } }))}
                        className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                      />
                    </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={saveDocSettings}
                      disabled={docSettingsSaving}
                      className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition"
                    >
                      {docSettingsSaving ? "Enregistrement…" : "Enregistrer"}
                    </button>
                    <button
                      onClick={() =>
                        openCertificatePreview({
                          studentName: "Nom de l'étudiant",
                          levelTitle: "Level 1 - Beginner English",
                          average: 85,
                          certificateId: "CERT-EN-2026-0001",
                          studentId: "BMCA-EN-2026-001",
                          settings: docSettings,
                        })
                      }
                      className="bg-surface-alt hover:bg-surface text-ink-soft font-bold text-sm px-4 py-2.5 rounded-xl border border-line transition"
                    >
                      Aperçu avec ces textes
                    </button>
                    <button
                      onClick={() => setDocSettings(DEFAULT_DOCUMENT_SETTINGS)}
                      className="text-xs font-semibold text-ink-soft hover:text-ink"
                    >
                      Remettre les textes d'origine
                    </button>
                  </div>
                </div>
              )}
            </div>

            {certificatesLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">Chargement…</div>
            ) : certificates.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface text-ink-soft">
                Aucun certificat émis pour le moment.
              </div>
            ) : (
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className={`p-5 rounded-2xl border bg-surface ${cert.revoked ? "border-red-800/50 opacity-60" : "border-line"}`}>
                    {certEditingId === cert.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-ink-soft mb-1">Nom de l'étudiant</label>
                          <input
                            value={certEditName}
                            onChange={(e) => setCertEditName(e.target.value)}
                            className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink-soft mb-1">Email</label>
                          <input
                            value={certEditEmail}
                            onChange={(e) => setCertEditEmail(e.target.value)}
                            className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-ink-soft mb-1">Langue</label>
                            <select
                              value={certEditLangCode}
                              onChange={(e) => setCertEditLangCode(e.target.value)}
                              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                            >
                              {availableLanguages.map((l) => (
                                <option key={l.code} value={l.code}>{l.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-ink-soft mb-1">Niveau</label>
                            <select
                              value={certEditLevel}
                              onChange={(e) => setCertEditLevel(e.target.value)}
                              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                            >
                              <option value="1">Niveau 1</option>
                              <option value="2">Niveau 2</option>
                              <option value="3">Niveau 3</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink-soft mb-1">Titre du niveau</label>
                          <input
                            value={certEditLevelTitle}
                            onChange={(e) => setCertEditLevelTitle(e.target.value)}
                            className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink-soft mb-1">Moyenne (%)</label>
                          <input
                            type="number"
                            value={certEditAverage}
                            onChange={(e) => setCertEditAverage(e.target.value)}
                            className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => saveCertificateEdit(cert.id)} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition">Enregistrer</button>
                          <button
                            onClick={() =>
                              openCertificatePreview({
                                studentName: certEditName,
                                levelTitle: certEditLevelTitle || `${languageLabel(certEditLangCode)} — Niveau ${certEditLevel}`,
                                average: Number(certEditAverage) || 0,
                                certificateId: cert.certificateId,
                                studentId: cert.studentId || undefined,
                              })
                            }
                            className="bg-surface-alt hover:bg-surface text-ink-soft text-xs font-bold px-3 py-1.5 rounded-lg border border-line transition"
                          >
                            Aperçu
                          </button>
                          <button onClick={() => setCertEditingId(null)} className="bg-surface-alt hover:bg-surface text-ink-soft text-xs font-bold px-3 py-1.5 rounded-lg border border-line transition">Annuler</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-ink font-bold">{cert.studentName}</p>
                            <p className="text-xs text-ink-soft mt-0.5">{cert.levelTitle || `${languageLabel(cert.langCode)} — Niveau ${cert.level}`}</p>
                            <p className="text-xs text-ink-faint font-mono mt-1">
                              {cert.certificateId}
                              {cert.studentId ? ` · Student ID : ${cert.studentId}` : ""}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cert.issuedBy === "admin" ? "bg-amber-700 text-white" : "bg-surface-alt text-ink-soft"}`}>
                              {cert.issuedBy === "admin" ? "Émis par admin" : "Auto-généré"}
                            </span>
                            <p className="text-xs text-ink-faint mt-1">{cert.average != null ? `${cert.average}%` : ""}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <button
                            onClick={() => {
                              setCertEditingId(cert.id);
                              setCertEditName(cert.studentName || "");
                              setCertEditEmail(cert.studentEmail || "");
                              setCertEditLangCode(cert.langCode || availableLanguages[0].code);
                              setCertEditLevel(String(cert.level || "1"));
                              setCertEditLevelTitle(cert.levelTitle || "");
                              setCertEditAverage(String(cert.average ?? ""));
                            }}
                            className="bg-surface-alt hover:bg-surface text-ink-soft text-xs font-bold px-3 py-1.5 rounded-lg border border-line transition"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() =>
                              generateCertificatePdf({
                                studentName: cert.studentName,
                                levelTitle: cert.levelTitle || `${languageLabel(cert.langCode)} — Niveau ${cert.level}`,
                                average: cert.average || 0,
                                certificateId: cert.certificateId,
                                studentId: cert.studentId || undefined,
                              })
                            }
                            className="bg-surface-alt hover:bg-surface text-ink-soft text-xs font-bold px-3 py-1.5 rounded-lg border border-line transition"
                          >
                            Télécharger
                          </button>
                          <button
                            onClick={() => toggleCertificateRevoked(cert)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${cert.revoked ? "bg-green-600 hover:bg-green-700 text-white" : "bg-amber-600 hover:bg-amber-700 text-white"}`}
                          >
                            {cert.revoked ? "Réactiver" : "Révoquer"}
                          </button>
                          <button
                            onClick={() => deleteCertificate(cert.id)}
                            className="text-ink-faint hover:text-red-500 text-xs font-semibold px-3 py-1.5"
                          >
                            Supprimer
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= MAIL TAB ================= */}
        {tab === "mail" && (
          <div>
            {mailNotice && (
              <div className="p-3 mb-6 bg-surface border border-line rounded-xl text-sm text-ink flex flex-wrap items-center justify-between gap-2">
                {mailNotice}
                <button onClick={() => setMailNotice(null)} className="text-ink-faint hover:text-ink ml-4"><X size={15} /></button>
              </div>
            )}

            {!mailChecked ? (
              <div className="p-6 rounded-2xl border border-line bg-surface text-ink-soft">Chargement de ta boîte mail…</div>
            ) : mailError && mailMessages.length === 0 ? (
              <div className="p-8 rounded-2xl border border-line bg-surface text-center space-y-4">
                <p className="text-ink font-bold">Impossible de lire ta boîte mail</p>
                <p className="text-sm text-ink-soft max-w-xl mx-auto">{mailError.message}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={() => fetchMailMessages()} className="px-5 py-2.5 rounded-xl border border-line text-sm font-bold text-ink hover:border-red-600/60">
                    Réessayer
                  </button>
                  {mailError.reauth && (
                    <button
                      onClick={connectGmail}
                      disabled={mailConnecting}
                      className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center gap-2"
                    >
                      <Link2 size={16} /> {mailConnecting ? "Redirection…" : "Reconnecter Gmail"}
                    </button>
                  )}
                </div>
              </div>
            ) : !mailConfigured ? (
              <div className="p-6 rounded-2xl border border-line bg-surface text-ink-soft">
                Gmail n'est pas encore configuré côté serveur (variables GMAIL_CLIENT_ID / GMAIL_CLIENT_SECRET / GMAIL_REDIRECT_URI manquantes).
              </div>
            ) : !mailConnected ? (
              <div className="p-10 rounded-2xl border border-line bg-surface text-center space-y-4">
                <p className="text-ink font-bold">Connecte ta boîte Gmail pour voir et répondre à tes emails ici.</p>
                <button
                  onClick={connectGmail}
                  disabled={mailConnecting}
                  className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition inline-flex items-center gap-2"
                >
                  <Link2 size={16} /> {mailConnecting ? "Redirection…" : "Connecter Gmail"}
                </button>
              </div>
            ) : (
              <div className="bg-surface border border-line rounded-2xl overflow-hidden shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-4 border-b border-line bg-surface-alt/50">
                  <div>
                    <p className="font-black text-ink flex items-center gap-2"><Inbox size={16} /> brightenedmindcorporation@gmail.com</p>
                    <p className="text-xs text-ink-soft mt-0.5">
                      {mailUnreadInbox} non lu(s) dans la réception · {mailMessages.length} affiché(s)
                    </p>
                  </div>
                  <button
                    onClick={() => openCompose()}
                    className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition shrink-0 inline-flex items-center gap-2"
                  >
                    <SquarePen size={15} /> Nouveau message
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-2 lg:border-r border-line flex flex-col">
                    <div className="p-3 border-b border-line space-y-2 shrink-0">
                      <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {MAIL_FOLDERS.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => changeMailFolder(f.id)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                              mailFolder === f.id ? "bg-red-600 text-white" : "bg-surface-alt text-ink-soft hover:text-ink"
                            }`}
                          >
                            {f.label}
                            {f.id === "inbox" && mailUnreadInbox > 0 ? ` (${mailUnreadInbox})` : ""}
                          </button>
                        ))}
                      </div>
                      <form
                        onSubmit={(e) => { e.preventDefault(); submitMailSearch(); }}
                        className="relative"
                      >
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                        <input
                          type="text"
                          value={mailSearch}
                          onChange={(e) => setMailSearch(e.target.value)}
                          placeholder="Rechercher (Entrée) — ex. from:nom, has:attachment"
                          className="w-full bg-surface-alt border border-line rounded-lg pl-9 pr-8 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                        />
                        {(mailSearch || mailQuery) && (
                          <button type="button" onClick={clearMailSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink">
                            <X size={14} />
                          </button>
                        )}
                      </form>
                      <div className="flex gap-1.5">
                        {([
                          { id: "all", label: "Tous" },
                          { id: "unread", label: "Non lus" },
                          { id: "read", label: "Lus" },
                        ] as { id: "all" | "unread" | "read"; label: string }[]).map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setMailFilter(f.id)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                              mailFilter === f.id ? "bg-red-600 text-white" : "bg-surface-alt text-ink-soft hover:text-ink"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[55vh]">
                    {mailLoading ? (
                      <div className="p-6 text-ink-soft text-sm">Chargement…</div>
                    ) : filteredMailMessages.length === 0 ? (
                      <div className="p-6 text-ink-soft text-sm">Aucun email ne correspond.</div>
                    ) : (
                      filteredMailMessages.map((m) => {
                        const { name } = parseFromHeader(mailFolder === "sent" || mailFolder === "drafts" ? m.to || m.from : m.from);
                        return (
                          <button
                            key={m.id}
                            onClick={() => openMail(m.id)}
                            className={`w-full text-left px-4 py-3.5 border-b border-line/60 transition flex gap-3 items-start ${
                              selectedMail?.id === m.id ? "bg-red-950/10" : "hover:bg-surface-alt"
                            }`}
                          >
                            <span className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ${avatarColor(name)}`}>
                              {name.trim().charAt(0).toUpperCase() || "?"}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center justify-between gap-2">
                                <span className={`text-sm truncate ${m.unread ? "font-black text-ink" : "font-semibold text-ink-soft"}`}>{name}</span>
                                <span className="flex items-center gap-1.5 shrink-0">
                                  {m.starred && <Star size={13} className="text-yellow-400 fill-yellow-400" />}
                                  {m.unread && <span className="w-2 h-2 rounded-full bg-red-500" />}
                                </span>
                              </span>
                              <span className={`block text-sm truncate ${m.unread ? "font-bold text-ink" : "text-ink-soft"}`}>{m.subject}</span>
                              <span className="block text-xs text-ink-faint truncate mt-0.5">{m.snippet}</span>
                            </span>
                          </button>
                        );
                      })
                    )}
                    {mailNextToken && !mailLoading && (
                      <button
                        onClick={() => fetchMailMessages(true, mailNextToken)}
                        disabled={mailLoadingMore}
                        className="w-full py-3 text-xs font-bold text-red-500 hover:bg-surface-alt disabled:opacity-50 transition"
                      >
                        {mailLoadingMore ? "Chargement…" : "Charger plus"}
                      </button>
                    )}
                    </div>
                  </div>

                  <div className="lg:col-span-3 max-h-[65vh] overflow-y-auto">
                    {mailDetailLoading ? (
                      <div className="p-6 text-ink-soft text-sm">Chargement…</div>
                    ) : !selectedMail ? (
                      <div className="p-10 text-ink-soft text-sm text-center">
                        Sélectionne un email à gauche pour le lire.
                      </div>
                    ) : (
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedMail(null)}
                            className="text-xs font-semibold text-ink-soft hover:text-ink inline-flex items-center gap-1.5"
                          >
                            <ArrowLeft size={14} /> Retour
                          </button>
                          <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={() => mailAction(selectedMail.id, selectedMail.starred ? "unstar" : "star")} title={selectedMail.starred ? "Retirer des favoris" : "Favori"} className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50">
                              <Star size={14} className={selectedMail.starred ? "text-yellow-400 fill-yellow-400" : ""} /> Favori
                            </button>
                            {mailFolder === "trash" ? (
                              <button onClick={() => mailAction(selectedMail.id, "untrash")} className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50">
                                <RotateCcw size={14} /> Restaurer
                              </button>
                            ) : (
                              <>
                                {mailFolder !== "spam" && (
                                  <button onClick={() => mailAction(selectedMail.id, "archive")} className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50">
                                    <Archive size={14} /> Archiver
                                  </button>
                                )}
                                {mailFolder === "spam" ? (
                                  <button onClick={() => mailAction(selectedMail.id, "notspam")} className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50">
                                    <Inbox size={14} /> Pas un spam
                                  </button>
                                ) : (
                                  <button onClick={() => mailAction(selectedMail.id, "spam")} className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50">
                                    <ShieldAlert size={14} /> Spam
                                  </button>
                                )}
                                <button onClick={() => mailAction(selectedMail.id, "trash")} className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50">
                                  <Trash2 size={14} /> Corbeille
                                </button>
                              </>
                            )}
                            <button onClick={() => { mailAction(selectedMail.id, "unread"); setSelectedMail(null); }} className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50">
                              <MailOpen size={14} /> Non lu
                            </button>
                            <button
                              onClick={printMail}
                              title="Imprimer"
                              className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50"
                            >
                              <Printer size={14} /> Imprimer
                            </button>
                            <button
                              onClick={shareMail}
                              title="Partager"
                              className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50"
                            >
                              <Share2 size={14} /> Partager
                            </button>
                            <button
                              onClick={forwardMail}
                              className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5 transition hover:border-red-600/50"
                            >
                              <Forward size={14} /> Transférer
                            </button>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-ink">{selectedMail.subject}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0 ${avatarColor(parseFromHeader(selectedMail.from).name)}`}>
                            {parseFromHeader(selectedMail.from).name.trim().charAt(0).toUpperCase() || "?"}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-ink truncate">{parseFromHeader(selectedMail.from).name}</p>
                            <p className="text-xs text-ink-faint truncate">{parseFromHeader(selectedMail.from).email}</p>
                          </div>
                          <span className="text-xs text-ink-faint ml-auto shrink-0">{formatMailDate(selectedMail.date)}</span>
                        </div>
                        {(selectedMail.to || selectedMail.cc) && (
                          <p className="text-xs text-ink-faint mt-2 break-words">
                            {selectedMail.to && <>À : {selectedMail.to}</>}
                            {selectedMail.cc && <> · Cc : {selectedMail.cc}</>}
                          </p>
                        )}

                        {detectedAddresses.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 mt-4 p-3 bg-surface-alt/60 border border-line rounded-xl">
                            <span className="text-xs text-ink-soft font-semibold shrink-0">Adresses détectées dans le message :</span>
                            {detectedAddresses.map((addr) => (
                              <button
                                key={addr}
                                onClick={() => openCompose(addr, selectedMail.subject.startsWith("Re:") ? selectedMail.subject : `Re: ${selectedMail.subject}`)}
                                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface border border-line text-red-500 hover:border-red-600 hover:bg-red-950/10 transition inline-flex items-center gap-1.5"
                              >
                                <Mail size={12} /> {addr}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-line">
                          {/* Email HTML comes from arbitrary senders — never trusted, so it
                              renders in a fully sandboxed iframe (no scripts, no same-origin
                              access) instead of dangerouslySetInnerHTML on the page itself. */}
                          <iframe
                            sandbox=""
                            srcDoc={selectedMail.body || selectedMail.snippet}
                            className="w-full h-64 rounded-xl bg-white border border-line"
                            title="Contenu de l'email"
                          />
                        </div>

                        {selectedMail.attachments?.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-line">
                            <p className="text-xs font-semibold text-ink-soft mb-2">Pièces jointes</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedMail.attachments.map((att: any) => (
                                <button
                                  key={att.attachmentId}
                                  onClick={() => downloadGmailAttachment(selectedMail.id, att)}
                                  disabled={downloadingAttachmentId === att.attachmentId}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 bg-red-500/10 border border-red-700/30 px-2.5 py-1.5 rounded-lg disabled:opacity-50"
                                >
                                  {downloadingAttachmentId === att.attachmentId ? (
                                    "Téléchargement…"
                                  ) : (
                                    <>
                                      <Download size={12} /> {att.filename}
                                    </>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-6 pt-4 border-t border-line">
                          <div className="flex items-center gap-2 mb-3">
                            <label className="text-xs font-semibold text-ink-soft shrink-0">De</label>
                            <select
                              value={replyFrom}
                              onChange={(e) => setReplyFrom(e.target.value)}
                              className="flex-1 bg-surface-alt border border-line rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                            >
                              {MAIL_SENDERS.map((a) => (
                                <option key={a} value={a}>{a}</option>
                              ))}
                            </select>
                          </div>
                          <label className="block text-xs font-semibold text-ink-soft mb-1.5">Répondre à {parseFromHeader(selectedMail.from).name}</label>
                          <textarea
                            value={mailReplyBody}
                            onChange={(e) => setMailReplyBody(e.target.value)}
                            rows={5}
                            placeholder="Écrivez votre réponse…"
                            className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                          />
                          {mailReplyAttachments.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {mailReplyAttachments.map((file, i) => (
                                <span key={i} className="text-xs bg-surface-alt border border-line rounded-full px-3 py-1 flex items-center gap-2 text-ink-soft">
                                  <Paperclip size={12} /> {file.name}
                                  <button onClick={() => setMailReplyAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="text-ink-faint hover:text-red-500"><X size={12} /></button>
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-3 mt-3">
                            <label className="text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-2 cursor-pointer transition bg-surface-alt inline-flex items-center gap-1.5">
                              <Paperclip size={13} /> Joindre un fichier
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => setMailReplyAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])}
                              />
                            </label>
                            <button
                              onClick={sendMailReply}
                              disabled={mailReplySending || !mailReplyBody.trim()}
                              className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl transition"
                            >
                              {mailReplySending ? "Envoi…" : "Envoyer"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= CERTIFICATE PREVIEW MODAL ================= */}
      {certPreviewUrl && (
        <div className="fixed inset-0 z-[70] bg-black/80 flex items-start sm:items-center justify-center overflow-y-auto p-4">
          <div className="bg-surface border border-line rounded-2xl p-4 w-full max-w-4xl shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <p className="text-sm font-bold text-ink">Aperçu du certificat</p>
              <button onClick={closeCertificatePreview} className="text-ink-soft hover:text-ink"><X size={18} /></button>
            </div>
            <iframe src={certPreviewUrl} title="Aperçu du certificat" className="w-full rounded-xl border border-line" style={{ aspectRatio: "297 / 210" }} />
          </div>
        </div>
      )}

      {/* ================= GENERATE CERTIFICATE MODAL ================= */}
      {certGenerateOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start sm:items-center justify-center overflow-y-auto p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2"><Trophy size={18} /> Générer un certificat</h3>
            <p className="text-xs text-ink-soft mb-4">
              Génère un certificat PDF directement (téléchargé dans ce navigateur) sans que l'étudiant ait besoin de passer par le parcours d'apprentissage.
            </p>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Nom de l'étudiant</label>
            <input
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Email (optionnel)</label>
            <input
              type="email"
              value={certEmail}
              onChange={(e) => setCertEmail(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Student ID de l'étudiant (recommandé)</label>
            <input
              value={certMatricule}
              onChange={(e) => setCertMatricule(e.target.value)}
              placeholder="BMCA-EN-2026-004"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-1 focus:outline-none focus:border-red-600/60"
            />
            <p className="text-xs text-ink-faint mb-4">Le même Student ID que celui remis à l'inscription (onglet Étudiants). Le numéro du certificat (Certificate Number) est généré automatiquement.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Langue</label>
                <select
                  value={certLangCode}
                  onChange={(e) => setCertLangCode(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                >
                  {availableLanguages.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Niveau</label>
                <select
                  value={certLevel}
                  onChange={(e) => setCertLevel(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                >
                  <option value="1">Niveau 1</option>
                  <option value="2">Niveau 2</option>
                  <option value="3">Niveau 3</option>
                </select>
              </div>
            </div>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Titre du niveau (optionnel)</label>
            <input
              value={certLevelTitle}
              onChange={(e) => setCertLevelTitle(e.target.value)}
              placeholder={`${languageLabel(certLangCode)} — Niveau ${certLevel}`}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-4 focus:outline-none focus:border-red-600/60"
            />
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Moyenne (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={certAverage}
              onChange={(e) => setCertAverage(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCertGenerateOpen(false)}
                className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  openCertificatePreview({
                    studentName: certName.trim() || "Nom de l'étudiant",
                    levelTitle: certLevelTitle.trim() || `${languageLabel(certLangCode)} — Niveau ${certLevel}`,
                    average: Number(certAverage) || 0,
                    certificateId: "CERT-APERÇU",
                    studentId: certMatricule.trim() || undefined,
                  })
                }
                className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition"
              >
                Aperçu
              </button>
              <button
                onClick={generateCertificateManually}
                disabled={certSending || !certName.trim()}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl transition"
              >
                {certSending ? "Génération…" : "Générer et télécharger"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STUDENT FILE (PROGRESS) MODAL ================= */}
      {dossierOf && (() => {
          const owner = students.find((s) => s.uid === dossierOf.uid && s.langCode === dossierOf.langCode) || students.find((s) => s.uid === dossierOf.uid);
          const levels: Record<string, any> = {};
          for (const row of progressList) if (row.uid === dossierOf.uid && row.langCode === dossierOf.langCode) levels[String(row.level)] = row;
          return (
            <StudentDossier
              student={{ name: owner?.name || dossierOf.uid, email: owner?.email, studentId: owner?.matricule, langCode: dossierOf.langCode }}
              levels={levels}
              onClose={() => setDossierOf(null)}
              canEditScores
              onAct={async (action, level, lessonId, score, parts) => {
                const idToken = await auth.currentUser?.getIdToken();
                const response = await fetch("/api/admin/student-progress", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
                  body: JSON.stringify({ uid: dossierOf.uid, langCode: dossierOf.langCode, level, lessonId, action, score, parts }),
                });
                const result = await response.json().catch(() => ({}));
                if (!response.ok) throw new Error(result.error || "Erreur serveur");
                await fetchProgress(true);
              }}
            />
          );
        })()}

      {audienceEdit && (
        <div className="fixed inset-0 z-[70] bg-black/70 flex items-start justify-center overflow-y-auto p-4" onClick={() => setAudienceEdit(null)}>
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl my-8 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-ink">Qui peut entrer dans ce cours ?</h3>
            <LiveAudiencePicker
              candidates={audienceCandidates(audienceEdit.langCode)}
              value={audienceEdit.value}
              onChange={(value) => setAudienceEdit({ ...audienceEdit, value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setAudienceEdit(null)} className="px-4 py-2 rounded-xl border border-line text-sm font-bold text-ink-soft hover:text-ink">
                Annuler
              </button>
              <button
                onClick={async () => {
                  try {
                    const idToken = await auth.currentUser?.getIdToken();
                    const response = await fetch(`/api/admin/live-sessions/${audienceEdit.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
                      body: JSON.stringify({ studentUids: audienceEdit.value }),
                    });
                    const result = await response.json();
                    if (!response.ok) throw new Error(result.error || "Erreur serveur");
                    setAudienceEdit(null);
                    fetchLiveSessions();
                  } catch (error: any) {
                    alert(`Erreur : ${error.message || error}`);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {addStudentOpen && <AddStudentModal onClose={() => setAddStudentOpen(false)} onDone={fetchStudents} />}

      {messageOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start sm:items-center justify-center overflow-y-auto p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2"><Mail size={18} /> Message aux étudiants</h3>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Destinataire(s)</label>
            <select
              value={messageRecipient}
              onChange={(e) => setMessageRecipient(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            >
              <option value="__all__">Tous les étudiants approuvés</option>
              {students.filter((s) => s.email && s.uid).map((s) => (
                <option key={s.id} value={s.uid}>{s.name} — {s.email}</option>
              ))}
            </select>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Sujet</label>
            <input
              type="text"
              value={messageSubject}
              onChange={(e) => setMessageSubject(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Message</label>
            <textarea
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              rows={6}
              placeholder="Écrivez votre message…"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-3 focus:outline-none focus:border-red-600/60"
            />
            {messageAttachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {messageAttachments.map((file, i) => (
                  <span key={i} className="text-xs bg-surface-alt border border-line rounded-full px-3 py-1 flex items-center gap-2 text-ink-soft">
                    <Paperclip size={12} /> {file.name}
                    <button onClick={() => setMessageAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="text-ink-faint hover:text-red-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-2 cursor-pointer transition bg-surface-alt mb-4">
              <Paperclip size={13} /> Joindre un fichier
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setMessageAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])}
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMessageOpen(false)}
                className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition"
              >
                Annuler
              </button>
              <button
                onClick={sendStudentMessage}
                disabled={messageSending || !messageSubject.trim() || !messageBody.trim()}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl transition"
              >
                {messageSending ? "Envoi…" : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SENT MESSAGES MODAL ================= */}
      {sentMessagesOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start sm:items-center justify-center overflow-y-auto p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="text-lg font-bold text-ink flex items-center gap-2"><SquarePen size={18} /> Messages envoyés aux étudiants</h3>
              <button onClick={() => setSentMessagesOpen(false)} className="text-ink-faint hover:text-ink"><X size={18} /></button>
            </div>

            {sentMessagesLoading ? (
              <div className="p-4 rounded-2xl border border-line bg-surface-alt text-ink-soft text-sm">Chargement…</div>
            ) : sentMessages.length === 0 ? (
              <div className="p-4 rounded-2xl border border-line bg-surface-alt text-ink-soft text-sm">Aucun message envoyé pour le moment.</div>
            ) : (
              <div className="space-y-3">
                {sentMessages.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl border border-line bg-surface-alt">
                    {editingSentMessageId === m.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editSentSubject}
                          onChange={(e) => setEditSentSubject(e.target.value)}
                          className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                        />
                        <textarea
                          value={editSentBody}
                          onChange={(e) => setEditSentBody(e.target.value)}
                          rows={4}
                          className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-red-600/60"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingSentMessageId(null)}
                            className="text-xs font-semibold text-ink-soft hover:text-ink px-3 py-1.5"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={() => saveSentMessageEdit(m.id)}
                            disabled={sentMessageSaving}
                            className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 px-3 py-1.5 rounded-lg"
                          >
                            {sentMessageSaving ? "Enregistrement…" : "Enregistrer"}
                          </button>
                        </div>
                        <p className="text-[11px] text-ink-faint">La modification met à jour la notification dans le tableau de bord des destinataires — l'email déjà envoyé ne peut pas être rappelé.</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-bold text-ink">{m.subject}</p>
                          <span className="text-xs text-ink-faint shrink-0">
                            {m.createdAt ? new Date(m.createdAt).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }) : ""}
                          </span>
                        </div>
                        <p className="text-sm text-ink-soft mt-1 whitespace-pre-wrap line-clamp-3">{m.body}</p>
                        <p className="text-xs text-ink-faint mt-2">
                          {m.recipients?.length || 0} destinataire{(m.recipients?.length || 0) > 1 ? "s" : ""}
                          {m.attachmentNames?.length ? ` · ${m.attachmentNames.join(", ")}` : ""}
                        </p>
                        <div className="flex gap-3 mt-3">
                          <button
                            onClick={() => startEditSentMessage(m)}
                            className="text-xs font-bold text-red-500 hover:text-red-400"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteSentMessage(m.id)}
                            className="text-xs font-semibold text-ink-faint hover:text-red-500"
                          >
                            Supprimer
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= COMPOSE MODAL ================= */}
      {composeOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start sm:items-center justify-center overflow-y-auto p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2"><SquarePen size={18} /> Nouveau message</h3>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">De</label>
            <select
              value={composeFrom}
              onChange={(e) => setComposeFrom(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            >
              {MAIL_SENDERS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">À</label>
            <input
              type="email"
              value={composeTo}
              onChange={(e) => setComposeTo(e.target.value)}
              placeholder="destinataire@email.com"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-2 focus:outline-none focus:border-red-600/60"
            />
            {!composeShowCc ? (
              <button onClick={() => setComposeShowCc(true)} className="text-xs font-semibold text-red-500 hover:text-red-400 mb-4">
                + Cc / Cci
              </button>
            ) : (
              <div className="space-y-2 mb-4">
                <input
                  type="text"
                  value={composeCc}
                  onChange={(e) => setComposeCc(e.target.value)}
                  placeholder="Cc (séparer par des virgules)"
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                />
                <input
                  type="text"
                  value={composeBcc}
                  onChange={(e) => setComposeBcc(e.target.value)}
                  placeholder="Cci (copie cachée)"
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                />
              </div>
            )}
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Sujet</label>
            <input
              type="text"
              value={composeSubject}
              onChange={(e) => setComposeSubject(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Message</label>
            <textarea
              value={composeBody}
              onChange={(e) => setComposeBody(e.target.value)}
              rows={6}
              placeholder="Écrivez votre message…"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-3 focus:outline-none focus:border-red-600/60"
            />
            {composeAttachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {composeAttachments.map((file, i) => (
                  <span key={i} className="text-xs bg-surface-alt border border-line rounded-full px-3 py-1 flex items-center gap-2 text-ink-soft">
                    <Paperclip size={12} /> {file.name}
                    <button onClick={() => setComposeAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="text-ink-faint hover:text-red-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-2 cursor-pointer transition bg-surface-alt mb-4">
              <Paperclip size={13} /> Joindre un fichier
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setComposeAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])}
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setComposeOpen(false)}
                className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition"
              >
                Annuler
              </button>
              <button
                onClick={sendCompose}
                disabled={composeSending || !composeTo.trim() || !composeSubject.trim() || !composeBody.trim()}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl transition"
              >
                {composeSending ? "Envoi…" : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= REPLY MODAL ================= */}
      {replyTarget && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start sm:items-center justify-center overflow-y-auto p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-bold text-ink mb-1">Répondre sur le site</h3>
            <p className="text-xs text-ink-soft mb-4">
              Le message part immédiatement par e-mail à <span className="text-ink font-semibold">{replyTarget.to}</span>.
            </p>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Envoyer depuis</label>
            <select
              value={replyVia}
              onChange={(e) => setReplyVia(e.target.value as "gmail" | "resend")}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            >
              <option value="gmail">Mon Gmail (recommandé — arrive en boîte de réception, la réponse revient ici)</option>
              <option value="resend">Adresse BM Corporation (noreply@bmcorporation-cd.com)</option>
            </select>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Sujet</label>
            <input
              type="text"
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Message</label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              rows={6}
              placeholder="Écrivez votre réponse…"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-3 focus:outline-none focus:border-red-600/60"
            />
            {replyAttachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {replyAttachments.map((file, i) => (
                  <span key={i} className="text-xs bg-surface-alt border border-line rounded-full px-3 py-1 flex items-center gap-2 text-ink-soft">
                    <Paperclip size={12} /> {file.name}
                    <button onClick={() => setReplyAttachments((prev) => prev.filter((_, idx) => idx !== i))} className="text-ink-faint hover:text-red-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink border border-line rounded-lg px-3 py-2 cursor-pointer transition bg-surface-alt mb-4">
              <Paperclip size={13} /> Joindre un fichier
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setReplyAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])}
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReplyTarget(null)}
                className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition"
              >
                Annuler
              </button>
              <button
                onClick={sendReply}
                disabled={replySending || !replyMessage.trim()}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl transition"
              >
                {replySending ? "Envoi…" : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT ANNOUNCEMENT MODAL ================= */}
      {editingAnnouncement && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start sm:items-center justify-center overflow-y-auto p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2"><SquarePen size={18} /> Modifier l'annonce</h3>

            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Type</label>
            <select
              value={editAnnType}
              onChange={(e) => setEditAnnType(e.target.value as "normal" | "job")}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            >
              <option value="normal">Annonce normale (bouton "Voir le détail")</option>
              <option value="job">Offre d'emploi (bouton "Postuler")</option>
            </select>

            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Titre</label>
            <input
              type="text"
              value={editAnnTitle}
              onChange={(e) => setEditAnnTitle(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />

            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Description courte</label>
            <textarea
              value={editAnnDescription}
              onChange={(e) => setEditAnnDescription(e.target.value)}
              rows={2}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />

            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Détails complets</label>
            <textarea
              value={editAnnDetails}
              onChange={(e) => setEditAnnDetails(e.target.value)}
              rows={5}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-4 focus:outline-none focus:border-red-600/60"
            />

            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Durée de publication</label>
            <select
              value={editAnnDuration}
              onChange={(e) => setEditAnnDuration(e.target.value)}
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink mb-1 focus:outline-none focus:border-red-600/60"
            >
              <option value="">Ne pas changer</option>
              <option value="0">Illimitée (retirer l'expiration)</option>
              <option value="3">3 jours à partir d'aujourd'hui</option>
              <option value="7">7 jours à partir d'aujourd'hui</option>
              <option value="14">14 jours à partir d'aujourd'hui</option>
              <option value="30">30 jours à partir d'aujourd'hui</option>
              <option value="60">60 jours à partir d'aujourd'hui</option>
              <option value="90">90 jours à partir d'aujourd'hui</option>
              <option value="custom">Personnalisée…</option>
            </select>
            {editAnnDuration === "custom" && (
              <input
                type="number"
                min={1}
                value={editAnnDurationCustom}
                onChange={(e) => setEditAnnDurationCustom(e.target.value)}
                placeholder="Nombre de jours, à partir d'aujourd'hui"
                className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60 mt-2 mb-1"
              />
            )}
            <p className="text-xs text-ink-faint mb-4">
              {editingAnnouncement.expiresAt
                ? `Actuellement : ${editingAnnouncement.expiresAt > new Date().toISOString() ? "expire" : "expirée"} le ${new Date(editingAnnouncement.expiresAt).toLocaleDateString("fr-FR")}.`
                : "Actuellement : illimitée."}
            </p>

            <label className="inline-flex items-center gap-2 text-sm text-ink-soft cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={editAnnShowInTicker}
                onChange={(e) => setEditAnnShowInTicker(e.target.checked)}
                className="rounded border-line accent-red-600"
              />
              Afficher dans la bande défilante de la page d'accueil
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Nouvelle photo (optionnel)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditAnnImage(e.target.files?.[0] ?? null)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-xs text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-red-600 file:text-white file:font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Nouvelle vidéo (optionnel)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setEditAnnVideo(e.target.files?.[0] ?? null)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-xs text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-surface file:text-ink file:font-semibold"
                />
              </div>
            </div>
            <p className="text-xs text-ink-faint mb-4">Laissez vide pour garder la photo/vidéo actuelle.</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingAnnouncement(null)}
                className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition"
              >
                Annuler
              </button>
              <button
                onClick={updateAnnouncement}
                disabled={editAnnSubmitting || !editAnnTitle.trim() || !editAnnDescription.trim()}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl transition"
              >
                {editAnnSubmitting ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
