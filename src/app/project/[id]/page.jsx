import { projects } from "../../projects";
import { notFound } from "dist/client/components/not-found";

export default async function ProjectDetail({ params }) {
  // On récupère l'id depuis l'URL
  const { id } = await params; 
  const project = projects.find((p) => p.id === parseInt(id));

  // Si le projet n'existe pas, on renvoie une erreur 404
  if (!project) {
    notFound();
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
      {/* Ajoutez ici une description détaillée, photos supplémentaires, etc. */}
    </div>
  );
}