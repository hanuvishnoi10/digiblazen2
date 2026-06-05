import React, { useState } from "react";
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles, MessageCircle } from "lucide-react";

interface ContactSectionProps {
  onShowToast: (msg: string, type: "success" | "info") => void;
}

export default function ContactSection({ onShowToast }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "Product Information",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      onShowToast("Please enter all required form fields.", "info");
      return;
    }

    setSubmitting(true);
    try {
      const whatsappText = `Hello Blazen! I'd like to submit an inquiry:\n\n*Name*: ${formData.name}\n*Category/Topic*: ${formData.subject}\n\n*Message Details*:\n${formData.message}`;
      const whatsappUrl = `https://wa.me/919625201893?text=${encodeURIComponent(whatsappText)}`;

      const newInquiry = {
        id: `inq-${Date.now()}`,
        name: formData.name,
        subject: formData.subject || "Product inquiry",
        message: formData.message,
        date: new Date().toISOString(),
        status: "pending" as const
      };

      const cachedInquiries = localStorage.getItem("digitalblazen_inquiries");
      let activeInquiries = cachedInquiries ? JSON.parse(cachedInquiries) : [];
      activeInquiries.push(newInquiry);
      localStorage.setItem("digitalblazen_inquiries", JSON.stringify(activeInquiries));

      setIsSuccess(true);
      onShowToast("Inquiry recorded! Redirecting to WhatsApp secure desk...", "success");
      
      // Open WhatsApp Link
      window.open(whatsappUrl, "_blank");

      setFormData({ name: "", subject: "Product Information", message: "" });
    } catch (err) {
      console.error(err);
      onShowToast("Failed to compile inquiry.", "info");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Info Column - 5 spans */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[10px] text-primary-neon tracking-widest font-mono uppercase font-bold px-2.5 py-1 rounded bg-[#0F3F36]/40 border border-primary-neon/20 inline-block mb-3">
              Direct Contact
            </span>
            <h2 className="font-display font-bold text-3xl text-white leading-tight">
              TALK WITH <br />OUR TECH LEADS
            </h2>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed font-sans">
              Have specific questions about bundle formats, custom team discounts, Stripe boilerplates, or licensing? Send us an inquiry and our lead developer Hanu will write back to you within 2 business hours.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start space-x-3.5 p-4 bg-[#0F3F36]/15 border border-primary-neon/10 rounded-xl">
              <Mail className="w-5 h-5 text-primary-neon shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] text-slate-500 font-mono uppercase">Send Email</span>
                <span className="text-sm font-medium text-white hover:text-primary-neon transition">
                  digitalblazen@gmail.com
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 bg-[#0F3F36]/15 border border-primary-neon/10 rounded-xl">
              <Phone className="w-5 h-5 text-primary-neon shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] text-slate-500 font-mono uppercase">WhatsApp Support Line</span>
                <span className="text-sm font-medium text-white hover:text-primary-neon transition">
                  +91 93156 62153
                </span>
              </div>
            </div>

            {/* Quick FAQ info callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <a
                href="https://chat.whatsapp.com/B5xETUNWwrJFKoepJrKkEJ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-primary-neon/5 hover:bg-primary-neon/10 rounded-xl border border-primary-neon/20 hover:border-primary-neon/40 flex flex-col gap-3.5 transition cursor-pointer text-left group"
              >
                <div className="flex gap-3">
                  <svg 
                    className="w-5 h-5 text-primary-neon shrink-0 mt-0.5 group-hover:scale-110 transition-transform fill-current" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div>
                    <p className="text-xs text-white font-semibold flex items-center gap-1.5 flex-wrap">
                      Join WhatsApp Community
                    </p>
                    <p className="text-[11px] text-slate-400 leading-normal mt-0.5 font-sans">
                      Get real-time updates, support, exclusive hacks, and connect with developers.
                    </p>
                  </div>
                </div>

                <div className="w-full text-center py-2 bg-primary-neon text-[#061411] group-hover:bg-[#00ffd0] font-mono text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-primary-neon/10">
                  <span>🚀 JOIN COMMUNITY NOW</span>
                </div>
              </a>

              <a
                href="https://whatsapp.com/channel/0029VbCNjoW6rsQqkravdT3E"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-glow-highlight/5 hover:bg-glow-highlight/10 rounded-xl border border-glow-highlight/20 hover:border-glow-highlight/40 flex flex-col gap-3.5 transition cursor-pointer text-left group"
              >
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-glow-highlight shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs text-white font-semibold flex items-center gap-1.5 flex-wrap">
                      Feedback & Proofs Channel
                    </p>
                    <p className="text-[11px] text-slate-400 leading-normal mt-0.5 font-sans">
                      Inspect successful active keys delivery, order receipts, and live member screenshots.
                    </p>
                  </div>
                </div>

                <div className="w-full text-center py-2 bg-glow-highlight text-[#061411] group-hover:bg-[#ffdf7a] font-mono text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-glow-highlight/10">
                  <span>✨ VIEW PROOFS CHANNEL</span>
                </div>
              </a>
            </div>

            <div className="flex items-start space-x-3.5 p-4 bg-[#0F3F36]/15 border border-primary-neon/10 rounded-xl">
              <MapPin className="w-5 h-5 text-primary-neon shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] text-slate-500 font-mono uppercase">HQ Location</span>
                <span className="text-xs text-slate-350 leading-relaxed font-sans">
                  Sector 10 Gurugram, Haryana 122001, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column - 7 spans */}
        <div className="lg:col-span-7 bg-[#061411] border border-primary-neon/20 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Neon background decorations */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-primary-neon/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className="font-display font-semibold text-lg text-white mb-2">
            Submit an Inquiry
          </h3>
          <p className="text-xs text-slate-405 font-sans mb-6">
            Complete the fields below and we'll route your request accordingly.
          </p>

          {isSuccess ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary-neon/10 border border-primary-neon/30 flex items-center justify-center mx-auto text-primary-neon">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-white text-lg">Inquiry Recorded!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out to us. Your submission has been saved directly to the database.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-[#0F3F36] border border-primary-neon/30 text-primary-neon text-xs font-semibold cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label htmlFor="name" className="block text-[10px] text-slate-400 font-mono uppercase font-bold mb-1.5">
                  Your Full Name <span className="text-primary-neon">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0F3F36]/20 border border-primary-neon/15 focus:border-primary-neon text-white rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary-neon/40 transition placeholder:text-slate-500 font-sans"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] text-slate-400 font-mono uppercase font-bold mb-1.5">
                  Inquiry Category / Topic <span className="text-primary-neon">*</span>
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#0E1C19] border border-primary-neon/15 focus:border-primary-neon text-white focus:outline-none rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-primary-neon/45 transition font-sans cursor-pointer"
                >
                  <option value="" disabled>Select Inquiry Type</option>
                  <option value="Product Information">Product Information</option>
                  <option value="Pricing & Plans">Pricing & Plans</option>
                  <option value="Order & Delivery Issues">Order & Delivery Issues</option>
                  <option value="Account Access Problems">Account Access Problems</option>
                  <option value="Payment & Billing">Payment & Billing</option>
                  <option value="Refund Request">Refund Request</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Bulk Orders / Reseller Inquiry">Bulk Orders / Reseller Inquiry</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] text-slate-400 font-mono uppercase font-bold mb-1.5">
                  Message Details <span className="text-primary-neon">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Detail your request and we'll reply shortly..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0F3F36]/20 border border-primary-neon/15 focus:border-primary-neon text-white rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary-neon/40 transition placeholder:text-slate-500 resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="glow-btn w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>{submitting ? "Sending Inquiry..." : "Submit Inquiry Details"}</span>
                <Send className="w-4 h-4 text-slate-950" />
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
