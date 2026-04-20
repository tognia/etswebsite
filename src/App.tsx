/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Expertise from "./components/Expertise";
import Portfolio from "./components/Portfolio";
import DevisForm from "./components/DevisForm";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen font-sans selection:bg-brand-orange selection:text-brand-black">
        <Navbar />
        <main>
          <Hero />
          <Expertise />
          <Portfolio />
          <DevisForm />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
