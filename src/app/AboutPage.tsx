import { motion } from "motion/react";
import {
  HardHat,
  ShieldCheck,
  Briefcase,
  Award,
  Users,
  Target,
} from "lucide-react";
import { useLanguage } from "../lib/i18n";

export default function AboutPage() {
  const locale = useLanguage();
  // Chiffres clés de l'entreprise (Données institutionnelles BTP)
  const stats =
    locale === "en"
      ? [
          { label: "Years of Experience", value: "+25" },
          { label: "Sites Delivered", value: "+50" },
          { label: "Major Projects", value: "10" },
          { label: "Regional Offices", value: "02" },
        ]
      : [
          { label: "Années d'Expérience", value: "+25" },
          { label: "Chantiers Livrés", value: "+50" },
          { label: "Projets d'Envergure", value: "10" },
          { label: "Bureaux régionaux", value: "02" },
        ];

  // Engagements et piliers de l'entreprise
  const pillars =
    locale === "en"
      ? [
          {
            icon: <ShieldCheck className="w-8 h-8 text-brand-orange" />,
            title: "Rigor & Safety",
            description:
              "Strict compliance with safety and engineering standards, technical norms, ZIAS controls, and ARMP requirements across our sites.",
          },
          {
            icon: <HardHat className="w-8 h-8 text-brand-orange" />,
            title: "Civil Engineering & Building Expertise",
            description:
              "From major rehabilitation of health infrastructure to the construction of complex works throughout Cameroon.",
          },
          {
            icon: <Target className="w-8 h-8 text-brand-orange" />,
            title: "Long-Term Commitment",
            description:
              "Building solid infrastructure designed to last for generations and adapted to local geographic and climate realities.",
          },
        ]
      : [
          {
            icon: <ShieldCheck className="w-8 h-8 text-brand-orange" />,
            title: "Rigueur & Sécurité",
            description:
              "Le strict respect des normes de sécurité et d'ingénierie (normes techniques, contrôle ZIAS, conformité ARMP) sur l'ensemble de nos chantiers.",
          },
          {
            icon: <HardHat className="w-8 h-8 text-brand-orange" />,
            title: "Expertise Génie Civil & Bâtiment",
            description:
              "De la réhabilitation lourde d'infrastructures sanitaires à la construction d'ouvrages complexes partout au Cameroun.",
          },
          {
            icon: <Target className="w-8 h-8 text-brand-orange" />,
            title: "Engagement Durable",
            description:
              "Bâtir des infrastructures solides capables de traverser les générations, adaptées aux réalités géographiques et climatiques locales.",
          },
        ];

  return (
    <main className="min-h-screen bg-brand-white text-blue-950 pt-32 pb-24 relative overflow-hidden">
      {/* Filigrane décoratif d'arrière-plan */}
      <div className="absolute right-10 top-24 text-9xl font-black text-gray-100 select-none hidden lg:block uppercase italic">
        01
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION 1 : EN-TÊTE DE LA PAGE */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-brand-orange" />
            <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm">
              {locale === "en" ? "Who we are" : "Qui sommes-nous"}
            </span>
          </div>
          <h2 className="text-6xl md:text-5xl font-display font-black uppercase italic leading-[0.9] mb-8">
            {locale === "en" ? "About" : "À PROPOS DE"} <br />
            <span className="bg-gradient-to-r from-blue-950 via-sky-600 to-blue-900 bg-clip-text text-transparent">
              ETS N MOISE
            </span>
          </h2>
        </div>

        {/* SECTION 2 : PRÉSENTATION INSTITUTIONNELLE & LEADERSHIP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          {/* Bloc texte (7 colonnes) */}
          <div className="lg:col-span-7 space-y-6 text-gray-700 text-lg leading-relaxed">
            <p className="font-bold text-xl text-blue-950">
              {locale === "en" ? (
                <>
                  Founded on values of technical precision and excellence,
                  <span className="text-brand-orange"> ETS N MOISE</span> has
                  become a reference player in civil engineering, building
                  construction, and technical studies in Cameroon.
                </>
              ) : (
                <>
                  Fondée sur des valeurs de précision technique et d'excellence,
                  l'entreprise
                  <span className="text-brand-orange"> ETS N MOISE</span> s'impose
                  comme un acteur de référence dans les secteurs du Génie Civil, du
                  Bâtiment et des Études techniques au Cameroun.
                </>
              )}
            </p>
            <p>
              {locale === "en"
                ? "From our head office, we manage strategic projects of national and international scope. Our expertise covers the construction of complex public infrastructure, major renovation of advanced high-biosafety scientific laboratories, and the construction of institutional architectural landmarks."
                : "Depuis notre siège social, nous pilotons des projets stratégiques d'envergure nationale et internationale. Notre savoir-faire englobe la construction d'infrastructures publiques complexes, la rénovation lourde de laboratoires scientifiques de pointe à haute bio-sécurité, ainsi que l'édification de monuments architecturaux institutionnels."}
            </p>
            <p>
              {locale === "en"
                ? "Through effective collaboration with international funding organizations such as USAID and USA-CDC, along with rigorous control firms, we provide concrete, durable, and tailored responses to the infrastructure challenges of public and private project owners."
                : "Grâce à une synergie performante avec des organismes de financement internationaux (tels que l'USAID ou le USA-CDC) et des cabinets de contrôle rigoureux, nous apportons des réponses concrètes, durables et sur-mesure aux défis infrastructurels des maîtres d'ouvrage publics et privés."}
            </p>
          </div>

          {/* Bloc Directeur Général (5 colonnes) */}
          <div className="lg:col-span-5 bg-brand-black text-white p-8 border border-white/10 relative shadow-2xl">
            {/* Accent orange typique de la charte */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-brand-orange" />

            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {locale === "en" ? "General Management" : "Direction Générale"}
              </h3>
              <h2 className="text-3xl font-display font-black uppercase italic text-white tracking-tight">
                NGNOKAM MOISE
              </h2>
              <p className="text-brand-orange font-bold text-sm tracking-wide uppercase">
                {locale === "en" ? "Founder and General Manager" : "Créateur et Directeur Général"}
              </p>
              <div className="h-px w-full bg-white/10 my-4" />
              <p className="text-gray-400 text-sm leading-relaxed italic">
                {locale === "en"
                  ? "\"Our mission goes far beyond simply handling concrete and steel. At ETS N MOISE, every structure is a commitment to Cameroon's development, a signature of durability, and proof of absolute technical rigor.\""
                  : "\"Notre mission va bien au-delà de la simple manipulation du béton et de l'acier. Chez ETS N MOISE, chaque ouvrage est un engagement envers le développement du Cameroun, une signature de durabilité et une preuve de rigueur technique absolue.\""}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3 : CHIFFRES CLÉS (COMPTEURS) */}
        <div className="bg-[#1f1f1f] border border-white/5 text-white p-12 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 relative">
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand-orange to-transparent" />
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-display font-black text-brand-orange italic">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 4 : NOS VALEURS & PILIERS */}
        <div>
          <div className="flex items-center gap-2 mb-12">
            <div className="h-px w-8 bg-brand-orange" />
            <h2 className="text-2xl font-display font-black uppercase italic text-blue-950">
              {locale === "en" ? "Our Technical Commitments" : "Nos Engagements Techniques"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-8 border border-gray-100 shadow-lg hover:border-brand-orange/30 transition-all group"
              >
                <div className="w-16 h-16 bg-slate-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-brand-black transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold uppercase text-blue-950 mb-3 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
