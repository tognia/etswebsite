import { motion } from "motion/react";
import { Send, Upload, CheckCircle2, Loader2, FileText } from "lucide-react";
import { useState, FormEvent } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../lib/i18n";

export default function DevisPage() {
  const locale = useLanguage();
  const t = {
    fr: {
      defaultType: "Génie Civil",
      noFile: "Aucun fichier joint",
      eyebrow: "ESTIMATION & ÉTUDE TECHNIQUE",
      title: "Demander un",
      titleAccent: "Devis Professionnel",
      intro:
        "Prêt à lancer votre projet d'envergure ? Remplissez notre formulaire d'étude. Vous pouvez joindre vos cahiers des charges ou plans techniques (Minitp, ARMP, plans d'architecte) pour un chiffrage rigoureux sous 48h.",
      steps: [
        ["Analyse de Faisabilité", "Notre bureau d'études étudie vos contraintes techniques et structurelles."],
        ["Chiffrage Quantitatif & Estimatif", "Établissement d'un devis transparent basé sur les prix réels du marché (FCFA)."],
        ["Planification Initiale", "Proposition d'un calendrier d'exécution prévisionnel pour vos travaux."],
      ],
      successTitle: "Demande Transmise",
      successText:
        "Votre dossier a été enregistré avec succès dans notre base de données. Un e-mail de confirmation a été envoyé à la direction technique d'ETS N MOISE.",
      newQuote: "Nouveau Devis",
      fullName: "Nom Complet / Entreprise",
      namePlaceholder: "Ex: Haisam Construction ou M. Ndong",
      phone: "Tel.",
      phonePlaceholder: "07 00 00 00",
      email: "Adresse Email",
      emailPlaceholder: "contact@entreprise.com",
      workType: "Secteur d'Activité / Type de Travaux",
      options: ["Génie Civil", "Bâtiment", "Études & Conseil", "Autre"],
      budget: "Budget Estimé (FCFA)",
      budgetPlaceholder: "Ex: 45 000 000 FCFA",
      needs: "Description des Besoins",
      needsPlaceholder:
        "Précisez la localisation du site, la surface, le type de structure souhaité...",
      attachments: "Pièces Jointes & Plans (PDF, JPG, PNG)",
      selectFile: "Sélectionner un fichier ou plan",
      error:
        "Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.",
      submit: "Soumettre mon Dossier",
    },
    en: {
      defaultType: "Civil Engineering",
      noFile: "No file attached",
      eyebrow: "ESTIMATE & TECHNICAL STUDY",
      title: "Request a",
      titleAccent: "Professional Quote",
      intro:
        "Ready to launch a major project? Complete our study form. You may attach specifications or technical plans for a rigorous estimate within 48 hours.",
      steps: [
        ["Feasibility Analysis", "Our design office reviews your technical and structural constraints."],
        ["Quantity & Cost Estimate", "Preparation of a transparent quote based on real market prices (FCFA)."],
        ["Initial Planning", "Proposal of a preliminary execution schedule for your works."],
      ],
      successTitle: "Request Submitted",
      successText:
        "Your file has been successfully recorded. A confirmation email has been sent to the ETS N MOISE technical management team.",
      newQuote: "New Quote",
      fullName: "Full Name / Company",
      namePlaceholder: "Ex: Haisam Construction or Mr. Ndong",
      phone: "Phone",
      phonePlaceholder: "+237 6 00 00 00 00",
      email: "Email Address",
      emailPlaceholder: "contact@company.com",
      workType: "Business Sector / Type of Work",
      options: ["Civil Engineering", "Building", "Studies & Consulting", "Other"],
      budget: "Estimated Budget (FCFA)",
      budgetPlaceholder: "Ex: 45,000,000 FCFA",
      needs: "Needs Description",
      needsPlaceholder:
        "Specify the site location, surface area, and desired structure type...",
      attachments: "Attachments & Plans (PDF, JPG, PNG)",
      selectFile: "Select a file or plan",
      error:
        "A network error occurred. Please check your connection and try again.",
      submit: "Submit my File",
    },
  }[locale];

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    type: t.defaultType,
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // ÉTAPE 1 : Sauvegarde dans Firestore (Base de données)
      // await addDoc(collection(db, "quotes"), {
      //   ...formData,
      //   fileName: file ? file.name : null,
      //   createdAt: serverTimestamp(),
      //   status: "pending",
      // });

      // ÉTAPE 2 : Envoi de l'e-mail de notification via EmailJS
      const templateParams = {
        from_name: formData.name,
        from_telephone: formData.telephone,
        from_email: formData.email,
        work_type: formData.type,
        budget: formData.budget,
        message: formData.message,
        file_name: file ? file.name : t.noFile,
        to_name: "Direction ETS N MOISE",
      };

      await emailjs.send(
        "service_yd04vnd",
        "template_yo9qfiw",
        templateParams,
        "64OzMVOIAQNnD2fMr",
      );

      // ÉTAPE 3 : Réinitialisation du formulaire
      setStatus("success");
      setFormData({
        name: "",
        telephone: "",
        email: "",
        type: t.defaultType,
        budget: "",
        message: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Erreur lors de la procédure de devis:", error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Section Gauche : Textes et Informations */}
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-orange block mb-3">
              {t.eyebrow}
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-blue-950 uppercase italic leading-none mb-8">
              {t.title} <br />
              <span className="text-brand-orange">{t.titleAccent}</span>
            </h1>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed max-w-xl">
              {t.intro}
            </p>

            {/* Étapes de traitement */}
            <div className="space-y-8 max-w-lg">
              <div className="flex items-start gap-4 p-4 bg-white border-l-4 border-blue-950 shadow-sm">
                <div className="w-10 h-10 bg-blue-950 text-white flex items-center justify-center font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 uppercase mb-1">
                    {t.steps[0][0]}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {t.steps[0][1]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border-l-4 border-brand-orange shadow-sm">
                <div className="w-10 h-10 bg-brand-orange text-black flex items-center justify-center font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 uppercase mb-1">
                    {t.steps[1][0]}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {t.steps[1][1]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border-l-4 border-black shadow-sm">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 uppercase mb-1">
                    {t.steps[2][0]}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {t.steps[2][1]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Droite : Formulaire ou Écran de Succès */}
          <div className="bg-white p-8 md:p-12 shadow-xl border border-gray-100 relative min-h-[500px] flex flex-col justify-center">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle2 className="w-20 h-20 text-brand-orange mx-auto mb-6" />
                <h3 className="text-3xl font-black uppercase italic text-blue-950 mb-4">
                  {t.successTitle}
                </h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  {t.successText}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 bg-black text-white font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-black transition-all"
                >
                  {t.newQuote}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      {t.fullName}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors font-medium text-blue-950"
                      placeholder={t.namePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      {t.phone}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.telephone}
                      onChange={(e) =>
                        setFormData({ ...formData, telephone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors font-medium text-blue-950"
                      placeholder={t.phonePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      {t.email}
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors font-medium text-blue-950"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {t.workType}
                  </label>
                  <div className="relative">
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors font-medium text-blue-950 appearance-none cursor-pointer"
                    >
                      {t.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {t.budget}
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors font-medium text-blue-950"
                    placeholder={t.budgetPlaceholder}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {t.needs}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors resize-none font-medium text-blue-950"
                    placeholder={t.needsPlaceholder}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {t.attachments}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed border-gray-200 hover:border-brand-orange cursor-pointer transition-all group bg-gray-50"
                    >
                      {file ? (
                        <FileText className="w-6 h-6 text-brand-orange" />
                      ) : (
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-brand-orange" />
                      )}
                      <span className="text-sm text-gray-500 group-hover:text-black font-semibold truncate max-w-xs">
                        {file ? file.name : t.selectFile}
                      </span>
                    </label>
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm font-bold bg-red-50 p-3 border-l-4 border-red-600">
                    {t.error}
                  </p>
                )}

                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-[0.2em] hover:bg-brand-orange hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {t.submit}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
