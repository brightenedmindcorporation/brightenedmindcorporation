"use client";

/** Floating WhatsApp button: brand green, the real logo, a soft pulse and a label that slides out on hover. */
export default function WhatsappFloat() {
  return (
    <a
      href="https://wa.me/243988830799?text=Bonjour%20Brightened%20Mind%20Corporation%2C%20je%20souhaite%20avoir%20des%20informations."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="group fixed bottom-16 right-6 z-50 flex items-center gap-0 rounded-full bg-gradient-to-br from-[#2fe07a] to-[#12a150] pl-0 text-white shadow-[0_10px_30px_-6px_rgba(18,161,80,0.7)] ring-4 ring-white/70 transition-all duration-300 hover:gap-2 hover:pl-5 hover:shadow-[0_14px_36px_-6px_rgba(18,161,80,0.85)] focus-visible:gap-2 focus-visible:pl-5 focus-visible:outline-none"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100">
        Écrivez-nous
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:hidden" aria-hidden="true" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.19 1.6 6.01L4 29l8.17-1.57a12 12 0 0 0 3.87.64C22.67 28.07 28 22.67 28 16.04 28 9.4 22.67 3 16.04 3Zm0 22.05c-1.2 0-2.38-.27-3.45-.78l-.5-.24-4.85.93.96-4.7-.27-.52a9.96 9.96 0 0 1-1.38-5.06c0-5.5 4.5-9.97 10.01-9.97 5.5 0 9.96 4.47 9.96 9.97 0 5.5-4.46 10.37-9.96 10.37Zm5.47-7.45c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </span>
    </a>
  );
}
