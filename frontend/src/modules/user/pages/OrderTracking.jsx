import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../../context/ShopContext';
import { 
    ChevronRight, 
    Package, 
    ArrowLeft, 
    RefreshCw, 
    Check, 
    CheckCircle, 
    Clock, 
    MapPin, 
    Truck, 
    Calendar, 
    HelpCircle,
    ShoppingBag,
    Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderTracking = () => {
    const { orderId, view } = useParams();
    const { orders } = useShop();
    const navigate = useNavigate();

    // Normalize IDs for comparison
    const order = orders.find(o => o.id === orderId || o.id === `ORD-${orderId}` || o.id.replace('ORD-', '') === orderId);

    // --- MOCK STATES ---
    const [currentStepIndex, setCurrentStepIndex] = React.useState(() => {
        const savedStep = localStorage.getItem(`tracking_step_${orderId}`);
        return savedStep ? parseInt(savedStep, 10) : 2; // Default to 'Dispatched' for demo
    });

    if (!order) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center bg-[#fdf2f8]">
                <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 shadow-2xl text-center max-w-md">
                    <div className="w-20 h-20 bg-[#8B4356]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-[#8B4356]" />
                    </div>
                    <h2 className="text-3xl font-serif text-black mb-4 tracking-tight">Order Not Found</h2>
                    <p className="text-gray-500 font-serif italic mb-8">We couldn't locate any record for order #{orderId}. Please check the ID and try again.</p>
                    <Link to="/profile/orders" className="inline-block bg-[#8B4356] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#a64e66] transition-all shadow-lg">
                        Back to My Orders
                    </Link>
                </div>
            </div>
        );
    }

    const formatDateTime = (dateTimestamp) => {
        return new Date(dateTimestamp).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    };

    // --- DELIVERY TIMELINE ---
    const deliveryBaseDate = new Date(order.date).getTime();
    const deliverySteps = [
        { status: 'Order Placed', date: formatDateTime(deliveryBaseDate), icon: <ShoppingBag className="w-5 h-5" /> },
        { status: 'Confirmed', date: formatDateTime(deliveryBaseDate + 3600000), icon: <CheckCircle className="w-5 h-5" /> },
        { status: 'Dispatched', date: formatDateTime(deliveryBaseDate + 86400000), icon: <Package className="w-5 h-5" /> },
        { status: 'In Transit', date: formatDateTime(deliveryBaseDate + 172800000), icon: <Truck className="w-5 h-5" /> },
        { status: 'Delivered', date: formatDateTime(deliveryBaseDate + 266400000), icon: <Check className="w-5 h-5" />, isLast: true }
    ];

    const currentStatus = deliverySteps[currentStepIndex];

    return (
        <div className="min-h-screen bg-zinc-50 pb-16 selection:bg-[#3E2723] selection:text-white relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-zinc-100 rounded-full blur-[100px]"></div>
            </div>

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-4 py-3 md:py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button 
                        onClick={() => navigate('/profile/orders')}
                        className="flex items-center gap-2 text-zinc-400 hover:text-black transition-all group font-bold uppercase tracking-[0.3em] text-[9px]"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Return</span>
                    </button>
                    <div className="text-center">
                        <h1 className="text-sm md:text-lg font-serif text-black tracking-widest uppercase">Track Your <span className="italic text-zinc-500">Treasure</span></h1>
                    </div>
                    <div className="w-10 md:w-20"></div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 pt-6 md:pt-10 relative z-10">
                {/* 1. Main Status Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] border border-zinc-100 shadow-sm p-6 md:p-10 mb-8 overflow-hidden relative"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div>
                            <span className="text-zinc-300 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">Leger ID #{order.id.replace('ORD-', '')}</span>
                            <h2 className="text-2xl md:text-4xl font-serif text-black tracking-tight mb-1 italic">
                                {currentStatus.status}
                            </h2>
                            <p className="text-zinc-400 font-serif italic text-xs md:text-sm">Expected arrival: {formatDateTime(deliveryBaseDate + 300000000)}</p>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-black rounded-full flex items-center justify-center text-white shadow-xl relative">
                                <div className="absolute inset-0 bg-black/10 rounded-full animate-ping"></div>
                                {React.cloneElement(currentStatus.icon, { className: "w-6 h-6 md:w-8 md:h-8" })}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8 md:mt-12 relative px-2">
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-0.5 md:h-1 bg-zinc-50 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStepIndex / (deliverySteps.length - 1)) * 100}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-black"
                            ></motion.div>
                        </div>
                        <div className="relative flex justify-between">
                            {deliverySteps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className={`w-2.5 h-2.5 md:w-4 md:h-4 rounded-full border-2 border-white z-10 transition-all duration-500 ${idx <= currentStepIndex ? 'bg-black scale-110 shadow-md' : 'bg-zinc-100'}`}></div>
                                    <span className={`text-[7px] md:text-[9px] font-bold uppercase tracking-widest mt-3 transition-colors duration-500 ${idx <= currentStepIndex ? 'text-black' : 'text-zinc-300'}`}>
                                        {step.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* 2. Detailed Checklist Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2rem] border border-zinc-100 p-6 md:p-8 shadow-sm">
                            <h3 className="text-lg md:text-xl font-serif text-black mb-6 md:mb-8 tracking-tight italic">The Logistics <span className="text-zinc-400 not-italic">Journal</span></h3>
                            <div className="space-y-0 relative">
                                {deliverySteps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6 relative pb-6 last:pb-0">
                                        {idx !== deliverySteps.length - 1 && (
                                            <div className={`absolute left-[9px] top-6 bottom-0 w-0.5 transition-colors duration-500 ${idx < currentStepIndex ? 'bg-black' : 'bg-zinc-50'}`}></div>
                                        )}
                                        <div className={`w-5 h-5 rounded-full border border-white flex items-center justify-center z-10 transition-all duration-500 ${idx <= currentStepIndex ? 'bg-black text-white shadow-sm' : 'bg-zinc-50 text-zinc-300'}`}>
                                            {idx < currentStepIndex ? <Check className="w-3 h-3" strokeWidth={3} /> : (idx === currentStepIndex ? <div className="w-1.5 h-1.5 bg-white rounded-full"></div> : null)}
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-serif italic mb-0.5 transition-colors duration-500 ${idx <= currentStepIndex ? 'text-black' : 'text-zinc-300'}`}>{step.status}</h4>
                                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{step.date}</p>
                                            {idx === 2 && currentStepIndex >= 2 && (
                                                <div className="mt-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-[10px] text-zinc-500 font-serif italic">
                                                    Registry updated: Package handed to logistics. Tracking: <strong>AWB900823</strong>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Items Section */}
                        <div className="bg-white rounded-[2rem] border border-zinc-100 p-6 md:p-8 shadow-sm">
                            <h3 className="text-lg md:text-xl font-serif text-black mb-6 md:mb-8 tracking-tight italic">Order <span className="text-zinc-400 not-italic">Manifest</span></h3>
                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-16 h-16 bg-zinc-50 rounded-xl overflow-hidden border border-zinc-100 p-1 flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover rounded-lg" alt={item.name} />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-serif text-black italic line-clamp-1">{item.name}</h4>
                                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Qty: {item.quantity || 1}</p>
                                            <p className="text-xs font-bold text-black mt-1">₹{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-5 border-t border-zinc-50 flex justify-between items-center">
                                <span className="font-serif italic text-zinc-400 text-sm">Consignment Total</span>
                                <span className="text-xl font-serif text-black">₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Support & Details Sidebar */}
                    <div className="space-y-6">
                        {/* Delivery Address */}
                        <div className="bg-black text-white p-6 md:p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                            <div className="relative z-10">
                                <MapPin className="w-6 h-6 text-zinc-500 mb-4" />
                                <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] mb-3 text-zinc-500">Destination Point</h4>
                                <p className="text-xs md:text-sm font-serif italic text-zinc-300 leading-relaxed">
                                    {order.shippingAddress.flatNo}, {order.shippingAddress.area}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                                    {order.shippingAddress.pincode}
                                </p>
                            </div>
                        </div>

                        {/* Contact Support Card */}
                        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm text-center">
                            <h4 className="text-base font-serif italic text-black mb-2 antialiased">Concierge Support</h4>
                            <p className="text-[10px] text-zinc-400 font-serif leading-relaxed mb-6">Available for your shipment queries.</p>
                            <div className="space-y-3">
                                <a href="tel:+919008381564" className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-zinc-100 text-black font-bold text-[9px] uppercase tracking-widest hover:bg-zinc-50 transition-all">
                                    <Phone className="w-3 h-3 text-zinc-400" />
                                    Direct Line
                                </a>
                                <Link to="/help" className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-black text-white font-bold text-[9px] uppercase tracking-widest hover:bg-zinc-900 transition-all">
                                    <HelpCircle className="w-3 h-3" />
                                    Help Registry
                                </Link>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div className="p-4 text-center">
                            <Calendar className="w-4 h-4 text-zinc-200 mx-auto mb-2" />
                            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-loose">
                                Scheduled Registry Window<br />
                                <span className="text-black font-serif italic">{formatDateTime(deliveryBaseDate + 259200000)} — {formatDateTime(deliveryBaseDate + 432000000)}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
