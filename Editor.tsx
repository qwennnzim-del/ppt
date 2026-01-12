
import React from 'react';
import { motion } from 'framer-motion';
import { SlideContent } from './types';

interface EditorProps {
  slide: SlideContent;
  onUpdate: (updated: SlideContent) => void;
  onClose: () => void;
}

const Editor: React.FC<EditorProps> = ({ slide, onUpdate, onClose }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...slide, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...slide, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs md:text-sm text-white focus:outline-none focus:border-white/30 transition-colors font-sans placeholder:text-white/20";
  const labelClass = "text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-1.5 block";

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-[#0a0a0a]/95 backdrop-blur-3xl border-l border-white/10 z-[60] overflow-y-auto"
    >
      <div className="p-8 md:p-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-xl font-display font-bold text-white">Slide Editor</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Customize your presentation</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Title Edit */}
          <div>
            <label className={labelClass}>Main Title</label>
            <input 
              name="title" 
              value={slide.title} 
              onChange={handleChange} 
              className={inputClass}
              placeholder="Enter slide title..."
            />
          </div>

          {/* Subtitle Edit */}
          <div>
            <label className={labelClass}>Subtitle</label>
            <input 
              name="subtitle" 
              value={slide.subtitle} 
              onChange={handleChange} 
              className={inputClass}
              placeholder="Enter category/subtitle..."
            />
          </div>

          {/* Description Edit */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea 
              name="description" 
              value={slide.description} 
              onChange={handleChange} 
              className={`${inputClass} h-32 resize-none`}
              placeholder="Tell your story..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className={labelClass}>Slide Visual (Photo)</label>
            <div className="relative group">
              <div className="w-full h-32 rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all overflow-hidden">
                {slide.image ? (
                  <img src={slide.image} className="w-full h-full object-cover opacity-50" />
                ) : (
                  <svg className="w-6 h-6 text-white/20 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-white/60">Drop photo or Click to upload</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <button 
              onClick={() => {
                const confirmed = window.confirm("Are you sure you want to reset ALL slide data to default?");
                if (confirmed) {
                  localStorage.removeItem('hzel_ppt_data');
                  window.location.reload();
                }
              }}
              className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500/50 hover:text-red-500 transition-colors"
            >
              Reset to Original Data
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Editor;
