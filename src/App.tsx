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
                  <DevisForm />
                  <ContactForm />
                </>
              }
            />

            {/* Route dynamique pour les détails de projet */}
            <Route
              path="/project/:id"
              element={<ProjectDetail />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
