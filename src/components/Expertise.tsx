import { motion } from "motion/react";
import { Building2, Waypoints, Construction, Ruler } from "lucide-react";
import building from "../public/backgrounds/building.png";

const expertises = [
  {
    title: "Génie Civil",
    description:
      "Conception et réalisation d'ouvrages et infrastructures complexes.",
    icon: Construction,
  },
  {
    title: "Bâtiment",
    description:
      "Construction de bâtiments industriels, commerciaux et résidentiels de haute qualité.",
    icon: Building2,
  },
  {
    title: "Travaux Routiers",
    description: "Aménagement des réseaux routiers urbains et ruraux.",
    icon: Waypoints,
  },
  {
    title: "Études & Conseil",
    description:
      "Expertise technique, levés topographiques et planification stratégique de projets.",
    icon: Ruler,
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative py-24 overflow-hidden">
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
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-white/90 to-gray-50/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200/50 border border-gray-200 shadow-2xl">
          {expertises.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-10 hover:bg-blue-950 hover:text-white transition-all duration-500 group cursor-default relative overflow-hidden"
            >
              {/* Accent décoratif au survol */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-orange group-hover:h-full transition-all duration-500" />

              <item.icon className="w-12 h-12 text-brand-orange mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />

              <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">
                {item.title}
              </h3>

              <p className="text-gray-500 group-hover:text-gray-300 leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
