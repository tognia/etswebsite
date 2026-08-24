import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { getProjects } from "../data/projects"; // Assurez-vous que ce fichier existe et exporte une liste de projets
import { ArrowRight, MapPin } from "lucide-react";
import { useLanguage, withLocale } from "../lib/i18n";

export default function Portfolio() {
  const locale = useLanguage();
  const localizedProjects = getProjects(locale);
  const featuredProject = localizedProjects[0];
  const previewProjects = localizedProjects.slice(1, 4);

  return (
    <section id="portfolio" className="py-24 lg:py-28 bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-brand-orange" />
              <span className="text-brand-orange font-black tracking-[0.28em] uppercase text-xs">
                {locale === "en" ? "Delivered works" : "Chantiers livrés"}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic leading-none mb-6">
              {locale === "en" ? "Our" : "Nos"}{" "}
              <span className="text-brand-orange">
                {locale === "en" ? "Projects" : "Réalisations"}
              </span>
            </h2>
            <p className="text-blue-100/80 text-lg leading-relaxed border-l-4 border-brand-orange pl-6">
              {locale === "en"
                ? "Technical works delivered with constant attention to quality, coordination, and deadlines."
                : "Des ouvrages techniques menés avec une exigence constante sur la qualité, la coordination et la tenue des délais."}
            </p>
          </div>
          <Link
            to={withLocale("/projectsPage", locale)}
            className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest hover:text-brand-orange transition-colors"
          >
            {locale === "en" ? "All projects" : "Tous les projets"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Link to={withLocale(`/project/${featuredProject.id}`, locale)} className="lg:col-span-7">
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative min-h-[520px] overflow-hidden bg-gray-900 border border-white/10"
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/35 to-transparent" />
              <div className="absolute left-0 top-0 bg-brand-orange text-brand-black px-5 py-3 text-xs font-black uppercase tracking-widest">
                {locale === "en" ? "Featured project" : "Projet phare"}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-brand-orange font-black uppercase tracking-widest text-xs mb-3">
                  {featuredProject.category}
                </p>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic leading-tight mb-4">
                  {featuredProject.title}
                </h3>
                <div className="flex items-center gap-2 text-white/75 text-sm font-semibold">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  {featuredProject.location}
                </div>
              </div>
            </motion.div>
          </Link>

          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {previewProjects.map((project) => (
              <Link to={withLocale(`/project/${project.id}`, locale)} key={project.id}>
                <motion.div
                  whileHover={{ x: 6 }}
                  className="group grid grid-cols-[120px_1fr] sm:grid-cols-[180px_1fr] min-h-40 overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-5 flex flex-col justify-center">
                    <p className="text-brand-orange font-black uppercase tracking-widest text-[11px] mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-lg md:text-xl font-black uppercase leading-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm">{project.location}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
