import React from 'react';
import { ConfigSection, ElevatorConfig, WallMaterial, FloorType, CeilingType, HandrailType } from '../types';
import { WALL_OPTIONS, FLOOR_OPTIONS, CEILING_OPTIONS, HANDRAIL_OPTIONS } from '../constants';
import { Layers, Box, Maximize, Sun, Grid } from 'lucide-react';

interface ControlsProps {
  config: ElevatorConfig;
  setConfig: React.Dispatch<React.SetStateAction<ElevatorConfig>>;
  activeSection: ConfigSection;
  setActiveSection: (section: ConfigSection) => void;
  onGenerateAI: () => void;
  isGenerating: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ 
  config, 
  setConfig, 
  activeSection, 
  setActiveSection,
  onGenerateAI,
  isGenerating
}) => {

  const updateConfig = (key: keyof ElevatorConfig, subKey: string | null, value: any) => {
    setConfig(prev => {
      if (subKey) {
        return { ...prev, [key]: { ...(prev[key] as any), [subKey]: value } };
      }
      return { ...prev, [key]: value };
    });
  };

  const sections = [
    { id: 'walls', label: 'Walls & Finish', icon: <Box size={18} /> },
    { id: 'floor', label: 'Flooring', icon: <Layers size={18} /> },
    { id: 'ceiling', label: 'Ceiling & Light', icon: <Sun size={18} /> },
    { id: 'accessories', label: 'Accessories', icon: <Maximize size={18} /> },
  ];

  return (
    <div className="h-full bg-gray-900 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white mb-1">Configuration</h2>
        <p className="text-xs text-gray-400">Customize your cabin interior</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as ConfigSection)}
            className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm transition-colors ${
              activeSection === s.id 
              ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/50' 
              : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {s.icon}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {activeSection === 'walls' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Wall Material</label>
              <div className="grid grid-cols-1 gap-2">
                {WALL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateConfig('walls', 'material', opt.value)}
                    className={`flex items-center p-3 rounded-lg border transition-all ${
                      config.walls.material === opt.value 
                      ? 'border-blue-500 bg-blue-500/10 text-white' 
                      : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded mr-3 shadow-sm" style={{ background: opt.color }}></div>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

             <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Rear Mirror</label>
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => updateConfig('walls', 'mirrorOnBack', !config.walls.mirrorOnBack)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${config.walls.mirrorOnBack ? 'bg-blue-600' : 'bg-gray-700'}`}
                 >
                   <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${config.walls.mirrorOnBack ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </button>
                 <span className="text-sm text-gray-300">{config.walls.mirrorOnBack ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'floor' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Floor Material</label>
              <div className="grid grid-cols-2 gap-3">
                 {FLOOR_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateConfig('floor', 'type', opt.value)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center h-32 transition-all ${
                      config.floor.type === opt.value 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-gray-700 bg-gray-800 hover:bg-gray-750'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full mb-3 shadow-inner" style={{ background: opt.color }}></div>
                    <span className={`text-xs font-medium ${config.floor.type === opt.value ? 'text-white' : 'text-gray-400'}`}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
             <div>
               <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Floor Color Tone</label>
               <input 
                type="color" 
                value={config.floor.color} 
                onChange={(e) => updateConfig('floor', 'color', e.target.value)}
                className="w-full h-10 rounded cursor-pointer bg-transparent border-0"
               />
             </div>
          </div>
        )}

        {activeSection === 'ceiling' && (
          <div className="space-y-6">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Lighting Style</label>
            <div className="space-y-2">
              {CEILING_OPTIONS.map((opt) => (
                <div 
                  key={opt.value}
                  onClick={() => updateConfig('ceiling', 'type', opt.value)}
                  className={`cursor-pointer p-4 rounded-lg border flex items-center justify-between group transition-all ${
                    config.ceiling.type === opt.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <span className={`text-sm ${config.ceiling.type === opt.value ? 'text-white' : 'text-gray-400'}`}>{opt.label}</span>
                  {config.ceiling.type === opt.value && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'accessories' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Handrails</label>
              <select 
                value={config.handrail}
                onChange={(e) => updateConfig('handrail', null, e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg p-3 outline-none focus:border-blue-500"
              >
                {HANDRAIL_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

      </div>

      {/* Footer / Action */}
      <div className="p-6 border-t border-gray-800 bg-gray-900/50">
        <button
          onClick={onGenerateAI}
          disabled={isGenerating}
          className={`w-full py-4 rounded-lg font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all ${
            isGenerating 
            ? 'bg-purple-900/50 text-purple-300 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              GENERATING RENDER...
            </>
          ) : (
            <>
              <Grid size={16} /> GENERATE AI PREVIEW
            </>
          )}
        </button>
        <p className="text-[10px] text-gray-500 text-center mt-3">
          Uses Google Gemini 2.0 to generate photorealistic architectural visualization.
        </p>
      </div>
    </div>
  );
};
