import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-brand-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070"
          alt="Construction site"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-brand-orange" />
            <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm">
              Génie Civil & BTP au Cameroun
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] mb-8 uppercase italic">
            Bâtir l'avenir <br />
            <span className="text-brand-orange">avec précision</span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
            ETS N MOISE transforme vos visions en infrastructures durables. 
            Expertise reconnue en travaux publics, routes et génie civil à travers tout le Cameroun.
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

      {/* Decorative vertical line */}
      <div className="absolute right-10 bottom-0 top-0 w-px bg-white/10 hidden lg:block" />
    </section>
  );
}
