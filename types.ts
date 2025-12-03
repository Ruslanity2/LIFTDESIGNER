export enum WallMaterial {
  StainlessSteel = 'Stainless Steel',
  GoldMirror = 'Gold Mirror',
  WoodVeneer = 'Wood Veneer',
  Glass = 'Back-painted Glass',
  Laminate = 'High-pressure Laminate'
}

export enum FloorType {
  Granite = 'Granite',
  Marble = 'Marble',
  PVC = 'PVC',
  Carpet = 'Carpet',
  SteelPlate = 'Steel Checker Plate'
}

export enum CeilingType {
  Spots = 'LED Spots',
  LightBox = 'Full Light Box',
  Perimeter = 'Perimeter Lighting',
  StarrySky = 'Starry Sky'
}

export enum HandrailType {
  Round = 'Round Stainless',
  Flat = 'Flat Bar',
  Wood = 'Wood Inlay',
  None = 'None'
}

export interface ElevatorConfig {
  walls: {
    material: WallMaterial;
    color: string;
    mirrorOnBack: boolean;
  };
  floor: {
    type: FloorType;
    color: string;
  };
  ceiling: {
    type: CeilingType;
  };
  handrail: HandrailType;
}

export type ConfigSection = 'walls' | 'floor' | 'ceiling' | 'accessories';
