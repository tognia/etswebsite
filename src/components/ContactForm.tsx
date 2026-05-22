import { motion } from "motion/react";
import { Send, CheckCircle2, Loader2, Phone, Mail, MapPin } from "lucide-react";
import { useState, FormEvent } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // ÉTAPE 1 : Sauvegarde dans Firebase (Gratuit)
      // await addDoc(collection(db, "messages"), {
      //   ...formData,
      //   createdAt: serverTimestamp(),
      // });

      // ÉTAPE 2 : Envoi de l'e-mail via EmailJS (Gratuit)
      const templateParams = {
        from_name: formData.name,
        from_telephone: formData.telephone,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "ETS N MOISE Admin",
      };

      await emailjs.send(
        "service_yd04vnd",
        "template_nliubov",
        templateParams,
        "64OzMVOIAQNnD2fMr",
      );

      setStatus("success");
      setFormData({
        name: "",
        telephone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
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
          Message Envoyé
        </h3>
        <p className="text-gray-600 mb-8">
          Merci de nous avoir contactés. Notre équipe vous répondra dans les
          plus brefs délais.
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
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-6xl text-blue-950 uppercase italic leading-none mb-8">
              Contactez <span className="text-brand-orange">Nous</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              Une question ? Un projet ? Notre équipe est à votre écoute pour
              vous accompagner dans vos réalisations.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-brand-orange flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-1">Localisation</h4>
                  <p className="text-gray-500 text-sm">
                    Eleveur, Yaoundé, Cameroun
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-brand-orange flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-1">Téléphone</h4>
                  <p className="text-gray-500 text-sm">
                    +237 699 87 82 71 / +267 699 45 67 00
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-black text-brand-orange flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-1">Email</h4>
                  <p className="text-gray-500 text-sm">ngnokamoise@yahoo.fr</p>
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
                    Telephone
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.telephone}
                    onChange={(e) =>
                      setFormData({ ...formData, telephone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="Numéro de téléphone"
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
                  Sujet
                </label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                  placeholder="Objet de votre message"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Message / Détails
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  placeholder="Décrivez votre projet..."
                />
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
                    Envoyer le message
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
