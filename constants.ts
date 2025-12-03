import { WallMaterial, FloorType, CeilingType, HandrailType, ElevatorConfig } from './types';

export const INITIAL_CONFIG: ElevatorConfig = {
  walls: {
    material: WallMaterial.StainlessSteel,
    color: '#d1d5db', // Silver/Grey
    mirrorOnBack: true,
  },
  floor: {
    type: FloorType.Granite,
    color: '#e5e5e0', // Speckled beige/grey
  },
  ceiling: {
    type: CeilingType.Spots,
  },
  handrail: HandrailType.Round,
};

export const WALL_OPTIONS = [
  { label: 'Stainless Panels', value: WallMaterial.StainlessSteel, color: '#c0c0c0', css: 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200' },
  { label: 'Gold Mirror', value: WallMaterial.GoldMirror, color: '#d4af37', css: 'bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-600' },
  { label: 'Dark Wood', value: WallMaterial.WoodVeneer, color: '#4a3728', css: 'bg-[#4a3728]' },
  { label: 'White Glass', value: WallMaterial.Glass, color: '#ffffff', css: 'bg-white opacity-95' },
  { label: 'Blue Laminate', value: WallMaterial.Laminate, color: '#1e3a8a', css: 'bg-blue-900' },
];

export const FLOOR_OPTIONS = [
  { label: 'Beige Granite', value: FloorType.Granite, color: '#e5e5e0' },
  { label: 'White Marble', value: FloorType.Marble, color: '#f3f4f6' },
  { label: 'Industrial Steel', value: FloorType.SteelPlate, color: '#9ca3af' },
];

export const CEILING_OPTIONS = [
  { label: 'Oval LED', value: CeilingType.Spots },
  { label: 'Full Light Box', value: CeilingType.LightBox },
  { label: 'Perimeter', value: CeilingType.Perimeter },
];

export const HANDRAIL_OPTIONS = [
  { label: 'Round Steel', value: HandrailType.Round },
  { label: 'Flat Bar', value: HandrailType.Flat },
  { label: 'None', value: HandrailType.None },
];