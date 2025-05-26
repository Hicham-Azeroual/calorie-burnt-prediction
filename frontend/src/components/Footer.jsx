import React from "react";

const Footer = () => (
  <footer
    className="w-full z-30 flex flex-col items-center justify-center px-4 py-6 mt-8"
    style={{ backdropFilter: "blur(16px)" }}
  >
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-white/10 dark:bg-slate-900/70 border-t-4 border-b-4 border-transparent bg-clip-padding flex flex-col md:flex-row items-center justify-between px-8 py-5 shadow-2xl relative overflow-hidden">
      {/* Bordure Gradient Animée */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <linearGradient
              id="footer-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fbbf24">
                <animate
                  attributeName="stop-color"
                  values="#fbbf24;#a78bfa;#f472b6;#fbbf24"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#f472b6">
                <animate
                  attributeName="stop-color"
                  values="#f472b6;#38bdf8;#fbbf24;#f472b6"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="url(#footer-gradient)"
            strokeWidth="8"
            rx="24"
          />
        </svg>
      </div>
      {/* Contenu du Footer */}
      <div className="flex flex-col md:flex-row items-center gap-3 z-10">
        <span className="text-base text-gray-800 dark:text-gray-200 font-semibold">
          © {new Date().getFullYear()} CalorieAI
        </span>
        <span className="hidden md:inline text-gray-400 mx-2">|</span>
        <span className="text-base text-gray-700 dark:text-gray-300">
          Fait avec <span className="text-pink-400">♥</span> pour votre santé
        </span>
      </div>
      <div className="flex items-center gap-5 mt-3 md:mt-0 z-10">
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-300 transition-colors text-2xl"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            width="1.5em"
            height="1.5em"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-2xl"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            width="1.5em"
            height="1.5em"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
          </svg>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-300 transition-colors text-2xl"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            width="1.5em"
            height="1.5em"
          >
            <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
          </svg>
        </a>
      </div>
      <div className="absolute bottom-2 right-6 z-10 text-xs text-gray-400 dark:text-gray-500 font-mono animate-pulse select-none">
        Suivez-nous pour les mises à jour !
      </div>
    </div>
  </footer>
);

export default Footer;
