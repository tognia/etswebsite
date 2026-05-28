/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom"; // Import nécessaire
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Expertise from "./components/Expertise";
import Portfolio from "./components/Portfolio";
import DevisForm from "./components/DevisForm";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ProjectDetail from "./app/project/[id]/page"; // Assurez-vous que ce fichier existe
import DevisPage from "./app/devisPage";
import ProjectsPage from "./app/projectsPage"; // Assurez-vous que ce fichier existe
import AboutPage from "./app/AboutPage"; // Assurez-vous que ce fichier existe

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen font-sans selection:bg-brand-orange selection:text-brand-black">
        <Navbar />

        <main>
          {/* Définition des routes */}
          <Routes>
            {/* Route principale : Accueil */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Expertise />
                  <Portfolio />
                  {/* <DevisForm /> */}
                  <ContactForm />
                </>
              }
            />

            {/* Route dynamique pour les détails de projet */}
            <Route path="/project/:id" element={<ProjectDetail />} />

            {/* Route pour la page de demande de devis */}
            <Route path="/devisPage" element={<DevisPage />} />
            {/* Route pour la page de projets */}
            <Route path="/projectsPage" element={<ProjectsPage />} />
            {/* Route pour la page À PROPOS */}
            <Route path="/aboutPage" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
