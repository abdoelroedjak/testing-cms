import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, X, Palette, Layout, FileText, Briefcase, Mail, Plus, Trash2, 
  ChevronUp, ChevronDown, Check, Download, Layers, ShieldCheck, HelpCircle
} from 'lucide-react';
import { CMSConfig, Project, Service, ThemeColors } from '../types';
import { THEME_PRESETS } from '../data/defaults';

interface CmsPanelProps {
  data: CMSConfig;
  onUpdate: (updater: (prev: CMSConfig) => CMSConfig) => void;
  onReset: () => void;
}

type ActiveTab = 'styles' | 'content' | 'works' | 'services' | 'integration';

export default function CmsPanel({ data, onUpdate, onReset }: CmsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('styles');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const activeTheme = THEME_PRESETS.find(t => t.id === data.activeThemeId) || THEME_PRESETS[0];

  // Helper handling basic field changes
  const handleFieldChange = (field: keyof CMSConfig, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper modifying nested socials
  const handleSocialChange = (socialKey: string, value: string) => {
    onUpdate((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [socialKey]: value
      }
    }));
  };

  // Helper updating specific project
  const handleProjectChange = (id: string, updatedProj: Partial<Project>) => {
    onUpdate((prev) => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updatedProj } : p)
    }));
  };

  // Helper adding new default project
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'Proyek Desain Baru',
      category: 'Branding & Visual Desain',
      year: new Date().getFullYear().toString(),
      imageUrl: '/src/assets/images/geometric_cards_mockup_1780455700144.png', // Fallback to geometric default
      description: 'Tuliskan deskripsi lengkap mengenai tantangan desain, konsep kreatif, sasarannya, serta implementasi akhir yang dibuat di sini.',
      tags: ['Minimalis', 'Tipografi'],
      featured: false
    };

    onUpdate((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
    setExpandedProject(newProj.id);
  };

  // Helper deleting specific project
  const handleDeleteProject = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Helper updating a service text
  const handleServiceChange = (id: string, updatedFields: Partial<Service>) => {
    onUpdate((prev) => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updatedFields } : s)
    }));
  };

  // Export current config JSON
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="cms-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 font-sans font-medium text-sm border hover:scale-105 active:scale-95 ${
            isOpen 
              ? 'bg-[#1E1E1E] text-white border-neutral-800' 
              : 'bg-white text-neutral-900 border-neutral-200'
          }`}
        >
          {isOpen ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4 animate-spin-slow" />}
          <span>{isOpen ? 'Tutup CMS Panel' : 'Edit dengan CMS'}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="cms-editor-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white border-l border-neutral-200 z-40 flex flex-col shadow-2xl h-full font-sans text-neutral-800 select-none"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <h2 className="text-base font-bold tracking-tight text-neutral-900">CMS Live Visual Editor</h2>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Sesuaikan portofolio kustom Anda secara instan</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-neutral-200 rounded-full text-neutral-500 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Quick Informational Note on WordPress & Framer */}
            <div className="bg-emerald-50/75 border-b border-emerald-100/60 p-4 px-6 flex gap-3 text-xs text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Siap WordPress / Framer:</span> Suntingan di sini langsung terekam di cache browser Anda. Ekspor skema CMS ini langsung ke Framer custom layout atau WordPress ACF kapan saja di tab integrasi!
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-neutral-100 bg-neutral-50 px-2 overflow-x-auto scrollbar-none">
              {(
                [
                  { id: 'styles', label: 'Tampilan', icon: Palette },
                  { id: 'content', label: 'Teks', icon: FileText },
                  { id: 'works', label: 'Proyek', icon: Layers },
                  { id: 'services', label: 'Spesialis', icon: Briefcase },
                  { id: 'integration', label: 'CMS Sync', icon: Download }
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3 px-3.5 border-b-2 font-medium text-xs whitespace-nowrap transition-all duration-150 ${
                      isActive 
                        ? 'border-neutral-900 text-neutral-900 font-semibold' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* STYLE TAB */}
              {activeTab === 'styles' && (
                <div className="space-y-6">
                  {/* Theme Presets */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">🎨 Palet Warna Preset</label>
                    <div className="grid grid-cols-2 gap-3">
                      {THEME_PRESETS.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleFieldChange('activeThemeId', theme.id)}
                          className={`p-3.5 rounded-lg border text-left transition-all relative overflow-hidden group ${
                            data.activeThemeId === theme.id 
                              ? 'border-neutral-900 ring-1 ring-neutral-900' 
                              : 'border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {/* Colored Dots */}
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="w-3 h-3 rounded-full border border-neutral-300" style={{ backgroundColor: theme.bg.includes('bg-[') ? theme.bg.slice(4, -1) : '' }}></span>
                            <span className="w-3 h-3 rounded-full border border-neutral-300" style={{ backgroundColor: theme.cardBg.includes('bg-[') ? theme.cardBg.slice(4, -1) : '' }}></span>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent.includes('text-[') ? theme.accent.slice(5, -1) : '' }}></span>
                          </div>
                          <span className="text-xs font-medium text-neutral-900">{theme.name}</span>
                          {data.activeThemeId === theme.id && (
                            <span className="absolute top-2 right-2 flex bg-neutral-900 text-white rounded-full p-0.5">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio Grid Config */}
                  <div className="border-t border-neutral-100 pt-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">📐 Sistem Tata Letak & Grid</label>
                    
                    {/* Layout type */}
                    <div className="mb-4">
                      <span className="text-xs text-neutral-500 block mb-1.5">Tipe Layout Halaman</span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['classic', 'split', 'minimalist'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => handleFieldChange('layoutType', type)}
                            className={`py-2 px-3 border text-xs font-medium rounded-md capitalize transition-all ${
                              data.layoutType === type 
                                ? 'bg-neutral-900 text-white border-neutral-900' 
                                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {type === 'split' ? 'Duo-Split' : type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Columns */}
                    <div className="mb-4">
                      <span className="text-xs text-neutral-500 block mb-1.5">Kolom Grid Portofolio</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: '2', label: '2 Kolom (Sleek)' },
                          { value: '3', label: '3 Kolom (Padat)' }
                        ].map((col) => (
                          <button
                            key={col.value}
                            onClick={() => handleFieldChange('gridColumns', col.value)}
                            className={`py-2 px-3 border text-xs font-medium rounded-md transition-all ${
                              data.gridColumns === col.value 
                                ? 'bg-neutral-900 text-white border-neutral-900' 
                                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {col.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Aspect ratio */}
                    <div>
                      <span className="text-xs text-neutral-500 block mb-1.5">Rasio Gambar Proyek</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'video', label: 'Cinematic (16:9)' },
                          { value: 'square', label: 'Square (1:1)' },
                          { value: 'portrait', label: 'Vertical (3:4)' }
                        ].map((ratio) => (
                          <button
                            key={ratio.value}
                            onClick={() => handleFieldChange('aspectRatio', ratio.value)}
                            className={`py-2 px-2 border text-[11px] font-medium rounded-md transition-all ${
                              data.aspectRatio === ratio.value 
                                ? 'bg-neutral-900 text-white border-neutral-900' 
                                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                            }`}
                          >
                            {ratio.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTENTS (TEXT) TAB */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Basic Branding Profile */}
                  <div className="space-y-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block pb-1 border-b border-neutral-100">👤 Hub Identitas Utama</label>
                    
                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Nama Desainer</span>
                      <input 
                        type="text" 
                        value={data.name} 
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950 font-medium"
                      />
                    </div>
                    
                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Peran Profesional</span>
                      <input 
                        type="text" 
                        value={data.role} 
                        onChange={(e) => handleFieldChange('role', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Tagline Filosofi</span>
                      <textarea
                        rows={3}
                        value={data.tagline} 
                        onChange={(e) => handleFieldChange('tagline', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950 resize-y"
                      />
                    </div>
                  </div>

                  {/* Hero Headlines */}
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block pb-1 border-b border-neutral-100">⚡ Hero Section Banner</label>
                    
                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Headline Utama (Hero)</span>
                      <input 
                        type="text" 
                        value={data.heroHeadline} 
                        onChange={(e) => handleFieldChange('heroHeadline', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Sub-headline (Hero)</span>
                      <textarea 
                        rows={3}
                        value={data.heroSubheadline} 
                        onChange={(e) => handleFieldChange('heroSubheadline', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                      />
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block pb-1 border-b border-neutral-100">📖 Profil & Cerita Desain</label>
                    
                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Judul Bagian About</span>
                      <input 
                        type="text" 
                        value={data.aboutTitle} 
                        onChange={(e) => handleFieldChange('aboutTitle', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Cerita Profil Utama</span>
                      <textarea 
                        rows={6}
                        value={data.aboutText} 
                        onChange={(e) => handleFieldChange('aboutText', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950 leading-relaxed text-xs"
                      />
                    </div>

                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Kutipan Inspirasional (Quote)</span>
                      <textarea 
                        rows={2}
                        value={data.quoteText} 
                        onChange={(e) => handleFieldChange('quoteText', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm italic text-neutral-900 focus:outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">Atribusi Kutipan</span>
                      <input 
                        type="text" 
                        value={data.quoteAuthor} 
                        onChange={(e) => handleFieldChange('quoteAuthor', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* WORKS TAB */}
              {activeTab === 'works' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">💼 Kelola Galeri Proyek ({data.projects.length})</label>
                    <button
                      onClick={handleAddProject}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white rounded-md text-xs font-medium hover:bg-neutral-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Baru</span>
                    </button>
                  </div>

                  {data.projects.length === 0 ? (
                    <div className="text-center py-10 bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
                      <Layers className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                      <p className="text-sm text-neutral-500 font-medium">Belum ada proyek desain.</p>
                      <p className="text-xs text-neutral-400 mt-1">Klik tombol Tambah Baru untuk menampilkan mahakarya Anda.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.projects.map((proj, idx) => {
                        const isExpanded = expandedProject === proj.id;
                        return (
                          <div 
                            key={proj.id}
                            className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50/50"
                          >
                            {/* Accordion Trigger */}
                            <div 
                              onClick={() => setExpandedProject(isExpanded ? null : proj.id)}
                              className="p-3.5 bg-white flex items-center justify-between cursor-pointer hover:bg-neutral-50 select-none group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img 
                                  src={proj.imageUrl} 
                                  alt="" 
                                  className="w-10 h-10 object-cover rounded border border-neutral-200 flex-shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="min-w-0">
                                  <h4 className="text-sm font-semibold text-neutral-900 truncate group-hover:text-neutral-950">{proj.title || 'Tanpa Judul'}</h4>
                                  <p className="text-xs text-neutral-500 mt-0.5">{proj.category} • {proj.year}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteProject(proj.id);
                                  }}
                                  className="p-1 px-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-100 transition-colors"
                                  title="Hapus Proyek"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                              </div>
                            </div>

                            {/* Accordion Form Content */}
                            {isExpanded && (
                              <div className="p-4 bg-neutral-50 border-t border-neutral-200/60 p-4 space-y-3.5 text-xs">
                                <div>
                                  <span className="text-neutral-500 block mb-1">Judul Proyek</span>
                                  <input 
                                    type="text" 
                                    value={proj.title} 
                                    onChange={(e) => handleProjectChange(proj.id, { title: e.target.value })}
                                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 rounded focus:outline-none focus:border-neutral-950"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <span className="text-neutral-500 block mb-1">Kategori</span>
                                    <input 
                                      type="text" 
                                      value={proj.category} 
                                      onChange={(e) => handleProjectChange(proj.id, { category: e.target.value })}
                                      className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 rounded focus:outline-none focus:border-neutral-950"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-neutral-500 block mb-1">Tahun Rilis</span>
                                    <input 
                                      type="text" 
                                      value={proj.year} 
                                      onChange={(e) => handleProjectChange(proj.id, { year: e.target.value })}
                                      className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 rounded focus:outline-none focus:border-neutral-950"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <span className="text-neutral-500 block mb-1">Deskripsi Singkat Karya</span>
                                  <textarea 
                                    rows={3}
                                    value={proj.description} 
                                    onChange={(e) => handleProjectChange(proj.id, { description: e.target.value })}
                                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 rounded focus:outline-none focus:border-neutral-950 resize-y"
                                  />
                                </div>

                                <div>
                                  <span className="text-neutral-500 block mb-1">Link Gambar Kustom (URL atau Placeholder)</span>
                                  <input 
                                    type="text" 
                                    value={proj.imageUrl} 
                                    onChange={(e) => handleProjectChange(proj.id, { imageUrl: e.target.value })}
                                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 rounded text-neutral-700 font-mono text-[10px] focus:outline-none focus:border-neutral-950"
                                  />
                                  <div className="flex gap-2 mt-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleProjectChange(proj.id, { imageUrl: 'https://picsum.photos/seed/aether/800/600' })}
                                      className="bg-neutral-200 text-neutral-800 px-2 py-1 rounded text-[10px] hover:bg-neutral-300 transition-colors"
                                    >
                                      Picsum Seed A
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleProjectChange(proj.id, { imageUrl: 'https://picsum.photos/seed/kinetic/800/600' })}
                                      className="bg-neutral-200 text-neutral-800 px-2 py-1 rounded text-[10px] hover:bg-neutral-300 transition-colors"
                                    >
                                      Picsum Seed B
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <span className="text-neutral-500 block mb-1">Kombinasi Tags (Pisahkan dengan koma)</span>
                                  <input 
                                    type="text" 
                                    value={proj.tags.join(', ')} 
                                    onChange={(e) => handleProjectChange(proj.id, { tags: e.target.value.split(',').map(s => s.trim()) })}
                                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 rounded focus:outline-none focus:border-neutral-950"
                                    placeholder="Contoh: Branding, Logo, Custom Font"
                                  />
                                </div>

                                <div className="flex items-center gap-2 pt-1">
                                  <input 
                                    type="checkbox" 
                                    id={`featured-${proj.id}`}
                                    checked={!!proj.featured} 
                                    onChange={(e) => handleProjectChange(proj.id, { featured: e.target.checked })}
                                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                                  />
                                  <label htmlFor={`featured-${proj.id}`} className="text-neutral-600 font-medium select-none cursor-pointer">
                                    Tampilkan di Bagian Utama (Halaman Atas)
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  {/* Services / Expertise Boxes */}
                  <div className="space-y-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block pb-1 border-b border-neutral-100">📌 Layanan Spesialisasi</label>
                    {data.services.map((src, sIdx) => (
                      <div key={src.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3">
                        <span className="text-xs font-bold text-neutral-500">Kapasitas {sIdx + 1}</span>
                        <div>
                          <span className="text-[11px] text-neutral-500 block mb-1">Judul Layanan</span>
                          <input 
                            type="text" 
                            value={src.title} 
                            onChange={(e) => handleServiceChange(src.id, { title: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded text-xs text-neutral-900 focus:outline-none focus:border-neutral-950"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] text-neutral-500 block mb-1">Keterangan Layanan</span>
                          <textarea 
                            rows={3}
                            value={src.description} 
                            onChange={(e) => handleServiceChange(src.id, { description: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded text-xs text-neutral-900 focus:outline-none focus:border-neutral-950 leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contact details */}
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block pb-1 border-b border-neutral-100">✉️ Saluran Kontak Resmi</label>
                    <div className="grid grid-cols-1 gap-3.5">
                      <div>
                        <span className="text-xs text-neutral-500 block mb-1">Email Profesional</span>
                        <input 
                          type="email" 
                          value={data.contactEmail} 
                          onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-500 block mb-1">Nomor Kontak WhatsApp</span>
                        <input 
                          type="text" 
                          value={data.contactPhone} 
                          onChange={(e) => handleFieldChange('contactPhone', e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-500 block mb-1">Lokasi Domisili</span>
                        <input 
                          type="text" 
                          value={data.location} 
                          onChange={(e) => handleFieldChange('location', e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:border-neutral-950"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Profile Links */}
                  <div className="space-y-3.5 pt-4 border-t border-neutral-100">
                    <span className="text-xs font-semibold text-neutral-500 block">Tautan Media Sosial</span>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-neutral-500 block mb-1">Behance</span>
                        <input 
                          type="text" 
                          value={data.socials.behance || ''} 
                          onChange={(e) => handleSocialChange('behance', e.target.value)}
                          className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded"
                          placeholder="Link Behance"
                        />
                      </div>
                      <div>
                        <span className="text-neutral-500 block mb-1">Instagram</span>
                        <input 
                          type="text" 
                          value={data.socials.instagram || ''} 
                          onChange={(e) => handleSocialChange('instagram', e.target.value)}
                          className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded"
                          placeholder="Link Instagram"
                        />
                      </div>
                      <div>
                        <span className="text-neutral-500 block mb-1">LinkedIn</span>
                        <input 
                          type="text" 
                          value={data.socials.linkedin || ''} 
                          onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                          className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded"
                          placeholder="Link LinkedIn"
                        />
                      </div>
                      <div>
                        <span className="text-neutral-500 block mb-1">Dribbble</span>
                        <input 
                          type="text" 
                          value={data.socials.dribbble || ''} 
                          onChange={(e) => handleSocialChange('dribbble', e.target.value)}
                          className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded"
                          placeholder="Link Dribbble"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* INTEGRATION TAB */}
              {activeTab === 'integration' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-neutral-900" />
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Simpan & Ekspor Skema</h4>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Salin seluruh data konfigurasi CMS ini untuk digunakan kembali, atau terapkan langsung di platform favorit Anda.
                    </p>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        onClick={handleCopyJson}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg text-xs font-semibold shadow-sm transition-all"
                      >
                        {showExportSuccess ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Berhasil Disalin!</span>
                          </>
                        ) : (
                          <>
                            <Layers className="w-4 h-4" />
                            <span>Salin Konfigurasi JSON</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={onReset}
                        className="w-full py-2 bg-white text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium transition-all"
                      >
                        Reset ke Pengaturan Awal
                      </button>
                    </div>
                  </div>

                  {/* Guides: WordPress / Framer Deployment */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-1 border-b border-neutral-100">
                      <HelpCircle className="w-4.5 h-4.5 text-neutral-400" />
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">💡 Panduan Ekspor ke CMS</label>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed text-neutral-600">
                      {/* Framer guide */}
                      <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200">
                        <h5 className="font-bold text-neutral-800 flex items-center gap-1.5 mb-1">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                          Migrasi ke Framer
                        </h5>
                        <ol className="list-decimal list-inside space-y-1 mt-1.5 text-neutral-600">
                          <li>Buka lembar kerja Anda di Framer.com.</li>
                          <li>Gunakan fitur "CMS" Framer untuk membuat tabel dengan kolom: <code className="bg-neutral-200 px-1 rounded text-[10px]">Title, Category, Year, Image, Description</code>.</li>
                          <li>Ekspor data JSON dari panel ini dan impor baris datanya ke Framer CMS secara curah (Bulk Import).</li>
                          <li>Petakan aset dinamis ke kartu layout visual untuk render instan.</li>
                        </ol>
                      </div>

                      {/* WordPress guide */}
                      <div className="p-3.5 bg-neutral-50 rounded border border-neutral-200">
                        <h5 className="font-bold text-neutral-800 flex items-center gap-1.5 mb-1">
                          <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                          Migrasi ke WordPress (ACF / Elementor)
                        </h5>
                        <ol className="list-decimal list-inside space-y-1 mt-1.5 text-neutral-600">
                          <li>Gunakan plugin gratis <span className="font-medium">ACF (Advanced Custom Fields)</span> di WordPress.</li>
                          <li>Buat Custom Post Type (CPT) bernama <code className="bg-neutral-200 px-1 rounded text-[10px]">Project</code>.</li>
                          <li>Kaitkan field grup kustom: Kategori, Tahun, Tag, dan Gambar.</li>
                          <li>Masukkan JSON dari website ke WordPress Importer untuk mengisi seluruh konten portofolio secara otomatis.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Footnote */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-center">
              <p className="text-[11px] font-mono text-neutral-400">Design Canvas CMS © {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
