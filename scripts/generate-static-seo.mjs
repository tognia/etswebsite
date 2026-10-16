import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const siteUrl = "https://etsnmoise.com";
const dist = join(process.cwd(), "dist");

const pages = [
  ["/projectsPage", "Realisations BTP au Cameroun | ETS N MOISE", "Decouvrez les chantiers livres par ETS N MOISE au Cameroun : laboratoires, batiments publics, renovations techniques et infrastructures de genie civil."],
  ["/aboutPage", "A propos de l'entreprise BTP ETS N MOISE", "Presentation de ETS N MOISE, entreprise camerounaise de genie civil, batiment, assistance technique et travaux publics dirigee par NGNOKAM MOISE."],
  ["/devisPage", "Demander un devis BTP au Cameroun | ETS N MOISE", "Demandez une estimation pour vos travaux de batiment, genie civil, assistance fonciere, suivi de chantier, renovation ou infrastructure au Cameroun."],
  ["/mentions-legales", "Mentions legales | ETS N MOISE", "Mentions legales et informations relatives au site officiel de ETS N MOISE."],
  ["/expertise/genie-civil", "Genie Civil au Cameroun | ETS N MOISE", "Conception, construction et rehabilitation d'infrastructures durables au Cameroun."],
  ["/expertise/batiment", "Batiment au Cameroun | ETS N MOISE", "Construction et renovation de batiments publics, professionnels et residentiels au Cameroun."],
  ["/expertise/etudes-conseil", "Etudes & Conseil au Cameroun | ETS N MOISE", "Etudes de faisabilite, estimations, planification et conseil technique pour les projets BTP au Cameroun."],
  ["/expertise/assistance-fonciere-suivi-chantier", "Assistance Fonciere & Suivi de Chantier | ETS N MOISE", "Assistance fonciere et suivi de chantier au Cameroun pour les clients locaux et la diaspora."],
  ...Array.from({ length: 6 }, (_, index) => [`/project/${index + 1}`, `Realisation BTP ${index + 1} | ETS N MOISE`, "Decouvrez cette realisation de construction livree par ETS N MOISE au Cameroun."]),
];

const englishMeta = new Map([
  ["/projectsPage", ["Construction Projects in Cameroon | ETS N MOISE", "Explore construction and renovation projects delivered by ETS N MOISE in Cameroon."]],
  ["/aboutPage", ["About ETS N MOISE Construction Company", "Learn about ETS N MOISE, a Cameroonian civil engineering, construction, and public works company."]],
  ["/devisPage", ["Request a Construction Quote in Cameroon | ETS N MOISE", "Request an estimate for construction, civil engineering, renovation, or site monitoring in Cameroon."]],
  ["/mentions-legales", ["Legal Notice | ETS N MOISE", "Legal notice and information about the official ETS N MOISE website."]],
  ["/expertise/genie-civil", ["Civil Engineering in Cameroon | ETS N MOISE", "Design, construction, and rehabilitation of durable infrastructure in Cameroon."]],
  ["/expertise/batiment", ["Building Construction in Cameroon | ETS N MOISE", "Construction and renovation of public, professional, and residential buildings in Cameroon."]],
  ["/expertise/etudes-conseil", ["Construction Studies & Consulting | ETS N MOISE", "Feasibility studies, estimates, planning, and technical consulting for projects in Cameroon."]],
  ["/expertise/assistance-fonciere-suivi-chantier", ["Land Assistance & Site Monitoring | ETS N MOISE", "Land assistance and construction monitoring in Cameroon for local and diaspora clients."]],
]);

const englishPages = pages.map(([path]) => {
  const fallback = path.startsWith("/project/")
    ? ["Construction Project in Cameroon | ETS N MOISE", "Discover a construction project delivered by ETS N MOISE in Cameroon."]
    : ["ETS N MOISE | Construction Company in Cameroon", "Discover ETS N MOISE construction services in Cameroon."];
  const [title, description] = englishMeta.get(path) || fallback;
  return [`/en${path}`, title, description];
});

const escapeAttribute = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function localizedAlternate(path) {
  return path.startsWith("/en/")
    ? path.slice(3)
    : path === "/en"
      ? "/"
      : `/en${path}`;
}

function render(template, [path, title, description]) {
  const canonical = `${siteUrl}${path}`;
  const alternate = `${siteUrl}${localizedAlternate(path)}`;
  const locale = path === "/en" || path.startsWith("/en/") ? "en-CM" : "fr-CM";
  const alternateLocale = locale === "en-CM" ? "fr-CM" : "en-CM";

  const withoutAlternates = template.replace(
    /\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/>/g,
    "",
  );

  return withoutAlternates
    .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/s, `<meta name="description" content="${escapeAttribute(description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeAttribute(title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s, `<meta property="og:description" content="${escapeAttribute(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonical}" />\n    <link rel="alternate" hreflang="${locale}" href="${canonical}" />\n    <link rel="alternate" hreflang="${alternateLocale}" href="${alternate}" />\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`,
    );
}

const template = await readFile(join(dist, "index.html"), "utf8");
const homeEn = ["/en", "ETS N MOISE | Construction Company in Cameroon", "ETS N MOISE is a construction company specializing in civil engineering, building construction, land assistance, and site monitoring in Cameroon."];

for (const page of [...pages, homeEn, ...englishPages]) {
  const output = join(dist, page[0].slice(1), "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, render(template, page));
}
