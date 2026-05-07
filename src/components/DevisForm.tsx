import { motion } from "motion/react";
import { Send, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function DevisForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Génie Civil",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Note: File upload to Storage would typically happen here,
      // then the URL would be saved to Firestore.
      // For now, we save the form data.
      await addDoc(collection(db, "quotes"), {
        ...formData,
        fileName: file ? file.name : null,
        createdAt: serverTimestamp(),
        status: "pending",
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        type: "Génie Civil",
        budget: "",
        message: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 text-center border border-gray-200"
      >
        <CheckCircle2 className="w-16 h-16 text-brand-orange mx-auto mb-6" />
        <h3 className="text-3xl font-black uppercase italic mb-4">
          Demande Envoyée
        </h3>
        <p className="text-gray-600 mb-8">
          Merci pour votre confiance. Notre équipe technique étudiera votre
          dossier et vous contactera sous 48h.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-8 py-3 bg-brand-black text-white font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-brand-black transition-all"
        >
          Nouvelle demande
        </button>
      </motion.div>
    );
  }

  return (
    <section
      id="devis"
      className="py-24 bg-gradient-to-r from-blue-300 via-orange-300 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-6xl text-blue-950 uppercase italic leading-none mb-8">
              Demander un <span className="text-brand-orange">Devis</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              Prêt à lancer votre projet ? Remplissez le formulaire ci-dessous.
              Vous pouvez également joindre vos plans techniques pour une étude
              plus précise.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-white flex items-center justify-center font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-2">
                    Étude de faisabilité
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Analyse technique approfondie de vos besoins et contraintes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-white flex items-center justify-center font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-2">
                    Estimation budgétaire
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Chiffrage précis et transparent des travaux à réaliser.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-white flex items-center justify-center font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-2">Planification</h4>
                  <p className="text-gray-500 text-sm">
                    Établissement d'un calendrier prévisionnel rigoureux.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Nom Complet
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Type de Travaux
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors appearance-none"
                >
                  <option>Génie Civil</option>
                  <option>Bâtiment</option>
                  <option>Travaux Routiers</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Budget Estimé (FCFA)
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                  placeholder="Ex: 50 000 000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Message / Détails
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  placeholder="Décrivez votre projet..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Plans Techniques (PDF, JPG)
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
                    className="flex items-center justify-center gap-3 w-full px-4 py-8 border-2 border-dashed border-gray-200 hover:border-brand-orange cursor-pointer transition-all group"
                  >
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-brand-orange" />
                    <span className="text-gray-500 group-hover:text-brand-black font-medium">
                      {file ? file.name : "Cliquez pour uploader vos plans"}
                    </span>
                  </label>
                </div>
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm font-bold">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}

              <button
                disabled={status === "loading"}
                type="submit"
                className="w-full py-4 bg-brand-black text-white font-bold uppercase tracking-[0.2em] hover:bg-brand-orange hover:text-brand-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Envoyer la demande
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
