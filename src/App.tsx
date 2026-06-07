/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { CMSConfig } from './types';
import { DEFAULT_CMS_DATA } from './data/defaults';
import PortfolioView from './components/PortfolioView';
import CmsPanel from './components/CmsPanel';

const LOCAL_STORAGE_KEY = 'design_canvas_cms_config';

export default function App() {
  const [data, setData] = useState<CMSConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Gagal membaca data kustom dari local storage, beralih ke bawaan.', e);
    }
    return DEFAULT_CMS_DATA;
  });

  // Automatically save configuration changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Gagal menyimpan data CMS ke local storage.', e);
    }
  }, [data]);

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang data ke template awal? Semua suntingan kustom akan dihapus.')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setData(DEFAULT_CMS_DATA);
    }
  };

  return (
    <div id="design-canvas-app" className="relative select-none">
      {/* Portfolio visual page template */}
      <PortfolioView data={data} />

      {/* Slide-out Visual Editor Panel (Framer/WordPress Style) */}
      <CmsPanel 
        data={data} 
        onUpdate={setData} 
        onReset={handleResetData} 
      />
    </div>
  );
}

