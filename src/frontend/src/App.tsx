import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  ChevronRight,
  Clock,
  Facebook,
  Globe,
  Heart,
  Hotel,
  Instagram,
  Loader2,
  Mail,
  Map as MapIcon,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  Search,
  Shield,
  Star,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const destinations = [
  {
    id: 1,
    name: "Goa",
    country: "India",
    rating: 4.8,
    image: "/assets/generated/dest-goa.dim_400x300.jpg",
  },
  {
    id: 2,
    name: "Agra",
    country: "India",
    rating: 4.9,
    image: "/assets/generated/dest-agra.dim_400x300.jpg",
  },
  {
    id: 3,
    name: "Kerala",
    country: "India",
    rating: 4.7,
    image: "/assets/generated/dest-kerala.dim_400x300.jpg",
  },
  {
    id: 4,
    name: "Manali",
    country: "India",
    rating: 4.8,
    image: "/assets/generated/dest-manali.dim_400x300.jpg",
  },
  {
    id: 5,
    name: "Rajasthan",
    country: "India",
    rating: 4.6,
    image: "/assets/generated/dest-rajasthan.dim_400x300.jpg",
  },
  {
    id: 6,
    name: "Andaman",
    country: "India",
    rating: 4.9,
    image: "/assets/generated/dest-andaman.dim_400x300.jpg",
  },
  {
    id: 7,
    name: "Ladakh",
    country: "India",
    rating: 4.9,
    image: "/assets/generated/dest-ladakh.dim_400x300.jpg",
  },
  {
    id: 8,
    name: "Coorg",
    country: "India",
    rating: 4.8,
    image: "/assets/generated/dest-coorg.dim_400x300.jpg",
  },
  {
    id: 9,
    name: "Varanasi",
    country: "India",
    rating: 4.7,
    image: "/assets/generated/dest-varanasi.dim_400x300.jpg",
  },
  {
    id: 10,
    name: "Ooty",
    country: "India",
    rating: 4.6,
    image: "/assets/generated/dest-ooty.dim_400x300.jpg",
  },
  {
    id: 11,
    name: "Mysore",
    country: "India",
    rating: 4.8,
    image: "/assets/generated/dest-mysore.dim_400x300.jpg",
  },
];

const packages = [
  {
    id: 1,
    name: "Golden Triangle Tour",
    destination: "Delhi - Agra - Jaipur",
    duration: 5,
    description:
      "Explore India's iconic Golden Triangle covering the majestic Taj Mahal, Amber Fort, and historic Delhi monuments.",
    image: "/assets/generated/dest-agra.dim_400x300.jpg",
    highlights: ["Taj Mahal", "Amber Fort", "Qutub Minar"],
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    destination: "Kochi - Munnar - Alleppey",
    duration: 6,
    description:
      "Experience the serene backwaters, lush tea gardens, and vibrant culture of God's Own Country on a luxury houseboat.",
    image: "/assets/generated/dest-kerala.dim_400x300.jpg",
    highlights: ["Houseboat Stay", "Munnar Tea Gardens", "Kathakali Show"],
  },
  {
    id: 3,
    name: "Goa Beach Holiday",
    destination: "North & South Goa",
    duration: 4,
    description:
      "Sun, sand, and sea — enjoy the best of Goa's beaches, vibrant nightlife, Portuguese heritage, and fresh seafood.",
    image: "/assets/generated/dest-goa.dim_400x300.jpg",
    highlights: ["Baga Beach", "Dudhsagar Falls", "Old Goa Churches"],
  },
  {
    id: 4,
    name: "Manali Adventure",
    destination: "Manali - Solang Valley",
    duration: 5,
    description:
      "Adventure awaits in the breathtaking Himalayas — trek, ski, and soak in the beauty of snow-capped peaks and meadows.",
    image: "/assets/generated/dest-manali.dim_400x300.jpg",
    highlights: ["Solang Valley", "Rohtang Pass", "River Rafting"],
  },
];

const services = [
  {
    icon: Globe,
    label: "Tour Packages",
    desc: "Curated itineraries for every traveler",
  },
  { icon: Hotel, label: "Hotel Booking", desc: "Best rates on 10,000+ hotels" },
  { icon: Plane, label: "Flight Booking", desc: "Lowest airfares guaranteed" },
  {
    icon: MapPin,
    label: "Custom Itineraries",
    desc: "Tailored India travel plans",
  },
  {
    icon: Heart,
    label: "Travel Insurance",
    desc: "Comprehensive coverage plans",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#packages" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Team", href: "#team" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_NUMBER = "916366020551";

export default function App() {
  const { actor } = useActor();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchWhere, setSearchWhere] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Please wait while we connect to the server.");
      return;
    }
    setIsSubmitting(true);
    try {
      await actor.submitInquiry(contactName, contactEmail, contactMessage);
      toast.success("Inquiry submitted! We'll contact you shortly.");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch {
      toast.error("Failed to submit. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
        data-ocid="nav.panel"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2"
              data-ocid="nav.link"
            >
              <img
                src="/assets/generated/phonix-logo-transparent.dim_200x200.png"
                alt="Phoenix Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="leading-tight">
                <div
                  className="font-black text-sm sm:text-base lg:text-lg tracking-wide"
                  style={{ color: "#F28C28" }}
                >
                  PHOENIX
                </div>
                <div className="font-semibold text-[10px] sm:text-xs tracking-widest text-gray-600">
                  TOURS & TRAVELS
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <a
                  href="tel:6366020551"
                  className="flex items-center gap-1 text-sm font-medium text-gray-600"
                >
                  <Phone className="w-4 h-4" style={{ color: "#F28C28" }} />
                  <span>6366020551</span>
                </a>
                <a
                  href="tel:7010731589"
                  className="flex items-center gap-1 text-sm font-medium text-gray-600"
                >
                  <Phone className="w-4 h-4" style={{ color: "#F28C28" }} />
                  <span>7010731589</span>
                </a>
              </div>
              <Button
                className="rounded-full font-semibold text-sm px-6"
                style={{ backgroundColor: "#F28C28", color: "white" }}
                data-ocid="nav.primary_button"
              >
                BOOK NOW
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              data-ocid="nav.toggle"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-gray-700 py-2 border-b border-gray-100"
                    onClick={() => setMenuOpen(false)}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  className="rounded-full font-semibold mt-2"
                  style={{ backgroundColor: "#F28C28", color: "white" }}
                  data-ocid="nav.primary_button"
                >
                  BOOK NOW
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-bg.dim_1400x700.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 hero-gradient" />
          <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="text-sm sm:text-base font-medium tracking-widest mb-3 opacity-90"
                style={{ color: "#F28C28" }}
              >
                🇮🇳 EXPLORE INCREDIBLE INDIA
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-tight mb-4">
                DISCOVER YOUR
                <br />
                <span style={{ color: "#F28C28" }}>DREAM</span> INDIA
                DESTINATION
              </h1>
              <p className="text-base sm:text-lg font-light opacity-90 mb-10 max-w-2xl mx-auto">
                Unforgettable journeys across India — from serene backwaters to
                snow-capped Himalayan peaks.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-full shadow-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-3xl mx-auto">
                <div className="flex items-center gap-2 flex-1 px-4">
                  <MapIcon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#F28C28" }}
                  />
                  <input
                    placeholder="Where to?"
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent py-2"
                    data-ocid="hero.search_input"
                  />
                </div>
                <div className="hidden sm:block w-px h-8 bg-gray-200" />
                <div className="flex items-center gap-2 flex-1 px-4">
                  <Globe
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#F28C28" }}
                  />
                  <input
                    placeholder="Type (Beach / Hill / Heritage)"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent py-2"
                    data-ocid="hero.search_input"
                  />
                </div>
                <div className="hidden sm:block w-px h-8 bg-gray-200" />
                <div className="flex items-center gap-2 flex-1 px-4">
                  <Calendar
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#F28C28" }}
                  />
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent py-2"
                    data-ocid="hero.search_input"
                  />
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm text-white flex-shrink-0"
                  style={{ backgroundColor: "#F28C28" }}
                  data-ocid="hero.primary_button"
                >
                  <Search className="w-4 h-4" />
                  SEARCH TOURS
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-3 gap-4 text-white text-center">
              {[
                { value: "500+", label: "Tour Packages" },
                { value: "50,000+", label: "Happy Travelers" },
                { value: "15+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-xl sm:text-2xl font-black"
                    style={{ color: "#F28C28" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm opacity-80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POPULAR DESTINATIONS */}
        <section id="destinations" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <p
                  className="text-sm font-semibold tracking-widest"
                  style={{ color: "#138C8F" }}
                >
                  EXPLORE INDIA
                </p>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: "#F28C28" }}
                >
                  Domestic Only
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900">
                POPULAR DESTINATIONS
              </h2>
              <div
                className="w-16 h-1 rounded-full mx-auto mt-4"
                style={{ backgroundColor: "#F28C28" }}
              />
            </motion.div>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              data-ocid="destinations.list"
            >
              {destinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-card"
                  style={{ aspectRatio: "4/3" }}
                  data-ocid={`destinations.item.${i + 1}`}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 card-dest-gradient" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-bold text-base leading-tight">
                      {dest.name}
                    </h3>
                    <p className="text-xs opacity-80 mb-1">{dest.country}</p>
                    <div className="flex items-center justify-end">
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {dest.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PACKAGES */}
        <section id="packages" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p
                className="text-sm font-semibold tracking-widest mb-2"
                style={{ color: "#138C8F" }}
              >
                HANDPICKED FOR YOU
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900">
                FEATURED TOUR PACKAGES
              </h2>
              <div
                className="w-16 h-1 rounded-full mx-auto mt-4"
                style={{ backgroundColor: "#F28C28" }}
              />
            </motion.div>

            <div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-ocid="packages.list"
            >
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
                  data-ocid={`packages.item.${i + 1}`}
                >
                  <div className="relative">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span
                        className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: "#138C8F" }}
                      >
                        {pkg.duration}D
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-base text-gray-900 mb-1">
                      {pkg.name}
                    </h3>
                    <p
                      className="text-xs font-medium mb-2"
                      style={{ color: "#138C8F" }}
                    >
                      {pkg.destination}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">
                      {pkg.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {pkg.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} package. Please share more details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-full font-semibold text-sm text-white flex items-center justify-center gap-2 py-2.5 transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#25D366" }}
                      data-ocid={`packages.secondary_button.${i + 1}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Enquire on WhatsApp
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR SERVICES */}
        <section
          id="services"
          className="py-20"
          style={{ backgroundColor: "#f0fafa" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p
                className="text-sm font-semibold tracking-widest mb-2"
                style={{ color: "#138C8F" }}
              >
                WHAT WE OFFER
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900">
                OUR SERVICES
              </h2>
              <div
                className="w-16 h-1 rounded-full mx-auto mt-4"
                style={{ backgroundColor: "#F28C28" }}
              />
            </motion.div>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
              data-ocid="services.list"
            >
              {services.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-lg transition-all hover:-translate-y-1 group"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors"
                    style={{ backgroundColor: "#e6f7f7" }}
                  >
                    <Icon className="w-7 h-7" style={{ color: "#138C8F" }} />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">
                    {label}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR FLEET */}
        <section id="fleet" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p
                className="text-sm font-semibold tracking-widest mb-2"
                style={{ color: "#138C8F" }}
              >
                TRAVEL IN COMFORT
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900">
                OUR FLEET
              </h2>
              <div
                className="w-16 h-1 rounded-full mx-auto mt-4"
                style={{ backgroundColor: "#F28C28" }}
              />
            </motion.div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              data-ocid="fleet.list"
            >
              {[
                {
                  src: "/assets/uploads/whatsapp_image_2026-03-28_at_7.00.35_pm-019d34a8-546c-76fb-ae2b-13d0d95acfae-1.jpeg",
                  caption: "Suzuki Ertiga - Premium Comfort",
                },
                {
                  src: "/assets/uploads/whatsapp_image_2026-03-28_at_7.00.36_pm-019d34a8-5555-741e-88ce-98373d607961-2.jpeg",
                  caption: "Suzuki Ertiga - Spacious MPV",
                },
              ].map((car, i) => (
                <motion.div
                  key={car.caption}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white border border-gray-100"
                  data-ocid={`fleet.item.${i + 1}`}
                >
                  <img
                    src={car.src}
                    alt={car.caption}
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                  <div className="px-5 py-4 text-center">
                    <p className="font-semibold text-gray-800 text-sm">
                      {car.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MEET OUR TEAM */}
        <section id="team" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p
                className="text-sm font-semibold tracking-widest mb-2"
                style={{ color: "#138C8F" }}
              >
                THE PEOPLE BEHIND
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900">
                MEET OUR TEAM
              </h2>
              <div
                className="w-16 h-1 rounded-full mx-auto mt-4"
                style={{ backgroundColor: "#F28C28" }}
              />
            </motion.div>

            <div className="flex justify-center" data-ocid="team.list">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="bg-white rounded-3xl shadow-card hover:shadow-lg transition-shadow p-8 flex flex-col items-center text-center w-full max-w-xs border border-gray-100"
                data-ocid="team.item.1"
              >
                {/* Avatar */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-5 text-white text-3xl font-black shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, #F28C28 0%, #e07820 100%)",
                  }}
                >
                  S
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-1">
                  Shakthi
                </h3>
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: "#e6f7f7", color: "#138C8F" }}
                >
                  Founder
                </span>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Passionate about creating memorable travel experiences across
                  India, Shakthi founded Phoenix Tours & Travels with a vision
                  to make every journey extraordinary.
                </p>
                <div className="flex gap-3 mt-6">
                  <a
                    href="https://www.instagram.com/_phoenix_2326?igsh=ejNxYTdydDRtMWx0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                    style={{ backgroundColor: "#fff5ea" }}
                    data-ocid="team.link"
                  >
                    <Instagram
                      className="w-4 h-4"
                      style={{ color: "#F28C28" }}
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shakthi-mani-8b73613b5?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                    style={{ backgroundColor: "#e6f7f7" }}
                    data-ocid="team.link"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="#138C8F"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>LinkedIn</title>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT US */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src="/assets/generated/dest-kerala.dim_400x300.jpg"
                  alt="About Phoenix Tours"
                  className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-xl"
                />
                <div
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg"
                  style={{ border: "2px solid #F28C28" }}
                >
                  <div
                    className="text-2xl font-black"
                    style={{ color: "#F28C28" }}
                  >
                    15+
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Years of Excellence
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="text-sm font-semibold tracking-widest mb-2"
                  style={{ color: "#138C8F" }}
                >
                  WHO WE ARE
                </p>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900 mb-6">
                  YOUR TRUSTED
                  <br />
                  <span style={{ color: "#F28C28" }}>TRAVEL PARTNER</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Welcome to <strong>Phoenix Tours & Travels</strong> — where
                  every journey is crafted with passion, precision, and personal
                  care. With over 15 years of experience, we have helped
                  thousands of travelers across incredible India discover their
                  dream destinations.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  From the golden sands of Goa to the majestic peaks of Ladakh,
                  our expert team curates unforgettable experiences tailored to
                  your preferences and budget. We handle everything so you can
                  focus on making memories.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Users, value: "50,000+", label: "Happy Travelers" },
                    { icon: Globe, value: "200+", label: "India Spots" },
                    { icon: Star, value: "4.9/5", label: "Average Rating" },
                    { icon: Clock, value: "24/7", label: "Customer Support" },
                  ].map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#fff5ea" }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: "#F28C28" }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className="rounded-full font-semibold px-8"
                  style={{ backgroundColor: "#F28C28", color: "white" }}
                  data-ocid="about.primary_button"
                >
                  Read More About Us
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTACT / INQUIRY */}
        <section
          className="py-20"
          style={{
            background: "linear-gradient(135deg, #138C8F 0%, #0d6e71 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
                PLAN YOUR NEXT TRIP
              </h2>
              <p className="text-white/80 mb-8">
                Get in touch with our travel experts and let us create your
                perfect journey
              </p>

              <form
                onSubmit={handleSubmitInquiry}
                className="bg-white rounded-3xl p-8 shadow-2xl text-left"
                data-ocid="inquiry.modal"
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <Input
                      id="contact-name"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="John Doe"
                      className="rounded-xl"
                      data-ocid="inquiry.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      required
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="rounded-xl"
                      data-ocid="inquiry.input"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your dream trip..."
                    rows={4}
                    className="rounded-xl resize-none"
                    data-ocid="inquiry.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full font-semibold text-base py-6"
                  style={{ backgroundColor: "#F28C28", color: "white" }}
                  data-ocid="inquiry.submit_button"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="footer-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/assets/generated/phonix-logo-transparent.dim_200x200.png"
                  alt="Phoenix Logo"
                  className="w-10 h-10 object-contain"
                />
                <div className="leading-tight">
                  <div
                    className="font-black text-base tracking-wide"
                    style={{ color: "#F28C28" }}
                  >
                    PHOENIX
                  </div>
                  <div className="font-semibold text-xs tracking-widest text-gray-400">
                    TOURS & TRAVELS
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Your trusted travel partner since 2009. Creating unforgettable
                journeys across incredible India.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, href: "#", name: "facebook" },
                  {
                    Icon: Instagram,
                    href: "https://www.instagram.com/_phoenix_2326?igsh=ejNxYTdydDRtMWx0",
                    name: "instagram",
                  },
                  { Icon: Twitter, href: "#", name: "twitter" },
                  { Icon: Youtube, href: "#", name: "youtube" },
                ].map(({ Icon, href, name }) => (
                  <a
                    key={name}
                    href={href}
                    target={href !== "#" ? "_blank" : undefined}
                    rel={href !== "#" ? "noopener noreferrer" : undefined}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    data-ocid="footer.link"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className="font-bold text-sm tracking-widest uppercase mb-5"
                style={{ color: "#F28C28" }}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2"
                      data-ocid="footer.link"
                    >
                      <ChevronRight
                        className="w-3 h-3"
                        style={{ color: "#F28C28" }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tours */}
            <div>
              <h3
                className="font-bold text-sm tracking-widest uppercase mb-5"
                style={{ color: "#F28C28" }}
              >
                Popular Tours
              </h3>
              <ul className="space-y-3">
                {[
                  "Golden Triangle",
                  "Kerala Backwaters",
                  "Goa Beach Holiday",
                  "Manali Adventure",
                  "Andaman Islands",
                  "Rajasthan Heritage",
                ].map((t) => (
                  <li key={t}>
                    <a
                      href="#packages"
                      className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2"
                      data-ocid="footer.link"
                    >
                      <ChevronRight
                        className="w-3 h-3"
                        style={{ color: "#F28C28" }}
                      />
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3
                className="font-bold text-sm tracking-widest uppercase mb-5"
                style={{ color: "#F28C28" }}
              >
                CONTACT US
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#F28C28" }}
                  />
                  <div>
                    <a
                      href="tel:6366020551"
                      className="text-gray-300 text-sm hover:text-white transition-colors font-medium block"
                    >
                      +91 6366020551
                    </a>
                    <a
                      href="tel:7010731589"
                      className="text-gray-300 text-sm hover:text-white transition-colors font-medium block"
                    >
                      +91 7010731589
                    </a>
                    <p className="text-gray-500 text-xs">
                      Mon - Sun: 9am - 8pm
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#F28C28" }}
                  />
                  <a
                    href="mailto:phoenixtours8050@gmail.com"
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    phoenixtours8050@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#F28C28" }}
                  />
                  <span className="text-gray-400 text-sm leading-relaxed">
                    10/1, Chamundinagar First Cross,
                    <br />
                    Shalini Bar Back Side, RT Nagar Post,
                    <br />
                    Bangalore - 560032
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Phoenix Tours & Travels. All rights
              reserved.
            </p>
            <p>
              Built with{" "}
              <Heart className="inline w-3 h-3 mx-1 text-red-400 fill-red-400" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: "#25D366" }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.button"
      >
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </motion.a>
    </div>
  );
}
