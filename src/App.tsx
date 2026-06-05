import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ShopSection from "./components/ShopSection";
import ContactSection from "./components/ContactSection";
import CartDrawer from "./components/CartDrawer";
import LegalSection from "./components/LegalSection";
import { Product, Inquiry, Order } from "./types";
import { initialProducts, defaultInquiries, defaultOrders } from "./products-data";
import { 
  Sparkles, ShieldCheck, Mail, ShoppingCart, Clock, Users,
  CheckCircle, RefreshCw, X, AlertCircle, ShoppingBag, ArrowRight, Star, Globe
} from "lucide-react";

const renderDescriptionWithLinks = (text: string) => {
  if (!text) return "";
  const urlRegex = /(https?:\/\/[^\s\n\r]+)/gi;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-neon underline font-bold hover:text-[#00ffd0] transition inline-block relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Customizable store identity settings (Logo image, Name, Slogan tagline)
  const [storeSettings, setStoreSettings] = useState(() => {
    const saved = localStorage.getItem("digitalblazen_store_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      logoUrl: "", // Defaults to sparkles star icon if blank
      storeName: "DIGITAL BLAZEN",
      storeSlogan: "Premium Store"
    };
  });

  const handleUpdateStoreSettings = (newSettings: { logoUrl: string; storeName: string; storeSlogan: string }) => {
    setStoreSettings(newSettings);
    localStorage.setItem("digitalblazen_store_settings", JSON.stringify(newSettings));
  };

  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'INR' | 'GBP'>(() => {
    return (localStorage.getItem("digitalblazen_currency") as any) || "USD";
  });

  const handleCurrencyChange = (newCurrency: 'USD' | 'EUR' | 'INR' | 'GBP') => {
    setSelectedCurrency(newCurrency);
    localStorage.setItem("digitalblazen_currency", newCurrency);
    triggerToast(`Currency changed to ${newCurrency}!`, "success");
  };

  const formatPrice = (priceInUsd: number, priceInr?: number) => {
    if (priceInUsd === 0) return "Contact for Price";
    const finalInr = priceInr !== undefined ? priceInr : Math.round(priceInUsd * 83.0);
    return `$${priceInUsd} / ₹${finalInr.toLocaleString()}`;
  };

  // Real database synchronous states
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cart elements synced with localStorage
  const [cartList, setCartList] = useState<Product[]>(() => {
    const saved = localStorage.getItem("digitalblazen_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);

  // Floating notifications/toasts alert state
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "info" }[]>([]);

  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  // REST API database sync mechanisms with browser persistence synchronizer for Cloud Run stability
  const syncServerData = async () => {
    try {
      // Initialize or pull products with full reconciliation to prevent stale browser caches
      let cachedProducts = localStorage.getItem("digitalblazen_products");
      let activeProducts: Product[] = [];
      try {
        if (cachedProducts) {
          const parsedProducts: Product[] = JSON.parse(cachedProducts);
          
          // 1. Filter out deleted products (any cached product not present in initialProducts)
          activeProducts = parsedProducts.filter(p => initialProducts.some(ip => ip.id === p.id));
          
          // 2. Add or update products from initialProducts to match code definitions perfectly
          initialProducts.forEach(ip => {
            const index = activeProducts.findIndex(ap => ap.id === ip.id);
            if (index !== -1) {
              const existing = activeProducts[index];
              activeProducts[index] = {
                ...ip,
                // Preserve dynamic local user mutations if any
                salesCount: existing.salesCount !== undefined ? existing.salesCount : ip.salesCount,
                outOfStock: existing.outOfStock !== undefined ? existing.outOfStock : ip.outOfStock,
                rating: existing.rating !== undefined ? existing.rating : ip.rating
              };
            } else {
              activeProducts.push(ip);
            }
          });
          
          // 3. Remove unwanted local products with specific patterns
          activeProducts = activeProducts.filter(p => !(p.id && p.id.includes("1779604506693")));
          
          activeProducts.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
          localStorage.setItem("digitalblazen_products", JSON.stringify(activeProducts));
        } else {
          activeProducts = [...initialProducts];
          localStorage.setItem("digitalblazen_products", JSON.stringify(activeProducts));
        }
      } catch (err) {
        console.error("Local storage product sync error, resetting to default: ", err);
        activeProducts = [...initialProducts];
        localStorage.setItem("digitalblazen_products", JSON.stringify(activeProducts));
      }
      setProducts(activeProducts);

      // Initialize or pull inquiries
      let cachedInquiries = localStorage.getItem("digitalblazen_inquiries");
      let activeInquiries: Inquiry[] = [];
      if (cachedInquiries) {
        try {
          activeInquiries = JSON.parse(cachedInquiries);
        } catch (e) {
          activeInquiries = [...defaultInquiries];
        }
      } else {
        activeInquiries = [...defaultInquiries];
        localStorage.setItem("digitalblazen_inquiries", JSON.stringify(activeInquiries));
      }
      setInquiries(activeInquiries);

      // Initialize or pull orders
      let cachedOrders = localStorage.getItem("digitalblazen_orders");
      let activeOrders: Order[] = [];
      if (cachedOrders) {
        try {
          activeOrders = JSON.parse(cachedOrders);
        } catch (e) {
          activeOrders = [...defaultOrders];
        }
      } else {
        activeOrders = [...defaultOrders];
        localStorage.setItem("digitalblazen_orders", JSON.stringify(activeOrders));
      }
      setOrders(activeOrders);
    } catch (err) {
      console.error("Local database sync system failed: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncServerData();
  }, []);

  // Update Cart hook to sync with local storage
  useEffect(() => {
    localStorage.setItem("digitalblazen_cart", JSON.stringify(cartList));
  }, [cartList]);

  const handleAddToCart = (product: Product) => {
    // Avoid double entries since these are digital assets
    const exists = cartList.find((item) => item.id === product.id);
    if (exists) {
      triggerToast(`"${product.title}" is already in your cart.`, "info");
      return;
    }
    setCartList((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartList((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearCart = () => {
    setCartList([]);
  };



  return (
    <div className="min-h-screen bg-[#030d0a] text-slate-100 font-sans selection:bg-primary-neon selection:text-slate-950 flex flex-col justify-between overflow-x-hidden relative">
      
      {/* Absolute Ambient Background Lights glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-neon/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-glow-highlight/5 blur-[180px] pointer-events-none" />

      {/* Primary Header Segment */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
        }}
        cartCount={cartList.length}
        onOpenCart={() => setCartDrawerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          // Take the user to the Shop shelf tab immediately if they type inside search bars
          if (currentTab !== "shop") {
            setCurrentTab("shop");
          }
        }}
        storeSettings={storeSettings}
      />

      {/* Main Multi-Tab router pages */}
      <main className="flex-1 pb-16 relative">
        <AnimatePresence mode="wait">
          
          {isLoading ? (
            <div className="fixed inset-0 bg-[#030d0a] z-50 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-primary-neon/20 border-t-primary-neon animate-spin" />
              </div>
              <p className="text-xs text-glow-highlight font-mono tracking-widest uppercase animate-pulse">Launching Digital Blazen...</p>
            </div>
          ) : (
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              
              {/* TAB 1: HOME PAGE WITH PROMO AND CURATED HIGHLIGHTED ASSORTMENT */}
              {currentTab === "home" && (
                <div className="space-y-16">
                  {/* Hero landing header slider */}
                  <Hero
                    onExploreProducts={() => setCurrentTab("shop")}
                    onLearnMore={() => {
                      setCurrentTab("features");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />

                  {/* Curated visual showcases of top assets - 3 columns inside a styled frame */}
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                      <div>
                        <span className="text-[10px] text-primary-neon font-mono uppercase tracking-wider block">Hand-crafted Releases</span>
                        <h2 className="font-display font-bold text-2xl text-white mt-1">CURATED HOT SELLS</h2>
                      </div>
                      <button
                        onClick={() => setCurrentTab("shop")}
                        className="px-4 py-2.5 rounded-lg border border-primary-neon/20 hover:border-primary-neon text-primary-neon hover:text-white transition text-xs font-semibold uppercase flex items-center gap-1.5 cursor-pointer"
                      >
                        Explore Complete Shop <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {products.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedProduct(item);
                            setCurrentTab("product-detail");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="custom-glow-card rounded-xl p-6 space-y-5 cursor-pointer group hover:bg-[#0F3F36]/10"
                        >
                          <div className="h-32 overflow-hidden rounded-lg bg-black relative">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-display font-semibold text-white group-hover:text-primary-neon transition duration-200">
                              {item.title}
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-primary-neon/5">
                            <span className="text-xl font-bold font-display text-white">{formatPrice(item.price, item.priceInr)}</span>
                            <span className="text-[10px] text-primary-neon font-mono font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                              View Product <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>
              )}

              {/* TAB 1.5: DEDICATED FEATURES / ABOUT / LEARN MORE PAGE */}
              {currentTab === "features" && (
                <div className="pt-24 space-y-12">
                  <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
                    <span className="text-[10px] text-primary-neon font-mono uppercase tracking-widest block">Core Information Hub</span>
                    <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mt-1">
                      WHY CHOOSE <span className="text-primary-neon">DIGITAL BLAZEN</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-2 max-w-xl mx-auto">
                      Learn more about our speed, custom security guarantees, product support, and industry-standard instant download workflows.
                    </p>
                  </header>

                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                      
                      {/* Left Side: Premium service stack points */}
                      <div className="space-y-6 flex flex-col justify-between">
                        <div className="p-6 rounded-2xl border border-primary-neon/15 bg-[#061411]/50 relative overflow-hidden group hover:border-primary-neon/30 transition-all flex flex-col justify-between h-full">
                          <div className="space-y-3">
                            <div className="h-10 w-10 rounded-xl bg-primary-neon/10 flex items-center justify-center text-primary-neon">
                              <Clock className="w-5 h-5" />
                            </div>
                            <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider">Instant Auto-Delivery System</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              All digital products, templates, and courses are instantly compiled and dispatched. You will receive active download coordinates directly within your real-time customer dashboard and secure email receipt the second you complete checkout.
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-primary-neon/5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-mono">ESTIMATED SPEED: &lt; 2 SECONDS</span>
                            <span className="text-[9px] text-primary-neon font-mono uppercase tracking-wider bg-primary-neon/10 px-2 py-0.5 rounded">Active</span>
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-primary-neon/15 bg-[#061411]/50 relative overflow-hidden group hover:border-primary-neon/30 transition-all flex flex-col justify-between h-full mt-6">
                          <div className="space-y-3">
                            <div className="h-10 w-10 rounded-xl bg-primary-neon/10 flex items-center justify-center text-primary-neon">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider">100% Verified Technical Builds</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Every digital file uploaded by our administrators undergoes rigorous manual and automated audits. We test scripts, inspect template components, and check formatting to confirm zero broken links, clean dependencies, and complete environment guides.
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-primary-neon/5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-mono">STATUS: HIGHLY SECURED</span>
                            <span className="text-[9px] text-primary-neon font-mono uppercase tracking-wider bg-primary-neon/10 px-2 py-0.5 rounded">Fully Audited</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Warranty focus cards */}
                      <div className="space-y-6 flex flex-col justify-between">
                        <div className="p-6 rounded-2xl border border-primary-neon/15 bg-[#061411]/50 relative overflow-hidden group hover:border-primary-neon/30 transition-all flex flex-col justify-between h-full">
                          <div className="space-y-3">
                            <div className="h-10 w-10 rounded-xl bg-primary-neon/10 flex items-center justify-center text-primary-neon">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider">Comprehensive Warranty Policy</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Prioritizing your peace of mind is central to our quality assurance. Each product is covered by the warranty period mentioned for that product. If any issue occurs during the warranty period, such as subscription expiration, password change, account access problems, or similar issues, a replacement will be provided.
                            </p>
                            <div className="bg-slate-950/40 p-3 rounded-lg border border-primary-neon/5 text-[10px] text-slate-300 space-y-1 font-mono">
                              <p className="text-primary-neon font-bold">✓ COVERED WARRANTY PROBLEMS:</p>
                              <p>• Account access problems or password resets</p>
                              <p>• Subscription expiration or premature slot key cancel</p>
                              <p>• Broken resource downloads or link updates</p>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-primary-neon/5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-mono">WARRANTY: REPLACEMENT COVERAGE</span>
                            <span className="text-[9px] text-primary-neon font-mono uppercase tracking-wider bg-primary-neon/10 px-2 py-0.5 rounded">Guaranteed</span>
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-primary-neon/15 bg-[#061411]/50 relative overflow-hidden group hover:border-primary-neon/30 transition-all flex flex-col justify-between h-full mt-6">
                          <div className="space-y-3">
                            <div className="h-10 w-10 rounded-xl bg-primary-neon/10 flex items-center justify-center text-primary-neon">
                              <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider">Dedicated 24/7 Support Desk</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Got setup obstacles or hosting doubts? Submit an online inquiry directly using our message form or contact community administrators to get answers fast. We are dedicated to ensuring your deployment goes smoothly.
                            </p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-primary-neon/5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-mono">TURNAROUND: UNDER 12 HOURS</span>
                            <span className="text-[9px] text-primary-neon font-mono uppercase tracking-wider bg-primary-neon/10 px-2 py-0.5 rounded">Active Live</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </section>

                  {/* Frequently Asked Questions Styling Block */}
                  <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <div className="text-center mb-10">
                      <h2 className="font-display font-bold text-xl text-white uppercase tracking-wider">Frequently Asked Queries</h2>
                      <p className="text-xs text-slate-500 mt-1">Get fast answers to common doubts concerning support, refunds, and accounts.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950/20 border border-primary-neon/10 rounded-xl">
                        <h4 className="font-bold text-xs text-white uppercase tracking-wider">How do I download my purchases?</h4>
                        <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                          Once checkout is complete, your unique download access keys or template repositories are loaded into your personal workspace and dispatched via a secure delivery email.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-950/20 border border-primary-neon/10 rounded-xl">
                        <h4 className="font-bold text-xs text-white uppercase tracking-wider">What happens if a product has login problems?</h4>
                        <p className="text-xs text-slate-450 mt-2 leading-relaxed">
                          If your product becomes inactive or has access issues during its active warranty list, shoot us an inquiry. Our system will generate and exchange your old slot with a replacement immediately.
                        </p>
                      </div>
                    </div>
                  </section>

                  <div className="text-center pb-8">
                    <button
                      onClick={() => setCurrentTab("shop")}
                      className="glow-btn px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider inline-flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Go to Catalog & Shop Now</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCTS CATALOGUE SHEET */}
              {currentTab === "shop" && (
                <div className="pt-20">
                  <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center sm:text-left">
                    <h1 className="font-display font-bold text-3xl text-white">
                      DIGITAL <span className="text-primary-neon">ASSET DELIVERIES</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                      Unlock instant checkouts to fully functional developer wireframes, life organizers, and master courses.
                    </p>
                  </header>
                  
                  <ShopSection
                    products={products}
                    searchQuery={searchQuery}
                    onAddToCart={handleAddToCart}
                    onShowToast={triggerToast}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    formatPrice={formatPrice}
                    selectedCurrency={selectedCurrency}
                    onSelectProduct={(p) => {
                      setSelectedProduct(p);
                      setCurrentTab("product-detail");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              )}

              {/* TAB 4: CONTACT INQUIRIES ROUTINE */}
              {currentTab === "contact" && (
                <div className="pt-20">
                  <ContactSection onShowToast={triggerToast} />
                </div>
              )}

              {currentTab === "privacy" && (
                <div className="pt-24">
                  <LegalSection type="privacy" />
                </div>
              )}

              {currentTab === "terms" && (
                <div className="pt-24">
                  <LegalSection type="terms" />
                </div>
              )}

              {currentTab === "refund" && (
                <div className="pt-24">
                  <LegalSection type="refund" />
                </div>
              )}

              {currentTab === "product-detail" && selectedProduct && (
                <div className="pt-28 pb-12 max-w-5xl mx-auto px-4 sm:px-6 w-full relative z-10 selection:bg-primary-neon selection:text-slate-950">
                  <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-neon/5 blur-[150px] pointer-events-none" />
                  <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-glow-highlight/5 blur-[180px] pointer-events-none" />

                  {/* Back Navigation Bar */}
                  <div className="mb-8 flex justify-between items-center border-b border-primary-neon/15 pb-4">
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setCurrentTab("shop");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="flex items-center space-x-1.5 text-xs text-primary-neon font-bold uppercase tracking-wider hover:text-white transition cursor-pointer"
                    >
                      <span>← Back to Catalog</span>
                    </button>
                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest hidden sm:flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-neon animate-pulse" />
                      <span>Viewing asset: {selectedProduct.id}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Visual Preview Card Column */}
                    <div className="rounded-2xl border border-primary-neon/20 bg-[#061411] relative shadow-2xl flex flex-col items-center overflow-hidden">
                      <div className="w-full aspect-video bg-black/50 flex items-center justify-center border-b border-primary-neon/10 overflow-hidden">
                        <img
                          src={selectedProduct.thumbnail}
                          alt={selectedProduct.title}
                          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {selectedProduct.outOfStock && (
                        <div className="absolute top-4 left-4 bg-red-950/95 border border-red-500/40 px-3 py-1.5 text-xs text-red-300 rounded-lg font-bold uppercase tracking-widest flex items-center space-x-1.5 shadow-2xl">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span>Out of Stock</span>
                        </div>
                      )}

                      {/* Dynamic Website URL Option */}
                      {selectedProduct.websiteUrl ? (
                        <div className="w-full p-4 border-b border-primary-neon/10 bg-[#051f19]/40 text-center flex flex-col items-center justify-center space-y-2">
                          <a
                            href={selectedProduct.websiteUrl.startsWith('http') ? selectedProduct.websiteUrl : `https://${selectedProduct.websiteUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-primary-neon/10 hover:bg-primary-neon hover:text-slate-950 border border-primary-neon/30 text-primary-neon font-bold text-xs py-2 px-5 rounded-lg shadow-md transition-all uppercase tracking-wider cursor-pointer"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Visit Product Website</span>
                          </a>
                        </div>
                      ) : (
                        <div className="w-full p-3 border-b border-primary-neon/5 bg-slate-950/30 text-center">
                          <span className="text-[10px] text-slate-500 font-mono block">
                            No live showcase demo website link configured
                          </span>
                        </div>
                      )}

                      <div className="w-full p-4 bg-[#030d0a]/90 backdrop-blur text-center rounded-b-2xl">
                        <p className="text-glow-highlight text-xs font-mono font-black uppercase tracking-wider">
                          ✓ Delivery: Instantly delivered upon completion
                        </p>
                      </div>
                    </div>

                    {/* Meta and Content Info Column */}
                    <div className="space-y-6">
                      {/* Interactive Reviews Indicator Row */}
                      <div className="flex items-center space-x-2 text-xs text-primary-neon">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-primary-neon text-primary-neon" />
                          ))}
                        </div>
                        <span className="font-semibold text-white">({selectedProduct.rating.toFixed(1)} User Rating)</span>
                        <span className="text-slate-650">•</span>
                        <span className="uppercase text-[10px] text-slate-500 tracking-wider font-mono">{selectedProduct.salesCount} purchases</span>
                      </div>

                      {/* Header block */}
                      <div>
                        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                          {selectedProduct.title}
                        </h1>
                        <p className="text-xs text-primary-neon font-sans uppercase font-bold tracking-wider mt-1.5">
                          Category / Asset Tag: <span className="text-white font-mono">{selectedProduct.category || "General Asset"}</span>
                        </p>
                      </div>

                      {/* Large fully scrollable text explanation box */}
                      <div className="text-sm font-sans text-slate-300 leading-relaxed space-y-4 whitespace-pre-line bg-[#061411]/70 border border-primary-neon/10 p-5 rounded-xl select-text">
                        {renderDescriptionWithLinks(selectedProduct.longDescription || selectedProduct.description)}
                      </div>

                      {/* Key Advantages / Bullet Highlights Area */}
                      <div className="border-t border-primary-neon/15 pt-6 space-y-4">
                        <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Key Advantages (Exactly 4 Bullet Highlights):</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400">
                          {selectedProduct.features.map((feat, fidx) => (
                            <li key={fidx} className="flex items-start space-x-2 bg-[#061411]/40 border border-primary-neon/5 hover:border-primary-neon/10 transition px-3.5 py-2.5 rounded-xl">
                              <CheckCircle className="w-4 h-4 text-primary-neon shrink-0 mt-0.5" />
                              <span className="leading-relaxed select-text font-sans">{renderDescriptionWithLinks(feat)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Separate Section for Validity & Warranty of the accounts/products */}
                      <div className="border-t border-primary-neon/15 pt-6 space-y-4">
                        <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-primary-neon" />
                          <span>Validity & Warranty Protection Plan:</span>
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Access Validity Box */}
                          <div className="p-4 rounded-xl border border-primary-neon/10 bg-[#061411]/40 space-y-1.5 text-center sm:text-left">
                            <span className="text-[10px] text-primary-neon font-mono uppercase tracking-widest block font-bold">Access Validity</span>
                            <h5 className="font-display font-bold text-xs text-white uppercase tracking-wider animate-pulse-subtle">
                              {selectedProduct.validity || "Lifetime Access"}
                            </h5>
                          </div>

                          {/* Warranty Box */}
                          <div className="p-4 rounded-xl border border-primary-neon/10 bg-[#061411]/40 space-y-1.5 text-center sm:text-left">
                            <span className="text-[10px] text-primary-neon font-mono uppercase tracking-widest block font-bold">Warranty Policy</span>
                            <h5 className="font-display font-bold text-xs text-white uppercase tracking-wider animate-pulse-subtle">
                              {selectedProduct.warranty || "Lifetime Protection"}
                            </h5>
                          </div>
                        </div>
                      </div>

                      {/* Pricing checkout strip card */}
                      <div className="border-t border-primary-neon/15 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F3F36]/10 p-6 rounded-xl border border-primary-neon/15">
                        <div>
                          <span className="text-3xl font-display font-bold text-white mt-1 block">
                            {formatPrice(selectedProduct.price, selectedProduct.priceInr)}
                          </span>
                        </div>

                        <div className="shrink-0 flex gap-3">
                          {selectedProduct.outOfStock ? (
                            <button
                               disabled
                               className="px-6 py-4 rounded-xl text-xs font-mono font-black uppercase tracking-widest bg-red-950/70 text-red-400 border border-red-900/40 cursor-not-allowed select-none"
                            >
                              Sold Out
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                handleAddToCart(selectedProduct);
                                setCartDrawerOpen(true);
                                triggerToast(`Added "${selectedProduct.title}" to checkout!`, "success");
                              }}
                              className="glow-btn px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 cursor-pointer shadow-lg hover:brightness-110 active:scale-98 transition-all"
                            >
                              <ShoppingCart className="w-4 h-4 text-slate-950" />
                              <span>Add to Checkout Cart</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* WhatsApp Community Block for Out Of Stock Products */}
                      {selectedProduct.outOfStock && (
                        <div className="border border-emerald-500/30 bg-[#031d15]/50 hover:bg-[#031d15]/70 transition-all p-5 rounded-xl space-y-3 shadow-md animate-fade-in">
                          <div className="flex items-center space-x-2.5">
                            <span className="flex h-2.5 w-2.5 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-wider">
                              Out of stock launch alerts
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            Since this asset is currently **Out of Stock**, join our WhatsApp Community to get first update when keys, slots or resource bundles are replenished!
                          </p>
                          <a
                            href="https://chat.whatsapp.com/B5xETUNWwrJFKoepJrKkEJ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer cursor-pointer border border-emerald-400/20"
                          >
                            <svg className="w-4.5 h-4.5 text-white fill-current shrink-0" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.12 1.91 12.011 1.91c-5.442 0-9.866 4.372-9.87 9.802 0 1.763.483 3.487 1.398 5.013l-.997 3.634 3.791-.973zm12.316-2.923c-.328-.163-1.94-.943-2.24-1.052-.3-.109-.518-.163-.737.163-.219.327-.847 1.051-1.038 1.27-.19.218-.382.245-.71.082-.328-.163-1.383-.503-2.635-1.61-1-.884-1.674-1.977-1.872-2.303-.197-.327-.021-.504.143-.667.147-.146.328-.382.492-.573.164-.19.219-.327.328-.545.109-.219.055-.409-.027-.573-.082-.163-.737-1.745-1.01-2.4a.97.97 0 0 0-.818-.465c-.219-.011-.438-.011-.629.007-.19.019-.504.072-.767.355-.262.283-1 .966-1 2.357s1.011 2.73 1.148 2.914c.138.184 1.983 2.981 4.804 4.18.669.284 1.192.453 1.6.582.673.212 1.284.182 1.767.11.539-.08 1.94-.783 2.213-1.501.273-.718.273-1.334.191-1.464-.082-.13-.3-.219-.629-.382z" />
                            </svg>
                            <span>Join WhatsApp Community</span>
                          </a>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer across all tabs with email subscription updates */}
      <Footer setCurrentTab={setCurrentTab} onShowToast={triggerToast} setSelectedCategory={setSelectedCategory} />

      {/* Cart Sliding Drawer overlay panel */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartList}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onShowToast={triggerToast}
        onRefreshAllData={syncServerData}
        formatPrice={formatPrice}
      />

      {/* Beautiful vertical stacked dynamic toast alert system */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2.5 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              dragElastic={{ left: 0.3, right: 0.3 }}
              onDragEnd={(event, info) => {
                if (Math.abs(info.offset.x) > 80) {
                  setToasts((prev) => prev.filter((to) => to.id !== t.id));
                }
              }}
              initial={{ opacity: 0, x: 25, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 25, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-xl border shadow-xl flex items-start space-x-3 pointer-events-auto cursor-grab active:cursor-grabbing select-none ${
                t.type === "success"
                  ? "bg-[#061411] border-primary-neon/40 text-slate-100"
                  : "bg-[#040f0c] border-[#1f735f] text-slate-200"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {t.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-primary-neon" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-glow-highlight" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium font-sans leading-relaxed">{t.message}</p>
                <div className="mt-1 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                  <span>System notice</span>
                  <span>Swipe to close</span>
                </div>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((to) => to.id !== t.id))}
                className="text-slate-500 hover:text-white transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
