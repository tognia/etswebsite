import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { expertises, getExpertiseBySlug } from "../data/expertises";

export default function ExpertisePage() {
  const { slug } = useParams();
  const expertise = getExpertiseBySlug(slug);

  if (!expertise) {
    return <Navigate to="/#expertise" replace />;
  }

  const otherExpertises = expertises.filter((item) => item.slug !== expertise.slug);

  return (
    <main className="min-h-screen bg-brand-white text-blue-950">
      <section className="relative min-h-[78vh] pt-36 pb-16 overflow-hidden flex items-end">
        <img
          src={expertise.heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/55 to-brand-white" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link
            to="/#expertise"
            className="inline-flex items-center gap-2 text-white/80 hover:text-brand-orange transition-colors text-sm font-bold uppercase tracking-widest mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Toutes les expertises
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 bg-brand-orange text-brand-black flex items-center justify-center">
                  <expertise.icon className="w-8 h-8" />
                </div>
                <span className="text-brand-orange font-black tracking-[0.35em] uppercase text-xs">
                  Expertise BTP
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-none text-white mb-8">
                {expertise.title}
              </h1>
              <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-3xl border-l-4 border-brand-orange pl-6">
                {expertise.intro}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="lg:col-span-5 bg-white/95 shadow-2xl border border-white/40"
            >
              <img
                src={expertise.image}
                alt={`Projet illustrant l'expertise ${expertise.title}`}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-2">
                  Champ d'intervention
                </p>
                <p className="text-blue-950 font-semibold leading-relaxed">
                  {expertise.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-8">
                <div className="h-px w-10 bg-brand-orange" />
                <h2 className="text-3xl md:text-4xl font-black uppercase italic">
                  Prestations clés
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="bg-slate-50 border border-gray-100 p-5 flex gap-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5 bg-blue-950 text-white p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-7 h-7 text-brand-orange" />
                <h2 className="text-2xl font-black uppercase italic">
                  Livrables
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
                {expertise.deliverables.map((deliverable) => (
                  <div key={deliverable} className="bg-blue-950 p-5">
                    <p className="font-bold text-white">{deliverable}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/devisPage"
                className="mt-8 inline-flex items-center justify-center gap-2 w-full bg-brand-orange text-brand-black px-6 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-xs">
                Méthode
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-none mt-4">
                Une exécution structurée
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertise.process.map((step, index) => (
                <div key={step} className="bg-white border border-gray-100 p-6">
                  <div className="text-brand-orange font-black text-3xl italic mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-blue-950 font-bold leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-brand-orange font-black tracking-[0.3em] uppercase text-xs">
                Références
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic mt-4">
                Applications concrètes
              </h2>
            </div>
            <Link
              to="/projectsPage"
              className="inline-flex items-center gap-2 text-blue-950 font-black uppercase tracking-widest hover:text-brand-orange transition-colors"
            >
              Voir les réalisations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
            {expertise.relatedProjects.map((project) => (
              <div key={project} className="bg-white p-8">
                <p className="text-xl font-black uppercase text-blue-950">
                  {project}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherExpertises.map((item) => (
              <Link
                key={item.slug}
                to={`/expertise/${item.slug}`}
                className="group bg-blue-950 text-white p-6 hover:bg-brand-orange hover:text-brand-black transition-colors"
              >
                <item.icon className="w-8 h-8 mb-5 text-brand-orange group-hover:text-brand-black transition-colors" />
                <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">
                  Autre expertise
                </p>
                <h3 className="text-xl font-black uppercase">{item.shortTitle}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
