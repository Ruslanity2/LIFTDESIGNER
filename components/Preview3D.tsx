
import React from 'react';
import { ElevatorConfig, WallMaterial, CeilingType, HandrailType, FloorType } from '../types';
import { WALL_OPTIONS } from '../constants';

interface Preview3DProps {
  config: ElevatorConfig;
}

export const Preview3D: React.FC<Preview3DProps> = ({ config }) => {
  
  // Helper to get CSS class or inline styles based on material selection
  const getWallRenderProps = (): { style?: React.CSSProperties; className?: string } => {
    // Special rendering for Stainless Steel to look like vertical panels (as in image)
    if (config.walls.material === WallMaterial.StainlessSteel) {
      return {
        style: {
            background: `repeating-linear-gradient(90deg, 
            #d1d5db 0px, 
            #e5e7eb 15%, 
            #9ca3af 15.5%, 
            #d1d5db 16%
            )`,
            backgroundSize: '100% 100%' 
        }
      };
    }
    
    // Wood texture simulation
    if (config.walls.material === WallMaterial.WoodVeneer) {
       return {
         style: {
            backgroundColor: '#5c4033',
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), 
                              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '20px 20px, 100px 100px'
         }
       };
    }

    const option = WALL_OPTIONS.find(o => o.value === config.walls.material);
    return { className: option?.css || 'bg-gray-300' };
  };

  const wallProps = getWallRenderProps();

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden perspective-container">
      <style>{`
        .perspective-container {
          perspective: 1000px;
          background: radial-gradient(circle at center, #2a2a2a 0%, #000000 100%);
        }
        .cabin {
          width: 500px;
          height: 600px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(0deg);
          transition: transform 0.5s ease;
        }
        /* Surfaces */
        .surface {
          position: absolute;
          backface-visibility: hidden;
        }
        .wall-back {
          width: 500px;
          height: 600px;
          transform: translateZ(-250px);
          z-index: 1;
        }
        .wall-left {
          width: 500px;
          height: 600px;
          transform: rotateY(90deg) translateZ(-250px);
          transform-origin: center;
        }
        .wall-right {
          width: 500px;
          height: 600px;
          transform: rotateY(-90deg) translateZ(-250px);
          transform-origin: center;
        }
        .ceiling {
          width: 500px;
          height: 500px;
          transform: rotateX(-90deg) translateZ(-250px); /* Move UP relative to center */
          top: -250px; /* Adjust positioning */
          background: #e5e7eb;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
        }
        .floor {
          width: 500px;
          height: 500px;
          transform: rotateX(90deg) translateZ(-350px); /* Move DOWN */
          top: 350px;
        }

        /* Reflections and Details */
        .reflection {
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.1) 100%);
            pointer-events: none;
        }
        
        .floor-granite {
            background-color: ${config.floor.color};
            background-image: 
                radial-gradient(#000 1px, transparent 1px),
                radial-gradient(#666 1px, transparent 1px);
            background-size: 20px 20px, 15px 15px;
            background-position: 0 0, 10px 10px;
        }
      `}</style>

      <div className="cabin">
        {/* CEILING - OVAL LIGHTS (MATCHING IMAGE) */}
        <div className={`surface ceiling flex items-center justify-center border-b-4 border-gray-400`}>
           {config.ceiling.type === CeilingType.Spots && (
             <div className="w-full h-full p-10 flex justify-between px-16">
               {/* Left Row of Ovals */}
               <div className="flex flex-col justify-between h-full py-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={`l-${i}`} className="w-16 h-24 rounded-[50%] bg-white shadow-[0_0_20px_5px_rgba(255,255,255,0.7)] border border-gray-300"></div>
                 ))}
               </div>
               {/* Right Row of Ovals */}
               <div className="flex flex-col justify-between h-full py-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={`r-${i}`} className="w-16 h-24 rounded-[50%] bg-white shadow-[0_0_20px_5px_rgba(255,255,255,0.7)] border border-gray-300"></div>
                 ))}
               </div>
             </div>
           )}
           {config.ceiling.type === CeilingType.LightBox && (
             <div className="w-full h-full bg-white opacity-90 shadow-[inset_0_0_60px_rgba(0,0,0,0.2)]"></div>
           )}
           {config.ceiling.type === CeilingType.Perimeter && (
             <div className="w-[80%] h-[80%] bg-gray-200 shadow-[0_0_40px_10px_rgba(255,255,255,0.5)] border border-gray-300 inset-shadow"></div>
           )}
        </div>

        {/* FLOOR */}
        <div 
          className={`surface floor border-t border-gray-600 ${config.floor.type === FloorType.Granite ? 'floor-granite' : ''}`}
          style={{ 
            backgroundColor: config.floor.type !== FloorType.Granite ? config.floor.color : undefined,
            backgroundImage: config.floor.type === FloorType.SteelPlate ? 'repeating-linear-gradient(45deg, #ccc 0, #ccc 10px, #bbb 10px, #bbb 20px)' : undefined
          }}
        >
            <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* LEFT WALL (Mirror moved here or standard wall) */}
        <div 
            className={`surface wall-left border-r border-gray-500 ${wallProps.className || ''}`} 
            style={wallProps.style}
        >
           <div className="reflection w-full h-full absolute inset-0 z-10"></div>
           
           {config.handrail !== HandrailType.None && (
             <div className={`absolute top-[55%] left-0 w-full h-3 shadow-lg z-20 ${config.handrail === HandrailType.Wood ? 'bg-[#5c4033]' : 'bg-gradient-to-b from-gray-200 via-white to-gray-400'}`}></div>
           )}
        </div>

        {/* RIGHT WALL (With Control Panel) */}
        <div 
            className={`surface wall-right border-l border-gray-500 ${wallProps.className || ''}`} 
            style={wallProps.style}
        >
           <div className="reflection w-full h-full absolute inset-0 z-10"></div>
           
           {/* Control Panel (COP) - Matching Image Style */}
           <div className="absolute top-0 right-[20%] w-[120px] h-full bg-[#1a1a1a] border-l border-r border-gray-600 flex flex-col items-center py-10 shadow-2xl z-20">
              {/* Digital Display */}
              <div className="w-20 h-16 bg-black mb-8 border border-gray-700 rounded-sm flex items-center justify-center relative overflow-hidden">
                  <span className="text-red-600 text-4xl font-mono font-bold drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">02</span>
                  <div className="absolute top-1 right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              </div>
              
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                 {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center group cursor-pointer">
                        <div className="w-5 h-5 rounded-full border border-gray-400 group-hover:bg-blue-100/30"></div>
                    </div>
                 ))}
              </div>

              {/* Speaker / Vent */}
              <div className="mt-auto mb-10 w-16 h-16 grid grid-cols-4 gap-1">
                 {[...Array(16)].map((_,i) => <div key={i} className="bg-gray-800 rounded-full w-1 h-1"></div>)}
              </div>
           </div>
        </div>

        {/* BACK WALL */}
        <div 
            className={`surface wall-back flex items-center justify-center ${wallProps.className || ''}`} 
            style={wallProps.style}
        >
            {/* Mirror logic */}
            {config.walls.mirrorOnBack ? (
              <div className="w-[100%] h-[70%] mt-[-100px] bg-gradient-to-br from-blue-50 via-white to-gray-200 border-x-4 border-gray-300 shadow-inner relative overflow-hidden opacity-90">
                 {/* Fake reflection of the opposite side (doors/open space) */}
                 <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
                 <div className="absolute top-10 right-10 w-[200px] h-[400px] bg-white/10 skew-x-12 blur-xl"></div>
              </div>
            ) : (
                // If no mirror, maybe artwork or just the wall
                <div className="w-[80%] h-[40%] border border-white/10"></div>
            )}
            
            {config.handrail !== HandrailType.None && (
             <div className={`absolute top-[55%] left-0 w-full h-3 shadow-lg z-20 ${config.handrail === HandrailType.Wood ? 'bg-[#5c4033]' : 'bg-gradient-to-b from-gray-200 via-white to-gray-400'}`}></div>
           )}
        </div>

      </div>
      
      {/* Overlay Badge */}
      <div className="absolute bottom-6 right-6 text-white/30 text-xs font-mono select-none">
        CSS 3D RENDER ENGINE
      </div>
    </div>
  );
};
