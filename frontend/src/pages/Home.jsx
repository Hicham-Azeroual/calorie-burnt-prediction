import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChartLine, FaBrain, FaHeartbeat } from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Prédisez Votre{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Dépense Calorique
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Utilisez la puissance de l'apprentissage automatique pour prédire
              avec précision votre dépense calorique pendant l'exercice. Obtenez
              des conseils personnalisés et optimisez votre parcours fitness.
            </p>
            <Link
              to="/predict"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              aria-label="Commencer à utiliser l'outil de prédiction calorique"
            >
              Commencer
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 dark:bg-slate-900/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <FaChartLine className="text-blue-400 text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Prédictions Précises
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Notre modèle d'apprentissage automatique avancé fournit des
              prédictions précises de dépense calorique basées sur vos données
              d'activité.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 dark:bg-slate-900/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <FaBrain className="text-purple-400 text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Analyse Intelligente
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Obtenez des conseils détaillés et des recommandations pour
              optimiser votre routine d'entraînement et atteindre vos objectifs
              fitness.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 dark:bg-slate-900/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
              <FaHeartbeat className="text-pink-400 text-2xl" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Focus Santé
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Suivez vos progrès et maintenez un mode de vie sain avec nos
              fonctionnalités complètes de surveillance de la santé.
            </p>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Prêt à Optimiser Vos Entraînements ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Commencez à utiliser notre outil de prédiction calorique avancé dès
              aujourd'hui et faites passer votre parcours fitness au niveau
              supérieur.
            </p>
            <Link
              to="/predict"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              aria-label="Essayer l'outil de prédiction calorique maintenant"
            >
              Essayer Maintenant
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Home;