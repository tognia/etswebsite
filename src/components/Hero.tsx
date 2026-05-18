import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Tes imports d'images
import diapo1 from "../public/brand/diapo1.png";
import diapo2 from "../public/brand/diapo2.png";
import diapo3 from "../public/brand/diapo3.png";
import diapo4 from "../public/brand/diapo4.png";
import diapo5 from "../public/brand/diapo5.png";

const images = [
  { id: 1, src: diapo1, alt: "Projet BTP 1" },
  { id: 2, src: diapo2, alt: "Projet BTP 2" },
  { id: 3, src: diapo3, alt: "Projet BTP 3" },
  // Ajoute l'image Unsplash par défaut si tu veux la garder dans la boucle
  { id: 4, src: diapo4, alt: "Projet BTP 4" },
  { id: 5, src: diapo5, alt: "Projet BTP 5" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play : Change d'image toutes des 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-blue-950">
      {/* Diaporama Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex].id}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay Dégradé */}
        <div className="absolute inset-0 " />
      </div>

      {/* Contenu Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-brand-orange" />
            {/* <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm">
              Génie Civil & BTP au Cameroun
            </span> */}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-[0.9] mb-8 uppercase italic">
            Bâtir
            <br />
            <span className="text-brand-orange">avec assurrance</span>
          </h1>

          <p className="text-blue-950 text-lg mb-10 max-w-lg leading-relaxed">
            ETS N MOISE transforme vos visions en infrastructures durables.
            Expertise reconnue en travaux publics et génie civil à travers tout
            le Cameroun.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#devis"
              className="px-8 py-4 bg-brand-orange text-brand-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 group"
            >
              Demander un devis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Nos Projets
            </a>
          </div>
        </motion.div>
      </div>

      {/* Contrôles Manuels (Flèches) */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        <button
          onClick={prevSlide}
          className="p-3 border border-white/20 text-white hover:bg-brand-orange hover:text-black transition-all"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 border border-white/20 text-white hover:bg-brand-orange hover:text-black transition-all"
          aria-label="Suivant"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Ligne décorative */}
      {/* <div className="absolute right-24 bottom-0 top-0 w-px bg-white/10 hidden lg:block" /> */}
    </section>
  );
}
