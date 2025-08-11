import { useState, useEffect } from 'react';
import { Product, Store, CartItem, Coupon } from '../types';

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Verde',
    description: 'Camiseta de algodón premium',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=400',
    storeId: '1',
    category: 'Ropa',
    isActive: true,
    stock: 15
  },
  {
    id: '2',
    name: 'Reloj Negro',
    description: 'Reloj deportivo resistente al agua',
    price: 8.99,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
    storeId: '1',
    category: 'Accesorios',
    isActive: true,
    stock: 8
  },
  {
    id: '3',
    name: 'Pantalón Azul',
    description: 'Pantalón casual cómodo',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    storeId: '2',
    category: 'Ropa',
    isActive: true,
    stock: 12
  }
];

const mockStores: Store[] = [
  {
    id: '1',
    name: 'Tienda Central',
    description: 'Tu tienda de confianza en el barrio',
    images: ['https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400'],
    address: 'Av. Principal 123',
    ownerId: '2',
    coordinates: [-17.3895, -66.1568],
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Minimarket San José',
    description: 'Productos frescos y variados',
    images: ['https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=400'],
    address: 'Calle Comercio 456',
    ownerId: '3',
    coordinates: [-17.3935, -66.1578],
    isActive: true,
    createdAt: new Date()
  }
];

export const useStore = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist functions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getWishlistProducts = () => {
    return products.filter(product => wishlist.includes(product.id));
  };

  // Store functions
  const createStore = async (storeData: Omit<Store, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStore: Store = {
      ...storeData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setStores(prev => [...prev, newStore]);
    setIsLoading(false);
    return newStore;
  };

  // Product functions
  const createProduct = async (productData: Omit<Product, 'id'>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    
    setProducts(prev => [...prev, newProduct]);
    setIsLoading(false);
    return newProduct;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    products,
    stores,
    cart,
    wishlist,
    isLoading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleWishlist,
    getWishlistProducts,
    createStore,
    createProduct,
    getCartTotal,
    getCartItemCount
  };
};