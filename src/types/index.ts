export type GarmentCategory =
  | 'suits'
  | 'shirts'
  | 'waistcoats'
  | 'trousers'
  | 'outerwear'
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: GarmentCategory;
  price: number;
  description: string;
  cloth: string;
  construction: string;
  details: string[];
  image: string;
  secondaryImage?: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
  explodedModelType?: 'suit' | 'shirt' | 'waistcoat';
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  bespokeDetails?: BespokeConfig;
}

export interface BespokeConfig {
  garmentType: string;
  fabric: string;
  fabricColor: string;
  lapelStyle: string;
  buttonType: string;
  pocketStyle: string;
  vents: string;
  fitPreference: string;
  monogramText: string;
  monogramThread: string;
  basePrice: number;
}

export interface MeasurementProfile {
  chest: number;
  waist: number;
  shoulder: number;
  sleeveLength: number;
  neck: number;
  jacketLength: number;
  trouserWaist: number;
  inseam: number;
  unit: 'in' | 'cm';
  customerName?: string;
  customerEmail?: string;
  notes?: string;
}

export interface ExplodedPartInfo {
  id: string;
  name: string;
  craftsmanshipNote: string;
  material: string;
  origin: string;
}
