import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.tsx';
import { useStore } from './hooks/useStore';
import { LoginScreen } from './components/Auth/LoginScreen';
import { HomeScreen } from './components/Home/HomeScreen';
import { WishlistScreen } from './components/Wishlist/WishlistScreen';
import { CartScreen } from './components/Cart/CartScreen';
import { CheckoutScreen } from './components/Checkout/CheckoutScreen';
import { ProfileScreen } from './components/Profile/ProfileScreen';
import { MessagesScreen } from './components/Messages/MessagesScreen';
import { CreateStoreScreen } from './components/Store/CreateStoreScreen';
import { BottomNavigation } from './components/Layout/BottomNavigation';

function AppContent() {
  const { user } = useAuth();
  const { getCartItemCount } = useStore();
  const [currentPage, setCurrentPage] = useState('home');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCreateStore, setShowCreateStore] = useState(false);
  const [messageCount] = useState(3); // Mock message count

  if (!user) {
    return <LoginScreen />;
  }

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackFromCheckout = () => {
    setShowCheckout(false);
  };

  const handleCreateStore = () => {
    setShowCreateStore(true);
  };

  const handleBackFromCreateStore = () => {
    setShowCreateStore(false);
  };

  const handleStoreCreated = () => {
    setShowCreateStore(false);
    setCurrentPage('home');
  };

  const handleOpenMessages = () => {
    setCurrentPage('messages');
  };

  if (showCheckout) {
    return <CheckoutScreen onBack={handleBackFromCheckout} />;
  }

  if (showCreateStore) {
    return (
      <CreateStoreScreen 
        onBack={handleBackFromCreateStore}
        onStoreCreated={handleStoreCreated}
      />
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomeScreen 
            onOpenMessages={handleOpenMessages}
            onCreateStore={handleCreateStore}
            messageCount={messageCount}
          />
        );
      case 'wishlist':
        return <WishlistScreen />;
      case 'cart':
        return <CartScreen onCheckout={handleCheckout} />;
      case 'messages':
        return <MessagesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-16">
        {renderCurrentPage()}
      </div>
      
      <BottomNavigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        cartItemCount={getCartItemCount()}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;