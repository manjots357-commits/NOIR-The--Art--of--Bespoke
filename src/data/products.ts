import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'noire-sovereign-suit',
    name: 'The Sovereign Peak Lapel Suit',
    subtitle: 'Full Canvas Three-Piece Bespoke Architecture',
    category: 'suits',
    price: 3450,
    description: 'Constructed strictly by hand with a free-floating horsehair and camel-hair canvas chest piece that gently moulds to the contours of the wearer over time. Features a sharp 3.75-inch hand-rolled peak lapel, roped sleevehead, and pure Cupro Bemberg lining.',
    cloth: 'Tasmanian Super 160s Worsted Wool (260g/m)',
    construction: 'Hand-padded full canvas, hand-sewn buttonholes, floating lapels',
    details: [
      'Pure Tasmanian Super 160s virgin wool milled in Biella, Italy',
      'Full floating horsehair canvas chest piece',
      'Hand-attached roped shoulder sleevehead',
      'Four functioning horn surgeon’s cuffs with genuine keyhole stitching',
      'Deep interior pen, cigar, and passport jetted pockets'
    ],
    image: '/src/assets/images/campaign_silhouette_1794501136623.jpg',
    secondaryImage: '/src/assets/images/craft_cuff_detail_1794501137648.jpg',
    colors: [
      { name: 'Charcoal Obsidian', hex: '#111111' },
      { name: 'Midnight Sovereign Navy', hex: '#0B1325' },
      { name: 'Graphite Twill', hex: '#1F2022' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R', 'Bespoke Custom'],
    inStock: true,
    featured: true,
    explodedModelType: 'suit'
  },
  {
    id: 'noire-foundation-shirt',
    name: 'The Foundation Twill Shirt',
    subtitle: 'Egyptian 140-Ply Pure Giza Cotton',
    category: 'shirts',
    price: 395,
    description: 'Woven from hand-harvested Egyptian Giza 87 extra-long staple cotton. Cut with single-needle French seams (22 stitches per inch) and finished with 4mm Australian mother-of-pearl buttons cross-stitched with a crow’s-foot shank.',
    cloth: 'Egyptian 140-Ply 2-Fold Royal Twill',
    construction: 'Single-needle tailoring, hand-turned spread collar, crow-foot shanked buttons',
    details: [
      'Extra-long staple Egyptian Giza cotton with natural silk-like lustre',
      'Hand-set collar with removable genuine brass collar stays',
      'Split back yoke angled at 45 degrees for ergonomic shoulder mobility',
      'Mitered two-button convertible barrel cuffs with gauntlet button',
      'Reinforced side gusset pentagons embroidered with NOIRÉ monogram'
    ],
    image: '/src/assets/images/craft_cuff_detail_1794501137648.jpg',
    secondaryImage: '/src/assets/images/campaign_silhouette_1794501136623.jpg',
    colors: [
      { name: 'Optical Warm White', hex: '#F4F1EB' },
      { name: 'Sky Celeste Twill', hex: '#D6E2E8' },
      { name: 'Obsidian Black', hex: '#141414' }
    ],
    sizes: ['15.0', '15.5', '16.0', '16.5', '17.0', 'Bespoke Custom'],
    inStock: true,
    featured: true,
    explodedModelType: 'shirt'
  },
  {
    id: 'noire-canvas-waistcoat',
    name: 'The Structured Tailored Waistcoat',
    subtitle: 'Hand-Basted Chest Canvas & Silk Damask Backing',
    category: 'waistcoats',
    price: 880,
    description: 'Designed to frame the tie and anchor the gentleman’s torso. Cut with a sculpted horseshoe neckline, six matte buffalo horn buttons, dual lower watch pockets, and an adjustable back cinch buckle in hand-engraved brass.',
    cloth: 'Worsted Wool & Italian Mulberry Silk Damask',
    construction: 'Hand-basted canvas interlining, hand-finished welt pockets',
    details: [
      'Super 150s worsted wool front with matching silk blend back panel',
      'Sculpted 6-button front closure with hand-cut buttonholes',
      'Two lower welt watch pockets and breast pocket',
      'Solid forged antique brass rear cinch adjuster',
      'Hand-finished pick-stitched edges'
    ],
    image: '/src/assets/images/campaign_procession_1794501138735.jpg',
    secondaryImage: '/src/assets/images/campaign_silhouette_1794501136623.jpg',
    colors: [
      { name: 'Charcoal Black', hex: '#161616' },
      { name: 'Navy Midnight', hex: '#0F172A' },
      { name: 'Champagne Ivory', hex: '#EAE5D9' }
    ],
    sizes: ['38', '40', '42', '44', '46', 'Bespoke Custom'],
    inStock: true,
    featured: true,
    explodedModelType: 'waistcoat'
  },
  {
    id: 'noire-double-breasted-suit',
    name: 'The Mayfair 6x2 Double-Breasted Suit',
    subtitle: 'Vitale Barberis Canonico Flannel',
    category: 'suits',
    price: 3680,
    description: 'The epitome of architectural tailoring. Features a pronounced 4-inch belly peak lapel, sweeping roped shoulder line, and double side vents. Tailored from substantial 340g Italian woolen flannel with unmatched drape.',
    cloth: 'Vitale Barberis Canonico 340g Wool Flannel',
    construction: 'Full canvas structure, Milanese buttonhole, horn buttons',
    details: [
      'Classic 6x2 button stance with low break point',
      'Artisanal hand-sewn Milanese boutoniere lapel stitch',
      'Dual deep 10-inch side vents for clean posture when seated',
      'Hand-padded shoulder construction for an imposing silhouette',
      'Finished with natural water buffalo horn buttons'
    ],
    image: '/src/assets/images/campaign_procession_1794501138735.jpg',
    secondaryImage: '/src/assets/images/atelier_tailor_hands_1794501138712.jpg',
    colors: [
      { name: 'Midnight Navy', hex: '#0E1726' },
      { name: 'Anthracite Flannel', hex: '#232528' },
      { name: 'Ivory Cream', hex: '#E7E2D6' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R', 'Bespoke Custom'],
    inStock: true,
    featured: true,
    explodedModelType: 'suit'
  },
  {
    id: 'noire-gurkha-trouser',
    name: 'The Florentine Gurkha Trouser',
    subtitle: 'High-Rise Double Pleated Wool Twill',
    category: 'trousers',
    price: 640,
    description: 'Constructed with an extended wrap-around waistband anchored by dual polished brass buckles. Features deep reverse double forward pleats, slanted pockets, and an unhemmed 2-inch cuff allowance for personal tailoring.',
    cloth: 'Heavy English Cavalry Twill Wool (360g/m)',
    construction: 'Curved waistband, continuous fly, reinforced crotch shield',
    details: [
      'High-rise 11.5-inch waistband for clean elongated proportions',
      'Dual adjustable side-buckle waist fastening (no belt loops)',
      'Double forward pleats allowing generous thigh mobility',
      'After-dinner split rear waistband extension with V-notch',
      'Real horn button interior fly with French bearer button'
    ],
    image: '/src/assets/images/atelier_tailor_hands_1794501138712.jpg',
    secondaryImage: '/src/assets/images/craft_cuff_detail_1794501137648.jpg',
    colors: [
      { name: 'Charcoal Grey', hex: '#252628' },
      { name: 'Raw Umber Stone', hex: '#3B362F' },
      { name: 'Midnight Navy', hex: '#131926' }
    ],
    sizes: ['30', '32', '34', '36', '38', 'Bespoke Custom'],
    inStock: true,
    featured: false
  },
  {
    id: 'noire-cashmere-overcoat',
    name: 'The Greatcoat in Pure Cashmere',
    subtitle: 'Double-Faced 520g Loro Piana Mongolian Cashmere',
    category: 'outerwear',
    price: 4850,
    description: 'An authoritative full-length overcoat meticulously crafted from double-faced pure cashmere. Finished with an inverted box pleat back, buttoned martingala half-belt, and velvet collar facing.',
    cloth: 'Loro Piana 100% Mongolian Cashmere (520g/m)',
    construction: 'Hand-sewn edges, full silk-viscose lining, horn buttons',
    details: [
      'Ultra-dense double-faced cashmere with ripple cloud finish',
      'Generous Ulster collar with storm tab button closure',
      'Deep fleece-lined handwarmer welt pockets',
      'Rear martingala half-belt anchoring an expansive center pleat',
      'Full ankle-skimming 46-inch length'
    ],
    image: '/src/assets/images/campaign_silhouette_1794501136623.jpg',
    secondaryImage: '/src/assets/images/campaign_procession_1794501138735.jpg',
    colors: [
      { name: 'Pure Obsidian', hex: '#0B0B0C' },
      { name: 'Vicuna Camel', hex: '#875C36' },
      { name: 'Midnight Navy', hex: '#0E1727' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    inStock: true,
    featured: true
  },
  {
    id: 'noire-surgeon-cufflinks',
    name: 'The Savile Hand-Turned Cufflinks',
    subtitle: 'Oxidized Sterling Silver & Raw Onyx',
    category: 'accessories',
    price: 320,
    description: 'Hand-carved solid 925 sterling silver cufflinks inlaid with matte black faceted obsidian stone. Designed specifically to pair with NOIRÉ’s French cuff dress shirts and bespoke surgeon’s cuffs.',
    cloth: 'Solid 925 Sterling Silver & Natural Onyx',
    construction: 'Hallmarked in London Assay Office, hand-engraved NOIRÉ seal',
    details: [
      'Hallmarked 925 solid sterling silver',
      'Deep black volcanic obsidian gemstone inlay',
      'Heavyweight whale-back closure with tactile resistance',
      'Presented in handcrafted suede leather jewelry case'
    ],
    image: '/src/assets/images/craft_cuff_detail_1794501137648.jpg',
    colors: [
      { name: 'Oxidized Silver & Onyx', hex: '#8C8C8C' },
      { name: 'Brushed Champagne Gold', hex: '#C5A46D' }
    ],
    sizes: ['One Size'],
    inStock: true,
    featured: false
  }
];

export const CRAFT_SPECS = [
  {
    number: '01',
    title: 'THE FOUNDATION',
    subtitle: 'A Shirt of Pure Cotton',
    material: 'Egyptian 140-Ply Two-Fold Twill',
    construction: 'Single-needle lockstitch, 22 stitches per inch, split yoke.',
    modelType: 'shirt' as const
  },
  {
    number: '02',
    title: 'THE WAISTCOAT',
    subtitle: 'Structure, Held Close',
    material: 'Super 150s Worsted & Mulberry Silk',
    construction: 'Hand-basted interior canvas, hand-stitched welt pockets, brass cinch.',
    modelType: 'waistcoat' as const
  },
  {
    number: '03',
    title: 'THE CANVAS',
    subtitle: 'Built on Full Canvas',
    material: 'Tasmanian Super 160s & Camelhair Canvas',
    construction: 'Free-floating horsehair canvas chest piece, hand-padded lapel roll.',
    modelType: 'suit' as const
  }
];
