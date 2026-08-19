import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import logo from "../public/brand/logo.png";
import { projects } from "../data/projects";
import { getExpertiseBySlug } from "../data/expertises";

const SITE_NAME = "ETS N MOISE";
const DEFAULT_DESCRIPTION =
  "ETS N MOISE est une entreprise de BTP au Cameroun, specialisee en genie civil, batiment, travaux publics, renovation de laboratoires et infrastructures durables.";
const DEFAULT_KEYWORDS =
  "ETS N MOISE, BTP Cameroun, genie civil Cameroun, entreprise de construction Cameroun, travaux publics, batiment Yaounde, renovation laboratoire, devis construction";

const routeMeta = {
  "/": {
    title: "ETS N MOISE | Genie civil, batiment et travaux publics au Cameroun",
    description: DEFAULT_DESCRIPTION,
  },
  "/projectsPage": {
    title: "Realisations BTP au Cameroun | ETS N MOISE",
    description:
      "Decouvrez les projets livres par ETS N MOISE au Cameroun : laboratoires, batiments publics, renovations techniques et infrastructures de genie civil.",
  },
  "/aboutPage": {
    title: "A propos de l'entreprise BTP ETS N MOISE",
    description:
      "Presentation de ETS N MOISE, entreprise camerounaise de genie civil, batiment et travaux routiers dirigee par NGNOKAM MOISE.",
  },
  "/devisPage": {
    title: "Demander un devis BTP au Cameroun | ETS N MOISE",
    description:
      "Demandez une estimation pour vos travaux de batiment, genie civil, renovation ou infrastructure au Cameroun avec ETS N MOISE.",
  },
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: unknown) {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function getBaseUrl() {
  return window.location.origin.replace(/\/$/, "");
}

export default function SEO() {
  const location = useLocation();

  const metadata = useMemo(() => {
    const baseUrl = getBaseUrl();
    const projectId = location.pathname.match(/^\/project\/([^/]+)/)?.[1];
    const project = location.pathname.startsWith("/project/")
      ? projects.find((item) => String(item.id) === String(projectId))
      : null;
    const expertiseSlug = location.pathname.match(/^\/expertise\/([^/]+)/)?.[1];
    const expertise = expertiseSlug ? getExpertiseBySlug(expertiseSlug) : null;

    const pageMeta = project
      ? {
          title: `${project.title} | Realisation BTP ETS N MOISE`,
          description:
            project.description ||
            `Projet ${project.category} livre par ETS N MOISE a ${project.location}.`,
          image: project.image,
          type: "article",
        }
      : expertise
        ? {
            title: `${expertise.title} au Cameroun | ETS N MOISE`,
            description: expertise.intro,
            image: expertise.image,
            type: "article",
          }
      : {
          ...(routeMeta[location.pathname as keyof typeof routeMeta] || routeMeta["/"]),
          image: logo,
          type: "website",
        };

    const canonicalPath = location.pathname === "/" ? "/" : location.pathname;
    const canonicalUrl = `${baseUrl}${canonicalPath}`;
    const imageUrl = new URL(pageMeta.image, baseUrl).toString();

    return {
      ...pageMeta,
      canonicalUrl,
      imageUrl,
      baseUrl,
      project,
      expertise,
    };
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.lang = "fr-CM";
    document.title = metadata.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: metadata.description,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: DEFAULT_KEYWORDS,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large",
    });
    upsertMeta('meta[name="author"]', {
      name: "author",
      content: SITE_NAME,
    });

    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: metadata.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: metadata.description,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: metadata.type,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: metadata.canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: metadata.imageUrl,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "fr_CM",
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: metadata.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: metadata.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: metadata.imageUrl,
    });

    upsertLink("canonical", metadata.canonicalUrl);

    upsertJsonLd("seo-organization", {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: metadata.baseUrl,
      image: metadata.imageUrl,
      logo: new URL(logo, metadata.baseUrl).toString(),
      description: DEFAULT_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Yaounde",
        addressCountry: "CM",
      },
      areaServed: "Cameroon",
      telephone: "+237699878271",
      email: "ngnokamoise@yahoo.fr",
      sameAs: ["https://www.instagram.com/etsnmoise"],
      knowsAbout: [
        "Genie civil",
        "Batiment",
        "Travaux publics",
        "Renovation de laboratoires",
      ],
    });

    upsertJsonLd("seo-page", {
      "@context": "https://schema.org",
      "@type": metadata.project ? "CreativeWork" : "WebPage",
      name: metadata.title,
      url: metadata.canonicalUrl,
      description: metadata.description,
      image: metadata.imageUrl,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      ...(metadata.project
        ? {
            about: metadata.project.category,
            contentLocation: metadata.project.location,
          }
        : {}),
      ...(metadata.expertise
        ? {
            about: metadata.expertise.title,
            serviceType: metadata.expertise.title,
          }
        : {}),
    });
  }, [metadata]);

  return null;
}
