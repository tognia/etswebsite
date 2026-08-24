import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import logo from "../public/brand/logo.png";
import { getProjectById } from "../data/projects";
import { getExpertises, getExpertiseBySlug } from "../data/expertises";
import { isEnglishPath, stripLocalePrefix } from "../lib/i18n";

const SITE_NAME = "ETS N MOISE";
const SITE_URL = "https://etsnmoise.com";
const DEFAULT_DESCRIPTION =
  "ETS N MOISE est une entreprise de BTP au Cameroun specialisee en genie civil, batiment, assistance fonciere, suivi de chantier et infrastructures durables.";
const DEFAULT_KEYWORDS =
  "ETS N MOISE, BTP Cameroun, entreprise BTP Cameroun, genie civil Cameroun, construction Cameroun, batiment Yaounde, travaux publics, assistance fonciere Cameroun, acquisition terrain Cameroun, suivi chantier diaspora, controle travaux, renovation laboratoire, devis construction";

const DEFAULT_DESCRIPTION_EN =
  "ETS N MOISE is a construction company in Cameroon specializing in civil engineering, building construction, land assistance, site monitoring, and durable infrastructure.";
const DEFAULT_KEYWORDS_EN =
  "ETS N MOISE, construction company Cameroon, civil engineering Cameroon, building construction Cameroon, construction Yaounde, public works, land assistance Cameroon, site monitoring diaspora, laboratory renovation, construction quote";

const routeMeta = {
  "/": {
    title: "ETS N MOISE | Entreprise BTP au Cameroun",
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    schemaType: "WebPage",
  },
  "/projectsPage": {
    title: "Realisations BTP au Cameroun | ETS N MOISE",
    description:
      "Decouvrez les chantiers livres par ETS N MOISE au Cameroun : laboratoires, batiments publics, renovations techniques et infrastructures de genie civil.",
    keywords:
      "realisations BTP Cameroun, projets construction Cameroun, renovation laboratoire, batiments publics Cameroun, ETS N MOISE",
    schemaType: "CollectionPage",
  },
  "/aboutPage": {
    title: "A propos de l'entreprise BTP ETS N MOISE",
    description:
      "Presentation de ETS N MOISE, entreprise camerounaise de genie civil, batiment, assistance technique et travaux publics dirigee par NGNOKAM MOISE.",
    keywords:
      "ETS N MOISE, entreprise BTP Yaounde, entreprise construction Cameroun, NGNOKAM MOISE, genie civil Cameroun",
    schemaType: "AboutPage",
  },
  "/devisPage": {
    title: "Demander un devis BTP au Cameroun | ETS N MOISE",
    description:
      "Demandez une estimation pour vos travaux de batiment, genie civil, assistance fonciere, suivi de chantier, renovation ou infrastructure au Cameroun.",
    keywords:
      "devis BTP Cameroun, devis construction Yaounde, devis renovation Cameroun, demande devis chantier, ETS N MOISE",
    schemaType: "ContactPage",
  },
};

const routeMetaEn = {
  "/": {
    title: "ETS N MOISE | Construction Company in Cameroon",
    description: DEFAULT_DESCRIPTION_EN,
    keywords: DEFAULT_KEYWORDS_EN,
    schemaType: "WebPage",
  },
  "/projectsPage": {
    title: "Construction Projects in Cameroon | ETS N MOISE",
    description:
      "Explore projects delivered by ETS N MOISE in Cameroon: laboratories, public buildings, technical renovations, and civil engineering infrastructure.",
    keywords:
      "construction projects Cameroon, building projects Cameroon, laboratory renovation, public buildings Cameroon, ETS N MOISE",
    schemaType: "CollectionPage",
  },
  "/aboutPage": {
    title: "About ETS N MOISE Construction Company",
    description:
      "Presentation of ETS N MOISE, a Cameroonian civil engineering, building construction, technical assistance, and public works company led by NGNOKAM MOISE.",
    keywords:
      "ETS N MOISE, construction company Yaounde, construction company Cameroon, NGNOKAM MOISE, civil engineering Cameroon",
    schemaType: "AboutPage",
  },
  "/devisPage": {
    title: "Request a Construction Quote in Cameroon | ETS N MOISE",
    description:
      "Request an estimate for building construction, civil engineering, land assistance, site monitoring, renovation, or infrastructure works in Cameroon.",
    keywords:
      "construction quote Cameroon, building quote Yaounde, renovation quote Cameroon, site estimate, ETS N MOISE",
    schemaType: "ContactPage",
  },
};

const serviceKeywords = {
  "genie-civil":
    "genie civil Cameroun, ouvrages beton arme, rehabilitation infrastructure, travaux publics Cameroun, entreprise genie civil",
  batiment:
    "construction batiment Cameroun, batiment residentiel Cameroun, batiment commercial, laboratoire BTP, entreprise construction Yaounde",
  "etudes-conseil":
    "etudes BTP Cameroun, conseil construction, leve topographique, estimation travaux, planification chantier",
  "assistance-fonciere-suivi-chantier":
    "assistance fonciere Cameroun, acquisition terrain Cameroun, suivi chantier diaspora, controle travaux Cameroun, rapport chantier a distance",
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
  const origin = window.location.origin.replace(/\/$/, "");
  return origin.includes("localhost") || origin.includes("127.0.0.1")
    ? SITE_URL
    : origin;
}

function absoluteUrl(pathOrAsset: string, baseUrl: string) {
  return new URL(pathOrAsset, baseUrl).toString();
}

function getPathSegments(pathname: string, pathPrefix = "") {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, index) => ({
    "@type": "ListItem",
    position: index + 2,
    name: decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase()),
    item: `${SITE_URL}${pathPrefix}/${segments.slice(0, index + 1).join("/")}`,
  }));
}

export default function SEO() {
  const location = useLocation();

  const metadata = useMemo(() => {
    const baseUrl = getBaseUrl();
    const locale = isEnglishPath(location.pathname) ? "en" : "fr";
    const normalizedPath = stripLocalePrefix(location.pathname);
    const projectId = normalizedPath.match(/^\/project\/([^/]+)/)?.[1];
    const project = normalizedPath.startsWith("/project/")
      ? getProjectById(projectId, locale)
      : null;
    const expertiseSlug = normalizedPath.match(/^\/expertise\/([^/]+)/)?.[1];
    const expertise = expertiseSlug ? getExpertiseBySlug(expertiseSlug, locale) : null;
    const localizedRouteMeta = locale === "en" ? routeMetaEn : routeMeta;
    const defaultDescription = locale === "en" ? DEFAULT_DESCRIPTION_EN : DEFAULT_DESCRIPTION;
    const allExpertises = getExpertises(locale);

    const pageMeta = project
      ? {
          title:
            locale === "en"
              ? `${project.title} | ETS N MOISE Construction Project`
              : `${project.title} | Realisation BTP ETS N MOISE`,
          description:
            project.description ||
            (locale === "en"
              ? `${project.category} project delivered by ETS N MOISE in ${project.location}.`
              : `Projet ${project.category} livre par ETS N MOISE a ${project.location}.`),
          image: project.image,
          keywords:
            locale === "en"
              ? `${project.title}, ${project.category}, ${project.location}, construction project Cameroon, ETS N MOISE`
              : `${project.title}, ${project.category}, ${project.location}, realisation BTP Cameroun, ETS N MOISE`,
          ogType: "article",
          schemaType: "CreativeWork",
        }
      : expertise
        ? {
            title:
              locale === "en"
                ? `${expertise.title} in Cameroon | ETS N MOISE`
                : `${expertise.title} au Cameroun | ETS N MOISE`,
            description: expertise.intro,
            image: expertise.image,
            keywords:
              serviceKeywords[expertise.slug as keyof typeof serviceKeywords] ||
              `${expertise.title}, service BTP Cameroun, ETS N MOISE`,
            ogType: "website",
            schemaType: "Service",
          }
      : {
          ...(localizedRouteMeta[normalizedPath as keyof typeof routeMeta] || localizedRouteMeta["/"]),
          image: logo,
          ogType: "website",
        };

    const canonicalPath = location.pathname === "/" ? "/" : location.pathname;
    const canonicalUrl = `${baseUrl}${canonicalPath}`;
    const alternatePath =
      locale === "en"
        ? normalizedPath
        : normalizedPath === "/"
          ? "/en"
          : `/en${normalizedPath}`;
    const imageUrl = absoluteUrl(pageMeta.image, baseUrl);

    return {
      ...pageMeta,
      canonicalUrl,
      imageUrl,
      baseUrl,
      project,
      expertise,
      canonicalPath,
      normalizedPath,
      locale,
      alternateUrl: `${baseUrl}${alternatePath}`,
      defaultDescription,
      allExpertises,
    };
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.lang = metadata.locale === "en" ? "en-CM" : "fr-CM";
    document.title = metadata.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: metadata.description,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: metadata.keywords,
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
      content: metadata.ogType,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: metadata.canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: metadata.imageUrl,
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: metadata.title,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: metadata.locale === "en" ? "en_CM" : "fr_CM",
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
    upsertMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: metadata.title,
    });

    upsertLink("canonical", metadata.canonicalUrl);
    upsertLink("alternate", metadata.canonicalUrl);
    document
      .head
      .querySelector<HTMLLinkElement>('link[rel="alternate"]')
      ?.setAttribute("hreflang", metadata.locale === "en" ? "en-CM" : "fr-CM");

    let alternateLanguage = document.head.querySelector<HTMLLinkElement>(
      'link[data-locale-alternate="true"]',
    );
    if (!alternateLanguage) {
      alternateLanguage = document.createElement("link");
      alternateLanguage.rel = "alternate";
      alternateLanguage.dataset.localeAlternate = "true";
      document.head.appendChild(alternateLanguage);
    }
    alternateLanguage.href = metadata.alternateUrl;
    alternateLanguage.hreflang = metadata.locale === "en" ? "fr-CM" : "en-CM";

    upsertJsonLd("seo-organization", {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": `${metadata.baseUrl}/#organization`,
      name: SITE_NAME,
      url: metadata.baseUrl,
      image: metadata.imageUrl,
      logo: absoluteUrl(logo, metadata.baseUrl),
      description: metadata.defaultDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Yaounde",
        addressCountry: "CM",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Cameroon",
        },
      ],
      telephone: "+237699878271",
      email: "ngnokamoise@yahoo.fr",
      sameAs: ["https://www.instagram.com/etsnmoise"],
      knowsAbout: [
        ...(metadata.locale === "en"
          ? [
              "Civil engineering",
              "Building construction",
              "Public works",
              "Laboratory renovation",
              "Land assistance",
              "Remote site monitoring",
            ]
          : [
              "Genie civil",
              "Batiment",
              "Travaux publics",
              "Renovation de laboratoires",
              "Assistance fonciere",
              "Suivi de chantier a distance",
            ]),
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: metadata.locale === "en" ? "ETS N MOISE Construction Services" : "Services BTP ETS N MOISE",
        itemListElement: metadata.allExpertises.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.title,
            description: item.description,
            provider: {
              "@id": `${metadata.baseUrl}/#organization`,
            },
            areaServed: "Cameroon",
            url: `${metadata.baseUrl}${metadata.locale === "en" ? "/en" : ""}/expertise/${item.slug}`,
          },
        })),
      },
    });

    upsertJsonLd("seo-page", {
      "@context": "https://schema.org",
      "@type": metadata.schemaType,
      "@id": `${metadata.canonicalUrl}#webpage`,
      name: metadata.title,
      url: metadata.canonicalUrl,
      description: metadata.description,
      image: metadata.imageUrl,
      publisher: {
        "@id": `${metadata.baseUrl}/#organization`,
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
            provider: {
              "@id": `${metadata.baseUrl}/#organization`,
            },
            areaServed: "Cameroon",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "XAF",
              url: metadata.canonicalUrl,
            },
          }
        : {}),
    });

    upsertJsonLd("seo-breadcrumbs", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: metadata.locale === "en" ? "Home" : "Accueil",
          item: metadata.baseUrl,
        },
        ...getPathSegments(
          metadata.normalizedPath,
          metadata.locale === "en" ? "/en" : "",
        ),
      ],
    });
  }, [metadata]);

  return null;
}
