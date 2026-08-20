import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { expertises } from "../data/expertises";

const metrics = [
  { value: "+25", label: "ans d'expérience" },
  { value: "+50", label: "chantiers livrés" },
  { value: "02", label: "bureaux régionaux" },
];

const assurances = [
  { icon: ShieldCheck, label: "Contrôle qualité" },
  { icon: ClipboardCheck, label: "Études chiffrées" },
  { icon: MapPinned, label: "Intervention Cameroun" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = expertises[currentIndex];

  // Auto-play : Change d'image toutes des 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === expertises.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? expertises.length - 1 : prev - 1));
  };

  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-blue-950 pt-32 pb-10">
      {/* Diaporama Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide.slug}
            src={currentSlide.image}
            alt={`Service ${currentSlide.title}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.82, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay Dégradé */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-950/50 to-blue-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/78 via-transparent to-blue-950/25" />
      </div>

      {/* Contenu Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-brand-orange" />
              <span className="text-brand-orange font-black tracking-[0.28em] uppercase text-xs sm:text-sm">
                {currentSlide.shortTitle} au Cameroun
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 uppercase italic">
              {currentSlide.title}
            </h1>

            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed border-l-4 border-brand-orange pl-6">
              {currentSlide.intro}
            </p>

            <div className="flex flex-wrap gap-4">
              <HashLink
                to={`/expertise/${currentSlide.slug}`}
                className="px-7 py-4 bg-brand-orange text-brand-black font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 group"
              >
                Découvrir ce service
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </HashLink>
              <HashLink
                to="#portfolio"
                className="px-7 py-4 border border-white/30 text-white font-black uppercase tracking-widest hover:bg-white hover:text-blue-950 transition-all"
              >
                Nos projets
              </HashLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-3 gap-px bg-white/20 border border-white/20">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-blue-950/65 p-5 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-black italic text-brand-orange">
                    {metric.value}
                  </div>
                  <div className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-white/75 mt-2">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {assurances.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-white/10 border border-white/15 px-4 py-3 backdrop-blur-sm text-white"
                >
                  <item.icon className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {expertises.map((item, index) => (
              <button
                key={item.slug}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 transition-all ${
                  currentIndex === index
                    ? "w-10 bg-brand-orange"
                    : "w-5 bg-white/35 hover:bg-white/70"
                }`}
                aria-label={`Voir le service ${item.title}`}
              />
            ))}
          </div>

          <div className="hidden sm:flex gap-3">
            <button
              onClick={prevSlide}
              className="p-3 border border-white/25 text-white hover:bg-brand-orange hover:border-brand-orange hover:text-black transition-all"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 border border-white/25 text-white hover:bg-brand-orange hover:border-brand-orange hover:text-black transition-all"
              aria-label="Suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
