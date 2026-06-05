import React from "react";
import { Shield, FileText, CheckCircle2, Mail, MessageCircle, Landmark } from "lucide-react";

interface LegalSectionProps {
  type: "privacy" | "terms" | "refund";
}

export default function LegalSection({ type }: LegalSectionProps) {
  const renderContent = () => {
    switch (type) {
      case "privacy":
        return (
          <div className="space-y-8 text-sm leading-relaxed text-slate-300">
            <div className="flex items-center space-x-3 pb-4 border-b border-primary-neon/10">
              <Shield className="w-8 h-8 text-primary-neon" />
              <div>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                  Privacy Policy
                </h2>
                <p className="text-[10px] text-primary-neon font-mono">Last Updated: May 2026</p>
              </div>
            </div>

            <p>
              At <strong className="text-white">DIGITAL BLAZEN</strong>, accessible from our online digital assets shop, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Digital Blazen and how we use it.
            </p>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">1. Information We Collect</h3>
              <p>
                We collect your name, mobile phone number, and  email address,  transaction context to make sure instant delivery coordinates are accurately provisioned. All online checkout links and proxy pipeline interactions are audited to guarantee absolute safety under strict protection policies.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">2. Payment and Proxy Encryption Pipelines</h3>
              <p>
                To provide safe transactions, payment logs are processed via audited encrypted payment gateway proxies. We do not store credit card or raw banking identifiers on our servers.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">3. Log Files and Web Analytics</h3>
              <p>
                Digital Blazen follows a standard procedure of using web analytics logs. These logs collect anonymous browser information, IP address details, ISP records, date/time stamps, landing clickstreams, and categories explored. This data is purely used for conversion intelligence analysis.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">4. WhatsApp Community Security</h3>
              <p>
                By joining our official WhatsApp Developer Community, you acknowledge that your phone number and chat participation details remain subject to standard WhatsApp group rules and privacy constraints. We expect absolute respect and do not harvest coordinates among community participants.
              </p>
            </section>

            <section className="space-y-3 pb-4">
              <h3 className="font-display font-semibold text-white text-base">5. Contact and Redress</h3>
              <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to reach us through email at <span className="text-primary-neon font-mono">digitalblazen@gmail.com</span> or send an inquiry to our head office based in Gurugram, Haryana.
              </p>
            </section>
          </div>
        );

      case "terms":
        return (
          <div className="space-y-8 text-sm leading-relaxed text-slate-300">
            <div className="flex items-center space-x-3 pb-4 border-b border-primary-neon/10">
              <FileText className="w-8 h-8 text-primary-neon" />
              <div>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                  Terms of Use
                </h2>
                <p className="text-[10px] text-primary-neon font-mono">Effective Date: May 2026</p>
              </div>
            </div>

            <p>
              Welcome to <strong className="text-white">DIGITAL BLAZEN</strong>. These Terms of Use outline the rules and regulations governing the sale, access, and distribution of premium digital resources, developer templates, videos, audio tracks, and coding kits.
            </p>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">1. Intellectual Property & Licenses</h3>
              <p>
                Every asset bought on this platform grants the buyer an individual developer license. You may use our AI Bots, coding scripts, and assets in your personal or commercial client work. However, you are strictly forbidden from repackaging, reselling, distribution, or sharing access coordinates without our prior explicit authorization.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">2. Instant Delivery SLA Guarantee</h3>
              <p>
                Digital Blazen products are fully automated file assets or download repositories. Upon payment completion, delivery coordinates are immediately provisioned. If any pipeline slowdown impairs access, our staff will manually assist you to ensure files are accessed without issues.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">3. Prohibited Conduct</h3>
              <p>
                Users agree not to utilize coordinate injections, bypass payment barriers, exploit reverse-engineering pipelines, perform automated attacks, or execute scrapers on products or inventories.
              </p>
            </section>

            <section className="space-y-3 pb-4">
              <h3 className="font-display font-semibold text-white text-base">4. Governing Law</h3>
              <p>
                These terms are governed by the applicable commercial laws of India and Gurugram courts jurisdiction. Any claims from purchase transactions must first undergo mutual arbitration.
              </p>
            </section>
          </div>
        );

      case "refund":
        return (
          <div className="space-y-8 text-sm leading-relaxed text-slate-300">
            <div className="flex items-center space-x-3 pb-4 border-b border-primary-neon/10">
              <Landmark className="w-8 h-8 text-primary-neon" />
              <div>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">
                  Refund Guidelines
                </h2>
                <p className="text-[10px] text-primary-neon font-mono">Last Updated: May 2026</p>
              </div>
            </div>

            <p>
              Since <strong className="text-white">DIGITAL BLAZEN</strong> provides intangible digital releases and automatic deliveries with instant links, we adhere to streamlined guidelines regarding refund claims.
            </p>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">1. General Digital Assets SLA</h3>
              <p>
                Due to the immediate distribution profile of coding frameworks, chatbot binaries, video tutorials, and audio assets, we do not issue general refunds once the download coordinates are provisioned. However, customer satisfaction is our top priority.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">2. Eligible Criteria for Refund Claims</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-neon mt-0.5 shrink-0" />
                  <span>The download link coordinates or repositories are non-functional and support staff could not resolve it within 72 hours.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-neon mt-0.5 shrink-0" />
                  <span>A purchase transaction was processed twice due to clear system processing double billing errors.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-neon mt-0.5 shrink-0" />
                  <span>The bought files are significantly corrupt or omit core materials advertised under the product listing description.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-semibold text-white text-base">3. Submission Instructions</h3>
              <p>
                To initiate an inquiry, submit an inquiry via our contact form select "Refund Request" inquiry type, include your phone number with country code, order tracking ID, and support log elements.
              </p>
            </section>

            <div className="p-4 bg-primary-neon/5 rounded-xl border border-primary-neon/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-white uppercase">Need Immediate Resolution?</h4>
                <p className="text-[11px] text-slate-400">Join our WhatsApp chat group to connect directly with operations staff.</p>
              </div>
              <a
                href="https://wa.me/+919315662153"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#0F3F36] hover:bg-[#00E6A8] border border-primary-neon/20 hover:border-transparent text-primary-neon hover:text-[#030d0a] font-bold text-xs rounded transition uppercase tracking-wider h-[32px] cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Now</span>
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="custom-glow-card rounded-2xl p-6 sm:p-10 relative bg-[#061411]">
        {renderContent()}
      </div>
    </div>
  );
}
