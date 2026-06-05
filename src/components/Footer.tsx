import { Mail, Phone, MapPin, Youtube, ArrowUp, Send, CheckCircle, Info, MessageCircle } from "lucide-react";
import React, { useState } from "react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onShowToast: (msg: string, type: "success" | "info") => void;
  setSelectedCategory?: (cat: string) => void;
}

export default function Footer({ setCurrentTab, onShowToast, setSelectedCategory }: FooterProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      onShowToast("Please provide a valid email address.", "info");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onShowToast("Successfully subscribed to Blazen Updates!", "success");
      setEmail("");
      setLoading(false);
    }, 800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#051411] border-t border-primary-neon/20 pt-16 pb-8 overflow-hidden">
      
      {/* Background blur decorative element */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary-neon/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-12 -right-12 w-64 h-64 rounded-full bg-glow-highlight/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary-neon flex items-center justify-center font-bold text-slate-950 font-display text-lg">
                B
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                DIGITAL <span className="text-primary-neon">BLAZEN</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Fueling indie developers, modern designers, and digital creators with robust, high-fidelity guides, ready-to-deploy system templates, and premium courses.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://chat.whatsapp.com/B5xETUNWwrJFKoepJrKkEJ" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#0F3F36]/40 hover:bg-[#0F3F36] border border-primary-neon/10 hover:border-primary-neon/50 text-slate-300 hover:text-primary-neon flex items-center justify-center transition"
                title="Join WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a 
                href="https://whatsapp.com/channel/0029VbCNjoW6rsQqkravdT3E" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#0F3F36]/40 hover:bg-[#0F3F36] border border-primary-neon/10 hover:border-primary-neon/50 text-slate-300 hover:text-glow-highlight flex items-center justify-center transition"
                title="View WhatsApp Proof Channel"
              >
                <CheckCircle className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@blazenhacks69" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#0F3F36]/40 hover:bg-[#0F3F36] border border-primary-neon/10 hover:border-primary-neon/50 text-slate-300 hover:text-primary-neon flex items-center justify-center transition"
                title="Visit YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white tracking-wider uppercase mb-5">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => {
                    setCurrentTab("shop");
                    setSelectedCategory?.("ai chat bot");
                  }} 
                  className="hover:text-primary-neon transition-colors cursor-pointer text-left"
                >
                  AI Chat Bot
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentTab("shop");
                    setSelectedCategory?.("videos");
                  }} 
                  className="hover:text-primary-neon transition-colors cursor-pointer text-left"
                >
                  Videos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentTab("shop");
                    setSelectedCategory?.("audio");
                  }} 
                  className="hover:text-primary-neon transition-colors cursor-pointer text-left"
                >
                  Audio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentTab("shop");
                    setSelectedCategory?.("coding");
                  }} 
                  className="hover:text-primary-neon transition-colors cursor-pointer text-left"
                >
                  Coding
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white tracking-wider uppercase mb-5">
              Direct Contact
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-primary-neon shrink-0 mt-0.5" />
                <span className="text-slate-300 hover:text-primary-neon transition-colors">
                  digitalblazen@gmail.com
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-primary-neon shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  +91 93156 62153
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-primary-neon shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  Sector 10 Gurugram,<br />Haryana 122001, India
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription form */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white tracking-wider uppercase mb-3">
              Join Blazen Updates
            </h4>
            <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
              Join our WhatsApp Group and check our official Proof Channel for active delivery keys, success stories, and verified screenshots!
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 mb-3">
              <a
                href="https://chat.whatsapp.com/B5xETUNWwrJFKoepJrKkEJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0F3F36]/80 hover:bg-primary-neon hover:text-[#030d0a] border border-primary-neon/20 hover:border-primary-neon/50 text-primary-neon rounded-lg text-xs font-semibold uppercase tracking-wider transition flex-1 justify-center cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Join WhatsApp Community
              </a>
              <a
                href="https://whatsapp.com/channel/0029VbCNjoW6rsQqkravdT3E"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-glow-highlight/10 hover:bg-glow-highlight hover:text-[#030d0a] border border-glow-highlight/25 hover:border-glow-highlight/60 text-glow-highlight rounded-lg text-xs font-semibold uppercase tracking-wider transition flex-1 justify-center cursor-pointer font-mono font-bold"
              >
                <CheckCircle className="w-3.5 h-3.5 animate-pulse" /> JOIN PROOF CHANNEL
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-primary-neon/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans">
          <div className="text-center sm:text-left">
            <p>© 2026 Digital Blazen Store. All product rights reserved.</p>
            <p className="mt-0.5 text-[10px] text-slate-600">Styled under precision benchmarks in Sector 10 Gurugram, Haryana, India.</p>
          </div>
          
          {/* Policy navigation matching Sahil R. */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            <button
              onClick={() => {
                setCurrentTab("privacy");
                scrollToTop();
              }}
              className="hover:text-primary-neon transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setCurrentTab("terms");
                scrollToTop();
              }}
              className="hover:text-primary-neon transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <button
              onClick={() => {
                setCurrentTab("refund");
                scrollToTop();
              }}
              className="hover:text-primary-neon transition-colors cursor-pointer"
            >
              Refund Guidelines
            </button>
            <button 
              onClick={scrollToTop}
              className="hover:text-primary-neon transition-colors flex items-center gap-0.5 font-semibold text-primary-neon cursor-pointer"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
