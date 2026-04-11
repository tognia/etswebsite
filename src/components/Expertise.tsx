import { motion } from 'motion/react';
import { Building2, Waypoints, Construction, Ruler } from 'lucide-react';

const expertises = [
  {
    title: 'Génie Civil',
    description: 'Conception et réalisation d\'ouvrages d\'art, ponts et infrastructures complexes.',
    icon: Construction,
  },
  {
    title: 'Bâtiment',
    description: 'Construction de bâtiments industriels, commerciaux et résidentiels de haute qualité.',
    icon: Building2,
  },
  {
    title: 'Travaux Routiers',
    description: 'Aménagement, bitumage et entretien des réseaux routiers urbains et ruraux.',
    icon: Waypoints,
  },
  {
    title: 'Études & Conseil',
    description: 'Expertise technique, levés topographiques et planification stratégique de projets.',
    icon: Ruler,
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic leading-none mb-6">
              Notre <span className="text-brand-orange">Expertise</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Une approche rigoureuse et des équipements de pointe pour garantir la solidité de vos projets.
            </p>
          </div>
          <div className="text-8xl font-black text-gray-100 select-none hidden lg:block">
            01
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {expertises.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 hover:bg-brand-black hover:text-white transition-all group cursor-default"
            >
              <item.icon className="w-12 h-12 text-brand-orange mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
