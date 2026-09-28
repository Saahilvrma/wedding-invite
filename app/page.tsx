"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ===== SVG ICONS ===== */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="shrink-0">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="shrink-0">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="shrink-0">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
);

const DirectionsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" className="shrink-0">
    <path d="M21.71 11.29l-9-9a.996.996 0 00-1.41 0l-9 9a.996.996 0 000 1.41l9 9c.39.39 1.02.39 1.41 0l9-9a.996.996 0 000-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
  </svg>
);

const PaletteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

/* ===== THEME CONFIG ===== */
const THEMES = [
  { id: "default", label: "Ivory & Navy", swatch: "linear-gradient(135deg, #f8f6f0, #1e3a8a)" },
  { id: "maroon", label: "Ivory & Maroon", swatch: "linear-gradient(135deg, #fffaf9, #7f1d1d)" },
  { id: "navy-dark", label: "Navy Dark", swatch: "linear-gradient(135deg, #0b1426, #c9a84c)" },
];

/* ===== CAROUSEL & GALLERY IMAGES ===== */
const SLIDES = [
  {
    galleryId: "pre-wedding",
    src: "/images/banner-image.png",
    alt: "Amrita & Jaspreet - Pre-wedding shoot",
    location: "Khalsa College, Amritsar",
    date: "Pre-wedding shoot, 2024",
    title: "Pre-Wedding Memories",
    description: "Our magical shoot at the beautiful Khalsa College."
  },
  {
    galleryId: "engagement",
    src: "/images/pre-weeding-section-1.png",
    alt: "Amrita & Jaspreet - Udaipur moments",
    location: "Lake Palace, Udaipur",
    date: "Engagement ceremony",
    title: "Engagement Ceremony",
    description: "Exchanging rings and promises in Udaipur."
  },
  {
    galleryId: "favorite",
    src: "/images/pre-weeding-section-2.png",
    alt: "Amrita & Jaspreet - Together forever",
    location: "Golden Hour Moments",
    date: "Our favourite shot",
    title: "Our Favorite Moments",
    description: "A beautiful golden hour."
  },
];

/* ===== CEREMONIES DATA ===== */
const CEREMONIES = [
  {
    badge: "Pre-Wedding Ceremony",
    title: "Vatna & Haldi Ceremony",
    desc: "A joyous ceremony of blessings, sandal paste, and turmeric. An age-old tradition of the Sikh community honouring the bride & groom with haldi to bless them for the new beginning.",
    date: "Friday, 14th February 2026",
    time: "10:00 AM — 1:00 PM",
    venue: "Nalwa Niwas, Khalsa College, Amritsar",
  },
  {
    badge: "Pre-Wedding Ceremony",
    title: "Jaggo Night & Giddha",
    desc: "A grand night celebration commencing the night before the wedding in Sikh tradition, with joyful folk songs and dances by the ladies.",
    date: "Friday, 14th February 2026",
    time: "7:00 PM — 11:00 PM",
    venue: "Nalwa Niwas, Club Road, Amritsar",
  },
  {
    badge: "Pre-Wedding Celebration",
    title: "Sangeet & Royal Cocktail Soirée",
    desc: "An enchanting evening blending live music, entertainment, signature cocktails, delicacies, and gourmet dining in a grand celebration setting.",
    date: "Saturday, 15th February 2026",
    time: "6:00 PM — Late Night",
    venue: "Grand Maharaja Banquet & Garden",
  },
];

const EXTRA_CEREMONIES = [
  {
    badge: "Main Wedding Day",
    title: "Sehra Bandi & Baraat Ravaagi",
    desc: "Groom's procession with grand baraat, Dhol, music, and celebration as our communities come together for this auspicious beginning.",
    date: "Sunday, 16th February 2026",
    time: "Early Morning",
    venue: "ParulPal, Ranjit Avenue, Amritsar",
  },
  {
    badge: "Sacred Ceremony",
    title: "Anand Karaj",
    desc: "The holy Sikh marriage ceremony. Solemnized at Sri Harmandir Sahib, our lives join in everlasting love as we take our Lavaan around the holy Sri Guru Granth Sahib Ji.",
    date: "Sunday, 16th February 2026",
    time: "7:00 AM — 10:00 AM",
    venue: "Historical Gurdwara Sahib",
  },
  {
    badge: "Grand Celebration",
    title: "Grand Reception & Doli",
    desc: "An evening of grandeur, blessings, and feasting to celebrate the newlywed couple. Join us for the grand reception celebration.",
    date: "Sunday, 16th February 2026",
    time: "7:00 PM — Late",
    venue: "Grand Imperial Hall, The Mall, Amritsar",
  },
];

/* ===== MAIN COMPONENT ===== */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("default");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxGallery, setLightboxGallery] = useState<typeof SLIDES>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (slide: typeof SLIDES[0]) => {
    const galleryImages = SLIDES.filter(s => s.galleryId === slide.galleryId);
    const imagesToShow = galleryImages.length > 1 ? galleryImages : SLIDES;
    setLightboxGallery(imagesToShow);
    setLightboxIndex(imagesToShow.findIndex(s => s.src === slide.src) !== -1 ? imagesToShow.findIndex(s => s.src === slide.src) : 0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextLightboxSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % lightboxGallery.length);
  };
  const prevLightboxSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + lightboxGallery.length) % lightboxGallery.length);
  };

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date("2026-10-15T10:00:00+05:30").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setIsNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme change
  const changeTheme = useCallback((themeId: string) => {
    setActiveTheme(themeId);
    if (themeId === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav id="navbar" className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-3 flex items-center justify-between transition-all duration-300 ${isNavScrolled ? "bg-primary/95 backdrop-blur-md shadow-sm border-b border-b-theme" : "bg-primary/90 backdrop-blur-sm border-b border-b-theme"}`}>
        <div className="flex items-center gap-3">
          <Image
            className="w-10 h-10 rounded-full object-cover border-2 border-gold"
            src="/images/name-logo.png"
            alt="A & J Logo"
            width={40}
            height={40}
          />
          <span className="font-heading text-lg font-semibold text-accent tracking-wide">Amrita & Jaspreet</span>
        </div>

        <ul className="hidden md:flex items-center gap-8 list-none">
          <li><a href="#hero" className="nav-link font-body text-xs font-medium text-t-secondary uppercase tracking-widest hover:text-accent transition-colors">Home</a></li>
          <li><a href="#prewedding" className="nav-link font-body text-xs font-medium text-t-secondary uppercase tracking-widest hover:text-accent transition-colors">Our Story</a></li>
          <li><a href="#ceremonies" className="nav-link font-body text-xs font-medium text-t-secondary uppercase tracking-widest hover:text-accent transition-colors">Ceremonies</a></li>
          <li><a href="#venues" className="nav-link font-body text-xs font-medium text-t-secondary uppercase tracking-widest hover:text-accent transition-colors">Venues</a></li>
          <li><a href="#blessings" className="nav-link font-body text-xs font-medium text-t-secondary uppercase tracking-widest hover:text-accent transition-colors">Blessings</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <span className="hidden md:block font-body text-xs text-t-muted tracking-wide">✉ amritajaspreet@gmail.com</span>
          <button
            className="flex md:hidden flex-col gap-1.5 p-1 cursor-pointer"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-accent"></span>
            <span className="block w-6 h-0.5 bg-accent"></span>
            <span className="block w-6 h-0.5 bg-accent"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-[999] flex-col items-center justify-center gap-8 ${mobileNavOpen ? "flex" : "hidden"}`}>
        <button className="absolute top-5 right-6 text-accent text-3xl" onClick={() => setMobileNavOpen(false)}>✕</button>
        <a href="#hero" className="font-heading text-2xl text-t-primary hover:text-accent" onClick={() => setMobileNavOpen(false)}>Home</a>
        <a href="#prewedding" className="font-heading text-2xl text-t-primary hover:text-accent" onClick={() => setMobileNavOpen(false)}>Our Story</a>
        <a href="#ceremonies" className="font-heading text-2xl text-t-primary hover:text-accent" onClick={() => setMobileNavOpen(false)}>Ceremonies</a>
        <a href="#venues" className="font-heading text-2xl text-t-primary hover:text-accent" onClick={() => setMobileNavOpen(false)}>Venues</a>
        <a href="#blessings" className="font-heading text-2xl text-t-primary hover:text-accent" onClick={() => setMobileNavOpen(false)}>Blessings</a>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-5 relative hero-glow">
        <p className="font-body text-xs font-medium uppercase tracking-[4px] text-gold mb-2 relative z-10 text-center">Sat Sri Akaal · Waheguru Ji</p>

        <p className="font-elegant text-base md:text-lg font-light text-t-secondary mb-1.5 relative z-10 text-center max-w-[600px] leading-relaxed italic">
          &#34;With the warmest blessings of the Almighty & the blessings of our elders&#34;
        </p>

        <p className="font-elegant text-sm font-light text-t-muted mb-4 relative z-10 text-center max-w-[650px] italic">
          Cordially invite you to partake in the sanctified union and multi-day celebrations
        </p>

        <p className="font-body text-xs font-normal uppercase tracking-[3px] text-t-muted mb-8 relative z-10 text-center">
          of our Anand Karaj in the holy city of Amritsar
        </p>

        <h1 className="font-script text-5xl md:text-7xl text-accent text-center mb-6 relative z-10 drop-shadow-md">
          Amrita & Jaspreet
        </h1>

        {/* Carousel */}
        <div className="relative w-full max-w-[680px] mx-auto mb-10 z-10">
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-b-theme shadow-2xl bg-card">
            {SLIDES.map((slide, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`} onClick={() => openLightbox(slide)}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 680px"
                  style={{ objectFit: "cover" }}
                  priority={i === 0}
                />
                <div className="absolute bottom-0 left-0 right-0 pt-12 pb-5 px-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                  <div className="flex items-center gap-2 font-body text-xs text-white/90 uppercase tracking-widest">
                    <LocationIcon />
                    <span>{slide.location}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 font-body text-xs text-white/90 uppercase tracking-widest">
                    <CalendarIcon />
                    <span>{slide.date}</span>
                  </div>
                </div>
              </div>
            ))}

            <button className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 rounded-full border border-b-theme bg-primary/80 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors z-20 shadow-md" onClick={prevSlide} aria-label="Previous slide">
              <ChevronLeft />
            </button>
            <button className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-full border border-b-theme bg-primary/80 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors z-20 shadow-md" onClick={nextSlide} aria-label="Next slide">
              <ChevronRight />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full border border-gold transition-all duration-300 ${i === currentSlide ? "bg-gold shadow-[0_0_8px_var(--theme-gold)]" : "bg-transparent"}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Date row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mb-10 relative z-10">
          <div className="flex items-center gap-1.5 font-body text-xs text-t-secondary font-medium tracking-wide">
            <CalendarIcon />
            <span>October 14 — 15, 2026</span>
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs text-t-secondary font-medium tracking-wide">
            <LocationIcon />
            <span>Amritsar, Punjab, India</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="w-full max-w-[500px] mx-auto relative z-10">
          <p className="font-body text-[0.65rem] uppercase tracking-[3px] text-t-muted text-center mb-4">Counting Down to the Grand Union</p>
          <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds }
            ].map((unit, i) => (
              <div key={i} className="bg-card border border-b-theme rounded-xl py-3 px-1 text-center relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <div className="font-heading text-2xl sm:text-3xl font-bold text-accent mb-1">{String(unit.value).padStart(2, "0")}</div>
                <div className="font-body text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[2px] text-t-muted">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <a href="#ceremonies" className="font-body text-[0.7rem] font-semibold uppercase tracking-[2px] py-3 px-7 rounded-md transition-all duration-300 inline-flex items-center gap-2 bg-accent text-white border border-accent hover:opacity-90 hover:-translate-y-0.5 shadow-lg">
            Event Schedule →
          </a>
          <a href="#venues" className="font-body text-[0.7rem] font-semibold uppercase tracking-[2px] py-3 px-7 rounded-md transition-all duration-300 inline-flex items-center gap-2 bg-transparent text-accent border border-accent hover:bg-accent hover:text-white hover:-translate-y-0.5">
            View Venues →
          </a>
        </div>
      </section>

      {/* ===== PRE-WEDDING MOMENTS ===== */}
      <section id="prewedding" className="py-20 px-5 bg-secondary relative">
        <p className="font-body text-[0.65rem] font-medium uppercase tracking-[4px] text-gold text-center mb-2">A Heritage & Love Story</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-t-primary text-center mb-3">Our Pre-Wedding Moments</h2>
        <p className="font-elegant text-base text-t-secondary text-center max-w-[650px] mx-auto mb-10 italic leading-relaxed">
          A breathtaking tale of love forged by families rooted in rich heritage, shared laughter,
          and hope. Twelve years of friendship, twelve chapters of love, and one beautiful forever.
        </p>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-12 section-divider"></div>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="py-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm">✦</div>
              <span className="font-body text-[0.65rem] uppercase tracking-[2px] text-accent font-semibold">Our Journey Together</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-t-primary mb-4 leading-snug">
              Two souls united by family heritage, music, and an unforgettable cup of Amritsari chai.
            </h3>
            <p className="font-elegant text-base text-t-secondary leading-loose mb-6 italic">
              Amrita and Jaspreet&apos;s love story blooms with the fragrance of shared traditions, faith,
              and a lifetime of memories. From their first meeting at a family gathering to the magical
              moments during engagement ceremonies, every chapter of their story is wrapped in love.
            </p>
            <blockquote className="font-elegant text-lg font-medium text-gold italic py-4 px-5 border-l-4 border-gold bg-gold/5 rounded-r-lg mb-6">
              &ldquo;In each other, we found the rhythm of our prayers and the laughter of our tomorrows.&rdquo;
            </blockquote>
            <a href="#ceremonies" className="font-body text-[0.72rem] text-accent uppercase tracking-[2px] font-semibold inline-flex items-center gap-1.5 transition-all hover:gap-2.5">
              Explore Our Full Timeline →
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-b-theme group">
            <Image
              src="/images/pre-weeding-section-1.png"
              alt="Pre-wedding moments - Amrita & Jaspreet"
              width={600}
              height={450}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* ===== CEREMONIAL CELEBRATIONS ===== */}
      <section id="ceremonies" className="py-20 px-5 relative bg-primary">
        <p className="font-body text-[0.65rem] font-medium uppercase tracking-[4px] text-gold text-center mb-2">Celebrating Together in Grandeur</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-t-primary text-center mb-3">Ceremonial Celebrations</h2>
        <p className="font-elegant text-base text-t-secondary text-center max-w-[650px] mx-auto mb-10 italic leading-relaxed">
          Relish the joyful festivities of Sikh Weddings, Anand Karaj tradition, with 3 days of love, laughter,
          music & grand celebration.
        </p>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-12 section-divider"></div>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {CEREMONIES.map((c, i) => (
            <CeremonyCard key={i} {...c} />
          ))}
        </div>

        <p className="font-body text-[0.65rem] font-medium uppercase tracking-[4px] text-gold text-center mt-16 mb-6">
          The Holy Shaadi Day · February 16th, 2026
        </p>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXTRA_CEREMONIES.map((c, i) => (
            <CeremonyCard key={i} {...c} />
          ))}
        </div>
      </section>

      {/* ===== VENUES ===== */}
      <section id="venues" className="py-20 px-5 bg-secondary relative">
        <p className="font-body text-[0.65rem] font-medium uppercase tracking-[4px] text-gold text-center mb-2">An Auspicious Journey Awaits</p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-t-primary text-center mb-3">Wedding Venues & Map Coordinates</h2>
        <p className="font-elegant text-base text-t-secondary text-center max-w-[650px] mx-auto mb-10 italic leading-relaxed">
          Navigate to our celebrations with ease! From auspicious Gurdwara for
          the holy Anand Karaj to exquisite banquet halls for receptions.
        </p>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-12 section-divider"></div>

        <div className="max-w-[1100px] mx-auto">
          {/* Venue 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center bg-card border border-b-theme rounded-2xl p-6 md:p-10 mb-8 transition-shadow hover:shadow-xl">
            <div className="w-full h-[280px] rounded-xl overflow-hidden border border-b-theme">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.5!2d74.87!3d31.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ4LjAiTiA3NMKwNTInMTIuMCJF!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full border-0 grayscale-[0.3] contrast-110"
                allowFullScreen
                loading="lazy"
                title="Gurdwara Sahib Location"
              ></iframe>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-t-primary mb-3">Historical Gurdwara Sahib</h3>
              <p className="font-elegant text-sm text-t-secondary leading-loose mb-5 italic">
                The sacred venue for the holy Anand Karaj ceremony. A magnificent
                Gurdwara steeped in spiritual significance, where two souls will become one
                in the presence of Sri Guru Granth Sahib Ji.
              </p>
              <div className="flex items-center gap-2 font-body text-[0.72rem] text-t-muted mb-2">
                <CalendarIcon /> <span>Sunday, 16th February 2026</span>
              </div>
              <div className="flex items-center gap-2 font-body text-[0.72rem] text-t-muted mb-2">
                <ClockIcon /> <span>7:00 AM — 10:00 AM (Anand Karaj)</span>
              </div>
              <div className="flex items-center gap-2 font-body text-[0.72rem] text-t-muted mb-4">
                <LocationIcon /> <span>Near Golden Temple, Amritsar, Punjab</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 font-body text-[0.7rem] font-semibold uppercase tracking-[1.5px] text-white bg-accent px-5 py-2.5 rounded-md transition-all hover:opacity-90 shadow-md"
              >
                <DirectionsIcon /> Directions on Map
              </a>
            </div>
          </div>

          {/* Venue 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center bg-card border border-b-theme rounded-2xl p-6 md:p-10 mb-8 transition-shadow hover:shadow-xl">
            <div className="w-full h-[280px] rounded-xl overflow-hidden border border-b-theme">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396!2d74.86!3d31.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM4JzI0LjAiTiA3NMKwNTEnMzYuMCJF!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full border-0 grayscale-[0.3] contrast-110"
                allowFullScreen
                loading="lazy"
                title="Reception Hall Location"
              ></iframe>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-t-primary mb-3">Grand Imperial Reception Hall</h3>
              <p className="font-elegant text-sm text-t-secondary leading-loose mb-5 italic">
                The grand venue for the evening reception and celebration. An exquisite
                banquet hall adorned with elegance, where guests will enjoy fine dining,
                music, and unforgettable celebrations.
              </p>
              <div className="flex items-center gap-2 font-body text-[0.72rem] text-t-muted mb-2">
                <CalendarIcon /> <span>Sunday, 16th February 2026</span>
              </div>
              <div className="flex items-center gap-2 font-body text-[0.72rem] text-t-muted mb-2">
                <ClockIcon /> <span>7:00 PM — Late Night (Grand Reception)</span>
              </div>
              <div className="flex items-center gap-2 font-body text-[0.72rem] text-t-muted mb-4">
                <LocationIcon /> <span>The Mall Road, Amritsar, Punjab</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 font-body text-[0.7rem] font-semibold uppercase tracking-[1.5px] text-white bg-accent px-5 py-2.5 rounded-md transition-all hover:opacity-90 shadow-md"
              >
                <DirectionsIcon /> Directions on Map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BLESSINGS ===== */}
      <section id="blessings" className="py-16 px-5 text-center bg-footer border-t border-b-theme">
        <p className="font-body text-[0.65rem] font-medium uppercase tracking-[4px] text-gold mb-4">A Lifetime of Blessings</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-footer-t mb-4">Lakh Lakh Vadhaiyan</h2>
        <p className="font-elegant text-base text-footer-t/80 max-w-[600px] mx-auto mb-10 leading-relaxed italic">
          With humility and grace & heartfelt blessings, the two of our families extend their warmest wishes.
          Send us your blessings and love — celebrate this union as the wedding of your own!
        </p>

        <div className="max-w-[800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center">
            <h4 className="font-heading text-sm font-bold text-gold mb-1">S. Harjeet Singh Bassha & Family</h4>
            <p className="font-elegant text-xs text-footer-t/70 italic mb-2">Nalwa Niwas, Khalsa College, Amritsar</p>
            <p className="font-elegant text-xs text-footer-t/60 italic mb-1">S. Darshan Singh Grewal & Family</p>
            <p className="font-elegant text-[0.7rem] text-footer-t/50 italic">Bastion Bagh House & Family</p>
          </div>
          
          <div className="w-[1px] h-16 bg-gold/30 hidden md:block"></div>
          <div className="w-16 h-[1px] bg-gold/30 md:hidden"></div>
          
          <div className="text-center">
            <h4 className="font-heading text-sm font-bold text-gold mb-1">S. Joginder Singh Sidhu & Family</h4>
            <p className="font-elegant text-xs text-footer-t/70 italic mb-2">ProGrand Palace, Gorakhpur</p>
            <p className="font-elegant text-xs text-footer-t/60 italic mb-1">S. Kulwinder Singh & Family</p>
            <p className="font-elegant text-[0.7rem] text-footer-t/50 italic">relations@amritajaspreet.com</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 px-5 text-center bg-footer/95 border-t border-gold/10">
        <p className="font-body text-xs text-footer-t/50 tracking-wide">
          © 2024 Amrita & Jaspreet · All Celebrations Reserved ·{" "}
          <a href="mailto:amritajaspreet@gmail.com" className="text-gold hover:underline">Contact</a>
        </p>
      </footer>

      {/* ===== THEME SWITCHER ===== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <div className={`bg-card border border-b-theme rounded-xl p-4 flex-col gap-2.5 shadow-2xl backdrop-blur-md min-w-[180px] ${themeOpen ? "flex" : "hidden"}`}>
          <span className="font-heading text-sm font-semibold text-accent mb-1">Choose Theme</span>
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg border transition-all duration-200 ${activeTheme === t.id ? "border-b-theme bg-primary/50" : "border-transparent hover:bg-primary/30"}`}
              onClick={() => changeTheme(t.id)}
            >
              <div className="w-6 h-6 rounded-full border-2 border-white/20 shrink-0" style={{ background: t.swatch }}></div>
              <span className={`font-body text-xs font-medium tracking-wide ${activeTheme === t.id ? "text-accent" : "text-t-secondary"}`}>{t.label}</span>
            </button>
          ))}
        </div>
        <button
          className="w-12 h-12 rounded-full border-2 border-accent bg-card text-accent flex items-center justify-center shadow-lg transition-transform hover:scale-110 hover:bg-accent hover:text-white"
          onClick={() => setThemeOpen(!themeOpen)}
          aria-label="Toggle theme switcher"
        >
          <PaletteIcon />
        </button>
      </div>

      {/* ===== LIGHTBOX ===== */}
      {lightboxOpen && lightboxGallery.length > 0 && (
        <div className={`lightbox-overlay ${lightboxOpen ? "open" : ""}`} onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightboxGallery.length > 1 && (
              <button className="lightbox-nav prev" onClick={prevLightboxSlide}>
                <ChevronLeft />
              </button>
            )}
            
            <div className="lightbox-img-wrapper">
              <Image
                src={lightboxGallery[lightboxIndex].src}
                alt={lightboxGallery[lightboxIndex].alt}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            
            <div className="absolute -bottom-10 left-0 right-0 text-center text-white font-body text-sm tracking-wide">
              <strong>{lightboxGallery[lightboxIndex].title}</strong> — {lightboxGallery[lightboxIndex].description}
            </div>

            {lightboxGallery.length > 1 && (
              <button className="lightbox-nav next" onClick={nextLightboxSlide}>
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ===== CEREMONY CARD COMPONENT ===== */
function CeremonyCard({
  badge,
  title,
  desc,
  date,
  time,
  venue,
}: {
  badge: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  venue: string;
}) {
  return (
    <div className="bg-card border border-b-theme rounded-xl p-7 relative overflow-hidden transition-all duration-300 hover:bg-primary/30 hover:-translate-y-1 hover:shadow-xl group">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-gold to-accent"></div>
      <span className="inline-block font-body text-[0.55rem] font-semibold uppercase tracking-[2px] text-white bg-accent py-1 px-2.5 rounded mb-3">
        {badge}
      </span>
      <h3 className="font-heading text-xl font-bold text-t-primary mb-2.5 transition-colors group-hover:text-accent">{title}</h3>
      <p className="font-elegant text-[0.88rem] text-t-secondary leading-relaxed mb-4 italic">{desc}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-body text-[0.7rem] text-t-muted">
          <CalendarIcon /> <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 font-body text-[0.7rem] text-t-muted">
          <ClockIcon /> <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 font-body text-[0.7rem] text-t-muted">
          <LocationIcon /> <span>{venue}</span>
        </div>
      </div>
    </div>
  );
}
