import { Building2, Construction, Handshake, Ruler } from "lucide-react";
import building from "../public/backgrounds/building.png";
import nphlmainlab from "../public/brand/nphlmainlab.png";
import cathedrale from "../public/brand/cathedrale.png";
import maroua from "../public/brand/maroua.png";
import tcholere from "../public/brand/tcholere.png";
import assistanceFonciereChantier from "../public/brand/assistance-fonciere-chantier-generated.jpg";

export const expertises = [
  {
    slug: "genie-civil",
    title: "Génie Civil",
    shortTitle: "Génie Civil",
    description:
      "Conception et réalisation d'ouvrages et infrastructures complexes.",
    intro:
      "ETS N MOISE accompagne les maîtres d'ouvrage dans la conception, la construction et la réhabilitation d'infrastructures exigeantes, avec une attention constante portée à la stabilité, à la durabilité et au respect des normes techniques.",
    icon: Construction,
    image: cathedrale,
    heroImage: building,
    highlights: [
      "Ouvrages en béton armé et structures porteuses",
      "Réhabilitation lourde d'infrastructures publiques",
      "Gestion technique de chantiers à contraintes fortes",
      "Coordination avec bureaux de contrôle et partenaires institutionnels",
    ],
    process: [
      "Diagnostic du site et analyse des contraintes structurelles",
      "Préparation des méthodes d'exécution et des quantitatifs",
      "Pilotage des travaux avec contrôle qualité continu",
      "Réception technique et remise du dossier d'ouvrage",
    ],
    deliverables: [
      "Notes techniques",
      "Planning d'exécution",
      "Suivi qualité chantier",
      "Dossier de réception",
    ],
    relatedProjects: ["Cathédrale de Maroua", "Rénovation LANAVET"],
  },
  {
    slug: "batiment",
    title: "Bâtiment",
    shortTitle: "Bâtiment",
    description:
      "Construction de bâtiments industriels, commerciaux et résidentiels de haute qualité.",
    intro:
      "Notre équipe réalise des bâtiments publics, professionnels et résidentiels en intégrant les exigences architecturales, fonctionnelles et techniques propres à chaque usage.",
    icon: Building2,
    image: nphlmainlab,
    heroImage: maroua,
    highlights: [
      "Construction neuve et rénovation de bâtiments",
      "Laboratoires, logements, équipements publics et locaux professionnels",
      "Finitions adaptées au niveau d'exigence du projet",
      "Suivi des corps d'état jusqu'à la livraison",
    ],
    process: [
      "Lecture du programme et vérification des plans",
      "Organisation des approvisionnements et des équipes",
      "Exécution du gros oeuvre, second oeuvre et finitions",
      "Contrôle final des réserves avant livraison",
    ],
    deliverables: [
      "Méthodologie chantier",
      "Décompte estimatif",
      "Suivi d'avancement",
      "PV de livraison",
    ],
    relatedProjects: [
      "Laboratoire National de Santé Publique",
      "Training Laboratory",
      "Maternité de Tcholéré",
    ],
  },
  {
    slug: "etudes-conseil",
    title: "Études & Conseil",
    shortTitle: "Études & Conseil",
    description:
      "Expertise technique, levés topographiques et planification stratégique de projets.",
    intro:
      "Avant les travaux, ETS N MOISE aide à cadrer les choix techniques, les budgets et les délais. Cette phase sécurise les décisions et limite les imprévus pendant l'exécution.",
    icon: Ruler,
    image: tcholere,
    heroImage: building,
    highlights: [
      "Études de faisabilité et avis technique",
      "Levés topographiques et reconnaissance de site",
      "Quantitatifs, estimations et planification",
      "Conseil auprès des maîtres d'ouvrage publics et privés",
    ],
    process: [
      "Collecte des besoins, documents et contraintes du projet",
      "Visite technique et relevés complémentaires",
      "Analyse des options et estimation budgétaire",
      "Restitution des recommandations opérationnelles",
    ],
    deliverables: [
      "Rapport d'étude",
      "Avant-métré",
      "Estimation budgétaire",
      "Recommandations techniques",
    ],
    relatedProjects: [
      "Assistance technique BTP",
      "Préparation de dossiers de travaux",
    ],
  },
  {
    slug: "assistance-fonciere-suivi-chantier",
    title: "Assistance Foncière & Suivi de Chantier",
    shortTitle: "Assistance & Suivi",
    description:
      "Accompagnement terrain, construction et contrôle de chantier pour les clients locaux et la diaspora.",
    intro:
      "ETS N MOISE accompagne les particuliers, investisseurs et membres de la diaspora dans l'acquisition sécurisée de terrains, la préparation des documents utiles, la construction et le suivi à distance des travaux grâce à des rapports réguliers, datés et vérifiables.",
    icon: Handshake,
    image: assistanceFonciereChantier,
    heroImage: assistanceFonciereChantier,
    highlights: [
      "Assistance à l'acquisition de terrain et vérification des documents afférents",
      "Construction neuve, rénovation et coordination des intervenants sur site",
      "Suivi de chantier à distance avec rapports photo, vidéo et avancement authentifié",
      "Contrôle des travaux, conformité des matériaux et vérification des étapes clés",
    ],
    process: [
      "Analyse du besoin, du budget, de la localisation et des pièces disponibles",
      "Vérifications préalables du terrain, cadrage technique et administratif",
      "Mise en place du planning, des contrôles et du format de reporting",
      "Transmission régulière des rapports et arbitrages jusqu'à la réception",
    ],
    deliverables: [
      "Rapport de visite terrain",
      "Checklist documentaire",
      "Rapports d'avancement illustrés",
      "PV de contrôle et réserves",
    ],
    relatedProjects: [
      "Accompagnement diaspora",
      "Suivi de maisons familiales",
      "Contrôle qualité de chantier",
    ],
  },
];

export const expertisesEn = [
  {
    ...expertises[0],
    title: "Civil Engineering",
    shortTitle: "Civil Engineering",
    description:
      "Design and delivery of complex structures and infrastructure.",
    intro:
      "ETS N MOISE supports project owners in the design, construction, and rehabilitation of demanding infrastructure, with constant attention to stability, durability, and technical standards.",
    highlights: [
      "Reinforced concrete works and load-bearing structures",
      "Major rehabilitation of public infrastructure",
      "Technical management of high-constraint construction sites",
      "Coordination with control offices and institutional partners",
    ],
    process: [
      "Site diagnosis and structural constraint analysis",
      "Preparation of execution methods and quantities",
      "Works management with continuous quality control",
      "Technical handover and delivery of the works file",
    ],
    deliverables: [
      "Technical notes",
      "Execution schedule",
      "Site quality monitoring",
      "Handover file",
    ],
    relatedProjects: ["Maroua Cathedral", "LANAVET Renovation"],
  },
  {
    ...expertises[1],
    title: "Building Construction",
    shortTitle: "Building",
    description:
      "High-quality construction of industrial, commercial, and residential buildings.",
    intro:
      "Our team delivers public, professional, and residential buildings while integrating the architectural, functional, and technical requirements specific to each use.",
    highlights: [
      "New construction and building renovation",
      "Laboratories, housing, public facilities, and professional premises",
      "Finishes adapted to each project's required standard",
      "Trade coordination through to final delivery",
    ],
    process: [
      "Program review and plan verification",
      "Organization of supplies and teams",
      "Execution of structural works, finishing trades, and final finishes",
      "Final snagging control before delivery",
    ],
    deliverables: [
      "Site methodology",
      "Estimated bill of quantities",
      "Progress monitoring",
      "Delivery report",
    ],
    relatedProjects: [
      "National Public Health Laboratory",
      "Training Laboratory",
      "Tcholere Maternity Unit",
    ],
  },
  {
    ...expertises[2],
    title: "Studies & Consulting",
    shortTitle: "Studies & Consulting",
    description:
      "Technical expertise, topographic surveys, and strategic project planning.",
    intro:
      "Before work begins, ETS N MOISE helps frame technical choices, budgets, and timelines. This phase secures decisions and limits surprises during execution.",
    highlights: [
      "Feasibility studies and technical opinions",
      "Topographic surveys and site reconnaissance",
      "Quantities, estimates, and planning",
      "Consulting for public and private project owners",
    ],
    process: [
      "Collection of needs, documents, and project constraints",
      "Technical visit and complementary surveys",
      "Option analysis and budget estimate",
      "Delivery of operational recommendations",
    ],
    deliverables: [
      "Study report",
      "Preliminary quantities",
      "Budget estimate",
      "Technical recommendations",
    ],
    relatedProjects: [
      "Construction technical assistance",
      "Preparation of works files",
    ],
  },
  {
    ...expertises[3],
    title: "Land Assistance & Site Monitoring",
    shortTitle: "Assistance & Monitoring",
    description:
      "Field support, construction, and site control for local clients and the diaspora.",
    intro:
      "ETS N MOISE supports individuals, investors, and members of the diaspora with secure land acquisition, preparation of useful documents, construction, and remote site monitoring through regular, dated, and verifiable reports.",
    highlights: [
      "Support for land acquisition and verification of related documents",
      "New construction, renovation, and coordination of on-site contributors",
      "Remote site monitoring with photo, video, and authenticated progress reports",
      "Works control, material compliance, and verification of key stages",
    ],
    process: [
      "Analysis of needs, budget, location, and available documents",
      "Preliminary land checks plus technical and administrative framing",
      "Set-up of the schedule, controls, and reporting format",
      "Regular report transmission and decision support through to handover",
    ],
    deliverables: [
      "Field visit report",
      "Document checklist",
      "Illustrated progress reports",
      "Control and snagging reports",
    ],
    relatedProjects: [
      "Diaspora support",
      "Family home monitoring",
      "Construction quality control",
    ],
  },
];

export function getExpertises(locale: "fr" | "en" = "fr") {
  return locale === "en" ? expertisesEn : expertises;
}

export function getExpertiseBySlug(
  slug: string | undefined,
  locale: "fr" | "en" = "fr",
) {
  return getExpertises(locale).find((expertise) => expertise.slug === slug);
}
