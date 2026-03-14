// Product Images - Using User Module Assets
import necklaceAsset from '../modules/user/assets/latest_drop_necklace.png';
import ringAsset from '../modules/user/assets/latest_drop_ring.png';
import earringsAsset from '../modules/user/assets/latest_drop_earrings.png';
import braceletAsset from '../modules/user/assets/latest_drop_bracelet.png';
import ankletAsset from '../modules/user/assets/cat_anklets.png';

const necklaceUrl = necklaceAsset;
const ringUrl = ringAsset;
const earringsUrl = earringsAsset;
const braceletUrl = braceletAsset;
const ankletUrl = ankletAsset;
const machinePlaceholder = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800";
const toolPlaceholder = "https://images.unsplash.com/photo-1530124560676-1e627e794358?auto=format&fit=crop&q=80&w=800";

export const SKUS = [
    { id: 'sku_1', name: 'Gold Necklace 22k', unit: 'pc', price: 45000, category: 'Jewellery' },
    { id: 'sku_2', name: 'Diamond Ring 18k', unit: 'pc', price: 25000, category: 'Jewellery' },
    { id: 'sku_m1', name: 'Smart Wax Printer', unit: 'pc', price: 120000, category: 'Machine' },
    { id: 'sku_t1', name: 'Yellow Cloth Buff', unit: 'pc', price: 150, category: 'Tools' },
];

export const PACKS = [
    {
        id: '1',
        brand: 'HG PREMIUM',
        name: 'Bridal Wedding Set - 22k Gold',
        category: 'Jewellery',
        subcategory: 'Necklaces',
        mrp: 150000,
        price: 135000,
        unitPrice: 'N/A',
        rating: 5.0,
        tag: 'LUXURY',
        discount: '10% OFF',
        image: necklaceUrl,
        description: 'A magnificent 22k gold bridal set including a heavy necklace, long haram, earrings, and maang tikka.',
        contents: [
            { productId: 'p1', productName: 'Royal Temple Necklace', quantity: 1, variant: 'Standard' }
        ]
    }
];

export const PRODUCTS = [
    // --- JEWELLERY ---
    {
        id: 'p1',
        brand: 'HG JEWELS',
        name: 'Royal Kundan Gold Necklace',
        category: 'Jewellery',
        subcategory: 'Necklaces',
        rating: 4.9,
        tag: 'PREMIUM',
        image: necklaceUrl,
        description: 'Exquisite handcrafted Kundan necklace set in 22k gold.',
        benefits: ['Hallmarked Gold', 'Authentic Kundan', 'Lifetime Polish Warranty'],
        specifications: [
            { label: 'Material', value: '22k Gold' },
            { label: 'Weight', value: '45g' }
        ],
        faqs: [
            { q: 'Is it hallmarked?', a: 'Yes, it comes with BIS Hallmark.' }
        ],
        variants: [
            { id: 'p1-v1', name: 'Standard', mrp: 160000, price: 145000, discount: '9%off', stock: 3, sold: 12 }
        ]
    },
    {
        id: 'p2',
        brand: 'HG SOLITAIRE',
        name: 'Classic Diamond Solitaire Ring',
        category: 'Jewellery',
        subcategory: 'Rings',
        rating: 4.8,
        tag: 'ENGAGEMENT',
        image: ringUrl,
        description: 'A timeless solitaire diamond ring set in 18k white gold.',
        benefits: ['Certified Diamond', '18k White Gold', 'Free Resizing'],
        specifications: [
            { label: 'Diamond', value: '0.50 ct, VVS1' },
            { label: 'Metal', value: '18k White Gold' }
        ],
        faqs: [],
        variants: [
            { id: 'p2-v1', name: 'Size 7', mrp: 65000, price: 58000, discount: '11%off', stock: 8, sold: 15 }
        ]
    },

    // --- MACHINES ---
    {
        id: 'm1',
        brand: 'HG MACHINES',
        name: 'Smart Wax Printer',
        category: 'Machine',
        subcategory: 'Printers',
        rating: 4.9,
        tag: 'ADVANCED',
        image: machinePlaceholder,
        description: 'High-precision smart wax printer for intricate jewellery designs.',
        benefits: ['High Resolution', 'Fast Printing', 'User Friendly Interface'],
        specifications: [
            { label: 'Resolution', value: '25 Microns' },
            { label: 'Build Volume', value: '120x80x150 mm' },
            { label: 'Warranty', value: '2 Years' }
        ],
        faqs: [
            { q: 'Does it include software?', a: 'Yes, it comes with HG Design Studio Pro.' }
        ],
        variants: [
            { id: 'm1-v1', name: 'Standard', mrp: 150000, price: 125000, discount: '16%off', stock: 5, sold: 20 }
        ]
    },
    {
        id: 'm2',
        brand: 'HG MACHINES',
        name: 'IPA Recycling Machine',
        category: 'Machine',
        subcategory: 'Recycling',
        rating: 4.7,
        tag: 'ECO-FRIENDLY',
        image: machinePlaceholder,
        description: 'Efficient IPA recycling system for cleaning castable resins.',
        benefits: ['95% Recovery Rate', 'Explosion Proof', 'Low Maintenance'],
        specifications: [
            { label: 'Capacity', value: '10L' },
            { label: 'Processing Time', value: '4 Hours' }
        ],
        faqs: [],
        variants: [
            { id: 'm2-v1', name: '10L Model', mrp: 85000, price: 72000, discount: '15%off', stock: 3, sold: 10 }
        ]
    },

    // --- TOOLS ---
    {
        id: 't1',
        brand: 'HG TOOLS',
        name: 'Yellow Cloth Buff',
        category: 'Tools',
        subcategory: 'Polishing',
        rating: 4.5,
        tag: 'ESSENTIAL',
        image: toolPlaceholder,
        description: 'High-quality cotton cloth buff for final high-shine polishing.',
        benefits: ['Long Lasting', 'Soft Cotton', 'Safe for Gold & Silver'],
        specifications: [
            { label: 'Material', value: 'Premium Cotton' },
            { label: 'Diameter', value: '6 Inches' }
        ],
        faqs: [],
        variants: [
            { id: 't1-v1', name: 'Pack of 10', mrp: 1500, price: 1200, discount: '20%off', stock: 50, sold: 200 }
        ]
    },
    {
        id: 't2',
        brand: 'HG TOOLS',
        name: 'Micro Motor',
        category: 'Tools',
        subcategory: 'Drilling',
        rating: 4.8,
        tag: 'PROFESSIONAL',
        image: toolPlaceholder,
        description: 'Powerful and silent micro motor for precise drilling and setting.',
        benefits: ['35000 RPM', 'Silent Operation', 'Foot Control Included'],
        specifications: [
            { label: 'Speed', value: 'Max 35000 RPM' },
            { label: 'Voltage', value: '220V' }
        ],
        faqs: [],
        variants: [
            { id: 't2-v1', name: 'Standard', mrp: 12000, price: 9500, discount: '20%off', stock: 12, sold: 45 }
        ]
    }
];

export const COUPONS = [
    {
        id: 'COUP-001',
        code: 'HGWELCOME',
        type: 'flat',
        value: 1000,
        minOrderValue: 10000,
        maxDiscount: null,
        validFrom: '2026-01-01',
        validUntil: '2026-12-31',
        usageLimit: 1000,
        usageCount: 0,
        perUserLimit: 1,
        applicableCategories: [],
        userEligibility: 'new',
        active: true,
        description: 'Flat ₹1000 OFF on your first HG Enterprises order above ₹10000!'
    }
];

