"use client";

import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { availableLanguages } from "@/content/curriculum";
import { getOtherProgramLabel, otherPrograms } from "@/content/programs";
import { getJaasAppId, getLiveRoomName, isJitsiConfigured } from "@/lib/academy/liveRooms";
import JitsiEmbed from "@/components/academy/JitsiEmbed";
import PasswordInput from "@/components/academy/PasswordInput";
import NotificationBell from "@/components/academy/NotificationBell";
import { generateCertificatePdf, getCertificatePreviewUrl } from "@/lib/academy/certificatePdf";

export const dynamic = "force-dynamic";

type Tab = "students" | "live" | "payments" | "announcements" | "applications" | "projects" | "devis" | "mail" | "requests" | "progress" | "certificates";

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

  // --- Live sessions ---
  const [liveSessions, setLiveSessions] = useState<any[]>([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [sessionLangCode, setSessionLangCode] = useState(availableLanguages[0].code);
  const [sessionLevel, setSessionLevel] = useState("1");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState("60");
  const [sessionTitle, setSessionTitle] = useState("");
  const [hostingSession, setHostingSession] = useState<{ langCode: string; level: number; title?: string } | null>(null);
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
  const [annImage, setAnnImage] = useState<File | null>(null);
  const [annVideo, setAnnVideo] = useState<File | null>(null);
  const [annSubmitting, setAnnSubmitting] = useState(false);

  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);
  const [editAnnTitle, setEditAnnTitle] = useState("");
  const [editAnnDescription, setEditAnnDescription] = useState("");
  const [editAnnType, setEditAnnType] = useState<"normal" | "job">("normal");
  const [editAnnDetails, setEditAnnDetails] = useState("");
  const [editAnnDuration, setEditAnnDuration] = useState("");
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
  const [progressLoading, setProgressLoading] = useState(false);

  // --- Certificates ---
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certificatesLoading, setCertificatesLoading] = useState(false);
  const [certGenerateOpen, setCertGenerateOpen] = useState(false);
  const [certName, setCertName] = useState("");
  const [certEmail, setCertEmail] = useState("");
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
  const [replySending, setReplySending] = useState(false);

  // --- Gmail inbox tab ---
  const [mailConfigured, setMailConfigured] = useState(false);
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
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [composeAttachments, setComposeAttachments] = useState<File[]>([]);
  const [composeSending, setComposeSending] = useState(false);
  const [mailFilter, setMailFilter] = useState<"all" | "unread" | "read">("all");
  const [mailSearch, setMailSearch] = useState("");

  // Rows come from two sources: the new `enrollments` collection (one doc
  // per uid+language — how every registration works since multi-language
  // accounts were added) and any `students/{uid}` doc that still carries
  // its langCode/level/status/matricule directly (accounts created before
  // that change, which never got an enrollments doc). Both are normalized
  // to the same shape so the existing stats/filter/list code below doesn't
  // need to know which source a row came from — only approve/reject branch
  // on `row.kind` to hit the matching API route.
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

  const fetchLiveSessions = async () => {
    setLiveLoading(true);
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
      setLiveLoading(false);
    }
  };

  const fetchPayments = async () => {
    setPaymentsLoading(true);
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
      setPaymentsLoading(false);
    }
  };

  const fetchAnnouncements = async () => {
    setAnnouncementsLoading(true);
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
      setAnnouncementsLoading(false);
    }
  };

  const createAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annDescription.trim()) {
      alert("Titre et description requis.");
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
      if (annDuration) form.append("durationDays", annDuration);
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
    setEditAnnSubmitting(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const form = new FormData();
      form.append("title", editAnnTitle);
      form.append("description", editAnnDescription);
      form.append("type", editAnnType);
      form.append("details", editAnnDetails);
      if (editAnnDuration) form.append("durationDays", editAnnDuration);
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

  const fetchJobApplications = async () => {
    setJobApplicationsLoading(true);
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
      setJobApplicationsLoading(false);
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

  const fetchProjectRequests = async () => {
    setProjectRequestsLoading(true);
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
      setProjectRequestsLoading(false);
    }
  };

  const fetchDevisRequests = async () => {
    setDevisRequestsLoading(true);
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
      setDevisRequestsLoading(false);
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

  const fetchProgress = async () => {
    setProgressLoading(true);
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
      setProgressLoading(false);
    }
  };

  const fetchCertificates = async () => {
    setCertificatesLoading(true);
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
      setCertificatesLoading(false);
    }
  };

  const generateCertificateManually = async () => {
    if (!certName.trim()) return;
    setCertSending(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const year = new Date().getFullYear();
      const certificateId = `BMCA-${certLangCode}-L${certLevel}-${year}-${Math.floor(Math.random() * 100000)}`;
      const average = Number(certAverage) || 0;
      const levelTitle = certLevelTitle.trim() || `${languageLabel(certLangCode)} — Niveau ${certLevel}`;

      generateCertificatePdf({ studentName: certName.trim(), levelTitle, average, certificateId });

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
          certificateId,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      setCertGenerateOpen(false);
      setCertName("");
      setCertEmail("");
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

  const openCertificatePreview = (opts: { studentName: string; levelTitle: string; average: number; certificateId: string }) => {
    if (certPreviewUrl) URL.revokeObjectURL(certPreviewUrl);
    setCertPreviewUrl(getCertificatePreviewUrl(opts));
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

  const fetchStudentRequests = async () => {
    setStudentRequestsLoading(true);
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
      setStudentRequestsLoading(false);
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
      replyAttachments.forEach((file) => form.append("attachments", file));

      const response = await fetch("/api/admin/send-reply", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur serveur");

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

  const fetchMailMessages = async () => {
    setMailLoading(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/gmail/messages", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json();
      if (response.ok) {
        setMailConfigured(Boolean(result.configured));
        setMailConnected(Boolean(result.connected));
        setMailMessages(result.messages || []);
      }
    } catch (error) {
      console.error("Error fetching Gmail messages:", error);
    } finally {
      setMailLoading(false);
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
      form.append("to", composeTo);
      form.append("subject", composeSubject);
      form.append("body", composeBody);
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
      if (mailSearch.trim()) {
        const q = mailSearch.trim().toLowerCase();
        const haystack = `${m.from} ${m.subject} ${m.snippet}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [mailMessages, mailFilter, mailSearch]);

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
    const validTabs: Tab[] = ["students", "live", "payments", "announcements", "applications", "projects", "devis", "mail", "requests", "progress", "certificates"];
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
          body: JSON.stringify({ idToken, langCode: hostingSession.langCode, level: hostingSession.level }),
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
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        await sendEmail(student.email, student.name, result.matricule, languageLabel(student.langCode), student.level, student.studyDays);
        alert("Approuvé + Email envoyé !");
      } catch (emailError) {
        console.error("EMAIL ERROR:", emailError);
        alert("Étudiant approuvé mais l'envoi de l'email a échoué.");
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

  const rejectStudent = async (student: any) => {
    if (processingIds.has(student.id)) return;

    if (student.status === "Approved") {
      const confirmed = confirm(
        `${student.name} est actuellement approuvé(e) et a accès à la plateforme. Révoquer son accès (ex. frais non payés) ?`
      );
      if (!confirmed) return;
    }

    setProcessingIds((prev) => new Set(prev).add(student.id));

    try {
      const idToken = await auth.currentUser?.getIdToken();
      const isEnrollment = student.kind === "enrollment";
      const response = await fetch(isEnrollment ? "/api/admin/reject-enrollment" : "/api/admin/reject-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEnrollment ? { idToken, enrollmentId: student.id } : { idToken, studentId: student.id }),
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
          level: sessionLevel,
          scheduledAt,
          durationMinutes: sessionDuration,
          title: sessionTitle,
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Erreur serveur");

      setSessionDate("");
      setSessionTime("");
      setSessionTitle("");
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
      else if (s.status === "Rejected") rejected++;
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
    <main className="p-6 md:p-10 min-h-screen bg-surface-sunken text-ink font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black tracking-tight text-ink">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <NotificationBell scope="admin" />
            <button
              onClick={() => refreshTab(tab)}
              className="flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink border border-line hover:border-red-600/50 px-4 py-2 rounded-xl transition-all duration-200 bg-surface"
            >
              <RefreshCw size={15} /> Actualiser
            </button>
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-white hover:bg-red-600 border border-red-900/50 hover:border-red-600 px-4 py-2 rounded-xl transition-all duration-200 bg-red-950/30"
            >
              <LogOut size={15} /> Déconnexion
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 border-b border-line flex-wrap">
          {([
            { id: "students", label: "Étudiants", badge: stats.pending },
            { id: "live", label: "Cours en direct", badge: 0 },
            { id: "payments", label: "Paiements", badge: 0 },
            { id: "announcements", label: "Publicité", badge: 0 },
            { id: "applications", label: "Candidatures", badge: jobApplications.filter((a) => a.status === "new").length },
            { id: "projects", label: "Projets", badge: projectRequests.filter((r) => r.status === "new").length },
            { id: "devis", label: "Devis", badge: devisRequests.filter((r) => r.status === "new").length },
            { id: "mail", label: "Mail", badge: mailMessages.filter((m) => m.unread).length },
            { id: "requests", label: "Messages Étudiants", badge: studentRequests.filter((r) => r.status === "new").length },
            { id: "progress", label: "Progression", badge: 0 },
            { id: "certificates", label: "Certificats", badge: 0 },
          ] as { id: Tab; label: string; badge: number }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-bold transition border-b-2 -mb-px inline-flex items-center gap-1.5 ${
                tab === t.id
                  ? "border-red-600 text-red-500"
                  : "border-transparent text-ink-soft hover:text-ink"
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

        {/* ================= STUDENTS TAB ================= */}
        {tab === "students" && (
          <div>
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

            <div className="mb-6">
              <button
                onClick={() => setMessageOpen(true)}
                className="glow-accent bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center gap-2"
              >
                <Mail size={15} /> Message aux étudiants
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
                    {s.status === "Approved" ? "Approuvé" : s.status === "Rejected" ? "Rejeté" : "En attente"}
                  </p>
                  <p className="text-ink"><b className="text-ink">Matricule :</b> {s.matricule || "-"}</p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={() => approveStudent(s)}
                      disabled={processingIds.has(s.id) || s.status === "Approved" || s.status === "Rejected"}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {processingIds.has(s.id) ? "Traitement..." : "Approuver"}
                    </button>

                    {s.status === "Approved" ? (
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
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Langue</label>
                <select
                  value={sessionLangCode}
                  onChange={(e) => setSessionLangCode(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                >
                  {availableLanguages.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-ink-soft mb-1.5">Niveau</label>
                <select
                  value={sessionLevel}
                  onChange={(e) => setSessionLevel(e.target.value)}
                  className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-red-600/60"
                >
                  <option value="1">Niveau 1</option>
                  <option value="2">Niveau 2</option>
                  <option value="3">Niveau 3</option>
                </select>
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
                        </p>
                      </div>
                      <div className="flex items-center gap-4 self-start sm:self-center">
                        <button
                          onClick={() => setHostingSession({ langCode: session.langCode || "EN", level: session.level, title: session.title })}
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
                <div className="flex items-center justify-between mb-4">
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
                    onClick={() => setHostingSession(null)}
                    className="bg-surface-alt hover:bg-surface text-ink-soft font-bold px-4 py-2 rounded-xl border border-line transition whitespace-nowrap"
                  >
                    Quitter
                  </button>
                </div>

                {hostingTokenError ? (
                  <div className="p-6 rounded-2xl border border-line bg-surface-sunken text-ink-soft text-center">
                    {hostingTokenError}
                  </div>
                ) : isJitsiConfigured() && getJaasAppId() && hostingToken ? (
                  <JitsiEmbed
                    appId={getJaasAppId()!}
                    roomName={getLiveRoomName(hostingSession.langCode, hostingSession.level)}
                    displayName="Enseignant — BM Academy"
                    jwt={hostingToken}
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
                      <th className="py-2 pr-4">Matricule</th>
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
                </select>
                <p className="text-xs text-ink-faint mt-1">L'annonce se masque automatiquement du site public à la fin de cette durée.</p>
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
                        {a.expiresAt && (
                          <p className="text-xs text-ink-faint mt-1">
                            {a.expiresAt > new Date().toISOString()
                              ? `Expire le ${new Date(a.expiresAt).toLocaleDateString("fr-FR")}`
                              : `Expirée le ${new Date(a.expiresAt).toLocaleDateString("fr-FR")}`}
                          </p>
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
                    <p className="text-xs text-ink-faint mt-3 flex items-center gap-1.5">
                      <Mail size={12} /> Fichiers envoyés par email à l'administration
                      {app.attachmentNames?.length ? ` — ${app.attachmentNames.join(", ")}` : ""}
                    </p>
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
                      <th className="py-2 pr-4">Leçons terminées</th>
                      <th className="py-2 pr-4">Quiz final</th>
                      <th className="py-2 pr-4">Certificat</th>
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
            <div className="flex items-center justify-between mb-6">
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
                        <div className="grid grid-cols-2 gap-3">
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
                            <p className="text-xs text-ink-faint font-mono mt-1">{cert.certificateId}</p>
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
              <div className="p-3 mb-6 bg-surface border border-line rounded-xl text-sm text-ink flex items-center justify-between">
                {mailNotice}
                <button onClick={() => setMailNotice(null)} className="text-ink-faint hover:text-ink ml-4"><X size={15} /></button>
              </div>
            )}

            {!mailConfigured ? (
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
                <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-surface-alt/50">
                  <div>
                    <p className="font-black text-ink flex items-center gap-2"><Inbox size={16} /> brightenedmindcorporation@gmail.com</p>
                    <p className="text-xs text-ink-soft mt-0.5">
                      {mailMessages.filter((m) => m.unread).length} non lu(s) · {mailMessages.length} affiché(s)
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
                      <input
                        type="text"
                        value={mailSearch}
                        onChange={(e) => setMailSearch(e.target.value)}
                        placeholder="Rechercher par expéditeur, sujet…"
                        className="w-full bg-surface-alt border border-line rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-red-600/60"
                      />
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
                        const { name } = parseFromHeader(m.from);
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
                                {m.unread && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
                              </span>
                              <span className={`block text-sm truncate ${m.unread ? "font-bold text-ink" : "text-ink-soft"}`}>{m.subject}</span>
                              <span className="block text-xs text-ink-faint truncate mt-0.5">{m.snippet}</span>
                            </span>
                          </button>
                        );
                      })
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
                          <div className="flex items-center gap-2">
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

                        <div className="mt-6 pt-4 border-t border-line">
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
        <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-2xl p-4 w-full max-w-4xl shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-ink">Aperçu du certificat</p>
              <button onClick={closeCertificatePreview} className="text-ink-soft hover:text-ink"><X size={18} /></button>
            </div>
            <iframe src={certPreviewUrl} title="Aperçu du certificat" className="w-full rounded-xl border border-line" style={{ aspectRatio: "297 / 210" }} />
          </div>
        </div>
      )}

      {/* ================= GENERATE CERTIFICATE MODAL ================= */}
      {certGenerateOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
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
            <div className="grid grid-cols-2 gap-3 mb-4">
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
                    certificateId: "APERÇU",
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

      {/* ================= MESSAGE TO STUDENTS MODAL ================= */}
      {messageOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
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

      {/* ================= COMPOSE MODAL ================= */}
      {composeOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2"><SquarePen size={18} /> Nouveau message</h3>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">À</label>
            <input
              type="email"
              value={composeTo}
              onChange={(e) => setComposeTo(e.target.value)}
              placeholder="destinataire@email.com"
              className="w-full bg-surface-alt border border-line rounded-xl px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint mb-4 focus:outline-none focus:border-red-600/60"
            />
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
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-surface border border-line rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-bold text-ink mb-1">Répondre sur le site</h3>
            <p className="text-xs text-ink-soft mb-4">
              Le message part immédiatement par email à <span className="text-ink font-semibold">{replyTarget.to}</span>, depuis l'adresse centrale BM Corporation.
            </p>
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
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
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
            </select>
            <p className="text-xs text-ink-faint mb-4">
              {editingAnnouncement.expiresAt
                ? `Actuellement : ${editingAnnouncement.expiresAt > new Date().toISOString() ? "expire" : "expirée"} le ${new Date(editingAnnouncement.expiresAt).toLocaleDateString("fr-FR")}.`
                : "Actuellement : illimitée."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
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
