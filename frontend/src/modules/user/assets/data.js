import catRings from './cat_rings.png';
import catEarrings from './cat_earrings.png';
import catPendant from './cat_pendant.png';
import catBracelets from './cat_bracelets.png';
import catAnklets from './cat_anklets.png';
import trendingHeritage from './trending_heritage.png';
import trendingModern from './trending_modern.png';
import prodRingMain from './prod_ring_main.png';
import prodEarringsMain from './prod_earrings_main.png';

const machinePlaceholder = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800";
const toolPlaceholder = "https://images.unsplash.com/photo-1530124560676-1e627e794358?auto=format&fit=crop&q=80&w=800";

export const categories = [
    {
        id: 'jewellery',
        name: "Jewellery",
        path: "jewellery",
        image: catRings,
        subcategories: [
            { name: "Rings", path: "rings", image: catRings },
            { name: "Earrings", path: "earrings", image: catEarrings },
            { name: "Pendants", path: "pendants", image: catPendant },
            { name: "Bracelets", path: "bracelets", image: catBracelets },
            { name: "Anklets", path: "anklets", image: catAnklets },
            { name: "Chains", path: "chains", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=400" },
            { name: "Studs", path: "studs", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400" },
            { name: "Toe Rings", path: "toe-rings", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=400" }
        ]
    },
    {
        id: 'machine',
        name: "Machine",
        path: "machine",
        image: machinePlaceholder,
        subcategories: [
            { name: "Filling table HY type", path: "filling-table", image: machinePlaceholder },
            { name: "Gold Smith Working Bench", path: "working-bench", image: machinePlaceholder },
            { name: "Guardian", path: "guardian", image: machinePlaceholder },
            { name: "IPA Recycling Machine", path: "recycling", image: machinePlaceholder },
            { name: "J DETECT Pro", path: "j-detect", image: machinePlaceholder },
            { name: "Micro Setting Table Table JR Type", path: "setting-table", image: machinePlaceholder },
            { name: "Pre Polishing Table", path: "polishing-table", image: machinePlaceholder },
            { name: "Smart Wax Printer URC Series", path: "wax-printer", image: machinePlaceholder },
            { name: "Stand Alone Workbench", path: "workbench", image: machinePlaceholder }
        ]
    },
    {
        id: 'tools',
        name: "Tools",
        path: "tools",
        image: toolPlaceholder,
        subcategories: [
            { name: "Bristles and brushes", path: "bristles-brushes", image: toolPlaceholder },
            { name: "Connecting lead", path: "connecting-lead", image: toolPlaceholder },
            { name: "Felt wheels", path: "felt-wheels", image: toolPlaceholder },
            { name: "Knife-edge felt wheels", path: "knife-edge-felt", image: toolPlaceholder },
            { name: "Mandrals", path: "mandrals", image: toolPlaceholder },
            { name: "Metal Center Wheel Brushes", path: "metal-center-brushes", image: toolPlaceholder },
            { name: "Micro Motor", path: "micro-motor", image: toolPlaceholder },
            { name: "Skotch Brite Brushes", path: "skotch-brite-brushes", image: toolPlaceholder },
            { name: "Wax solder", path: "wax-solder", image: toolPlaceholder },
            { name: "Yellow Cloth Buff", path: "polishing", image: toolPlaceholder }
        ]
    }
];

export const products = [
    {
        id: 'p1',
        name: "Royal Kundan Gold Necklace",
        category: "Jewellery",
        price: 145000,
        originalPrice: 160000,
        image: trendingHeritage,
        rating: 4.9,
        reviews: 120,
        isNew: true
    },
    {
        id: 'p2',
        name: "Classic Diamond Solitaire Ring",
        category: "Jewellery",
        price: 58000,
        originalPrice: 65000,
        image: prodRingMain,
        rating: 4.8,
        reviews: 85,
        isNew: false
    },
    {
        id: 'm1',
        name: "Smart Wax Printer",
        category: "Machine",
        price: 125000,
        originalPrice: 150000,
        image: machinePlaceholder,
        rating: 4.9,
        reviews: 45,
        isNew: true
    },
    {
        id: 't1',
        name: "Yellow Cloth Buff",
        category: "Tools",
        price: 1200,
        originalPrice: 1500,
        image: toolPlaceholder,
        rating: 4.5,
        reviews: 200,
        isNew: false
    }
];

export const banners = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1600",
        title: "Premium Jewellery Collection",
        subtitle: "Luxury you deserve"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
        title: "Industrial Machines",
        subtitle: "Precision engineering for masters"
    }
];

