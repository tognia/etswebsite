import { motion } from "motion/react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Pont de la Sanaga",
    category: "Génie Civil",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Axe Yaoundé-Douala",
    category: "Routes",
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Complexe Résidentiel Bastos",
    category: "Bâtiment",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Zone Industrielle Kribi",
    category: "Génie Civil",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Réfection Urbaine Douala",
    category: "Routes",
    image:
      "https://images.unsplash.com/photo-1590486803833-ffc6f78d284b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Siège Social Banque",
    category: "Bâtiment",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
];

const categories = ["Tous", "Génie Civil", "Bâtiment", "Routes"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-brand-white text-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-300 via-blue-950 to-transparent ">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic leading-none mb-6">
              Nos <span className="text-brand-orange">Réalisations</span>
            </h2>
            <div className="flex flex-wrap gap-4 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all border ${
                    activeCategory === cat
                      ? "bg-brand-orange border-brand-orange text-brand-black"
                      : "border-white/20 text-white hover:border-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="text-8xl font-black text-white/5 select-none hidden lg:block">
            02
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative aspect-[4/5] overflow-hidden bg-gray-900"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-brand-orange text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-black uppercase italic leading-tight">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
