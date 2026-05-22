import { Send, Upload, CheckCircle2, Loader2, FileText } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects"; // Assurez-vous que ce fichier existe et exporte une liste de projets
import { useState } from "react";

const categories = [""]; //"Tous","Génie Civil", "Bâtiment", "Infrastructures", "Autres"

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("");

  const filteredProjects =
    activeCategory === ""
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-brand-white text-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-300 via-blue-950 to-transparent">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic leading-none mb-6">
              Nos <span className="text-brand-orange">Réalisations</span>
            </h2>
            {/* <div className="flex flex-wrap gap-4 mt-8">
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
            </div> */}
          </div>
          <div className="text-8xl font-black text-white/5 select-none hidden lg:block">
            02
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id}>
              <motion.div
                whileHover={{ y: -10 }} // Petite animation au survol
                className="group relative aspect-[4/5] overflow-hidden bg-gray-900 cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
