"use client";

import React, { useEffect } from "react";
import Script from "next/script";

export default function BmLearningPage() {
  useEffect(() => {
    // Initialisation globale au chargement de la page
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      {/* Scripts externes nécessaires au fonctionnement de l'application */}
      <Script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" onLoad={() => {
        if (window.lucide) window.lucide.createIcons();
      }} />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap');

        .font-serif-luxury {
          font-family: 'Cinzel', serif;
        }

        .glass-card {
          background: rgba(22, 24, 31, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 30, 39, 0.15);
        }
        
        .glow-red {
          box-shadow: 0 0 25px -5px rgba(255, 30, 39, 0.35);
        }

        .pulse-glow {
          animation: pulseGlow 2.5s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(255, 30, 39, 0.4); }
          50% { box-shadow: 0 0 30px rgba(255, 30, 39, 0.8); }
        }

        @media print {
          body * { visibility: hidden; }
          #certificateCard, #certificateCard * { visibility: visible; }
          #certificateCard {
            position: fixed; left: 0; top: 0; width: 100vw; height: 100vh;
            margin: 0; padding: 40px; background: white !important;
            color: black !important; box-shadow: none !important;
            border: 12px double #8b0000 !important;
          }
          .no-print { display: none !important; }
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0B0C10; }
        ::-webkit-scrollbar-thumb { background: #272B36; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #FF1E27; }
      `}</style>

      <div className="bg-[#0B0C10] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-[#FF1E27] selection:text-white">
        
        {/* BANDEAU ANNONCE OFFICIELLE DE LA DIRECTION */}
        <div id="globalAnnouncementBanner" className="hidden bg-gradient-to-r from-red-950 via-[#FF1E27] to-red-950 text-white px-4 py-2.5 text-xs font-semibold border-b border-red-500/40 shadow-lg relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-black/40 text-yellow-300 font-black tracking-wider uppercase text-[10px] flex items-center gap-1">
                <i data-lucide="megaphone" className="w-3 h-3 text-yellow-300"></i> ANNONCE OFFICIELLE
              </span>
              <span id="globalAnnouncementText" className="text-white text-xs font-medium">Bienvenue sur Brightened Mind Corporation.</span>
            </div>
            <button onClick={() => {
              const banner = document.getElementById('globalAnnouncementBanner');
              if (banner) banner.classList.add('hidden');
            }} className="text-white/80 hover:text-white p-1" title="Fermer l'annonce">
              <i data-lucide="x" className="w-4 h-4"></i>
            </button>
          </div>
        </div>

        {/* Header / Navigation Interne */}
        <header className="sticky top-0 z-40 bg-[#0B0C10]/90 backdrop-blur-md border-b border-[#272B36]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            {/* Logo avec déclencheur secret */}
            <div 
              id="brandClickSecretTrigger" 
              className="flex items-center gap-3 cursor-pointer select-none group" 
              title="Brightened Mind Corporation (Cliquez 5 fois pour ouvrir le portail enseignant)"
              onClick={() => {
                if (!(window as any)._brandClickCount) (window as any)._brandClickCount = 0;
                (window as any)._brandClickCount++;
                if ((window as any)._brandClickCount >= 5) {
                  (window as any)._brandClickCount = 0;
                  const staffModal = document.getElementById('staffModal');
                  if (staffModal) staffModal.classList.remove('hidden');
                  if (window.lucide) window.lucide.createIcons();
                }
                setTimeout(() => { (window as any)._brandClickCount = 0; }, 3500);
              }}
            >
              <div className="relative w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-105 duration-300 rounded-lg overflow-hidden bg-black flex items-center justify-center border border-[#272B36]/60">
                <img 
                  src="/logo-bm.png" 
                  alt="Logo Brightened Mind Corporation" 
                  className="w-full h-full object-contain"
                  onError={(e: any) => {
                    e.target.onerror = null; 
                    e.target.parentElement.innerHTML = '<div class="text-[#FF1E27] font-black text-xl">CBM</div>';
                  }}
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  Brightened Mind <span className="text-[#FF1E27] text-sm font-semibold px-2 py-0.5 rounded bg-[#FF1E27]/10 border border-[#FF1E27]/20">Corp</span>
                </span>
                <p className="text-xs text-gray-400 font-medium tracking-wide">Language Training & Global Excellence</p>
              </div>
            </div>

            {/* Public / Student Navigation */}
            <nav id="studentNav" className="hidden md:flex items-center gap-1">
              <button onClick={() => (window as any).router?.navigate('home')} className="nav-btn px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#16181F] transition-all flex items-center gap-2">
                <i data-lucide="home" className="w-4 h-4"></i> Accueil
              </button>
              <button id="navDashboardBtn" onClick={() => (window as any).router?.navigate('dashboard')} className="hidden nav-btn px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#16181F] transition-all flex items-center gap-2">
                <i data-lucide="layout-dashboard" className="w-4 h-4"></i> Mon Espace
              </button>
              <button id="navLiveClassBtn" onClick={() => (window as any).router?.navigate('live-class')} className="hidden nav-btn px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#16181F] transition-all flex items-center gap-2">
                <span id="navLiveStatusDot" className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
                </span>
                Cours en Direct
              </button>
              <button id="navQuizBtn" onClick={() => (window as any).router?.navigate('quiz')} className="hidden nav-btn px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#16181F] transition-all flex items-center gap-2">
                <i data-lucide="award" className="w-4 h-4"></i> Évaluations & Certificat
              </button>
            </nav>

            {/* Auth & Actions */}
            <div className="flex items-center gap-3">
              <button onClick={() => {
                const modal = document.getElementById('staffModal');
                if (modal) modal.classList.remove('hidden');
                if (window.lucide) window.lucide.createIcons();
              }} title="Accès Sécurisé Enseignants / Direction" className="p-2.5 rounded-lg text-gray-500 hover:text-[#FF1E27] hover:bg-[#16181F] transition-colors">
                <i data-lucide="shield-alert" className="w-4 h-4"></i>
              </button>

              <div id="authHeaderAnonymous" className="flex items-center gap-2">
                <button onClick={() => (window as any).router?.navigate('login')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#16181F] rounded-lg transition-colors">
                  Se Connecter
                </button>
                <button onClick={() => (window as any).router?.navigate('register')} className="px-4 py-2 text-sm font-semibold text-white bg-[#FF1E27] hover:bg-[#E0121B] rounded-lg shadow-lg shadow-[#FF1E27]/30 transition-all transform active:scale-95">
                  S'Inscrire
                </button>
              </div>

              <div id="authHeaderUser" className="hidden flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div id="headerUserName" className="text-sm font-bold text-white leading-tight">Étudiant</div>
                  <div id="headerUserLevel" className="text-xs text-[#FF1E27] font-medium">Niveau 1</div>
                </div>
                <button onClick={() => (window as any).logout?.()} className="p-2 rounded-lg bg-[#16181F] hover:bg-red-500/20 hover:text-red-400 border border-[#272B36] text-gray-400 transition-colors" title="Déconnexion">
                  <i data-lucide="log-out" className="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Notifications Toast */}
        <div id="toastContainer" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"></div>

        {/* Modal Générique */}
        <div id="genericModal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm hidden">
          <div className="glass-card max-w-md w-full mx-4 p-6 rounded-2xl border border-[#272B36] text-center">
            <div id="modalIconContainer" className="w-14 h-14 mx-auto rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27] mb-4">
              <i id="modalIcon" data-lucide="info" className="w-7 h-7"></i>
            </div>
            <h3 id="modalTitle" className="text-xl font-bold text-white mb-2">Notification</h3>
            <p id="modalMessage" className="text-gray-300 text-sm mb-6 leading-relaxed">Message</p>
            <div id="modalActions" className="flex items-center justify-center gap-3">
              <button id="modalBtnOk" onClick={() => {
                const modal = document.getElementById('genericModal');
                if (modal) modal.classList.add('hidden');
              }} className="w-full py-2.5 px-4 bg-[#FF1E27] hover:bg-[#E0121B] text-white font-medium rounded-xl transition-colors">
                Compris
              </button>
            </div>
          </div>
        </div>

        {/* SECRET STAFF MODAL */}
        <div id="staffModal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md hidden">
          <div className="glass-card max-w-md w-full mx-4 p-8 rounded-2xl border border-[#FF1E27]/40 shadow-2xl relative">
            <button onClick={() => {
              const modal = document.getElementById('staffModal');
              if (modal) modal.classList.add('hidden');
            }} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg">
              <i data-lucide="x" className="w-5 h-5"></i>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-950/60 border border-[#FF1E27]/50 text-[#FF1E27] rounded-2xl flex items-center justify-center mx-auto mb-3 pulse-glow">
                <i data-lucide="lock-keyhole" className="w-8 h-8"></i>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Accès Privé Staff & Enseignants</h3>
              <p className="text-xs text-gray-400 mt-1">Espace confidentiel de contrôle pédagogique</p>
            </div>

            <form id="staffLoginForm" onSubmit={(e) => {
              e.preventDefault();
              const username = (document.getElementById('staffUsername') as HTMLInputElement)?.value.trim();
              const password = (document.getElementById('staffPassword') as HTMLInputElement)?.value.trim();

              if (username === 'adminbmlog' && password === 'adminbm26bmlog') {
                (window as any).isStaffAuthenticated = true;
                (window as any).staffRole = 'admin';
                document.getElementById('staffModal')?.classList.add('hidden');
                (window as any).showToast?.("Accès Direction Accordé", "success");
                (window as any).router?.navigate('admin');
                (window as any).setAdminTab?.('students');
              } else if (username === 'profbmlog' && password === 'profbm26bmlog') {
                (window as any).isStaffAuthenticated = true;
                (window as any).staffRole = 'professeur';
                document.getElementById('staffModal')?.classList.add('hidden');
                (window as any).showToast?.("Accès Enseignant Accordé", "success");
                (window as any).router?.navigate('admin');
                (window as any).setAdminTab?.('teacher');
              } else {
                (window as any).showToast?.("Identifiant ou code secret incorrect", "error");
              }
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Identifiant d'habilitation</label>
                <div className="relative">
                  <i data-lucide="user-check" className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400"></i>
                  <input id="staffUsername" type="text" required placeholder="Identifiant" className="w-full bg-[#0B0C10]/90 border border-[#272B36] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27] transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Code Secret de Sécurité</label>
                <div className="relative">
                  <i data-lucide="key-round" className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400"></i>
                  <input id="staffPassword" type="password" required placeholder="••••••••" className="w-full bg-[#0B0C10]/90 border border-[#272B36] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27] transition-all" />
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-[#FF1E27] hover:bg-[#E0121B] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#FF1E27]/40 flex items-center justify-center gap-2 mt-4">
                <i data-lucide="shield-check" className="w-4 h-4"></i> Déverrouiller le portail
              </button>
            </form>
          </div>
        </div>

        {/* MAIN CONTAINER */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

          {/* VIEW 1: HOME / LANDING */}
          <section id="view-home" className="spa-view space-y-16 py-6">
            <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-14 border border-[#272B36] glow-red">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0B0C10]/90 to-transparent pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/30 text-[#FF1E27] text-xs font-semibold uppercase tracking-widest">
                  <i data-lucide="sparkles" className="w-3.5 h-3.5"></i> Brightened Mind Corporation
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
                  Maîtrisez les Langues. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E27] to-red-400">Ouvrez le Monde.</span>
                </h1>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Formation intensive bilingue en direct avec nos professeurs qualifiés. Approbation sécurisée des comptes, suivi du paiement, salle live interactive et certificat officiel.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button onClick={() => (window as any).router?.navigate('register')} className="px-7 py-3.5 rounded-xl bg-[#FF1E27] hover:bg-[#E0121B] text-white font-bold transition-all shadow-lg shadow-[#FF1E27]/30 flex items-center gap-2 text-base">
                    Rejoindre la formation <i data-lucide="arrow-right" className="w-5 h-5"></i>
                  </button>
                  <button onClick={() => (window as any).router?.navigate('login')} className="px-7 py-3.5 rounded-xl bg-[#16181F] hover:bg-[#272B36] text-gray-200 font-semibold border border-[#272B36] transition-all">
                    Espace Membre
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-[#272B36] hover:border-[#FF1E27]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/20 text-[#FF1E27] flex items-center justify-center mb-4">
                  <i data-lucide="video" className="w-6 h-6"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Cours Directs Contrôlés</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Les cours ne débutent que quand l'enseignant lance le live depuis son studio sécurisé.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-[#272B36] hover:border-[#FF1E27]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/20 text-[#FF1E27] flex items-center justify-center mb-4">
                  <i data-lucide="layers" className="w-6 h-6"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Parcours 3 Niveaux & Quiz</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Débutant, Intermédiaire et Avancé avec quiz par palier et examen global final pour le certificat.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-[#272B36] hover:border-[#FF1E27]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/20 text-[#FF1E27] flex items-center justify-center mb-4">
                  <i data-lucide="credit-card" className="w-6 h-6"></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Validation des Récépissés</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Paiement en ligne ou par référence bancaire et Mobile Money avec vérification manuelle par l'administration.</p>
              </div>
            </div>
          </section>

          {/* VIEW 2: REGISTER & PAYMENT STEP */}
          <section id="view-register" className="spa-view hidden max-w-2xl mx-auto py-4">
            <div className="glass-card rounded-2xl p-6 sm:p-10 border border-[#272B36] shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white">Inscription & Choix de Formation</h2>
                <p className="text-gray-400 text-sm mt-1">Créez votre compte étudiant pour Brightened Mind Corporation</p>
              </div>

              <form id="registrationForm" onSubmit={(e) => (window as any).handleRegistration?.(e)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Prénom *</label>
                    <input id="regFirstName" type="text" required placeholder="Ex: Jean" className="w-full bg-[#0B0C10]/80 border border-[#272B36] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Nom *</label>
                    <input id="regLastName" type="text" required placeholder="Ex: Dupont" className="w-full bg-[#0B0C10]/80 border border-[#272B36] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Adresse Email *</label>
                    <input id="regEmail" type="email" required placeholder="jean.dupont@email.com" className="w-full bg-[#0B0C10]/80 border border-[#272B36] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Numéro Téléphone / WhatsApp *</label>
                    <input id="regPhone" type="tel" required placeholder="+243 / +225 00 00 00 00" className="w-full bg-[#0B0C10]/80 border border-[#272B36] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Niveau Visé</label>
                  <select id="regLevel" className="w-full bg-[#0B0C10]/80 border border-[#272B36] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27]">
                    <option value="1">Niveau 1 : Débutant (Foundations & Daily Conversation)</option>
                    <option value="2">Niveau 2 : Intermédiaire (Fluency & Professional)</option>
                    <option value="3">Niveau 3 : Avancé (Mastery, Debate & Business Accent)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Mot de Passe *</label>
                  <input id="regPassword" type="password" required placeholder="Au moins 6 caractères" className="w-full bg-[#0B0C10]/80 border border-[#272B36] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27]" />
                </div>

                <div className="pt-4 border-t border-[#272B36]/60">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i data-lucide="wallet" className="w-4 h-4 text-[#FF1E27]"></i> Règlement des frais de formation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <label className="payment-opt cursor-pointer p-4 rounded-xl border border-[#272B36] bg-[#0B0C10]/60 hover:border-[#FF1E27]/50 flex flex-col gap-2 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-white flex items-center gap-2">
                          <input type="radio" name="paymentMode" value="online" defaultChecked onChange={() => (window as any).togglePaymentInputs?.()} className="text-[#FF1E27] focus:ring-[#FF1E27]" />
                          Paiement En Ligne
                        </span>
                        <i data-lucide="credit-card" className="w-4 h-4 text-[#FF1E27]"></i>
                      </div>
                      <p className="text-xs text-gray-400">Carte Bancaire ou Mobile Money instantané.</p>
                    </label>

                    <label className="payment-opt cursor-pointer p-4 rounded-xl border border-[#272B36] bg-[#0B0C10]/60 hover:border-[#FF1E27]/50 flex flex-col gap-2 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-white flex items-center gap-2">
                          <input type="radio" name="paymentMode" value="reference" onChange={() => (window as any).togglePaymentInputs?.()} className="text-[#FF1E27] focus:ring-[#FF1E27]" />
                          Référence de Paiement
                        </span>
                        <i data-lucide="receipt" className="w-4 h-4 text-[#FF1E27]"></i>
                      </div>
                      <p className="text-xs text-gray-400">Dépôt guichet banque ou transfert téléphone (Mobile Money).</p>
                    </label>
                  </div>

                  <div id="onlinePaymentSubBox" className="p-4 rounded-xl bg-[#0B0C10]/90 border border-[#272B36] space-y-3">
                    <label className="block text-xs text-gray-400">Sélectionnez la passerelle disponible :</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg border border-[#272B36] bg-[#16181F] text-center font-medium hover:border-[#FF1E27] cursor-pointer">Mobile Money</div>
                      <div className="p-2.5 rounded-lg border border-[#272B36] bg-[#16181F] text-center font-medium hover:border-[#FF1E27] cursor-pointer">Airtel / M-Pesa</div>
                      <div className="p-2.5 rounded-lg border border-[#272B36] bg-[#16181F] text-center font-medium hover:border-[#FF1E27] cursor-pointer">Orange Money</div>
                      <div className="p-2.5 rounded-lg border border-[#272B36] bg-[#16181F] text-center font-medium hover:border-[#FF1E27] cursor-pointer">Carte Visa/Master</div>
                    </div>
                  </div>

                  <div id="referencePaymentSubBox" className="hidden p-4 rounded-xl bg-[#0B0C10]/90 border border-[#272B36] space-y-4">
                    <div className="bg-[#FF1E27]/10 border border-[#FF1E27]/30 p-3 rounded-lg text-xs text-gray-300">
                      <span className="font-bold text-[#FF1E27]">Coordonnées de l'entreprise CBM :</span><br />
                      • <strong>Compte Bancaire :</strong> Rawbank / EquityBCDC / Ecobank (Brightened Mind Corp)<br />
                      • <strong>Mobile Money officiel :</strong> M-Pesa / Orange / Airtel Money
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Mode de transaction utilisé *</label>
                      <select id="regRefType" className="w-full bg-[#16181F] border border-[#272B36] rounded-lg px-3 py-2 text-sm text-white">
                        <option value="Mobile Money (Airtel, Orange, M-Pesa, Wave, MTN)">Transfert par Téléphone (Mobile Money)</option>
                        <option value="Bordereau / Virement Bancaire">Dépôt physique au guichet bancaire / Virement</option>
                        <option value="Versement Espèces Agence">Paiement physique direct au bureau CBM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Référence du paiement (N° de transaction ou bordereau) *</label>
                      <input id="regRefCode" type="text" placeholder="Ex: TXN-8930491823 ou BORD-77291" className="w-full bg-[#16181F] border border-[#272B36] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF1E27]" />
                      <span className="text-[11px] text-gray-400 mt-1 block">L'administrateur vérifiera cette référence avant d'activer votre compte.</span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#FF1E27] hover:bg-[#E0121B] text-white font-bold transition-all shadow-lg shadow-[#FF1E27]/30 flex items-center justify-center gap-2 text-base">
                  <i data-lucide="check-circle" className="w-5 h-5"></i> Valider mon Inscription
                </button>

                <div className="text-center">
                  <span className="text-xs text-gray-400">Vous avez déjà un compte ?</span>
                  <button type="button" onClick={() => (window as any).router?.navigate('login')} className="text-xs text-[#FF1E27] hover:underline ml-1 font-semibold">
                    Connectez-vous ici
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* VIEW 3: STUDENT LOGIN */}
          <section id="view-login" className="spa-view hidden max-w-md mx-auto py-8">
            <div className="glass-card rounded-2xl p-8 border border-[#272B36] shadow-xl">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-[#FF1E27]/10 border border-[#FF1E27]/30 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#FF1E27]">
                  <i data-lucide="user" className="w-7 h-7"></i>
                </div>
                <h2 className="text-2xl font-bold text-white">Connexion Étudiant</h2>
                <p className="text-xs text-gray-400 mt-1">Accédez à votre espace d'apprentissage</p>
              </div>

              <form id="studentLoginForm" onSubmit={(e) => (window as any).handleStudentLogin?.(e)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Adresse Email</label>
                  <div className="relative">
                    <i data-lucide="mail" className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400"></i>
                    <input id="loginEmail" type="email" required placeholder="nom@exemple.com" className="w-full bg-[#0B0C10]/90 border border-[#272B36] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Mot de Passe</label>
                  <div className="relative">
                    <i data-lucide="key" className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400"></i>
                    <input id="loginPassword" type="password" required placeholder="••••••••" className="w-full bg-[#0B0C10]/90 border border-[#272B36] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1E27]" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3 rounded-xl bg-[#FF1E27] hover:bg-[#E0121B] text-white font-bold transition-all shadow-lg shadow-[#FF1E27]/30 flex items-center justify-center gap-2">
                  <i data-lucide="log-in" className="w-4 h-4"></i> Accéder à Mon Espace
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-[#272B36]/60 text-center space-y-2">
                <p className="text-xs text-gray-400">Pas encore inscrit ?</p>
                <button onClick={() => (window as any).router?.navigate('register')} className="text-sm text-[#FF1E27] hover:underline font-semibold">
                  Créer un compte maintenant
                </button>
              </div>
            </div>
          </section>

          {/* VIEW 4: STUDENT DASHBOARD */}
          <section id="view-dashboard" className="spa-view hidden space-y-8">
            <div id="dashApprovalAlert" className="hidden p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div id="dashApprovalIcon" className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"></div>
                <div>
                  <h4 id="dashApprovalTitle" className="text-base font-bold text-white">Statut du Compte</h4>
                  <p id="dashApprovalText" className="text-xs text-gray-300">Description du statut</p>
                </div>
              </div>
              <div id="dashApprovalAction"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-[#272B36]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF1E27]/20 border border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27] font-bold text-xl">
                    <span id="dashAvatarInitials">ST</span>
                  </div>
                  <div>
                    <h3 id="dashFullName" className="text-lg font-bold text-white leading-tight">Prénom Nom</h3>
                    <p id="dashEmail" className="text-xs text-gray-400">email@exemple.com</p>
                    <p id="dashPhone" className="text-xs text-gray-400">+243 00000000</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#272B36]/60 flex items-center justify-between text-xs">
                  <span className="text-gray-400">ID Étudiant :</span>
                  <span id="dashStudentID" className="font-mono text-gray-300 font-bold">#BM-0000</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-[#272B36]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Niveau Actuel</span>
                  <span id="dashLevelBadge" className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FF1E27]/20 text-[#FF1E27] border border-[#FF1E27]/30">Niveau 1</span>
                </div>
                <div id="dashLevelTitle" className="text-xl font-bold text-white mb-2">Débutant (Beginner)</div>
                <p className="text-xs text-gray-400 mb-4">Progression linguistique par immersion et validation par paliers.</p>
                <div className="w-full bg-[#0B0C10] rounded-full h-2 overflow-hidden border border-[#272B36]">
                  <div id="dashLevelProgress" className="bg-[#FF1E27] h-full rounded-full transition-all duration-500" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-[#272B36]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Statut Financier</span>
                  <span id="dashPaymentBadge" className="px-2.5 py-1 rounded-full text-xs font-bold">Vérifié</span>
                </div>
                <div id="dashPaymentTitle" className="text-xl font-bold text-white mb-1">Règlement Validé</div>
                <p id="dashPaymentDetail" className="text-xs text-gray-400 mb-4">Référence : TXN-0000</p>
                <div className="p-3 rounded-xl bg-[#0B0C10]/70 border border-[#272B36] text-xs flex items-center justify-between">
                  <span className="text-gray-400">Accès Live & Quiz :</span>
                  <span id="dashAccessStatus" className="font-semibold text-green-400 flex items-center gap-1">
                    <i data-lucide="check" className="w-3.5 h-3.5"></i> Actif
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#272B36] flex flex-col justify-between hover:border-[#FF1E27]/30 transition-all">
                <div>
                  <div id="dashLiveStatusChip" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs font-bold mb-4">
                    <span className="w-2 h-2 rounded-full bg-gray-500"></span> Cours En Attente du Professeur
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Salle de Cours en Direct</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Rejoignez la salle interactive. Si le professeur a démarré la session, le flux vidéo et audio sera immédiatement disponible.
                  </p>
                </div>
                <button onClick={() => (window as any).router?.navigate('live-class')} className="w-full py-3.5 bg-[#FF1E27] hover:bg-[#E0121B] text-white font-bold rounded-xl shadow-lg shadow-[#FF1E27]/30 flex items-center justify-center gap-2 transition-all">
                  <i data-lucide="video" className="w-5 h-5"></i> Accéder à la Salle de Cours
                </button>
              </div>

              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#272B36] flex flex-col justify-between hover:border-[#FF1E27]/30 transition-all">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-bold mb-4">
                    <i data-lucide="award" className="w-3.5 h-3.5"></i> Évaluations
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Quiz & Certificat Officiel</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Validez les Niveaux 1, 2 et 3 puis terminez par le Quiz Global pour obtenir le certificat officiel délivré par Brightened Mind Corporation.
                  </p>
                </div>
                <button onClick={() => (window as any).router?.navigate('quiz')} className="w-full py-3.5 bg-[#16181F] hover:bg-[#272B36] text-white border border-[#272B36] font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                  <i data-lucide="file-check-2" className="w-5 h-5"></i> Accéder aux Quiz
                </button>
              </div>
            </div>
          </section>

          {/* VIEW 5: LIVE AUDIO / VIDEO CLASSROOM */}
          <section id="view-live-class" className="spa-view hidden space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-extrabold text-white">Salle de Cours Multimédia</h2>
                  <span id="liveRoomBadge" className="px-2.5 py-0.5 rounded-full bg-gray-500/20 text-gray-400 text-xs font-bold border border-gray-500/40 flex items-center gap-1">
                    <span id="liveRoomIndicator" className="w-2 h-2 rounded-full bg-gray-500"></span> 
                    <span id="liveRoomStatusText">HORS LIGNE</span>
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Brightened Mind Corporation • Session d'apprentissage bilingue</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#16181F] px-3 py-1.5 rounded-lg border border-[#272B36]">
                  <i data-lucide="timer" className="w-4 h-4 text-[#FF1E27]"></i>
                  <span id="liveClock" className="text-xs font-mono text-gray-200 font-bold">00:00:00</span>
                </div>
                <button onClick={() => (window as any).toggleWhiteboard?.()} className="px-4 py-2 rounded-lg bg-[#16181F] hover:bg-[#272B36] border border-[#272B36] text-xs font-medium text-gray-200 flex items-center gap-1.5">
                  <i data-lucide="pen-tool" className="w-4 h-4 text-[#FF1E27]"></i> Tableau Blanc
                </button>
              </div>
            </div>

            <div id="teacherLiveDirectBar" className="hidden glass-card p-4 rounded-2xl border border-[#FF1E27]/40 bg-red-950/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#FF1E27] animate-ping"></span>
                <span className="text-xs font-bold text-white">RÉGIE DIRECT ENSEIGNANT</span>
              </div>
              <div className="flex items-center gap-3">
                <button id="btnHostStartLive" onClick={() => (window as any).teacherStartLiveBroadcast?.()} className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <i data-lucide="play" className="w-4 h-4"></i> DÉMARRER LE LIVE
                </button>
                <button id="btnHostStopLive" onClick={() => (window as any).teacherStopLiveBroadcast?.()} className="hidden px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <i data-lucide="square" className="w-4 h-4"></i> ARRÊTER LE LIVE
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-4">
                <div className="relative w-full aspect-video rounded-2xl bg-black border border-[#272B36] overflow-hidden shadow-2xl flex flex-col justify-between p-4">
                  
                  <video id="localLiveVideo" autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover hidden"></video>
                  
                  <div id="liveWaitingScreen" className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#16181F] to-black text-center p-6 z-10">
                    <div className="w-20 h-20 rounded-2xl bg-[#0B0C10]/80 border-2 border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27] mb-4 shadow-xl">
                      <i data-lucide="radio" className="w-10 h-10"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">En attente du Professeur</h3>
                    <p id="liveWaitingNotice" className="text-xs text-gray-400 max-w-sm">
                      Le cours en direct n'a pas encore été démarré. Dès que l'enseignant lance la session, la vidéo et l'audio s'ouvriront ici automatiquement.
                    </p>
                  </div>

                  <div id="cameraOffPlaceholder" className="absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-[#16181F] to-black text-center p-6 hidden z-0">
                    <div className="w-20 h-20 rounded-full bg-[#0B0C10]/80 border-2 border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27] mb-3">
                      <i data-lucide="graduation-cap" className="w-10 h-10"></i>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Session En Direct Active</h3>
                    <p className="text-xs text-gray-400">Le flux est diffusé avec audio stéréo haute qualité.</p>
                  </div>

                  <div id="whiteboardOverlay" className="absolute inset-0 bg-[#0B0C10]/95 z-20 hidden flex flex-col">
                    <div className="p-3 border-b border-[#272B36] flex items-center justify-between bg-[#16181F]">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <i data-lucide="pen-tool" className="w-4 h-4 text-[#FF1E27]"></i> Tableau Blanc CBM
                      </span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => (window as any).clearWhiteboard?.()} className="px-2.5 py-1 text-xs bg-[#0B0C10] hover:bg-[#272B36] rounded text-gray-300">Effacer</button>
                        <button onClick={() => (window as any).toggleWhiteboard?.()} className="p-1 text-gray-400 hover:text-white rounded">
                          <i data-lucide="x" className="w-4 h-4"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <canvas id="liveCanvas" className="w-full h-full cursor-crosshair"></canvas>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <span id="liveHeaderDot" className="w-2.5 h-2.5 rounded-full bg-gray-500"></span>
                      <span id="liveRoomTopic" className="text-xs font-semibold text-white">Cours Intensif de Langue - Brightened Mind Corp</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-gray-300">
                      <i data-lucide="users" className="w-3.5 h-3.5 text-[#FF1E27]"></i>
                      <span id="liveParticipantCount">0 Connectés</span>
                      <span className="text-gray-500">|</span>
                      <span id="liveOfflineCount" className="text-yellow-400">0 Non connectés</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center gap-3 bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/10 max-w-fit mx-auto">
                    <button id="btnToggleMic" onClick={() => (window as any).toggleMicrophone?.()} className="p-3.5 rounded-xl bg-[#16181F] hover:bg-[#272B36] text-white border border-[#272B36] transition-all" title="Microphone">
                      <i id="iconMic" data-lucide="mic" className="w-5 h-5"></i>
                    </button>
                    <button id="btnToggleCam" onClick={() => (window as any).toggleCamera?.()} className="p-3.5 rounded-xl bg-[#16181F] hover:bg-[#272B36] text-white border border-[#272B36] transition-all" title="Caméra">
                      <i id="iconCam" data-lucide="video" className="w-5 h-5"></i>
                    </button>
                    <button id="btnToggleShare" onClick={() => (window as any).toggleScreenShare?.()} className="p-3.5 rounded-xl bg-[#16181F] hover:bg-[#272B36] text-white border border-[#272B36] transition-all" title="Partager l'écran">
                      <i id="iconCam" data-lucide="monitor-up" className="w-5 h-5"></i>
                    </button>
                    <button onClick={() => (window as any).raiseHand?.()} className="p-3.5 rounded-xl bg-[#16181F] hover:bg-[#272B36] text-yellow-400 border border-[#272B36] transition-all" title="Lever la main">
                      <i data-lucide="hand" className="w-5 h-5"></i>
                    </button>
                    <button onClick={() => (window as any).router?.navigate('dashboard')} className="px-5 py-3 rounded-xl bg-[#FF1E27] hover:bg-[#E0121B] text-white font-semibold transition-all flex items-center gap-2">
                      <i data-lucide="phone-off" className="w-5 h-5"></i> Sortir
                    </button>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl border border-[#272B36]">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <i data-lucide="book-open" className="w-4 h-4 text-[#FF1E27]"></i> Thème du Cours Actuel :
                    <span id="displayLessonTitle" className="text-[#FF1E27]">Professional Communication & Spoken Fluency</span>
                  </h4>
                  <p className="text-xs text-gray-400">Participez activement, écoutez les instructions et intervenez lorsque le professeur vous donne la parole.</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-[#272B36] flex flex-col h-[560px]">
                <div className="p-4 border-b border-[#272B36] flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <i data-lucide="message-square" className="w-4 h-4 text-[#FF1E27]"></i> Discussion en Direct
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#0B0C10] text-gray-400">Direct</span>
                </div>

                <div id="liveChatFeed" className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                  <div className="bg-[#0B0C10]/80 p-2.5 rounded-xl border border-[#272B36]">
                    <span className="font-bold text-[#FF1E27]">Direction Pédagogique :</span>
                    <p className="text-gray-200 mt-1">Bienvenue dans la classe interactive Brightened Mind Corporation.</p>
                  </div>
                </div>

                <form id="liveChatForm" onSubmit={(e) => (window as any).sendLiveMessage?.(e)} className="p-3 border-t border-[#272B36] flex gap-2">
                  <input id="liveChatInput" type="text" placeholder="Poser une question..." className="flex-1 bg-[#0B0C10] border border-[#272B36] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF1E27]" />
                  <button type="submit" className="p-2 rounded-xl bg-[#FF1E27] hover:bg-[#E0121B] text-white">
                    <i data-lucide="send" className="w-4 h-4"></i>
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* VIEW 6: QUIZZES & CERTIFICATE */}
          <section id="view-quiz" className="spa-view hidden space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Évaluations Linguistiques & Certification</h2>
                <p className="text-xs text-gray-400 mt-1">Validez chaque niveau pour débloquer l'examen global officiel</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div onClick={() => (window as any).startQuizMode?.(1)} className="quiz-card-select cursor-pointer glass-card p-5 rounded-2xl border border-[#272B36] hover:border-[#FF1E27] transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-[#FF1E27]/20 text-[#FF1E27]">NIVEAU 1</span>
                  <span id="quizBadge1" className="text-xs text-gray-400">Non validé</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#FF1E27] transition-colors">Débutant</h3>
                <p className="text-xs text-gray-400 mt-1">Vocabulaire basique, temps du présent, conjugaison fondamentale.</p>
                <div className="mt-4 text-xs text-[#FF1E27] font-semibold flex items-center gap-1">
                  Lancer le Quiz <i data-lucide="chevron-right" className="w-3.5 h-3.5"></i>
                </div>
              </div>

              <div onClick={() => (window as any).startQuizMode?.(2)} className="quiz-card-select cursor-pointer glass-card p-5 rounded-2xl border border-[#272B36] hover:border-[#FF1E27] transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-400">NIVEAU 2</span>
                  <span id="quizBadge2" className="text-xs text-gray-400">Non validé</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">Intermédiaire</h3>
                <p className="text-xs text-gray-400 mt-1">Phrasal verbs, expression professionnelle et temps composés.</p>
                <div className="mt-4 text-xs text-blue-400 font-semibold flex items-center gap-1">
                  Lancer le Quiz <i data-lucide="chevron-right" className="w-3.5 h-3.5"></i>
                </div>
              </div>

              <div onClick={() => (window as any).startQuizMode?.(3)} className="quiz-card-select cursor-pointer glass-card p-5 rounded-2xl border border-[#272B36] hover:border-[#FF1E27] transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-purple-500/20 text-purple-400">NIVEAU 3</span>
                  <span id="quizBadge3" className="text-xs text-gray-400">Non validé</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">Avancé</h3>
                <p className="text-xs text-gray-400 mt-1">Négociation, tournures idiomatiques complexes et rhétorique.</p>
                <div className="mt-4 text-xs text-purple-400 font-semibold flex items-center gap-1">
                  Lancer le Quiz <i data-lucide="chevron-right" className="w-3.5 h-3.5"></i>
                </div>
              </div>

              <div onClick={() => (window as any).startQuizMode?.('global')} className="quiz-card-select cursor-pointer glass-card p-5 rounded-2xl border border-yellow-500/30 hover:border-yellow-400 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">FINAL</span>
                  <i data-lucide="award" className="w-4 h-4 text-yellow-400"></i>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">Quiz Global & Certificat</h3>
                <p className="text-xs text-gray-400 mt-1">Examen complet de synthèse pour délivrance du certificat officiel.</p>
                <div className="mt-4 text-xs text-yellow-400 font-semibold flex items-center gap-1">
                  Passer l'Examen <i data-lucide="chevron-right" className="w-3.5 h-3.5"></i>
                </div>
              </div>
            </div>

            <div id="quizPlayground" className="glass-card rounded-2xl p-6 sm:p-10 border border-[#272B36]">
              <div className="flex items-center justify-between border-b border-[#272B36] pb-4 mb-6">
                <div>
                  <span id="quizActiveTag" className="text-xs font-bold text-[#FF1E27] uppercase">Niveau 1</span>
                  <h3 id="quizActiveTitle" className="text-xl font-bold text-white">Évaluation en cours</h3>
                </div>
                <div className="text-right">
                  <span id="quizProgressCount" className="text-xs text-gray-400">Question 1 sur 3</span>
                </div>
              </div>

              <div id="quizQuestionBox" className="space-y-6">
                <h4 id="quizQuestionText" className="text-lg font-semibold text-gray-100">Question</h4>
                <div id="quizAnswersContainer" className="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
              </div>

              <div id="quizFooterActions" className="mt-8 pt-4 border-t border-[#272B36]/60 flex items-center justify-between">
                <button onClick={() => (window as any).resetQuizState?.()} className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white">Annuler le test</button>
                <button id="btnSubmitQuizStep" onClick={() => (window as any).submitQuizChoice?.()} className="px-6 py-2.5 rounded-xl bg-[#FF1E27] hover:bg-[#E0121B] text-white text-sm font-semibold transition-all">
                  Valider la réponse
                </button>
              </div>
            </div>

            <div id="certificateContainer" className="hidden space-y-6">
              <div className="flex items-center justify-between no-print">
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    <i data-lucide="trophy" className="w-7 h-7 text-yellow-400"></i> Félicitations ! Votre Certificat est Prêt
                  </h3>
                  <p className="text-xs text-gray-400">Document officiel émis par Brightened Mind Corporation</p>
                </div>
                <button onClick={() => window.print()} className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg">
                  <i data-lucide="printer" className="w-4 h-4"></i> Imprimer / Enregistrer PDF
                </button>
              </div>

              <div id="certificateCard" className="relative max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 via-[#13141a] to-neutral-900 border-8 border-double border-yellow-600/60 rounded-3xl p-10 sm:p-14 text-center shadow-2xl overflow-hidden">
                <div className="w-20 h-20 mx-auto mb-4 bg-black rounded-xl p-2 border border-yellow-500/30 flex items-center justify-center">
                  <img src="/logo-bm.png" alt="Logo Brightened Mind Corp" className="max-h-full max-w-full object-contain" onError={(e: any) => { e.target.style.display = 'none'; }} />
                </div>

                <h5 className="text-xs uppercase tracking-[0.35em] text-yellow-500 font-bold mb-2">BRIGHTENED MIND CORPORATION</h5>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-black tracking-wider uppercase mb-1">CERTIFICAT DE RÉUSSITE</h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">CERTIFICATE OF LANGUAGE PROFICIENCY & EXCELLENCE</p>

                <p className="text-sm text-gray-300 font-light">Le conseil académique certifie par la présente que</p>
                
                <div id="certStudentName" className="font-serif-luxury text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-500 my-4 border-b border-yellow-600/40 pb-2 inline-block px-8">
                  Jean Dupont
                </div>

                <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed mt-2">
                  a validé avec succès l'ensemble du cycle linguistique intensif (Niveaux 1, 2, 3) et a réussi l'examen de certification d'aptitude professionnelle avec la mention <strong>Très Bien</strong>.
                </p>

                <div className="mt-12 pt-8 border-t border-[#272B36]/80 grid grid-cols-3 items-center gap-4 text-left">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Date d'émission :</span>
                    <span id="certDate" className="text-xs font-semibold text-white">19 Septembre 2026</span>
                    <span className="text-[10px] text-gray-400 block mt-2">Identifiant : <span id="certHash" className="font-mono text-[#FF1E27]">#CBM-CERT-9942</span></span>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border-2 border-dashed border-yellow-500 flex items-center justify-center p-1">
                      <div className="w-full h-full rounded-full bg-yellow-500/10 border border-yellow-400 flex items-center justify-center text-center">
                        <span className="text-[8px] sm:text-[9px] font-bold text-yellow-400 leading-tight">OFFICIAL<br />ACADEMIC<br />SEAL</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-serif-luxury text-base text-yellow-400 italic">Williams & Board</div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">La Direction Pédagogique</span>
                    <span className="text-[10px] text-gray-400">Brightened Mind Corp.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VIEW 7: SECRET ADMIN / TEACHER DASHBOARD */}
          <section id="view-admin" className="spa-view hidden space-y-8">
            <div className="glass-card p-6 rounded-2xl border border-[#FF1E27]/50 bg-gradient-to-r from-red-950/40 via-[#16181F] to-[#16181F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF1E27]/20 border border-[#FF1E27]/40 flex items-center justify-center text-[#FF1E27]">
                  <i data-lucide="shield-check" className="w-6 h-6"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white">Espace Direction & Corps Professoral</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF1E27] text-white uppercase tracking-wider">Confidentiel</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Contrôle de diffusion des cours en direct et validation des inscriptions</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => (window as any).exitStaffMode?.()} className="px-4 py-2 bg-[#0B0C10] hover:bg-[#272B36] text-xs font-semibold text-gray-300 rounded-xl border border-[#272B36] transition-colors flex items-center gap-1.5">
                  <i data-lucide="log-out" className="w-4 h-4"></i> Fermer l'Espace Restreint
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card p-4 rounded-xl border border-[#272B36]">
                <span className="text-xs text-gray-400">Total Étudiants Inscrits</span>
                <div id="statTotalStudents" className="text-2xl font-black text-white mt-1">4</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-[#272B36]">
                <span className="text-xs text-yellow-400">Comptes En Attente d'Approbation</span>
                <div id="statPendingStudents" className="text-2xl font-black text-yellow-400 mt-1">1</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-[#272B36]">
                <span className="text-xs text-blue-400">Étudiants Connectés au Live</span>
                <div id="statConnectedStudents" className="text-2xl font-black text-blue-400 mt-1">0</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-[#272B36]">
                <span className="text-xs text-gray-400">Étudiants NON Connectés (Absents)</span>
                <div id="statOfflineStudents" className="text-2xl font-black text-red-400 mt-1">4</div>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b border-[#272B36] pb-3">
              <button id="adminTabBtnTeacher" onClick={() => (window as any).setAdminTab?.('teacher')} className="px-4 py-2 rounded-lg bg-[#FF1E27] text-white text-xs font-bold transition-all">
                Studio Professeur (Lancement du Live)
              </button>
              <button id="adminTabBtnStudents" onClick={() => (window as any).setAdminTab?.('students')} className="px-4 py-2 rounded-lg bg-[#16181F] hover:bg-[#272B36] text-gray-300 text-xs font-medium transition-all">
                Gestion des Inscriptions & Paiements
              </button>
            </div>

            <div id="adminTabTeacherContent" className="space-y-6">
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#FF1E27]/40 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#272B36] pb-5">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <i data-lucide="radio" className="w-6 h-6 text-[#FF1E27]"></i> Régie & Déclenchement du Cours en Direct
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Contrôlez le direct : tant que vous ne cliquez pas sur démarrer, les étudiants patientent en salle d'attente.
                    </p>
                  </div>
                  
                  <div id="teacherLiveActionControls" className="flex items-center gap-3">
                    <button id="btnMainStartLive" onClick={() => (window as any).teacherStartLiveBroadcast?.()} className="px-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-black text-sm flex items-center gap-2 shadow-xl shadow-green-600/30 transition-all transform hover:scale-105 active:scale-95">
                      <i data-lucide="play" className="w-5 h-5"></i> DÉMARRER LE LIVE
                    </button>
                    <button id="btnMainStopLive" onClick={() => (window as any).teacherStopLiveBroadcast?.()} className="hidden px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm flex items-center gap-2 shadow-xl shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95">
                      <i data-lucide="square" className="w-5 h-5"></i> ARRÊTER LE LIVE
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">Titre de la leçon enseignée</label>
                    <input id="teacherLessonTitleInput" type="text" defaultValue="Spoken English Mastery & Professional Business Pitch" className="w-full bg-[#0B0C10] border border-[#272B36] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF1E27]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">Niveau concerné</label>
                    <select id="teacherTargetLevelSelect" className="w-full bg-[#0B0C10] border border-[#272B36] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF1E27]">
                      <option value="Tous les niveaux">Tous les niveaux (Niveau 1, 2 et 3)</option>
                      <option value="Niveau 1">Niveau 1 (Débutant)</option>
                      <option value="Niveau 2">Niveau 2 (Intermédiaire)</option>
                      <option value="Niveau 3">Niveau 3 (Avancé)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B0C10] border border-[#272B36] space-y-3">
                  <h4 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                    <i data-lucide="megaphone" className="w-4 h-4 text-[#FF1E27]"></i> Diffuseur d'Annonce Officielle aux Étudiants
                  </h4>
                  <div className="flex gap-2">
                    <input id="adminAnnouncementInput" type="text" placeholder="Tapez l'annonce à afficher immédiatement à tous les étudiants..." className="flex-1 bg-[#16181F] border border-[#272B36] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF1E27]" />
                    <button onClick={() => (window as any).publishGlobalAnnouncement?.()} className="px-5 py-2 bg-[#FF1E27] hover:bg-[#E0121B] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md">
                      <i data-lucide="send" className="w-4 h-4"></i> Publier l'Annonce
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="adminTabStudentsContent" className="hidden space-y-4">
              <div className="glass-card rounded-2xl border border-[#272B36] overflow-hidden">
                <div className="p-4 bg-[#0B0C10]/50 border-b border-[#272B36] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <i data-lucide="users" className="w-4 h-4 text-[#FF1E27]"></i> Inscriptions & Preuves de Paiement
                  </h3>
                  <span className="text-xs text-gray-400">Cliquez sur « Approuver » après vérification du reçu</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B0C10] text-gray-400 uppercase tracking-wider text-[11px] border-b border-[#272B36]">
                      <tr>
                        <th className="py-3.5 px-4">Étudiant</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Niveau</th>
                        <th className="py-3.5 px-4">Mode de Paiement</th>
                        <th className="py-3.5 px-4">Référence Reçu</th>
                        <th className="py-3.5 px-4">Statut Approbation</th>
                        <th className="py-3.5 px-4 text-right">Action Direction</th>
                      </tr>
                    </thead>
                    <tbody id="adminStudentTableBody" className="divide-y border-[#272B36] text-gray-200"></tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-[#272B36] bg-[#0B0C10]/95 py-8 text-center text-xs text-gray-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Brightened Mind Corporation</span>
              <span>• Excellence en Formation Linguistique</span>
            </div>
            <div>
              <span>Support administratif : <a href="mailto:contact@brightenedmindcorp.com" className="text-[#FF1E27] hover:underline">contact@brightenedmindcorp.com</a></span>
            </div>
          </div>
        </footer>
      </div>

      {/* Script d'exécution de toute la logique JavaScript intégrée */}
      <Script id="cbm-app-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        const INITIAL_STUDENTS = [
          {
            id: 'BM-1041',
            firstName: 'Amadou',
            lastName: 'Kouassi',
            email: 'amadou.kouassi@exemple.com',
            phone: '+243 81 00 00 01',
            level: 1,
            password: 'password123',
            paymentMode: 'reference',
            refType: 'Mobile Money (Airtel / M-Pesa / Orange)',
            refCode: 'MPESA-CD-98492048',
            status: 'pending',
            paid: false,
            registeredAt: '2026-09-18'
          },
          {
            id: 'BM-1042',
            firstName: 'Sarah',
            lastName: 'Koffi',
            email: 'sarah.koffi@exemple.com',
            phone: '+243 82 12 34 56',
            level: 2,
            password: 'password123',
            paymentMode: 'online',
            refType: 'Carte Bancaire / En Ligne',
            refCode: 'CB-ONLINE-782910',
            status: 'approved',
            paid: true,
            registeredAt: '2026-09-15'
          },
          {
            id: 'BM-1043',
            firstName: 'David',
            lastName: 'Traoré',
            email: 'david.traore@exemple.com',
            phone: '+243 85 70 88 99',
            level: 3,
            password: 'password123',
            paymentMode: 'reference',
            refType: 'Bordereau / Virement Bancaire',
            refCode: 'BORD-RAW-448201',
            status: 'approved',
            paid: true,
            registeredAt: '2026-09-12'
          }
        ];

        class AppDatabase {
          constructor() {
            this.STORAGE_KEY = 'cbm_lms_students_data_v3';
            this.init();
          }

          init() {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
              localStorage.setItem(this.STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
            }
          }

          getAllStudents() {
            try {
              return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
            } catch (e) {
              return INITIAL_STUDENTS;
            }
          }

          saveAllStudents(students) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
          }

          addStudent(student) {
            const list = this.getAllStudents();
            list.unshift(student);
            this.saveAllStudents(list);
          }

          updateStudent(id, partial) {
            const list = this.getAllStudents();
            const idx = list.findIndex(s => s.id === id);
            if (idx !== -1) {
              list[idx] = { ...list[idx], ...partial };
              this.saveAllStudents(list);
              return list[idx];
            }
            return null;
          }

          findStudentByEmail(email) {
            const list = this.getAllStudents();
            return list.find(s => s.email.toLowerCase() === email.toLowerCase());
          }
        }

        const db = new AppDatabase();

        window.currentUser = null;
        window.isStaffAuthenticated = false;
        window.staffRole = null; 

        window.isLiveBroadcasting = false;
        window.currentLessonTitle = "Spoken English Mastery & Professional Pitch";
        window.liveSeconds = 0;
        window.liveTimerInterval = null;
        window.currentAnnouncement = "Séance interactive en direct aujourd'hui avec le Professeur. Veuillez tester vos microphones.";

        window.localStream = null;
        window.isMicMuted = false;
        window.isCamOff = false;
        window.isScreenSharing = false;

        const QUIZ_DATA = {
          1: [
            {
              q: "Choose the correct greeting for a formal morning business meeting:",
              options: ["Good morning, ladies and gentlemen.", "Hey what's up guys!", "Yo, how you doing?", "Later dude!"],
              correct: 0
            },
            {
              q: "Complete the sentence: 'She _____ English every day at Brightened Mind Corp.'",
              options: ["practiced", "practices", "practicing", "is practice"],
              correct: 1
            },
            {
              q: "What is the opposite of 'Difficult' in English?",
              options: ["Heavy", "Complex", "Easy", "Hard"],
              correct: 2
            }
          ],
          2: [
            {
              q: "Which phrasal verb means 'to cancel an event'?",
              options: ["Call off", "Call out", "Put off", "Take over"],
              correct: 0
            },
            {
              q: "Choose the correct modal verb: 'You _____ submit your report before the deadline.'",
              options: ["must", "can to", "might to", "ought"],
              correct: 0
            },
            {
              q: "Identify the correct conditional: 'If I had studied more, I _____ the test.'",
              options: ["would pass", "would have passed", "will pass", "passed"],
              correct: 1
            }
          ],
          3: [
            {
              q: "What does the idiom 'Bite the bullet' mean in executive management?",
              options: ["Eat quickly", "Face an inevitable situation with courage", "Cancel a project immediately", "Hire an aggressive speaker"],
              correct: 1
            },
            {
              q: "Select the most professional synonym for 'enhance productivity':",
              options: ["Make things better", "Streamline operational throughput", "Do work quicker", "Get more stuff done"],
              correct: 1
            },
            {
              q: "Choose the correct subjunctive phrasing:",
              options: ["The board insisted that he be present.", "The board insisted that he was present.", "The board insisted him to be there.", "The board insists him present."],
              correct: 0
            }
          ],
          global: [
            {
              q: "Global Evaluation Q1: What is the primary focus of Brightened Mind Corporation?",
              options: ["Language mastery & global leadership", "Real estate management", "Music streaming", "Fast food chain"],
              correct: 0
            },
            {
              q: "Global Evaluation Q2: Which tense is used for an action that happened at an unspecified time before now?",
              options: ["Past Simple", "Present Perfect", "Future Continuous", "Past Subjunctive"],
              correct: 1
            },
            {
              q: "Global Evaluation Q3: In professional correspondence, 'Enclosed please find...' means:",
              options: ["Je refuse votre lettre", "Veuillez trouver ci-joint...", "Appelez-moi d'urgence", "Le paiement est rejeté"],
              correct: 1
            },
            {
              q: "Global Evaluation Q4: What does 'To touch base' signify in executive communication?",
              options: ["Toucher terre fermement", "Renouveler brièvement le contact", "Partir en voyage", "Terminer un contrat"],
              correct: 1
            }
          ]
        };

        window.activeQuizLevel = 1;
        window.activeQuizIndex = 0;
        window.activeQuizScore = 0;
        window.selectedQuizAnswer = null;

        window.router = {
          currentView: 'home',
          navigate(viewId) {
            if (viewId === 'dashboard' || viewId === 'live-class' || viewId === 'quiz') {
              if (!window.currentUser && !window.isStaffAuthenticated) {
                window.showToast("Veuillez vous connecter pour accéder à cet espace", "warning");
                window.router.navigate('login');
                return;
              }
            }

            document.querySelectorAll('.spa-view').forEach(view => view.classList.add('hidden'));

            const target = document.getElementById(\`view-\${viewId}\`);
            if (target) {
              target.classList.remove('hidden');
              this.currentView = viewId;
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (window.lucide) window.lucide.createIcons();

              if (viewId === 'dashboard') {
                window.refreshDashboardUI();
              } else if (viewId === 'admin') {
                window.refreshAdminUI();
              } else if (viewId === 'live-class') {
                window.syncLiveClassroomState();
              }
            }
          }
        };

        window.teacherStartLiveBroadcast = function() {
          const customTitle = document.getElementById('teacherLessonTitleInput')?.value;
          if (customTitle) window.currentLessonTitle = customTitle;

          window.isLiveBroadcasting = true;

          if (window.liveTimerInterval) clearInterval(window.liveTimerInterval);
          window.liveSeconds = 0;
          window.updateLiveClockDisplay();
          window.liveTimerInterval = setInterval(() => {
            window.liveSeconds++;
            window.updateLiveClockDisplay();
          }, 1000);

          document.getElementById('btnMainStartLive')?.classList.add('hidden');
          document.getElementById('btnMainStopLive')?.classList.remove('hidden');
          document.getElementById('btnHostStartLive')?.classList.add('hidden');
          document.getElementById('btnHostStopLive')?.classList.remove('hidden');

          const navDot = document.getElementById('navLiveStatusDot');
          if (navDot) {
            navDot.innerHTML = \`
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E27] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#FF1E27]"></span>
            \`;
          }

          window.showToast("🔴 LE LIVE A COMMENCÉ ! Le chrono tourne et la salle est ouverte.", "success");
          window.sendSystemChatMessage(\`📢 PROFESSEUR : Le cours en direct "\${window.currentLessonTitle}" vient de débuter.\`);

          window.syncLiveClassroomState();
          window.refreshAdminUI();

          if (window.router.currentView === 'live-class') {
            window.toggleCamera();
          }
        };

        window.teacherStopLiveBroadcast = function() {
          if (!confirm("Voulez-vous vraiment arrêter la session en direct pour tous les étudiants ?")) return;

          window.isLiveBroadcasting = false;

          if (window.liveTimerInterval) {
            clearInterval(window.liveTimerInterval);
            window.liveTimerInterval = null;
          }
          window.liveSeconds = 0;
          window.updateLiveClockDisplay();

          if (window.localStream) {
            window.localStream.getTracks().forEach(t => t.stop());
            window.localStream = null;
          }

          document.getElementById('btnMainStartLive')?.classList.remove('hidden');
          document.getElementById('btnMainStopLive')?.classList.add('hidden');
          document.getElementById('btnHostStartLive')?.classList.remove('hidden');
          document.getElementById('btnHostStopLive')?.classList.add('hidden');

          const navDot = document.getElementById('navLiveStatusDot');
          if (navDot) {
            navDot.innerHTML = \`<span class="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>\`;
          }

          window.showToast("Le cours en direct a été arrêté.", "info");
          window.sendSystemChatMessage("📢 PROFESSEUR : La session en direct est terminée. Le chrono est arrêté.");

          window.syncLiveClassroomState();
          window.refreshAdminUI();
        };

        window.updateLiveClockDisplay = function() {
          const h = String(Math.floor(window.liveSeconds / 3600)).padStart(2, '0');
          const m = String(Math.floor((window.liveSeconds % 3600) / 60)).padStart(2, '0');
          const s = String(window.liveSeconds % 60).padStart(2, '0');
          const el = document.getElementById('liveClock');
          if (el) el.textContent = \`\${h}:\${m}:\${s}\`;
        };

        window.syncLiveClassroomState = function() {
          const isTeacher = window.isStaffAuthenticated;
          const waitingScreen = document.getElementById('liveWaitingScreen');
          const directBar = document.getElementById('teacherLiveDirectBar');
          const badgeIndicator = document.getElementById('liveRoomIndicator');
          const badgeText = document.getElementById('liveRoomStatusText');
          const headerDot = document.getElementById('liveHeaderDot');
          const topicEl = document.getElementById('liveRoomTopic');
          const lessonDisplay = document.getElementById('displayLessonTitle');

          if (directBar) {
            if (isTeacher) directBar.classList.remove('hidden');
            else directBar.classList.add('hidden');
          }

          if (lessonDisplay) lessonDisplay.textContent = window.currentLessonTitle;
          if (topicEl) topicEl.textContent = window.currentLessonTitle;

          const students = db.getAllStudents();
          const approvedStudents = students.filter(s => s.status === 'approved');
          
          let connectedCount = window.isLiveBroadcasting ? (approvedStudents.length > 0 ? approvedStudents.length : 1) : 0;
          let offlineCount = window.isLiveBroadcasting ? 0 : students.length;

          const countDisplay = document.getElementById('liveParticipantCount');
          const offlineDisplay = document.getElementById('liveOfflineCount');
          if (countDisplay) countDisplay.textContent = \`\${connectedCount} Connecté\${connectedCount > 1 ? 's' : ''}\`;
          if (offlineDisplay) offlineDisplay.textContent = \`\${offlineCount} Non connecté\${offlineCount > 1 ? 's' : ''}\`;

          if (window.isLiveBroadcasting) {
            waitingScreen?.classList.add('hidden');
            if (badgeIndicator) badgeIndicator.className = "w-2 h-2 rounded-full bg-[#FF1E27] animate-ping";
            if (badgeText) {
              badgeText.textContent = "EN DIRECT";
              badgeText.className = "text-[#FF1E27] font-bold";
            }
            if (headerDot) headerDot.className = "w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse";
          } else {
            waitingScreen?.classList.remove('hidden');
            if (badgeIndicator) badgeIndicator.className = "w-2 h-2 rounded-full bg-gray-500";
            if (badgeText) {
              badgeText.textContent = "HORS LIGNE";
              badgeText.className = "text-gray-400 font-bold";
            }
            if (headerDot) headerDot.className = "w-2.5 h-2.5 rounded-full bg-gray-500";

            const notice = document.getElementById('liveWaitingNotice');
            if (notice) {
              if (isTeacher) {
                notice.innerHTML = \`
                  Vous êtes connecté en tant qu'enseignant.<br>
                  Cliquez sur le bouton vert <strong>« DÉMARRER LE LIVE »</strong> ci-dessus pour lancer la session.
                \`;
              } else {
                notice.textContent = \`
                  Le professeur n'a pas encore lancé la session en direct. Veuillez patienter, elle débutera automatiquement dès son activation.
                \`;
              }
            }
          }

          if (window.lucide) window.lucide.createIcons();
        };

        window.publishGlobalAnnouncement = function() {
          const input = document.getElementById('adminAnnouncementInput');
          const text = input ? input.value.trim() : "";
          if (!text) {
            window.showToast("Veuillez saisir un texte pour l'annonce", "warning");
            return;
          }
          window.currentAnnouncement = text;
          
          const banner = document.getElementById('globalAnnouncementBanner');
          const bannerText = document.getElementById('globalAnnouncementText');
          if (banner && bannerText) {
            bannerText.textContent = window.currentAnnouncement;
            banner.classList.remove('hidden');
          }

          window.sendSystemChatMessage(\`📢 ANNONCE DIRECTION : \${window.currentAnnouncement}\`);
          window.showToast("Annonce publiée en direct à tous les étudiants !", "success");
          if (input) input.value = '';
        };

        window.togglePaymentInputs = function() {
          const radio = document.querySelector('input[name="paymentMode"]:checked');
          if (!radio) return;
          const mode = radio.value;
          const onlineBox = document.getElementById('onlinePaymentSubBox');
          const refBox = document.getElementById('referencePaymentSubBox');
          
          if (mode === 'online') {
            onlineBox?.classList.remove('hidden');
            refBox?.classList.add('hidden');
          } else {
            onlineBox?.classList.add('hidden');
            refBox?.classList.remove('hidden');
          }
          if (window.lucide) window.lucide.createIcons();
        };

        window.handleRegistration = function(e) {
          e.preventDefault();
          const firstName = document.getElementById('regFirstName')?.value.trim();
          const lastName = document.getElementById('regLastName')?.value.trim();
          const email = document.getElementById('regEmail')?.value.trim();
          const phone = document.getElementById('regPhone')?.value.trim();
          const level = parseInt(document.getElementById('regLevel')?.value || '1');
          const password = document.getElementById('regPassword')?.value;
          const paymentMode = document.querySelector('input[name="paymentMode"]:checked')?.value;

          if (db.findStudentByEmail(email)) {
            window.openGenericModal("Compte existant", "Cette adresse email est déjà enregistrée. Veuillez vous connecter.", "alert-circle");
            return;
          }

          let refType = "Paiement en ligne";
          let refCode = \`TXN-ONLINE-\${Math.floor(100000 + Math.random() * 900000)}\`;

          if (paymentMode === 'reference') {
            refType = document.getElementById('regRefType')?.value;
            refCode = document.getElementById('regRefCode')?.value.trim();
            if (!refCode) {
              window.showToast("Veuillez saisir votre référence ou reçu", "warning");
              return;
            }
          }

          const newStudent = {
            id: \`BM-\${Math.floor(1000 + Math.random() * 9000)}\`,
            firstName,
            lastName,
            email,
            phone,
            level,
            password,
            paymentMode,
            refType,
            refCode,
            status: 'pending',
            paid: false,
            registeredAt: new Date().toISOString().split('T')[0]
          };

          db.addStudent(newStudent);
          window.currentUser = newStudent;
          window.updateHeaderForUser();

          window.openGenericModal(
            "Inscription Enregistrée !",
            \`Bienvenue \${firstName} \${lastName}. Votre compte a été créé avec succès. L'administrateur va vérifier votre référence de paiement (\${refCode}) et valider votre dossier sous peu.\`,
            "check-circle"
          );

          window.router.navigate('dashboard');
        };

        window.handleStudentLogin = function(e) {
          e.preventDefault();
          const email = document.getElementById('loginEmail')?.value.trim();
          const password = document.getElementById('loginPassword')?.value.trim();
          const student = db.findStudentByEmail(email);

          if (student && student.password === password) {
            window.currentUser = student;
            window.updateHeaderForUser();
            window.showToast(\`Ravi de vous revoir, \${student.firstName} !\`, "success");
            window.router.navigate('dashboard');
          } else {
            window.openGenericModal("Erreur de connexion", "Email ou mot de passe incorrect.", "x-circle");
          }
        };

        window.logout = function() {
          window.currentUser = null;
          if (window.localStream) {
            window.localStream.getTracks().forEach(track => track.stop());
            window.localStream = null;
          }
          window.updateHeaderForUser();
          window.showToast("Déconnexion réussie", "info");
          window.router.navigate('home');
        };

        window.updateHeaderForUser = function() {
          const anonGroup = document.getElementById('authHeaderAnonymous');
          const userGroup = document.getElementById('authHeaderUser');
          const dashBtn = document.getElementById('navDashboardBtn');
          const liveBtn = document.getElementById('navLiveClassBtn');
          const quizBtn = document.getElementById('navQuizBtn');

          if (window.currentUser) {
            anonGroup?.classList.add('hidden');
            userGroup?.classList.remove('hidden');
            dashBtn?.classList.remove('hidden');
            liveBtn?.classList.remove('hidden');
            quizBtn?.classList.remove('hidden');

            const nameEl = document.getElementById('headerUserName');
            const lvlEl = document.getElementById('headerUserLevel');
            if (nameEl) nameEl.textContent = \`\${window.currentUser.firstName} \${window.currentUser.lastName}\`;
            if (lvlEl) lvlEl.textContent = \`Niveau \${window.currentUser.level}\`;
          } else {
            anonGroup?.classList.remove('hidden');
            userGroup?.classList.add('hidden');
            dashBtn?.classList.add('hidden');
            liveBtn?.classList.add('hidden');
            quizBtn?.classList.add('hidden');
          }
          if (window.lucide) window.lucide.createIcons();
        };

        window.refreshDashboardUI = function() {
          if (!window.currentUser) return;

          const nameEl = document.getElementById('dashFullName');
          const emailEl = document.getElementById('dashEmail');
          const phoneEl = document.getElementById('dashPhone');
          const idEl = document.getElementById('dashStudentID');
          const initialsEl = document.getElementById('dashAvatarInitials');
          const levelBadgeEl = document.getElementById('dashLevelBadge');

          if (nameEl) nameEl.textContent = \`\${window.currentUser.firstName} \${window.currentUser.lastName}\`;
          if (emailEl) emailEl.textContent = window.currentUser.email;
          if (phoneEl) phoneEl.textContent = window.currentUser.phone;
          if (idEl) idEl.textContent = window.currentUser.id;
          if (initialsEl) initialsEl.textContent = (window.currentUser.firstName[0] || 'C') + (window.currentUser.lastName[0] || 'B');
          if (levelBadgeEl) levelBadgeEl.textContent = \`Niveau \${window.currentUser.level}\`;

          const levelNames = { 1: 'Débutant (Beginner)', 2: 'Intermédiaire (Fluency)', 3: 'Avancé (Executive Master)' };
          const levelTitleEl = document.getElementById('dashLevelTitle');
          if (levelTitleEl) levelTitleEl.textContent = levelNames[window.currentUser.level] || 'Niveau Standard';

          const alertBox = document.getElementById('dashApprovalAlert');
          const alertIcon = document.getElementById('dashApprovalIcon');
          const alertTitle = document.getElementById('dashApprovalTitle');
          const alertText = document.getElementById('dashApprovalText');
          const alertAction = document.getElementById('dashApprovalAction');

          const payBadge = document.getElementById('dashPaymentBadge');
          const payTitle = document.getElementById('dashPaymentTitle');
          const payDetail = document.getElementById('dashPaymentDetail');
          const accessStatus = document.getElementById('dashAccessStatus');

          if (payDetail) payDetail.textContent = \`Mode : \${window.currentUser.refType} (\${window.currentUser.refCode || 'N/A'})\`;

          if (window.currentUser.status === 'approved') {
            if (alertBox) {
              alertBox.classList.remove('hidden');
              alertBox.className = "p-5 rounded-2xl border border-green-500/30 bg-green-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4";
            }
            if (alertIcon) {
              alertIcon.className = "w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0";
              alertIcon.innerHTML = \`<i data-lucide="check-circle" class="w-6 h-6"></i>\`;
            }
            if (alertTitle) alertTitle.textContent = "Compte Officiellement Approuvé par l'Administration";
            if (alertText) alertText.textContent = "Votre reçu a été validé. Vos accès aux cours directs et examens sont pleinement ouverts.";
            if (alertAction) alertAction.innerHTML = \`<span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs font-bold">Accès Libre</span>\`;

            if (payBadge) {
              payBadge.className = "px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30";
              payBadge.textContent = "Paiement Validé";
            }
            if (payTitle) payTitle.textContent = "Inscription Confirmée";
            if (accessStatus) {
              accessStatus.className = "font-semibold text-green-400 flex items-center gap-1";
              accessStatus.innerHTML = \`<i data-lucide="check" class="w-3.5 h-3.5"></i> Actif\`;
            }
          } else {
            if (alertBox) {
              alertBox.classList.remove('hidden');
              alertBox.className = "p-5 rounded-2xl border border-yellow-500/40 bg-yellow-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4";
            }
            if (alertIcon) {
              alertIcon.className = "w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center flex-shrink-0";
              alertIcon.innerHTML = \`<i data-lucide="clock" class="w-6 h-6"></i>\`;
            }
            if (alertTitle) alertTitle.textContent = "Compte en Attente d'Approbation Administrative";
            if (alertText) alertText.textContent = "La direction examine actuellement votre référence de paiement. Vous serez débloqué dès approbation.";
            if (alertAction) alertAction.innerHTML = \`<button onclick="showToast('Rappel transmis à la direction', 'info')" class="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg text-xs font-bold">Relancer</button>\`;

            if (payBadge) {
              payBadge.className = "px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
              payBadge.textContent = "En attente validation";
            }
            if (payTitle) payTitle.textContent = "Vérification Reçu en cours";
            if (accessStatus) {
              accessStatus.className = "font-semibold text-yellow-400 flex items-center gap-1";
              accessStatus.innerHTML = \`<i data-lucide="hourglass" class="w-3.5 h-3.5"></i> En attente\`;
            }
          }

          const liveChip = document.getElementById('dashLiveStatusChip');
          if (liveChip) {
            if (window.isLiveBroadcasting) {
              liveChip.className = "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-[#FF1E27] border border-[#FF1E27]/20 text-xs font-bold mb-4";
              liveChip.innerHTML = \`<span class="w-2 h-2 rounded-full bg-[#FF1E27] animate-ping"></span> Cours Actuellement EN DIRECT !\`;
            } else {
              liveChip.className = "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs font-bold mb-4";
              liveChip.innerHTML = \`<span class="w-2 h-2 rounded-full bg-gray-500"></span> En attente du Professeur\`;
            }
          }

          if (window.lucide) window.lucide.createIcons();
        };

        window.toggleCamera = async function() {
          const videoEl = document.getElementById('localLiveVideo');
          const placeholder = document.getElementById('cameraOffPlaceholder');
          const btn = document.getElementById('btnToggleCam');
          const icon = document.getElementById('iconCam');

          if (!window.localStream) {
            try {
              window.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
              if (videoEl) {
                videoEl.srcObject = window.localStream;
                videoEl.classList.remove('hidden');
              }
              placeholder?.classList.add('hidden');
              btn?.classList.add('bg-[#FF1E27]');
              icon?.setAttribute('data-lucide', 'video');
              window.showToast("Caméra et Audio activés", "success");
            } catch (err) {
              window.showToast("Webcam non accessible ou non autorisée", "warning");
            }
          } else {
            const videoTrack = window.localStream.getVideoTracks()[0];
            if (videoTrack) {
              window.isCamOff = !window.isCamOff;
              videoTrack.enabled = !window.isCamOff;
              if (window.isCamOff) {
                videoEl?.classList.add('hidden');
                placeholder?.classList.remove('hidden');
                icon?.setAttribute('data-lucide', 'video-off');
                btn?.classList.remove('bg-[#FF1E27]');
              } else {
                videoEl?.classList.remove('hidden');
                placeholder?.classList.add('hidden');
                icon?.setAttribute('data-lucide', 'video');
                btn?.classList.add('bg-[#FF1E27]');
              }
            }
          }
          if (window.lucide) window.lucide.createIcons();
        };

        window.toggleMicrophone = function() {
          const btn = document.getElementById('btnToggleMic');
          const icon = document.getElementById('iconMic');

          if (window.localStream) {
            const audioTrack = window.localStream.getAudioTracks()[0];
            if (audioTrack) {
              window.isMicMuted = !window.isMicMuted;
              audioTrack.enabled = !window.isMicMuted;
              if (window.isMicMuted) {
                btn?.classList.add('bg-yellow-600');
                icon?.setAttribute('data-lucide', 'mic-off');
                window.showToast("Microphone coupé", "info");
              } else {
                btn?.classList.remove('bg-yellow-600');
                icon?.setAttribute('data-lucide', 'mic');
                window.showToast("Microphone rétabli", "success");
              }
            }
          } else {
            window.showToast("Activez d'abord la caméra pour connecter le micro", "warning");
          }
          if (window.lucide) window.lucide.createIcons();
        };

        window.toggleScreenShare = async function() {
          try {
            if (!window.isScreenSharing) {
              const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
              const videoEl = document.getElementById('localLiveVideo');
              if (videoEl) {
                videoEl.srcObject = screenStream;
                videoEl.classList.remove('hidden');
              }
              window.isScreenSharing = true;
              window.showToast("Partage d'écran activé", "info");
              screenStream.getVideoTracks()[0].onended = () => {
                window.isScreenSharing = false;
                window.showToast("Partage d'écran terminé", "info");
              };
            }
          } catch (e) {
            window.showToast("Partage d'écran annulé", "info");
          }
        };

        window.raiseHand = function() {
          const studentName = window.currentUser ? \`\${window.currentUser.firstName} \${window.currentUser.lastName}\` : "Étudiant";
          window.sendSystemChatMessage(\`✋ \${studentName} lève la main pour poser une question.\`);
          window.showToast("Vous avez levé la main.", "info");
        };

        window.sendLiveMessage = function(e) {
          e.preventDefault();
          const input = document.getElementById('liveChatInput');
          if (!input) return;
          const text = input.value.trim();
          if (!text) return;

          const author = window.isStaffAuthenticated ? "Prof. Williams (Enseignant)" : (window.currentUser ? \`\${window.currentUser.firstName} \${window.currentUser.lastName}\` : "Étudiant");
          const isTeacher = window.isStaffAuthenticated;

          const feed = document.getElementById('liveChatFeed');
          if (feed) {
            const msgDiv = document.createElement('div');
            msgDiv.className = \`p-2.5 rounded-xl border \${isTeacher ? 'bg-red-950/40 border-[#FF1E27]/40' : 'bg-[#0B0C10]/80 border-[#272B36]'}\`;
            msgDiv.innerHTML = \`
              <span class="font-bold \${isTeacher ? 'text-[#FF1E27]' : 'text-blue-400'}">\${author} :</span>
              <p class="text-gray-200 mt-1">\${window.escapeHtml(text)}</p>
            \`;
            feed.appendChild(msgDiv);
            feed.scrollTop = feed.scrollHeight;
          }
          input.value = '';
        };

        window.sendSystemChatMessage = function(text) {
          const feed = document.getElementById('liveChatFeed');
          if (feed) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-[11px]';
            msgDiv.textContent = text;
            feed.appendChild(msgDiv);
            feed.scrollTop = feed.scrollHeight;
          }
        };

        let canvas, ctx, isDrawing = false;
        window.initWhiteboard = function() {
          canvas = document.getElementById('liveCanvas');
          if (!canvas) return;
          ctx = canvas.getContext('2d');
          canvas.width = canvas.parentElement.clientWidth;
          canvas.height = canvas.parentElement.clientHeight;
          ctx.strokeStyle = '#FF1E27';
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';

          canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
          });
          canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
          });
          canvas.addEventListener('mouseup', () => isDrawing = false);
          canvas.addEventListener('mouseleave', () => isDrawing = false);
        };

        window.toggleWhiteboard = function() {
          const overlay = document.getElementById('whiteboardOverlay');
          overlay?.classList.toggle('hidden');
          if (overlay && !overlay.classList.contains('hidden')) {
            setTimeout(window.initWhiteboard, 50);
          }
        };

        window.clearWhiteboard = function() {
          if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        };

        window.startQuizMode = function(level) {
          if (window.currentUser && window.currentUser.status !== 'approved' && !window.isStaffAuthenticated) {
            window.openGenericModal("Accès verrouillé", "Votre compte doit être validé par l'administrateur pour passer les examens.", "lock");
            return;
          }

          window.activeQuizLevel = level;
          window.activeQuizIndex = 0;
          window.activeQuizScore = 0;
          window.selectedQuizAnswer = null;

          document.getElementById('certificateContainer')?.classList.add('hidden');
          document.getElementById('quizPlayground')?.classList.remove('hidden');
          window.renderQuizQuestion();
        };

        window.renderQuizQuestion = function() {
          const questions = QUIZ_DATA[window.activeQuizLevel];
          const q = questions[window.activeQuizIndex];

          const tagText = window.activeQuizLevel === 'global' ? "EXAMEN GLOBAL DE CERTIFICATION" : \`NIVEAU \${window.activeQuizLevel} - ÉVALUATION\`;
          const tagEl = document.getElementById('quizActiveTag');
          const titleEl = document.getElementById('quizActiveTitle');
          const progEl = document.getElementById('quizProgressCount');
          const textEl = document.getElementById('quizQuestionText');

          if (tagEl) tagEl.textContent = tagText;
          if (titleEl) titleEl.textContent = \`Question \${window.activeQuizIndex + 1}\`;
          if (progEl) progEl.textContent = \`Question \${window.activeQuizIndex + 1} sur \${questions.length}\`;
          if (textEl) textEl.textContent = q.q;

          const container = document.getElementById('quizAnswersContainer');
          if (!container) return;
          container.innerHTML = '';

          q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = "quiz-opt-btn p-4 rounded-xl border border-[#272B36] bg-[#0B0C10]/70 hover:border-[#FF1E27] text-left text-sm text-gray-200 transition-all flex items-center justify-between";
            btn.innerHTML = \`
              <span>\${opt}</span>
              <span class="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-xs circle-indicator"></span>
            \`;
            btn.onclick = () => {
              document.querySelectorAll('.quiz-opt-btn').forEach(b => {
                b.classList.remove('border-[#FF1E27]', 'bg-[#FF1E27]/10');
                b.querySelector('.circle-indicator').innerHTML = '';
              });
              btn.classList.add('border-[#FF1E27]', 'bg-[#FF1E27]/10');
              btn.querySelector('.circle-indicator').innerHTML = '✓';
              window.selectedQuizAnswer = idx;
            };
            container.appendChild(btn);
          });
        };

        window.submitQuizChoice = function() {
          if (window.selectedQuizAnswer === null) {
            window.showToast("Veuillez sélectionner une réponse", "warning");
            return;
          }

          const questions = QUIZ_DATA[window.activeQuizLevel];
          if (window.selectedQuizAnswer === questions[window.activeQuizIndex].correct) {
            window.activeQuizScore++;
          }

          window.activeQuizIndex++;
          window.selectedQuizAnswer = null;

          if (window.activeQuizIndex < questions.length) {
            window.renderQuizQuestion();
          } else {
            window.finishQuiz();
          }
        };

        window.finishQuiz = function() {
          const questions = QUIZ_DATA[window.activeQuizLevel];
          const percentage = Math.round((window.activeQuizScore / questions.length) * 100);

          if (percentage >= 60) {
            if (window.activeQuizLevel === 'global') {
              window.showCertificate();
              if (typeof confetti === 'function') {
                confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
              }
            } else {
              window.openGenericModal("Niveau Validé !", \`Félicitations ! Vous avez réussi avec \${percentage}%.\`, "award");
              if (window.currentUser && window.currentUser.level <= window.activeQuizLevel && window.activeQuizLevel < 3) {
                window.currentUser.level = window.activeQuizLevel + 1;
                db.updateStudent(window.currentUser.id, { level: window.currentUser.level });
                window.updateHeaderForUser();
              }
              const badge = document.getElementById(\`quizBadge\${window.activeQuizLevel}\`);
              if (badge) {
                badge.className = "text-xs text-green-400 font-bold";
                badge.textContent = "Validé ✓";
              }
            }
          } else {
            window.openGenericModal("Score Insuffisant", \`Vous avez obtenu \${percentage}%. Le seuil requis est de 60%.\`, "alert-triangle");
          }
        };

        window.showCertificate = function() {
          document.getElementById('quizPlayground')?.classList.add('hidden');
          const cert = document.getElementById('certificateContainer');
          cert?.classList.remove('hidden');

          const name = window.currentUser ? \`\${window.currentUser.firstName} \${window.currentUser.lastName}\` : "Étudiant Émérite";
          const nameEl = document.getElementById('certStudentName');
          const dateEl = document.getElementById('certDate');
          const hashEl = document.getElementById('certHash');

          if (nameEl) nameEl.textContent = name;
          if (dateEl) dateEl.textContent = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
          if (hashEl) hashEl.textContent = \`#CBM-\${Math.floor(100000 + Math.random() * 900000)}\`;
          if (window.lucide) window.lucide.createIcons();
        };

        window.resetQuizState = function() {
          window.startQuizMode(1);
        };

        window.setAdminTab = function(tab) {
          const btnStudents = document.getElementById('adminTabBtnStudents');
          const btnTeacher = document.getElementById('adminTabBtnTeacher');
          const contentStudents = document.getElementById('adminTabStudentsContent');
          const contentTeacher = document.getElementById('adminTabTeacherContent');

          if (tab === 'students') {
            if (btnStudents) btnStudents.className = "px-4 py-2 rounded-lg bg-[#FF1E27] text-white text-xs font-bold transition-all";
            if (btnTeacher) btnTeacher.className = "px-4 py-2 rounded-lg bg-[#16181F] hover:bg-[#272B36] text-gray-300 text-xs font-medium transition-all";
            contentStudents?.classList.remove('hidden');
            contentTeacher?.classList.add('hidden');
          } else {
            if (btnTeacher) btnTeacher.className = "px-4 py-2 rounded-lg bg-[#FF1E27] text-white text-xs font-bold transition-all";
            if (btnStudents) btnStudents.className = "px-4 py-2 rounded-lg bg-[#16181F] hover:bg-[#272B36] text-gray-300 text-xs font-medium transition-all";
            contentTeacher?.classList.remove('hidden');
            contentStudents?.classList.add('hidden');
          }
          if (window.lucide) window.lucide.createIcons();
        };

        window.refreshAdminUI = function() {
          const students = db.getAllStudents();
          
          const totalCount = students.length;
          const pendingCount = students.filter(s => s.status === 'pending').length;
          const approvedCount = students.filter(s => s.status === 'approved').length;

          const connected = window.isLiveBroadcasting ? (approvedCount > 0 ? approvedCount : 1) : 0;
          const offline = Math.max(0, totalCount - connected);

          const stTotal = document.getElementById('statTotalStudents');
          const stPending = document.getElementById('statPendingStudents');
          const stConn = document.getElementById('statConnectedStudents');
          const stOff = document.getElementById('statOfflineStudents');

          if (stTotal) stTotal.textContent = totalCount;
          if (stPending) stPending.textContent = pendingCount;
          if (stConn) stConn.textContent = connected;
          if (stOff) stOff.textContent = offline;

          const tbody = document.getElementById('adminStudentTableBody');
          if (!tbody) return;
          tbody.innerHTML = '';

          students.forEach(student => {
            const tr = document.createElement('tr');
            tr.className = "hover:bg-[#0B0C10]/40 transition-colors";
            const isApproved = student.status === 'approved';

            tr.innerHTML = \`
              <td class="py-3 px-4 font-bold text-white flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg bg-[#16181F] border border-[#272B36] flex items-center justify-center text-xs text-[#FF1E27]">
                  \${student.firstName[0]}\${student.lastName[0]}
                </span>
                <div>
                  <div>\${window.escapeHtml(student.firstName)} \${window.escapeHtml(student.lastName)}</div>
                  <span class="text-[10px] text-gray-400 font-mono">\${student.id}</span>
                </div>
              </td>
              <td class="py-3 px-4 text-gray-300">
                <div>\${window.escapeHtml(student.email)}</div>
                <div class="text-[11px] text-gray-400">\${window.escapeHtml(student.phone)}</div>
              </td>
              <td class="py-3 px-4">
                <span class="px-2 py-0.5 rounded bg-[#16181F] border border-[#272B36] text-xs text-white">Niveau \${student.level}</span>
              </td>
              <td class="py-3 px-4 text-gray-300">
                \${window.escapeHtml(student.refType || student.paymentMode)}
              </td>
              <td class="py-3 px-4 font-mono text-[#FF1E27] font-semibold">
                \${window.escapeHtml(student.refCode || 'N/A')}
              </td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-full text-[11px] font-bold \${isApproved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}">
                  \${isApproved ? 'Approuvé' : 'En Attente'}
                </span>
              </td>
              <td class="py-3 px-4 text-right">
                \${isApproved 
                  ? \`<button onclick="toggleStudentApproval('\${student.id}', 'pending')" class="px-3 py-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-medium">Révoquer</button>\`
                  : \`<button onclick="toggleStudentApproval('\${student.id}', 'approved')" class="px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold shadow-md shadow-green-500/20 flex items-center gap-1 ml-auto"><i data-lucide="check" class="w-3.5 h-3.5"></i> Approuver</button>\`
                }
              </td>
            \`;
            tbody.appendChild(tr);
          });

          if (window.lucide) window.lucide.createIcons();
        };

        window.toggleStudentApproval = function(studentId, newStatus) {
          db.updateStudent(studentId, { status: newStatus, paid: newStatus === 'approved' });
          window.showToast(newStatus === 'approved' ? "Compte étudiant validé !" : "Statut remis en attente", "success");
          
          if (window.currentUser && window.currentUser.id === studentId) {
            window.currentUser.status = newStatus;
            window.currentUser.paid = (newStatus === 'approved');
          }
          window.refreshAdminUI();
        };

        window.openGenericModal = function(title, msg, iconName = 'info') {
          const tEl = document.getElementById('modalTitle');
          const mEl = document.getElementById('modalMessage');
          const iEl = document.getElementById('modalIcon');
          const mod = document.getElementById('genericModal');

          if (tEl) tEl.textContent = title;
          if (mEl) mEl.textContent = msg;
          if (iEl) iEl.setAttribute('data-lucide', iconName);
          mod?.classList.remove('hidden');
          if (window.lucide) window.lucide.createIcons();
        };

        window.showToast = function(message, type = 'info') {
          const container = document.getElementById('toastContainer');
          if (!container) return;
          const toast = document.createElement('div');
          
          let borderClass = 'border-[#272B36]';
          let icon = 'info';
          if (type === 'success') { borderClass = 'border-green-500'; icon = 'check-circle'; }
          if (type === 'error') { borderClass = 'border-red-500'; icon = 'x-circle'; }
          if (type === 'warning') { borderClass = 'border-yellow-500'; icon = 'alert-triangle'; }

          toast.className = \`pointer-events-auto p-4 rounded-xl bg-[#16181F] border \${borderClass} shadow-xl flex items-center gap-3 text-sm text-white max-w-sm transition-all transform translate-y-2 opacity-0\`;
          toast.innerHTML = \`
            <i data-lucide="\${icon}" class="w-5 h-5 flex-shrink-0 text-[#FF1E27]"></i>
            <span>\${window.escapeHtml(message)}</span>
          \`;
          container.appendChild(toast);
          if (window.lucide) window.lucide.createIcons();

          requestAnimationFrame(() => {
            toast.classList.remove('translate-y-2', 'opacity-0');
          });

          setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-x-4');
            setTimeout(() => toast.remove(), 400);
          }, 4000);
        };

        window.escapeHtml = function(text) {
          if (!text) return '';
          const div = document.createElement('div');
          div.textContent = text;
          return div.innerHTML;
        };

        window.addEventListener('DOMContentLoaded', () => {
          if (window.lucide) window.lucide.createIcons();
          window.router.navigate('home');
          window.togglePaymentInputs();
        });
      `}} />
    </>
  );
}