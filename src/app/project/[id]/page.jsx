import { useParams, Link } from "react-router-dom";
import { projects } from "../../../data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Calendar, MapPin, Tag, ArrowLeft, ShieldCheck } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="pt-32 px-8 text-center">
        <h1 className="text-4xl font-bold text-cyan-950">Projet introuvable</h1>
        <Link to="/#portfolio" className="text-orange-600 mt-4 inline-block">Retour aux réalisations</Link>
      </div>
    );
  }

  const gallery = project.images || [project.image];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="pt-32 pb-12 px-8 max-w-7xl mx-auto">
        <Link 
          to="/#portfolio" 
          className="flex items-center text-slate-500 hover:text-orange-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Retour au Portfolio
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
          <div className="lg:col-span-2">
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Réalisation {project.category}</span>
            <h1 className="text-4xl md:text-6xl font-black text-cyan-950 mt-2 leading-tight">
              {project.title}
            </h1>
          </div>
          <div className="flex flex-col gap-4 border-l-4 border-orange-500 pl-6 mb-2">
            <div className="flex items-center text-slate-600">
              <MapPin className="mr-2 h-5 w-5 text-cyan-900" />
              <span className="font-medium">Cameroun</span>
            </div>
            <div className="flex items-center text-slate-600">
              <ShieldCheck className="mr-2 h-5 w-5 text-cyan-900" />
              <span className="font-medium">Conformité aux normes BTP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left: Gallery (Sticky) */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000 }}
              className="h-[400px] md:h-[600px] w-full"
            >
              {gallery.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${project.title} - vue ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right: Technical Details */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-cyan-950 mb-6 border-b pb-4">Fiche Technique</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Tag className="mr-4 h-6 w-6 text-orange-600" />
                <div>
                  <p className="text-sm text-slate-400 uppercase font-bold tracking-tighter">Catégorie</p>
                  <p className="text-lg font-semibold text-cyan-900">{project.category}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="mr-4 h-6 w-6 text-orange-600" />
                <div>
                  <p className="text-sm text-slate-400 uppercase font-bold tracking-tighter">Statut</p>
                  <p className="text-lg font-semibold text-cyan-900 italic">Livré / En cours</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-8 bg-cyan-950 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors duration-300">
              Demander un devis similaire
            </button>
          </div>

          <div className="prose prose-slate">
            <h3 className="text-xl font-bold text-cyan-950 mb-4">Description du Chantier</h3>
            <p className="text-slate-600 leading-relaxed">
              {project.description || "Ce projet témoigne de l'expertise de ETS N MOISE dans la réalisation d'infrastructures durables au Cameroun."}
            </p>
            <p className="text-slate-600 leading-relaxed mt-4 italic border-l-2 border-slate-200 pl-4">
              Mise en œuvre respectant les délais contractuels et les exigences environnementales locales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}