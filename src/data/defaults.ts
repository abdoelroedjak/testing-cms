import { CMSConfig, ThemeColors } from '../types';

export const THEME_PRESETS: ThemeColors[] = [
  {
    id: 'elegant-dark',
    name: 'Elegant Dark (Original)',
    bg: 'bg-[#0A0A0A]', // Pure obsidian dark matte slate
    text: 'text-[#F5F5F5]', // Sophisticated off-white
    textMuted: 'text-[#888888]', // Refined medium grey
    accent: 'text-[#666666]', // Swiss grey design elements
    accentBg: 'bg-[#1E1E1E]',
    border: 'border-[#222222]', // Clean layouts dividers
    cardBg: 'bg-[#141414]' // Soft background overlays for cards
  },
  {
    id: 'mono-light',
    name: 'Swiss Pure (Light)',
    bg: 'bg-[#FAF9F6]', // Warm Alabaster White
    text: 'text-[#1E1E1E]', // Obsidian Charcoal
    textMuted: 'text-[#6E6E6E]', // Medium Slate Gray
    accent: 'text-[#E0533C]', // Persimmon Red
    accentBg: 'bg-[#E0533C]',
    border: 'border-[#E0E0DB]',
    cardBg: 'bg-[#F2F1EC]'
  },
  {
    id: 'warm-editorial',
    name: 'Warm Editorial (Sand)',
    bg: 'bg-[#F5EFEB]', // Sand Linen
    text: 'text-[#2C2523]', // Espresso
    textMuted: 'text-[#7C716E]', // Warm Taupe
    accent: 'text-[#8C3A2B]', // Crimson Earth
    accentBg: 'bg-[#8C3A2B]',
    border: 'border-[#EBE2DD]',
    cardBg: 'bg-[#EDE5E0]'
  },
  {
    id: 'obsidian-dark',
    name: 'Obsidian Minimal (Dark)',
    bg: 'bg-[#0E0E10]', // Jet Black
    text: 'text-[#EDEDEF]', // Soft White
    textMuted: 'text-[#9A9A9A]', // Slate Gray
    accent: 'text-[#4F46E5]', // Indigo Touch
    accentBg: 'bg-[#4F46E5]',
    border: 'border-[#222226]',
    cardBg: 'bg-[#18181C]'
  }
];

export const DEFAULT_CMS_DATA: CMSConfig = {
  name: 'Sophia Aris',
  role: 'Independent Graphic Designer',
  tagline: 'Membentuk identitas visual melalui coretan minimalis, layout presisi, dan filosofi fungsional yang abadi.',
  heroHeadline: 'Crafting meaningful visual narratives for the modern era.',
  heroSubheadline: 'Spesialisasi dalam brand identity, editorial design, dan digital experiences yang mengedepankan kejelasan filosofis serta keanggunan visual.',
  aboutTitle: 'Tentang Saya & Visi Desain',
  aboutText: 'Saya percaya bahwa desain terbaik adalah desain yang memangkas semua kebisingan hingga tersisa esensi terdalam sebuah gagasan. Dengan mengombinasikan visual murni, tipografi penuh karakter, serta layout grid Swiss klasik, saya menciptakan identitas murni yang bertahan melampaui tren sesaat. Melalui CMS responsif ini, Anda bisa melihat bagaimana integritas desain terjalin erat dengan kepraktisan manajemen konten.',
  quoteText: '“Simplicity is not the lack of clutter, but the presence of clarity.”',
  quoteAuthor: 'Sophia Aris',
  contactEmail: 'hello@sophiaaris.design',
  contactPhone: '+62 812-3456-7890',
  location: 'Bandung, Indonesia',
  socials: {
    instagram: 'https://instagram.com/ariathorne.design',
    behance: 'https://behance.net/ariathorne',
    linkedin: 'https://linkedin.com/in/ariathorne',
    dribbble: 'https://dribbble.com/ariathorne',
    twitter: 'https://twitter.com/ariathorne'
  },
  activeThemeId: 'elegant-dark',
  gridColumns: '2',
  aspectRatio: 'video',
  layoutType: 'classic',
  services: [
    {
      id: 'srv-1',
      title: 'Brand Strategy & Identity System',
      description: 'Membangun ekosistem visual brand yang menyeluruh mulai dari logo, palet warna kustom, pedoman tipografi, hingga panduan komprehensif aset grafis.'
    },
    {
      id: 'srv-2',
      title: 'Editorial & Book Design Layouts',
      description: 'Menyusun publikasi fisik dan digital, katalog, poster ekshibisi, serta tata letak majalah berbasis komposisi grid struktural yang elegan.'
    },
    {
      id: 'srv-3',
      title: 'Digital & UI/UX Product Interface',
      description: 'Mewujudkan antarmuka digital yang ekspresif demi menjamin pengalaman pengguna yang intuitif, berestetika minimalis, dan fungsional.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Aether Cosmetics Brand Identity',
      category: 'Packaging & Identity System',
      year: '2026',
      imageUrl: '/src/assets/images/aether_cosmetics_branding_1780455672066.png',
      description: 'Sentuhan kesederhanaan premium untuk brand kosmetik organik. Memanfaatkan botol kaca minimalis, tipografi serif modern, dan material kemasan bebas plastik yang mewah.',
      tags: ['Branding', 'Typography', 'Sustainability'],
      featured: true
    },
    {
      id: 'proj-2',
      title: 'Kinetic - Swiss Typographic Book',
      category: 'Editorial & Book Design',
      year: '2025',
      imageUrl: '/src/assets/images/swiss_typography_book_1780455687493.png',
      description: 'Buku eksperimental yang mendalami ritme visual dari teks hitam-putih. Menggunakan tatanan grid kaku namun ekspresif khas desain Swiss Bauhaus.',
      tags: ['Editorial', 'Swiss-Grid', 'Black-and-White'],
      featured: true
    },
    {
      id: 'proj-3',
      title: 'Oasis Sustainable Geometric Cards',
      category: 'Corporate Identity System',
      year: '2025',
      imageUrl: '/src/assets/images/geometric_cards_mockup_1780455700144.png',
      description: 'Kartu bisnis dan stationery ramah lingkungan bernuansa mewah dengan cetak foil emas timbul di atas kertas katun tebal daur ulang bertekstur arang.',
      tags: ['Stationery', 'Foil Emboss', 'Eco-Luxury'],
      featured: true
    },
    {
      id: 'proj-4',
      title: 'Solstice Retro-Modern Vinyl Sleeve',
      category: 'Packaging & Art Direction',
      year: '2024',
      imageUrl: '/src/assets/images/retro_album_art_1780455717555.png',
      description: 'Visualisasi audio ambient bertajuk Solstice. Menggunakan pola gradasi warna hangat serta layout lingkaran geometri retro di atas tekstur plaster natural.',
      tags: ['Album Art', 'Color Gradient', 'Art Direction'],
      featured: false
    }
  ]
};
