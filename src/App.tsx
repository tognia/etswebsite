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
import SEO from "./components/SEO";
import ProjectDetail from "./app/project/[id]/page"; // Assurez-vous que ce fichier existe
import DevisPage from "./app/devisPage";
import ProjectsPage from "./app/projectsPage"; // Assurez-vous que ce fichier existe
import AboutPage from "./app/AboutPage"; // Assurez-vous que ce fichier existe
import ExpertisePage from "./app/ExpertisePage";
import { LanguageProvider } from "./lib/i18n";

function HomePage() {
  return (
    <>
      <Hero />
      <Expertise />
      <Portfolio />
      {/* <DevisForm /> */}
      <ContactForm />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="min-h-screen font-sans selection:bg-brand-orange selection:text-brand-black">
          <SEO />
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/en" element={<HomePage />} />

              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/en/project/:id" element={<ProjectDetail />} />

              <Route path="/devisPage" element={<DevisPage />} />
              <Route path="/en/devisPage" element={<DevisPage />} />
              <Route path="/projectsPage" element={<ProjectsPage />} />
              <Route path="/en/projectsPage" element={<ProjectsPage />} />
              <Route path="/aboutPage" element={<AboutPage />} />
              <Route path="/en/aboutPage" element={<AboutPage />} />
              <Route path="/expertise/:slug" element={<ExpertisePage />} />
              <Route path="/en/expertise/:slug" element={<ExpertisePage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
