import { useParams } from "react-router-dom";
import { projects } from "../../../data/projects";
// Import Swiper React components et styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="pt-32 px-8">
        <h1 className="text-4xl">Projet introuvable</h1>
      </div>
    );
  }

  // On récupère le tableau d'images ou on crée un tableau avec l'image unique par défaut
  const gallery = project.images || [project.image];

  return (
    <div className="pt-32 px-8 max-w-7xl mx-auto text-white">
      <h1 className="text-6xl font-black uppercase text-brand-orange">
        {project.title}
      </h1>
      <p className="text-xl mt-4 opacity-80">{project.category}</p>

      {/* Carrousel d'images */}
      <div className="mt-8 rounded-lg overflow-hidden border border-white/10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-[500px] w-full"
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

      <div className="mt-12 prose prose-invert">
        <h2 className="text-2xl font-bold">À propos du projet</h2>
        <p>Description détaillée des travaux de {project.category} effectués...</p>
      </div>
    </div>
  );
}