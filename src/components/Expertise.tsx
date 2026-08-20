import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { expertises } from "../data/expertises";
import building from "../public/backgrounds/building.png";

export default function Expertise() {
  return (
    <section id="expertise" className="relative py-24 lg:py-28 overflow-hidden">
      {/* Background Layer - Image de bâtiment floutée en noir et blanc */}
      <div
        className="absolute inset-0 z-0 grayscale opacity-75 blur-[2px] pointer-events-none"
        style={{
          backgroundImage: `url(${building})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay dégradé pour la lisibilité "Furtive" */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-white/95 to-slate-50/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-brand-orange" />
              <span className="text-brand-orange font-black tracking-[0.28em] uppercase text-xs">
                Domaines d'intervention
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-blue-950 uppercase italic leading-none mb-6">
              Notre <span className="text-brand-orange">Expertise</span>
            </h2>
            <p className="text-blue-950/80 text-lg font-medium border-l-4 border-brand-orange pl-6">
              Une approche rigoureuse et des équipements de pointe pour garantir
              la solidité de vos projets.
            </p>
          </div>
          {/* <div className="text-9xl font-black text-blue-950/5 select-none hidden lg:block tracking-tighter">
            01
          </div> */}
        </div>

        {/* Grid avec effet de verre (Glassmorphism) léger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {expertises.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
            >
              <Link
                to={`/expertise/${item.slug}`}
                className="block h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/60"
              >
                <div className="relative h-48 overflow-hidden bg-blue-950">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 to-transparent" />
                  <item.icon className="absolute left-6 bottom-6 w-12 h-12 text-brand-orange group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                </div>

                <div className="p-8">
                  <div className="h-1 w-12 bg-brand-orange mb-6 group-hover:w-20 transition-all duration-500" />

                  <h3 className="text-2xl font-black uppercase mb-4 tracking-tight text-blue-950">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm mb-8">
                    {item.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-orange">
                    Découvrir
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
