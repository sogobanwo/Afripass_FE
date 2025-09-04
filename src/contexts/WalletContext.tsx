import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  ensName: string;
  address: string;
  avatar?: string;
  role?: string;
  location?: string;
  hasAfriPass?: boolean;
}

interface WalletContextType {
  isConnected: boolean;
  user: User | null;
  balance: string;
  connectWallet: () => void;
  disconnect: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState('0.00');

  const connectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true);
    setUser({
      ensName: 'kofi.eth',
      address: '0x1234...5678',
      avatar: '/api/placeholder/64/64',
      role: 'Community Member',
      location: 'Accra, Ghana',
      hasAfriPass: false
    });
    setBalance('0.125');
  };

  const disconnect = () => {
    setIsConnected(false);
    setUser(null);
    setBalance('0.00');
    localStorage.removeItem('afripass_wallet_connected');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected, 
        user, 
        balance, 
        connectWallet, 
        disconnect, 
        updateUser 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};