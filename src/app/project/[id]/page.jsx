import { useParams } from "react-router-dom";
import { projects } from "../../../data/projects"; // Assurez-vous que le chemin est correct

export default function ProjectDetail() {
  // 1. On récupère l'id depuis l'URL avec React Router
  const { id } = useParams(); 
  
  // 2. On cherche le projet (on convertit l'ID de string à nombre si nécessaire)
  const project = projects.find((p) => p.id === parseInt(id));

  // 3. Gestion simple si le projet n'existe pas
  if (!project) {
    return (
      <div className="pt-32 px-8">
        <h1 className="text-4xl">Projet introuvable</h1>
      </div>
    );
  }

  return (
    <div className="pt-32 px-8">
      <h1 className="text-6xl font-black uppercase text-brand-orange">
        {project.title}
      </h1>
      <p className="text-xl mt-4">{project.category}</p>
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-[500px] object-cover mt-8 rounded-lg"
      />
      {/* Votre contenu ici */}
    </div>
  );
}