import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, Mail, Phone, MapPin, Instagram, Linkedin, 
  ExternalLink, ChevronRight, X, Sparkles, Copy, Check 
} from 'lucide-react';
import { CMSConfig, Project, ThemeColors } from '../types';
import { THEME_PRESETS } from '../data/defaults';

interface PortfolioViewProps {
  data: CMSConfig;
}

export default function PortfolioView({ data }: PortfolioViewProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const themeColors = THEME_PRESETS.find(t => t.id === data.activeThemeId) || THEME_PRESETS[0];

  // Map aspect ratios to class
  const getAspectClass = () => {
    switch (data.aspectRatio) {
      case 'square': return 'aspect-square';
      case 'portrait': return 'aspect-[3/4]';
      case 'video':
      default:
        return 'aspect-video';
    }
  };

  const aspectClass = getAspectClass();

  // Social icon mapper
  const getSocialIcon = (key: string) => {
    switch (key) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      default: return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // -------------------------------------------------------------
  // RENDERING COMPONENTS FOR SECTIONS
  // -------------------------------------------------------------

  // Elegant Header
  const HeaderComponent = () => {
    const isElegantDark = themeColors.id === 'elegant-dark';
    return (
      <header className={`py-8 px-6 md:px-12 flex justify-between items-center border-b ${themeColors.border} backdrop-blur-md sticky top-0 z-30 transition-colors duration-300 ${themeColors.bg}`}>
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {!isElegantDark && (
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white ${themeColors.accentBg}`}>
              {data.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
          <span className={`${isElegantDark ? 'text-lg tracking-[0.2em] font-light uppercase' : 'font-sans font-bold text-sm tracking-tight'} ${themeColors.text}`}>
            {data.name}
          </span>
        </motion.div>
        <nav className={`hidden md:flex gap-12 uppercase ${isElegantDark ? 'text-[10px] tracking-[0.3em] font-medium' : 'text-xs font-semibold tracking-wider'}`}>
          <a href="#works" className={`${isElegantDark ? 'text-white border-b border-white pb-1' : `${themeColors.text} hover:opacity-75`} transition-all`}>Works</a>
          <a href="#services" className={`${themeColors.text} hover:opacity-75 transition-all`}>Keahlian</a>
          <a href="#about" className={`${themeColors.text} hover:opacity-75 transition-all`}>Tentang</a>
          <a href="#contact" className={`${themeColors.text} hover:opacity-75 transition-all`}>Kontak</a>
        </nav>
        <a 
          href="#contact"
          className={`px-5 py-2.5 border rounded-full text-[10px] font-bold tracking-[0.15em] uppercase tracking-wide transition-all duration-200 hover:scale-105 ${themeColors.border} ${themeColors.text} hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black`}
        >
          Mulai Project
        </a>
      </header>
    );
  };

  // Individual Project card
  const ProjectCard = ({ proj, index }: { proj: Project; index: number; key?: string }) => (
    <motion.div
      id={`project-card-${proj.id}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => setSelectedProject(proj)}
      className="group cursor-pointer flex flex-col justify-between h-full"
    >
      <div className="relative overflow-hidden rounded-lg bg-neutral-200 mb-4 shadow-sm border border-neutral-100/10">
        <motion.div 
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`w-full overflow-hidden ${aspectClass}`}
        >
          <img 
            src={proj.imageUrl} 
            alt={proj.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Dynamic Project Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
          <span className="text-white text-xs font-semibold tracking-wider uppercase bg-white/25 backdrop-blur-md px-3 py-1 rounded-full">
            Lihat Studi Kasus
          </span>
          <div className="bg-white p-2 rounded-full text-black shadow-lg">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-1">
          <h3 className={`text-base font-bold tracking-tight group-hover:underline ${themeColors.text}`}>{proj.title}</h3>
          <span className={`text-[11px] font-mono font-medium ${themeColors.textMuted}`}>{proj.year}</span>
        </div>
        <p className={`text-xs ${themeColors.textMuted} truncate-2`}>{proj.category}</p>
        
        {/* Render Mini Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {proj.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className={`text-[9px] font-mono px-2 py-0.5 rounded border ${themeColors.border} ${themeColors.textMuted}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Works Grid component
  const WorksGrid = () => (
    <section id="works" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 pb-4 border-b border-neutral-200/50">
          <div>
            <span className={`text-xs font-mono font-bold tracking-widest uppercase ${themeColors.accent}`}>Galeri Portofolio</span>
            <h2 className={`text-2xl md:text-3xl font-black tracking-tight mt-1 ${themeColors.text}`}>Karya Pilihan</h2>
          </div>
          <p className={`text-xs max-w-sm mt-3 md:mt-0 ${themeColors.textMuted}`}>
            Menampilkan studi kasus teranyar hasil eksplorasi identitas visual modern, tatanan editorial grid, serta fungsionalitas UI.
          </p>
        </div>

        <div className={`grid gap-x-8 gap-y-12 ${
          data.gridColumns === '3' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {data.projects.map((proj, idx) => (
            <ProjectCard key={proj.id} proj={proj} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );

  // Services layout section
  const ServicesSection = () => (
    <section id="services" className={`py-20 px-6 md:px-12 border-t border-b ${themeColors.border} ${themeColors.cardBg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div>
          <span className={`text-xs font-mono font-bold tracking-widest uppercase ${themeColors.accent}`}>Kompetensi</span>
          <h2 className={`text-2xl md:text-3xl font-black tracking-tight mt-1 mb-4 ${themeColors.text}`}>Spesialisasi Desain</h2>
          <p className={`text-xs leading-relaxed ${themeColors.textMuted}`}>
            Menciptakan jembatan antara visi artistik murni dengan kebutuhan fungsional bisnis agar brand memiliki jiwa visual yang tervalidasi.
          </p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.services.map((srv, idx) => (
            <div key={srv.id} className="space-y-3.5">
              <span className={`text-sm font-mono block font-bold ${themeColors.accent}`}>0{idx + 1}/</span>
              <h3 className={`text-base font-bold tracking-tight ${themeColors.text}`}>{srv.title}</h3>
              <p className={`text-xs leading-relaxed ${themeColors.textMuted}`}>{srv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // About profile block
  const AboutSection = () => (
    <section id="about" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left quote Column */}
        <div className="lg:col-span-5 space-y-6">
          <span className={`text-xs font-mono font-bold tracking-widest uppercase ${themeColors.accent}`}>Visi Filosofi</span>
          <h3 className={`text-2xl md:text-3xl font-serif italic leading-snug ${themeColors.text}`}>
            {data.quoteText}
          </h3>
          <p className={`text-xs font-semibold tracking-wider uppercase ${themeColors.textMuted}`}>
            — {data.quoteAuthor}
          </p>
        </div>

        {/* Right bio Column */}
        <div className="lg:col-span-7 space-y-6 lg:pl-10">
          <h4 className={`text-lg font-bold tracking-tight ${themeColors.text}`}>{data.aboutTitle}</h4>
          <p className={`text-xs leading-relaxed ${themeColors.textMuted} whitespace-pre-line`}>
            {data.aboutText}
          </p>
          
          <div className={`p-5 rounded-lg border ${themeColors.border} ${themeColors.bg} flex items-center gap-3`}>
            <Sparkles className={`w-5 h-5 flex-shrink-0 ${themeColors.accent}`} />
            <p className="text-[11px] leading-relaxed text-neutral-500">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">Kustomisasi Aktif:</span> Tata letak portfolio dan pengetikan teks ini diatur sepenuhnya melalu panel CMS interaktif. Klik tombol edit di sudut bawah untuk mencoba menyunting!
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // Footer & Contacts
  const FooterContact = () => (
    <footer id="contact" className={`pt-24 pb-12 px-6 md:px-12 border-t ${themeColors.border} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <span className={`text-xs font-mono font-bold tracking-widest uppercase ${themeColors.accent}`}>Mari Bekerja Sama</span>
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight mt-2 leading-none ${themeColors.text}`}>
              Siap Memulai Ide Anda?
            </h2>
            <p className={`text-xs max-w-sm mt-4 leading-relaxed ${themeColors.textMuted}`}>
              Kirimkan brief proyek desain Anda atau sapa langsung untuk berdiskusi ringan mengenai branding kustom, poster art, atau proposal editorial.
            </p>
          </div>
          
          {/* Quick contact buttons */}
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border ${themeColors.border} flex items-center justify-between ${themeColors.cardBg}`}>
              <div className="flex items-center gap-3">
                <Mail className={`w-4 h-4 ${themeColors.textMuted}`} />
                <span className={`text-xs font-medium font-mono ${themeColors.text}`}>{data.contactEmail}</span>
              </div>
              <button 
                onClick={handleCopyEmail}
                className={`p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded transition-all flex items-center gap-1 text-[11px] font-mono`}
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Disalin' : 'Salin'}</span>
              </button>
            </div>

            <div className="flex gap-4">
              <div className={`flex-1 p-3.5 rounded-xl border ${themeColors.border} flex items-center gap-2.5`}>
                <Phone className={`w-3.5 h-3.5 ${themeColors.textMuted}`} />
                <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-300">{data.contactPhone}</span>
              </div>
              <div className={`flex-1 p-3.5 rounded-xl border ${themeColors.border} flex items-center gap-2.5`}>
                <MapPin className={`w-3.5 h-3.5 ${themeColors.textMuted}`} />
                <span className="text-[11px] text-neutral-600 dark:text-neutral-300 truncate">{data.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand footer bar */}
        <div className="pt-12 border-t border-neutral-200/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold tracking-tight ${themeColors.text}`}>{data.name}</span>
            <span className="text-neutral-300">|</span>
            <span className="text-[10px] font-mono text-neutral-400 capitalize">{data.role}</span>
          </div>

          <div className="flex gap-4">
            {Object.entries(data.socials).map(([key, value]) => {
              if (!value) return null;
              return (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full border ${themeColors.border} hover:scale-105 active:scale-95 transition-transform flex items-center justify-center`}
                  title={key}
                >
                  {getSocialIcon(key)}
                </a>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-neutral-400">
            Powered by Design Canvas CMS
          </div>
        </div>
      </div>
    </footer>
  );

  // -------------------------------------------------------------
  // LAYOUT STRUCTURING
  // -------------------------------------------------------------

  // Render complete Classic View
  const renderClassic = () => {
    const isElegantDark = themeColors.id === 'elegant-dark';
    return (
      <div className={`min-h-screen ${themeColors.bg} transition-colors duration-300`}>
        <HeaderComponent />
        
        {/* Hero Block */}
        <section className="py-24 md:py-32 px-6 md:px-12 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className={`text-xs font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border ${themeColors.border} inline-block`}>
              {data.role}
            </span>
            <h1 className={`${isElegantDark ? 'text-4xl md:text-7xl font-serif italic font-light leading-tight tracking-wide' : 'text-4xl md:text-6xl font-black tracking-tight leading-tight'} ${themeColors.text}`}>
              {isElegantDark && data.heroHeadline.includes('meaningful') ? (
                <>
                  Crafting <span className="text-zinc-600 dark:text-neutral-500 not-italic font-sans font-medium">meaningful</span> visual narratives for the modern era.
                </>
              ) : data.heroHeadline}
            </h1>
            <p className={`text-base md:text-lg max-w-2xl mx-auto font-medium ${themeColors.textMuted}`}>
              {data.heroSubheadline}
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <a 
                href="#works"
                className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:opacity-90 ${themeColors.accentBg}`}
              >
                Lihat Kumpulan Karya
              </a>
              <a 
                href="#about"
                className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest border ${themeColors.border} ${themeColors.text} hover:bg-neutral-800 hover:text-white dark:hover:bg-white dark:hover:text-black`}
              >
                Cerita Tentang Desain
              </a>
            </div>
          </motion.div>
        </section>

        {/* Main Blocks */}
        <WorksGrid />
        <ServicesSection />
        <AboutSection />
        <FooterContact />
      </div>
    );
  };

  // Render Split layout (sticky left description, scrollable right side works)
  const renderSplit = () => {
    const isElegantDark = themeColors.id === 'elegant-dark';
    return (
      <div className={`min-h-screen ${themeColors.bg} transition-colors duration-300 flex flex-col`}>
        <HeaderComponent />
        <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12">
          
          {/* Sticky left panel */}
          <div className={`lg:col-span-5 p-6 md:p-12 lg:sticky lg:top-[88px] lg:h-[calc(100vh-88px)] flex flex-col justify-between border-b lg:border-b-0 lg:border-r ${themeColors.border}`}>
            <div className="space-y-6">
              <span className={`text-xs font-mono font-bold tracking-widest uppercase ${themeColors.accent}`}>{data.role}</span>
              <h1 className={`${isElegantDark ? 'text-3xl md:text-5xl font-serif italic font-light leading-tight tracking-wide' : 'text-3xl md:text-5xl font-black tracking-tight leading-none'} ${themeColors.text}`}>
                {isElegantDark && data.heroHeadline.includes('meaningful') ? (
                  <>
                    Crafting <span className="text-zinc-600 dark:text-neutral-500 not-italic font-sans font-medium">meaningful</span> visual narratives.
                  </>
                ) : data.heroHeadline}
              </h1>
              <p className={`text-xs leading-relaxed ${themeColors.textMuted}`}>{data.heroSubheadline}</p>

            <div className={`p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 border ${themeColors.border} text-[11px] leading-relaxed text-neutral-500`}>
              {data.tagline}
            </div>
          </div>

          <div className="pt-8">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-3">Tautan Sosial</span>
            <div className="flex gap-2">
              {Object.entries(data.socials).map(([key, value]) => {
                if (!value) return null;
                return (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded border ${themeColors.border} text-xs font-medium flex items-center gap-1.5 hover:bg-black/5 dark:hover:bg-white/10`}
                  >
                    {getSocialIcon(key)}
                    <span className="capitalize text-[10px]">{key}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable right side */}
        <div className="lg:col-span-7 p-6 md:p-12 space-y-16">
          <div>
            <span className={`text-xs font-mono font-bold tracking-widest uppercase ${themeColors.accent}`}>Galeri Portofolio</span>
            <h2 className={`text-base font-bold tracking-wider uppercase mt-1 mb-8 text-neutral-400`}>Daftar Desain Portofolio</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.map((proj, idx) => (
                <ProjectCard key={proj.id} proj={proj} index={idx} />
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-lg ${themeColors.cardBg} border ${themeColors.border} space-y-4`}>
            <span className={`text-xs font-mono block font-bold ${themeColors.accent}`}>Profil & Layanan</span>
            <p className={`text-xs leading-relaxed ${themeColors.textMuted}`}>{data.aboutText}</p>
            
            <div className="grid grid-cols-1 gap-4 pt-2">
              {data.services.map((srv, index) => (
                <div key={srv.id} className="border-t border-neutral-300/45 pt-3">
                  <h4 className={`text-xs font-bold leading-none ${themeColors.text}`}>0{index + 1}. {srv.title}</h4>
                  <p className="text-[11px] text-neutral-400 mt-1">{srv.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 text-center border-t border-neutral-200">
            <span className="text-[10px] font-mono text-neutral-400">Design Canvas CMS © {new Date().getFullYear()} — {data.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

  // Render ultra-minimal layout
  const renderMinimalist = () => {
    const isElegantDark = themeColors.id === 'elegant-dark';
    return (
      <div className={`min-h-screen ${themeColors.bg} transition-colors duration-300 flex flex-col`}>
        <HeaderComponent />
        
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 md:px-12 py-16 space-y-24">
          {/* Simple typography Hero */}
          <section className="space-y-4">
            <h1 className={`${isElegantDark ? 'text-3xl md:text-5xl font-serif italic font-light leading-tight tracking-wide' : 'text-3xl md:text-5xl font-black tracking-tighter'} ${themeColors.text}`}>
              {isElegantDark && data.heroHeadline.includes('meaningful') ? (
                <>
                  Crafting <span className="text-zinc-600 dark:text-neutral-500 not-italic font-sans font-medium">meaningful</span> visual narratives.
                </>
              ) : data.heroHeadline}
            </h1>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest leading-loose">{data.name} — {data.heroSubheadline}</p>
          </section>

        {/* Minimal works stream - high negative space images */}
        <section id="works" className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.projects.map((proj, idx) => (
            <ProjectCard key={proj.id} proj={proj} index={idx} />
          ))}
        </section>

        {/* Simple services & contact cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-neutral-200">
          <div className="space-y-6">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${themeColors.accent}`}>Layanan Saya</h3>
            <div className="space-y-4">
              {data.services.map(s => (
                <div key={s.id} className="space-y-1">
                  <h4 className={`text-xs font-semibold ${themeColors.text}`}>{s.title}</h4>
                  <p className={`text-[11px] leading-relaxed ${themeColors.textMuted}`}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${themeColors.accent}`}>Biografi Singkat</h3>
            <p className={`text-xs leading-relaxed ${themeColors.textMuted}`}>{data.aboutText}</p>
            <div className={`p-4 bg-neutral-100 rounded border ${themeColors.border} flex items-center justify-between`}>
              <span className="text-[11px] font-mono">{data.contactEmail}</span>
              <a href={`mailto:${data.contactEmail}`} className="p-1 hover:bg-neutral-200 rounded">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 text-center border-t border-neutral-200 text-[10px] font-mono text-neutral-400">
        Design Canvas CMS • Alabaster Minimalist layout
      </footer>
    </div>
  );
};

  return (
    <>
      {/* Dynamic layout loading based on layout selection */}
      {data.layoutType === 'split' && renderSplit()}
      {data.layoutType === 'minimalist' && renderMinimalist()}
      {data.layoutType === 'classic' && renderClassic()}

      {/* Case Study Full Screen Modal Dialog Box */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-50 overflow-y-auto backdrop-blur-sm p-4 md:p-8 flex items-center justify-center font-sans text-neutral-900 leading-snug"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Modal Banner Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto flex-1">
                <div className="relative aspect-video bg-neutral-100 border-b">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-8">
                    <div>
                      <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded">
                        Studi Kasus Desain
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">{selectedProject.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Specs side */}
                  <div className="space-y-4 md:border-r border-neutral-100 md:pr-8">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Kategori Pekerjaan</span>
                      <span className="text-xs font-bold text-neutral-800 mt-1 block">{selectedProject.category}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Tahun Rilis</span>
                      <span className="text-xs font-bold text-neutral-800 mt-1 block">{selectedProject.year}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Spesifikasi Tag</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {selectedProject.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => alert('CMS Live Customizer mengarahkan link demo eksternal ke website Anda.')}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      <span>Kunjungi Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right description details */}
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400">Deskripsi Kasus & Filosofi Visual</h4>
                    <p className="text-xs leading-relaxed text-neutral-650 text-neutral-600 whitespace-pre-line">
                      {selectedProject.description}
                    </p>
                    <p className="text-xs leading-relaxed text-neutral-500">
                      Proyek kustomisasi {selectedProject.title} didesain dengan menjunjung tinggi tingkat keterbacaan (readability) yang tinggi serta memanfaatkan kontras spasial di area negatif. Seluruh materi visual di atas dibuat khusus oleh desainer menggunakan instrumen visual komparatif.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-neutral-50 border-t flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Tutup Jendela
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
