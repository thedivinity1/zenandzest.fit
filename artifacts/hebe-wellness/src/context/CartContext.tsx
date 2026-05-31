import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  gradient: string;
  icon: string;
  desc: string;
  features: string[];
  size: string;
  certifications: string[];
}

export const productsList: Product[] = [
  {
    name: 'Botanical Sleep Drops',
    category: 'Sleep',
    price: 2999,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 1247,
    badge: 'Bestseller',
    badgeColor: '#c9a84c',
    gradient: 'linear-gradient(135deg, #1a3d2e 0%, #0a2018 60%, #1a3d2e 100%)',
    icon: '🌙',
    desc: 'Deep, restorative sleep with Ashwagandha, Vijaya botanical complex & Brahmi. Non-habit forming.',
    features: ['Vijaya Botanical Complex', 'KSM-66 Ashwagandha', 'Brahmi Extract', 'Melatonin-free'],
    size: '30ml Tincture',
    certifications: ['FSSAI', 'GMP', 'Lab Tested'],
  },
  {
    name: 'Adaptogenic Stress Relief',
    category: 'Stress',
    price: 3499,
    originalPrice: 4499,
    rating: 4.8,
    reviews: 893,
    badge: 'Top Rated',
    badgeColor: '#7c3aed',
    gradient: 'linear-gradient(135deg, #2d1f4e 0%, #1a1030 60%, #2d1f4e 100%)',
    icon: '⚡',
    desc: 'HPA axis support with Ashwagandha, Rhodiola & Shatavari. Clinically proven cortisol reduction.',
    features: ['Rhodiola Rosea', 'Ashwagandha Root', 'Shatavari', 'Holy Basil (Tulsi)'],
    size: '60 Capsules',
    certifications: ['FSSAI', 'GMP', 'Doctor Approved'],
  },
  {
    name: 'Hair Vitality Elixir',
    category: 'Hair',
    price: 2499,
    originalPrice: 3299,
    rating: 4.9,
    reviews: 2134,
    badge: 'New Formula',
    badgeColor: '#059669',
    gradient: 'linear-gradient(135deg, #1f3a4e 0%, #0f2030 60%, #1f3a4e 100%)',
    icon: '✨',
    desc: 'Bhringraj, Rosemary & DHT-blocking botanicals that clinically match Minoxidil in hair regrowth studies.',
    features: ['Bhringraj Extract', 'Rosemary Essential Oil', 'Biotin 5000mcg', 'Iron Bisglycinate'],
    size: '60ml Serum',
    certifications: ['FSSAI', 'Dermatologist Tested', 'GMP'],
  },
  {
    name: 'Skin Radiance Oil',
    category: 'Skin',
    price: 2999,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 678,
    badge: 'Award Winning',
    badgeColor: '#d97706',
    gradient: 'linear-gradient(135deg, #4e2d1f 0%, #2e1a0f 60%, #4e2d1f 100%)',
    icon: '🌸',
    desc: 'Pure Kashmiri saffron, turmeric & rare seed oils for luminous, ageless skin. Luxury botanical skincare.',
    features: ['Kashmiri Saffron', 'Nano-Turmeric', 'Rosehip Seed Oil', 'Sea Buckthorn'],
    size: '30ml Face Oil',
    certifications: ['FSSAI', 'Cruelty-Free', 'Vegan'],
  },
  {
    name: 'Gut Balance Botanical',
    category: 'Gut',
    price: 1999,
    originalPrice: 2699,
    rating: 4.8,
    reviews: 1089,
    badge: 'Clinically Tested',
    badgeColor: '#1a3d2e',
    gradient: 'linear-gradient(135deg, #2d4e1f 0%, #1a2e0f 60%, #2d4e1f 100%)',
    icon: '🌿',
    desc: 'Triphala, Berberine & targeted prebiotics for microbiome diversity and gut-brain axis balance.',
    features: ['Triphala Complex', 'Berberine HCl', 'Prebiotic Fiber', 'Digestive Enzymes'],
    size: '60 Capsules',
    certifications: ['FSSAI', 'GMP', 'Clinically Studied'],
  },
  {
    name: 'Cognitive Performance Stack',
    category: 'Stress',
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 421,
    badge: 'Premium',
    badgeColor: '#c9a84c',
    gradient: "linear-gradient(135deg, #1a3040 0%, #0a1520 60%, #1a3040 100%)",
    icon: '🧠',
    desc: "Lion's Mane, Brahmi & Saffron synergy for peak mental performance, memory, and cognitive longevity.",
    features: ["Lion's Mane Mushroom", 'Bacopa Monnieri', 'Saffron Extract', 'Phosphatidylserine'],
    size: '60 Capsules',
    certifications: ['FSSAI', 'GMP', 'Nootropic Grade'],
  },
];

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (name: string, quantity?: number) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  discountCode: string;
  discountPercentage: number;
  applyDiscountCode: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Sync cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ojas_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
  }, []);

  // Save cart to LocalStorage when changed
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('ojas_cart', JSON.stringify(items));
  };

  const addToCart = (name: string, quantity: number = 1) => {
    const product = productsList.find(p => p.name === name);
    if (!product) return;

    const existingIndex = cartItems.findIndex(item => item.product.name === name);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { product, quantity }]);
    }
  };

  const removeFromCart = (name: string) => {
    const updated = cartItems.filter(item => item.product.name !== name);
    saveCart(updated);
  };

  const updateQuantity = (name: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(name);
      return;
    }
    const updated = cartItems.map(item => 
      item.product.name === name ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setDiscountCode('');
    setDiscountPercentage(0);
  };

  const applyDiscountCode = (code: string): boolean => {
    const formattedCode = code.toUpperCase().trim();
    if (formattedCode === 'OJAS15' || formattedCode === 'QUIZ15') {
      setDiscountCode(formattedCode);
      setDiscountPercentage(15);
      return true;
    }
    if (formattedCode === 'LONGEVITY25') {
      setDiscountCode(formattedCode);
      setDiscountPercentage(25);
      return true;
    }
    return false;
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const rawTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartTotal = rawTotal * (1 - discountPercentage / 100);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      discountCode,
      discountPercentage,
      applyDiscountCode,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
