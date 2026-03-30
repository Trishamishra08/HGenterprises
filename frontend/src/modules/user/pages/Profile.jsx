import React, { useState, useEffect } from 'react';
import { useShop } from '../../../context/ShopContext';
import { 
    User, 
    Package, 
    LogOut, 
    ShoppingBag, 
    ChevronRight, 
    ArrowLeft, 
    Edit2, 
    Check, 
    MapPin, 
    Plus, 
    Trash2, 
    Heart, 
    HelpCircle, 
    CreditCard, 
    Banknote, 
    ShieldCheck, 
    Bell, 
    BellOff, 
    FileText, 
    Shield, 
    AlertTriangle, 
    Mail, 
    Smartphone, 
    X, 
    RefreshCw,
    ShieldAlert,
    Wallet
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ReturnActionModal = ({ isOpen, onClose, type, order, onSuccess }) => {
    const { showNotification } = useShop();
    const [selectedItems, setSelectedItems] = useState([]);
    const [reason, setReason] = useState('');
    const [resolution, setResolution] = useState(type === 'return' ? 'refund' : 'exchange');
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    const handleToggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItems.length === 0) {
            alert("Please select at least one item to " + type);
            return;
        }

        const requestData = {
            type,
            items: order.items.filter(i => selectedItems.includes(i.id)),
            reason,
            resolution,
            date: new Date().toISOString(),
            status: 'requested'
        };

        showNotification(`${type === 'return' ? 'Return' : 'Exchange'} request initiated.`);
        onSuccess(requestData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                onClick={onClose}
            ></motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white relative z-10 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-serif text-black capitalize">Request {type}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Order #{order.id.replace('ORD-', '')}</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-gray-50 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto max-h-[70vh] space-y-8">
                    <div>
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">1. Select Items</h4>
                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} onClick={() => handleToggleItem(item.id)} className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${selectedItems.includes(item.id) ? 'border-black bg-gray-50' : 'border-gray-100 hover:bg-gray-50'}`}>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selectedItems.includes(item.id) ? 'bg-black border-black' : 'border-gray-300'}`}>
                                        {selectedItems.includes(item.id) && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-serif italic text-black truncate">{item.name}</p>
                                        <p className="text-xs font-bold text-gray-400">₹{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">2. Reason for {type}</h4>
                        <select
                            className="w-full p-4 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black bg-white font-serif italic"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        >
                            <option value="">Select a reason...</option>
                            <option>Size doesn't fit</option>
                            <option>Product damaged</option>
                            <option>Incorrect item received</option>
                            <option>Quality not as expected</option>
                            <option>Changed my mind</option>
                        </select>
                    </div>
                </div>

                <div className="p-8 bg-gray-50 border-t border-gray-100">
                    <button
                        onClick={handleSubmit}
                        disabled={selectedItems.length === 0 || !reason}
                        className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest shadow-xl disabled:opacity-30 hover:bg-[#8B4356] transition-all text-sm"
                    >
                        Confirm {type} Request
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const OrderCard = ({ order, isExpanded, onToggle }) => {
    const navigate = useNavigate();
    const [localShow, setLocalShow] = useState(false);
    const [isActionModalOpen, setActionModalOpen] = useState(false);
    const [actionType, setActionType] = useState('return');

    const [returnRequest, setReturnRequest] = useState(() => {
        const saved = localStorage.getItem(`return_request_${order.id}`);
        return saved ? JSON.parse(saved) : null;
    });

    const showDetails = isExpanded !== undefined ? isExpanded : localShow;
    const setShowDetails = onToggle || setLocalShow;

    const subtotal = order.items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    const shipping = order.total - subtotal;

    const openAction = (type) => {
        setActionType(type);
        setActionModalOpen(true);
    };

    const handleActionSuccess = (data) => {
        setReturnRequest(data);
        localStorage.setItem(`return_request_${order.id}`, JSON.stringify(data));
    };

    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6">
            <AnimatePresence>
                {isActionModalOpen && (
                    <ReturnActionModal 
                        isOpen={isActionModalOpen} 
                        onClose={() => setActionModalOpen(false)} 
                        type={actionType} 
                        order={order} 
                        onSuccess={handleActionSuccess} 
                    />
                )}
            </AnimatePresence>

            {/* Order Header - More Compact */}
            <div className="p-4 md:p-6 bg-gray-50/70 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
                <div className="flex gap-5 md:gap-8">
                    <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Placed On</span>
                        <p className="text-xs font-serif italic text-black">{new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Order Reference</span>
                        <p className="text-xs font-bold text-black">#{order.id.replace('ORD-', '')}</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[9px] font-bold text-[#8B4356] uppercase tracking-widest block mb-0.5">Grand Total</span>
                    <p className="text-base font-serif italic text-black">₹{order.total.toLocaleString()}</p>
                </div>
            </div>

            {/* Order Content - Compacted */}
            <div className="p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                            {order.items.slice(0, 3).map((item, idx) => (
                                <img key={idx} src={item.image} className="w-16 h-16 rounded-2xl border-4 border-white object-cover shadow-sm bg-white" alt="" />
                            ))}
                            {order.items.length > 3 && (
                                <div className="w-16 h-16 rounded-2xl border-4 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm">
                                    +{order.items.length - 3}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-serif italic text-black">{order.items.length} Package Contained</p>
                            <button onClick={() => setShowDetails(!showDetails)} className="text-[10px] font-bold text-[#8B4356] uppercase tracking-[0.2em] mt-1 hover:underline underline-offset-4">
                                {showDetails ? 'Hide Manifesto' : 'View Manifesto'}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-1.5 w-full md:w-auto">
                        {!returnRequest ? (
                            <>
                                <button onClick={() => openAction('return')} className="flex-1 md:flex-none px-3 md:px-6 py-2.5 rounded-full border border-gray-200 text-[9px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-widest hover:bg-black hover:text-white transition-all">Return</button>
                                <button onClick={() => openAction('exchange')} className="flex-1 md:flex-none px-3 md:px-6 py-2.5 rounded-full border border-gray-200 text-[9px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-widest hover:bg-black hover:text-white transition-all">Exchange</button>
                                <button onClick={() => navigate(`/order-tracking/${order.id}`)} className="flex-1 md:flex-none px-3 md:px-6 py-2.5 rounded-full bg-black text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-widest hover:bg-[#8B4356] transition-all shadow-lg shadow-black/10">Track Journey</button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100">
                                <RefreshCw className="w-4 h-4 text-[#8B4356] animate-spin" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4356]">{returnRequest.type} Pending</span>
                                <Link to={`/order-tracking/${order.id}/return`} className="text-[10px] font-bold uppercase tracking-widest text-black underline underline-offset-4 ml-2">Detail</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {showDetails && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-8 pt-8 border-t border-gray-100 overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Items Breakdown</h5>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <img src={item.image} className="w-12 h-12 rounded-xl object-cover grayscale-[0.2]" alt="" />
                                            <div>
                                                <p className="text-xs font-serif italic text-black">{item.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Qty: {item.quantity} • ₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2 text-sm bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">Financial Ledger</h5>
                                    <div className="flex justify-between font-serif italic text-gray-600"><span>Consignment Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                                    <div className="flex justify-between font-serif italic text-gray-600"><span>Conveyance Fees</span><span>{shipping === 0 ? 'Complimentary' : `₹${shipping}`}</span></div>
                                    <div className="flex justify-between font-bold text-black pt-2 border-t border-gray-100 text-base"><span>Final Remittance</span><span>₹{order.total.toLocaleString()}</span></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const Profile = () => {
    const { user, login, logout, orders, wishlist, addresses, addAddress, removeAddress, setDefaultAddress, defaultAddressId, toggleNotificationSettings, notificationsEnabled } = useShop();
    const { activeTab: tabParam, subId } = useParams();
    const activeTab = tabParam || 'profile';
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(subId === 'edit');
    const [formData, setFormData] = useState({
        firstName: user?.name ? user.name.split(' ')[0] : '',
        lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    const contentRef = React.useRef(null);
    useEffect(() => {
        setIsEditing(subId === 'edit');
        if (window.innerWidth < 1024 && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [subId, activeTab]);

    if (!user) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-[#f9fafb]">
                <div className="text-center max-w-sm">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-10 h-10 text-gray-300" />
                    </div>
                    <h2 className="text-3xl font-serif italic text-black mb-4">Identity Verification Required</h2>
                    <p className="text-gray-500 text-sm font-serif mb-8">Please authenticate your account to view your curated collection and account manifests.</p>
                    <Link to="/login" className="inline-block w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#8B4356] transition-all shadow-xl">
                        Proceed to Login
                    </Link>
                </div>
            </div>
        );
    }

    const handleLogout = () => { logout(); navigate('/'); };
    const handleSave = () => {
        const updatedUser = { ...user, name: `${formData.firstName} ${formData.lastName}`.trim(), email: formData.email, phone: formData.phone };
        login(updatedUser);
        navigate('/profile/profile');
    };

    const sidebarItems = [
        { id: 'profile', label: 'Identity Manifest', icon: <User className="w-4 h-4" />, path: '/profile/profile' },
        { id: 'orders', label: 'Order Archive', icon: <Package className="w-4 h-4" />, path: '/profile/orders', count: orders.length },
        { id: 'addresses', label: 'Atlas Of Address', icon: <MapPin className="w-4 h-4" />, path: '/profile/addresses', count: addresses.length },
        { id: 'wishlist', label: 'Curated Desires', icon: <Heart className="w-4 h-4" />, path: '/wishlist', count: wishlist.length, color: 'text-red-500' },
        { id: 'payments', label: 'Vault & Ledger', icon: <CreditCard className="w-4 h-4" />, path: '/profile/payments' },
    ];

    const legalItems = [
        { label: 'Help Concierge', icon: <HelpCircle className="w-4 h-4" />, path: '/help' },
        { label: 'Return Policy', icon: <FileText className="w-4 h-4" />, path: '/returns' },
        { label: 'Privacy Sanctum', icon: <Shield className="w-4 h-4" />, path: '/privacy' },
    ];

    return (
        <div className="min-h-screen bg-[#f9fafb] selection:bg-[#8B4356] selection:text-white pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
                {/* Header Section - Ultra Compact */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-black transition-all group font-bold uppercase tracking-[0.3em] text-[9px] mb-2">
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            Exit Sanctum
                        </button>
                        <h1 className="text-4xl md:text-5xl font-serif text-black leading-tight">My <span className="italic text-[#8B4356]">Sanctuary</span></h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* 1. Sophisticated Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-28 space-y-6">
                            {/* User Branding */}
                            <div className="flex items-center gap-4 px-2">
                                <div className="w-14 h-14 bg-white rounded-full border border-gray-100 shadow-xl flex items-center justify-center relative overflow-hidden group">
                                    <User className="w-7 h-7 text-black group-hover:scale-110 transition-transform" />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-serif italic text-black truncate">{user.name}</h3>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Patron Since 2024</p>
                                </div>
                            </div>

                            {/* Nav Groups */}
                            <div className="space-y-8">
                                <div>
                                    <p className="px-5 text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em] mb-4">Core Manifests</p>
                                    <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2 px-1 lg:px-0">
                                        {sidebarItems.map((item) => (
                                            <button 
                                                key={item.id}
                                                onClick={() => navigate(item.path)}
                                                className={`flex flex-col lg:flex-row items-center lg:items-center gap-2.5 lg:gap-4 p-4 lg:px-5 lg:py-3 rounded-2xl lg:rounded-full transition-all group relative ${activeTab === item.id ? 'bg-black text-white shadow-xl shadow-black/20 z-10' : 'bg-[#FDF5F6]/40 border border-transparent text-gray-500 hover:bg-white hover:shadow-md hover:text-black hover:border-gray-200'}`}
                                            >
                                                <div className={`${activeTab === item.id ? 'text-[#8B4356]' : item.color || 'text-gray-400'} group-hover:scale-110 transition-transform mb-0.5 lg:mb-0`}>{item.icon}</div>
                                                <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest flex-1 text-center lg:text-left">{item.label}</span>
                                                {item.count !== undefined && (
                                                    <span className={`text-[8.5px] lg:text-[10px] font-bold px-2 py-0.5 rounded-full lg:static absolute top-3 right-3 ${activeTab === item.id ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-400'}`}>{item.count}</span>
                                                )}
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                <div>
                                    <p className="px-5 text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em] mb-4">Registry Privacy</p>
                                    <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2 px-1 lg:px-0">
                                        {legalItems.map((item) => (
                                            <button 
                                                key={item.label}
                                                onClick={() => navigate(item.path)}
                                                className="flex flex-col lg:flex-row items-center gap-2.5 lg:gap-4 p-4 lg:px-5 lg:py-3 bg-[#FDF5F6]/40 border border-transparent rounded-2xl lg:rounded-full text-gray-500 hover:bg-white hover:shadow-md hover:text-black hover:border-gray-200 transition-all group"
                                            >
                                                <div className="text-gray-300 group-hover:text-black transition-colors mb-0.5 lg:mb-0">{item.icon}</div>
                                                <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-center lg:text-left">{item.label}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-2 rounded-full text-zinc-400 hover:text-red-500 transition-colors group">
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Surrender Session</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Content Sanctuary - Compact */}
                    <div ref={contentRef} className="lg:col-span-3 min-h-[60vh] pt-4 lg:pt-0">
                        <AnimatePresence mode="wait">
                            {activeTab === 'profile' && (
                                <motion.div 
                                    key="profile"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-14 border border-gray-100 shadow-sm relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6 md:mb-12">
                                                <div>
                                                    <h2 className="text-xl md:text-3xl font-serif text-black">Personal Ledger</h2>
                                                    <p className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] mt-2 md:mt-3">Verified Patron Information</p>
                                                </div>
                                                <button 
                                                    onClick={() => isEditing ? handleSave() : navigate('/profile/profile/edit')}
                                                    className={`p-3 md:p-4 rounded-full transition-all ${isEditing ? 'bg-black text-white shadow-xl' : 'bg-zinc-50 text-zinc-400 hover:bg-black hover:text-white'}`}
                                                >
                                                    {isEditing ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Edit2 className="w-4 h-4 md:w-5 md:h-5" />}
                                                </button>
                                            </div>

                                            {isEditing ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em] px-1">First Name</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.firstName} 
                                                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                                            className="w-full bg-gray-50/50 border-b-2 border-transparent focus:border-black focus:bg-white text-base font-serif italic p-4 transition-all outline-none rounded-t-2xl" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em] px-1">Last Name</label>
                                                        <input 
                                                            type="text" 
                                                            value={formData.lastName} 
                                                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                            className="w-full bg-gray-50/50 border-b-2 border-transparent focus:border-black focus:bg-white text-base font-serif italic p-4 transition-all outline-none rounded-t-2xl" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em] px-1">Electronic Mail</label>
                                                        <input 
                                                            type="email" 
                                                            value={formData.email} 
                                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full bg-gray-50/50 border-b-2 border-transparent focus:border-black focus:bg-white text-base font-serif italic p-4 transition-all outline-none rounded-t-2xl" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em] px-1">Tele-Contact</label>
                                                        <input 
                                                            type="tel" 
                                                            value={formData.phone} 
                                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full bg-gray-50/50 border-b-2 border-transparent focus:border-black focus:bg-white text-base font-serif italic p-4 transition-all outline-none rounded-t-2xl" 
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-12">
                                                    <div className="px-1 md:px-2">
                                                        <span className="text-[8px] md:text-[9px] font-bold text-zinc-300 uppercase tracking-[0.3em] block mb-1 md:mb-2">Legal Identity</span>
                                                        <p className="text-base md:text-xl font-sans font-medium text-black">{user.name}</p>
                                                    </div>
                                                    <div className="px-1 md:px-2">
                                                        <span className="text-[8px] md:text-[9px] font-bold text-zinc-300 uppercase tracking-[0.3em] block mb-1 md:mb-2">Electronic Reach</span>
                                                        <p className="text-base md:text-xl font-sans font-semibold text-black">{user.email || 'Registry Pending'}</p>
                                                    </div>
                                                    <div className="px-1 md:px-2">
                                                        <span className="text-[8px] md:text-[9px] font-bold text-zinc-300 uppercase tracking-[0.3em] block mb-1 md:mb-2 text-wrap">Secretariat Phone</span>
                                                        <p className="text-base md:text-xl font-sans font-semibold text-black tracking-wider">+91 {user.phone}</p>
                                                    </div>
                                                    <div className="px-1 md:px-2">
                                                        <span className="text-[8px] md:text-[9px] font-bold text-zinc-300 uppercase tracking-[0.3em] block mb-1 md:mb-2">Security Status</span>
                                                        <div className="flex items-center gap-2 text-green-600 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">
                                                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></div>
                                                            Active Session Verified
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B4356]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                                    </div>

                                    {/* Security & Preferences Sidebar Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                            <Bell className="w-6 h-6 text-amber-500 mb-6" />
                                            <h3 className="text-xl font-serif text-black mb-2 italic">Communications</h3>
                                            <p className="text-gray-400 text-xs font-serif leading-relaxed mb-8">Receive early invites to seasonal exhibitions and new collection manifests.</p>
                                            <button 
                                                onClick={toggleNotificationSettings}
                                                className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all border ${notificationsEnabled ? 'bg-black text-white border-black' : 'bg-transparent text-gray-400 border-gray-100 hover:border-black hover:text-black'}`}
                                            >
                                                {notificationsEnabled ? 'Enabled' : 'Disabled'}
                                            </button>
                                        </div>
                                        <div className="bg-[#0a0a0a] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                            <ShieldAlert className="w-6 h-6 text-[#8B4356] mb-6" />
                                            <h3 className="text-xl font-serif text-white mb-2 italic">Patron Vault</h3>
                                            <p className="text-zinc-500 text-xs font-serif leading-relaxed mb-8">Your data is secured with AES-256 luxury encryption within our private vault.</p>
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-[#8B4356] hover:text-white transition-colors">Manifest History</button>
                                            <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-[#8B4356]/10 rounded-full blur-[50px]"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'orders' && (
                                <motion.div 
                                    key="orders"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="mb-10">
                                        <h2 className="text-3xl font-serif text-black italic">Order Archive</h2>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mt-3">A chronological record of your acquisitions</p>
                                    </div>
                                    {orders.length === 0 ? (
                                        <div className="bg-white p-20 rounded-[3rem] text-center border border-gray-100">
                                            <ShoppingBag className="w-16 h-16 text-gray-100 mx-auto mb-6" />
                                            <p className="text-gray-400 font-serif italic mb-8">Your archive is currently empty of treasures.</p>
                                            <Link to="/shop" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#8B4356] shadow-xl">Start Exploration</Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-0">
                                            {orders.map(order => <OrderCard key={order.id} order={order} isExpanded={subId === order.id} />)}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'addresses' && (
                                <motion.div 
                                    key="addresses"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h2 className="text-xl md:text-2xl font-serif text-black uppercase tracking-widest">Atlas of Address</h2>
                                            <p className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em] mt-2">Registered delivery destinations</p>
                                        </div>
                                        <button onClick={() => navigate('/profile/addresses/add')} className="p-3 md:p-4 bg-black text-white rounded-full shadow-xl hover:bg-zinc-800 transition-all">
                                            <Plus className="w-5 h-5 md:w-6 md:h-6" />
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                        {addresses.map((addr) => (
                                            <div key={addr.id} className="bg-[#FDF5F6]/40 p-5 md:p-6 rounded-3xl border border-transparent shadow-sm relative group hover:border-[#8B4356]/20 transition-all">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="p-2 bg-white rounded-xl text-black group-hover:bg-black group-hover:text-white transition-colors border border-zinc-50 shadow-sm">
                                                        <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => removeAddress(addr.id)} className="p-1 px-2 text-[9px] font-bold uppercase tracking-widest text-zinc-300 hover:text-red-500 transition-colors">Del</button>
                                                    </div>
                                                </div>
                                                <h4 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-2">{addr.type} Delivery</h4>
                                                <p className="text-[11.5px] md:text-[13px] font-sans font-medium text-zinc-500 leading-relaxed">
                                                    {addr.flatNo}, {addr.area}<br />
                                                    {addr.city}, {addr.state}<br />
                                                    {addr.pincode}
                                                </p>
                                                {addr.isDefault && (
                                                    <span className="absolute top-5 right-5 md:top-6 md:right-6 text-[7px] md:text-[8px] font-bold uppercase tracking-[0.3em] text-black bg-white border border-zinc-100 px-3 py-1 rounded-full shadow-sm">Primary</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'payments' && (
                                <motion.div 
                                    key="payments"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="mb-6 md:mb-8">
                                        <h2 className="text-xl md:text-2xl font-serif text-black uppercase tracking-widest">Vault & Ledger</h2>
                                        <p className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-[0.4em] mt-2">Managed financial protocols</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-zinc-100 shadow-sm group hover:border-black transition-all flex flex-col justify-between min-h-[180px] md:min-h-[220px]">
                                            <div>
                                                <div className="flex items-center gap-3 mb-4 md:mb-6">
                                                    <div className="p-2.5 bg-zinc-50 rounded-xl text-black group-hover:bg-black group-hover:text-white transition-all">
                                                        <Wallet className="w-4 h-4 md:w-5 md:h-5" />
                                                    </div>
                                                    <h3 className="text-sm md:text-lg font-serif italic text-black">HG Wallet</h3>
                                                </div>
                                                <p className="text-zinc-400 text-[10px] md:text-xs font-serif italic leading-relaxed mb-6 md:mb-8">Stored credit for instantaneous acquisitions and returns.</p>
                                            </div>
                                            <div className="text-xl md:text-2xl font-serif text-black">₹0.00</div>
                                        </div>
                                        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-zinc-100 shadow-sm group hover:border-black transition-all flex flex-col justify-between min-h-[180px] md:min-h-[220px]">
                                            <div>
                                                <div className="flex items-center gap-3 mb-4 md:mb-6">
                                                    <div className="p-2.5 bg-zinc-50 rounded-xl text-black group-hover:bg-black group-hover:text-white transition-all">
                                                        <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                                                    </div>
                                                    <h3 className="text-sm md:text-lg font-serif italic text-black">Vaulted Cards</h3>
                                                </div>
                                                <p className="text-zinc-400 text-[10px] md:text-xs font-serif italic leading-relaxed mb-6 md:mb-8">Securely stored card manifests for expedited checkout.</p>
                                            </div>
                                            <button className="w-fit text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-black border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all">Add Manifest</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
