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
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const popularDestinations = [
  {
    name: "Goa",
    tagline: "Sun, Sand & Portuguese Charm",
    image: "/assets/generated/dest-goa.dim_400x300.jpg",
  },
  {
    name: "Kerala",
    tagline: "God's Own Country",
    image: "/assets/generated/dest-kerala.dim_400x300.jpg",
  },
  {
    name: "Leh-Ladakh",
    tagline: "The Roof of the World",
    image: "/assets/generated/dest-ladakh.dim_400x300.jpg",
  },
  {
    name: "Rajasthan",
    tagline: "Land of Kings & Forts",
    image: "/assets/generated/dest-rajasthan.dim_400x300.jpg",
  },
  {
    name: "Mysore",
    tagline: "The Royal City of Palaces",
    image: "/assets/generated/dest-mysore.dim_400x300.jpg",
  },
  {
    name: "Ooty",
    tagline: "Queen of Hill Stations",
    image: "/assets/generated/dest-ooty.dim_400x300.jpg",
  },
  {
    name: "Coorg",
    tagline: "Scotland of India",
    image: "/assets/generated/dest-coorg.dim_400x300.jpg",
  },
  {
    name: "Pondicherry",
    tagline: "French Riviera of the East",
    image: "/assets/generated/dest-pondicherry.dim_400x300.jpg",
  },
];

const packages = [
  {
    id: 1,
    name: "Goa Beach Holiday",
    destination: "North & South Goa",
    duration: 4,
    price: 22400,
    description:
      "Sun, sand, and sea — enjoy the best of Goa's beaches, vibrant nightlife, Portuguese heritage, and fresh seafood.",
    image: "/assets/generated/dest-goa.dim_400x300.jpg",
    highlights: ["Baga Beach", "Dudhsagar Falls", "Old Goa Churches"],
  },
  {
    id: 2,
    name: "Mysore Heritage Tour",
    destination: "Mysore",
    duration: 2,
    price: 7110,
    description:
      "Explore the royal city of Mysore — the grand Mysore Palace, Chamundi Hills, Brindavan Gardens, and silk markets.",
    image: "/assets/generated/dest-mysore.dim_400x300.jpg",
    highlights: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens"],
  },
  {
    id: 3,
    name: "Coorg Coffee Trail",
    destination: "Coorg (Kodagu)",
    duration: 3,
    price: 10650,
    description:
      "Breathe in the misty hills of Coorg — lush coffee plantations, Abbey Falls, Raja's Seat, and rich Kodava culture.",
    image: "/assets/generated/dest-coorg.dim_400x300.jpg",
    highlights: ["Abbey Falls", "Raja's Seat", "Coffee Estates"],
  },
  {
    id: 4,
    name: "Ooty Hills Escape",
    destination: "Ooty, Tamil Nadu",
    duration: 3,
    price: 15300,
    description:
      "Discover the Queen of Hill Stations — toy train rides, botanical gardens, Doddabetta Peak, and scenic tea estates.",
    image: "/assets/generated/dest-ooty.dim_400x300.jpg",
    highlights: ["Toy Train", "Botanical Garden", "Doddabetta Peak"],
  },
  {
    id: 5,
    name: "Munnar Tea Trails",
    destination: "Munnar, Kerala",
    duration: 4,
    price: 18700,
    description:
      "Wake up to rolling green tea estates, misty valleys, and the serenity of Eravikulam National Park.",
    image: "/assets/generated/dest-kerala.dim_400x300.jpg",
    highlights: ["Tea Gardens", "Eravikulam NP", "Mattupetty Dam"],
  },
  {
    id: 6,
    name: "Taj Mahal & Agra Tour",
    destination: "Agra, Uttar Pradesh",
    duration: 2,
    price: 74600,
    description:
      "Stand before the world's most iconic monument — the Taj Mahal — and explore Agra Fort and Fatehpur Sikri.",
    image: "/assets/generated/dest-agra.dim_400x300.jpg",
    highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
  },
  {
    id: 7,
    name: "Tirupati Divine Darshan",
    destination: "Tirupati, Andhra Pradesh",
    duration: 2,
    price: 11200,
    description:
      "A sacred pilgrimage to Lord Venkateswara Temple atop Tirumala Hills — one of the most visited shrines in the world.",
    image: "/assets/generated/dest-tirupati.dim_400x300.jpg",
    highlights: ["Tirumala Temple", "Padmavathi Temple", "Kapila Theertham"],
  },
  {
    id: 8,
    name: "Leh-Ladakh Adventure",
    destination: "Leh, Ladakh",
    duration: 7,
    price: 23530,
    description:
      "Conquer the roof of the world — high-altitude passes, crystal-clear lakes, ancient monasteries, and starlit skies.",
    image: "/assets/generated/dest-ladakh.dim_400x300.jpg",
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La Pass"],
  },
  {
    id: 9,
    name: "Pondicherry Getaway",
    destination: "Pondicherry",
    duration: 3,
    price: 15060,
    description:
      "Experience the French Quarter charm — colorful colonial streets, Auroville, serene beaches, and fine dining.",
    image: "/assets/generated/dest-pondicherry.dim_400x300.jpg",
    highlights: ["French Quarter", "Auroville", "Promenade Beach"],
  },
  {
    id: 10,
    name: "Kerala Backwaters",
    destination: "Kochi - Munnar - Alleppey",
    duration: 6,
    price: 22260,
    description:
      "Experience the serene backwaters, lush tea gardens, and vibrant culture of God's Own Country on a luxury houseboat.",
    image: "/assets/generated/dest-kerala.dim_400x300.jpg",
    highlights: ["Houseboat Stay", "Munnar Tea Gardens", "Kathakali Show"],
  },
  {
    id: 11,
    name: "Chennai City Tour",
    destination: "Chennai, Tamil Nadu",
    duration: 3,
    price: 14460,
    description:
      "Explore the cultural capital of South India — Marina Beach, Kapaleeshwarar Temple, Fort St. George, and local cuisine.",
    image: "/assets/generated/dest-chennai.dim_400x300.jpg",
    highlights: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George"],
  },
  {
    id: 12,
    name: "Andhra Pradesh Explorer",
    destination: "Andhra Pradesh",
    duration: 5,
    price: 18720,
    description:
      "Discover the heritage and natural beauty of Andhra — from Araku Valley to ancient temples and pristine coastline.",
    image: "/assets/generated/dest-tirupati.dim_400x300.jpg",
    highlights: ["Araku Valley", "Borra Caves", "Visakhapatnam Beach"],
  },
  {
    id: 13,
    name: "Hyderabad Heritage",
    destination: "Hyderabad, Telangana",
    duration: 3,
    price: 22580,
    description:
      "Explore the City of Pearls — Charminar, Golconda Fort, Ramoji Film City, and the famous Hyderabadi biryani.",
    image: "/assets/generated/dest-hyderabad.dim_400x300.jpg",
    highlights: ["Charminar", "Golconda Fort", "Ramoji Film City"],
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
                src="/assets/1000399371-019d4848-de9d-738f-9ff8-eb224153380e.jpg"
                alt="Phoenix Logo"
                className="w-12 h-12 object-contain rounded"
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
              <p
                className="text-sm font-semibold tracking-widest mb-2"
                style={{ color: "#138C8F" }}
              >
                EXPLORE INDIA
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900">
                POPULAR DESTINATIONS
              </h2>
              <div
                className="w-16 h-1 rounded-full mx-auto mt-4"
                style={{ backgroundColor: "#F28C28" }}
              />
            </motion.div>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              data-ocid="destinations.list"
            >
              {popularDestinations.map((dest, i) => (
                <motion.a
                  key={dest.name}
                  href="#packages"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
                  data-ocid={`destinations.item.${i + 1}`}
                >
                  <div className="relative h-48 sm:h-56">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
                        {dest.name}
                      </h3>
                      <p className="text-white/80 text-xs mt-0.5 leading-snug">
                        {dest.tagline}
                      </p>
                    </div>
                    {/* Hover arrow */}
                    <div
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: "#F28C28" }}
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="#packages"
                className="inline-flex items-center gap-2 rounded-full font-semibold text-sm px-8 py-3 text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#138C8F" }}
                data-ocid="destinations.primary_button"
              >
                View All Tour Packages
                <ChevronRight className="w-4 h-4" />
              </a>
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
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xs text-gray-500">
                          Starting from
                        </span>
                        <p
                          className="text-lg font-bold"
                          style={{ color: "#138C8F" }}
                        >
                          ₹{pkg.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">per person</span>
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
                  src: "/assets/1000393746-019d484c-6eaf-776f-9f53-f1d6a5711594.jpg",
                  caption: "Suzuki Ertiga - Premium Comfort",
                },
                {
                  src: "/assets/1000393742-019d484c-74b4-707d-a848-16c7dcc97ecd.jpg",
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
                  src="/assets/1000399371-019d4848-de9d-738f-9ff8-eb224153380e.jpg"
                  alt="Phoenix Logo"
                  className="w-12 h-12 object-contain rounded"
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
                  "Goa Beach Holiday",
                  "Kerala Backwaters",
                  "Leh-Ladakh Adventure",
                  "Taj Mahal & Agra Tour",
                  "Munnar Tea Trails",
                  "Hyderabad Heritage",
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
                    10/1 1st Cross Road,
                    <br />
                    CBI Road, RT Nagar Post,
                    <br />
                    Bangalore, Karnataka - 560032
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
