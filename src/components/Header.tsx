import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Search, Menu, X, LayoutDashboard, Mail, BookOpen, Sparkles, Compass } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  storeSettings: {
    logoUrl: string;
    storeName: string;
    storeSlogan: string;
  };
}

export default function Header({
  currentTab,
  setCurrentTab,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  storeSettings,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", icon: Compass },
    { id: "shop", label: "Products", icon: ShoppingBag },
    { id: "features", label: "Learn More", icon: BookOpen },
    { id: "contact", label: "Inquiries", icon: Mail },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
    // Smooth scroll to top when changing page tabs
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass-nav py-3 shadow-[0_4px_20px_rgba(3,18,14,0.4)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Column */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-neon to-glow-highlight flex items-center justify-center shadow-[0_0_15px_-2px_#00E6A8] transition-transform duration-300 group-hover:rotate-12 overflow-hidden">
              {storeSettings?.logoUrl ? (
                <img 
                  src={storeSettings.logoUrl} 
                  alt={storeSettings.storeName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback back to placeholder if load fails
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80";
                  }}
                />
              ) : (
                <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
              )}
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-primary-neon transition-colors">
                {storeSettings?.storeName?.includes(" ") ? (
                  <>
                    {storeSettings.storeName.substring(0, storeSettings.storeName.indexOf(" "))}{" "}
                    <span className="text-primary-neon">
                      {storeSettings.storeName.substring(storeSettings.storeName.indexOf(" ") + 1)}
                    </span>
                  </>
                ) : (
                  storeSettings?.storeName || "DIGITAL BLAZEN"
                )}
              </span>
              <p className="text-[9px] text-slate-400 font-mono tracking-wider uppercase leading-none mt-0.5">
                {storeSettings?.storeSlogan || "Premium Store"}
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search guides, templates, wireframes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F3F36]/20 border border-primary-neon/20 hover:border-primary-neon/40 focus:border-primary-neon/80 text-white rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-neon/50 placeholder-slate-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Desktop Nav Links & Action Buttons */}
          <div className="hidden lg:flex items-center space-x-1">
            <nav className="flex space-x-1 mr-4">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium tracking-wide flex items-center gap-1.5 transition-all duration-200 ${
                      isActive
                        ? "text-primary-neon bg-[#0F3F36]/30 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/20"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary-neon to-glow-highlight rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>


            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#0F3F36]/30 hover:bg-[#0F3F36]/60 border border-primary-neon/20 hover:border-primary-neon/60 text-slate-200 hover:text-primary-neon cursor-pointer transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-neon text-slate-950 font-bold text-[10px] flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Interactions (Search, Cart & Hamburg) */}
          <div className="flex items-center space-x-2 lg:hidden">

            {/* Mobile Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-[#0F3F36]/20 border border-primary-neon/20 text-slate-300 hover:text-primary-neon cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-neon text-slate-950 font-bold text-[9px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#0F3F36]/20 border border-primary-neon/20 text-slate-300 hover:text-white cursor-pointer"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Search - Row item under logo */}
        <div className="mt-3 md:hidden relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search our digital inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F3F36]/20 border border-primary-neon/20 text-white rounded-lg pl-9 pr-8 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary-neon placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#061411] border-b border-primary-neon/10 backdrop-blur-md"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2.5 transition-colors ${
                      isActive
                        ? "bg-[#0F3F36] text-primary-neon"
                        : "text-slate-300 hover:bg-[#0F3F36]/50 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-4.5 h-4.5" />
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
