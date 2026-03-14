import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import haldiImgDefault from '../assets/haldi.png';
import sangeetImgDefault from '../assets/sangeet.png';
import receptionImgDefault from '../assets/reception.png';
import bridalImgDefault from '../assets/bridal.png';
import bridesmaidImgDefault from '../assets/hero_slide_3.png';

const OccasionalSpecial = () => {
    const { homepageSections } = useShop();
    const sectionData = homepageSections?.['curated-for-you'];

    // Default categories if none managed
    const defaultCategories = [
        { id: 'jewellery', name: 'Bridal Jewellery', image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&q=80&w=800", path: '/category/jewellery' },
        { id: 'casting', name: 'Casting Machines', image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", path: '/category/machine' },
        { id: 'laser', name: 'Laser Welders', image: "https://images.unsplash.com/photo-1541888081622-1d54e4df9d1d?auto=format&fit=crop&q=80&w=800", path: '/category/machine' },
        { id: 'handtools', name: 'Precision Hand Tools', image: "https://images.unsplash.com/photo-1530124560676-1e627e794358?auto=format&fit=crop&q=80&w=800", path: '/category/tools' },
        { id: 'daily', name: 'Daily Wear', image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", path: '/category/jewellery' },
    ];

    const displayItems = sectionData?.items && sectionData.items.length > 0 ? sectionData.items : defaultCategories;

    // Helper to get item safe
    const getItem = (index, fallback) => {
        const item = displayItems[index];
        return {
            name: item?.name || item?.label || fallback.name,
            image: item?.image || fallback.image,
            path: item?.path || fallback.path
        };
    };

    // Extract first 5 for the main layout
    const item1 = getItem(0, defaultCategories[0]);
    const item2 = getItem(1, defaultCategories[1]);
    const item3 = getItem(2, defaultCategories[2]);
    const item4 = getItem(3, defaultCategories[3]);
    const item5 = getItem(4, defaultCategories[4]);

    return (
        <section className="py-4 md:py-12 bg-white">
            <div className="container mx-auto px-2 md:px-4">
                {/* Section Header */}
                <div className="text-center mb-6">
                    <h2 className="font-serif text-3xl md:text-4xl text-dark font-normal mb-1 md:mb-3 tracking-tight">
                        {sectionData?.label || "Curated For You"}
                    </h2>
                    <div className="h-1 w-16 md:w-24 bg-gold mx-auto rounded-full mb-4"></div>
                    <p className="font-serif italic text-gray-600 text-lg md:text-xl">Discover our expertise</p>
                </div>

                {/* Mobile View: 2-Column Grid */}
                <div className="grid grid-cols-2 md:hidden gap-3 px-2 mb-8">
                    {displayItems.map((cat, index) => {
                        const label = cat.name || cat.label;
                        return (
                            <Link
                                key={cat.id || index}
                                to={cat.path}
                                className="relative group overflow-hidden rounded-xl flex-shrink-0 w-full aspect-[4/5] cursor-pointer shadow-sm active:scale-95 transition-transform"
                            >
                                <img src={cat.image} alt={label} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>
                                <span className="absolute bottom-3 left-0 right-0 text-white font-serif text-lg tracking-wider text-center px-1 uppercase font-normal">
                                    {label}
                                </span>
                            </Link>
                        )
                    })}
                </div>

                {/* Desktop View: Grid Layout (Existing) */}
                <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-[250px]">
                    {/* Column 1 - Stacked */}
                    <div className="flex flex-col gap-6 h-full md:row-span-2">
                        <Link to={item1.path} className="relative group overflow-hidden rounded-2xl flex-1 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={item1.image} alt={item1.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-serif text-2xl tracking-wider w-full text-center uppercase font-normal">{item1.name}</span>
                        </Link>
                        <Link to={item2.path} className="relative group overflow-hidden rounded-2xl flex-1 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={item2.image} alt={item2.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-serif text-2xl tracking-wider w-full text-center uppercase font-normal">{item2.name}</span>
                        </Link>
                    </div>

                    {/* Column 2 - Tall Centerpiece */}
                    <Link to={item3.path} className="relative group overflow-hidden rounded-2xl md:row-span-2 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <img src={item3.image} alt={item3.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-serif text-4xl tracking-wider w-full text-center drop-shadow-md uppercase font-normal">{item3.name}</span>
                    </Link>

                    {/* Column 3 - Stacked */}
                    <div className="flex flex-col gap-6 h-full md:row-span-2">
                        <Link to={item4.path} className="relative group overflow-hidden rounded-2xl flex-[1.3] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={item4.image} alt={item4.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-serif text-2xl tracking-wider whitespace-nowrap drop-shadow-sm w-full text-center uppercase font-normal">
                                {item4.name}
                            </span>
                        </Link>
                        <Link to={item5.path} className="relative group overflow-hidden rounded-2xl flex-[0.7] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <img src={item5.image} alt={item5.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-serif text-2xl tracking-wider whitespace-nowrap drop-shadow-sm w-full text-center uppercase font-normal">
                                {item5.name}
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Additional Items Grid */}
                {displayItems.length > 5 && (
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {displayItems.slice(5).map((item, index) => {
                            const label = item.name || item.label;
                            return (
                                <Link
                                    key={item.id || index + 5}
                                    to={item.path}
                                    className="group relative rounded-2xl overflow-hidden aspect-square border border-gray-100 shadow-md"
                                >
                                    <img
                                        src={item.image}
                                        alt={label}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-0 right-0 text-center">
                                        <h4 className="text-white font-serif text-lg tracking-wider uppercase font-normal">{label}</h4>
                                        <div className="w-8 h-[1px] bg-gold mx-auto mt-1 group-hover:w-16 transition-all duration-500"></div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default OccasionalSpecial;
