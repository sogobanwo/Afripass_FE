import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import Navigation from './components/Navigation/Navigation';
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import CommunityDiscoveryScreen from './screens/CommunityDiscoveryScreen/CommunityDiscoveryScreen';
import CommunityHubScreen from './screens/CommunityHubScreen/CommunityHubScreen';
import CreateCommunityScreen from './screens/CreateCommunityScreen/CreateCommunityScreen';
import TaskManagementScreen from './screens/TaskManagementScreen/TaskManagementScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('afripass_onboarding_complete');
    const walletConnected = localStorage.getItem('afripass_wallet_connected');
    
    setHasCompletedOnboarding(!!onboardingComplete);
    setIsWalletConnected(!!walletConnected);
  }, []);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
    localStorage.setItem('afripass_wallet_connected', 'true');
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('afripass_onboarding_complete', 'true');
  };

  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
          {!hasCompletedOnboarding ? (
            <OnboardingScreen 
              onComplete={handleOnboardingComplete}
              onWalletConnect={handleWalletConnect}
            />
          ) : (
            <>
              <Navigation />
              <main className="pb-20 pt-4">
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/communities" element={<CommunityDiscoveryScreen />} />
                  <Route path="/community/:ensName" element={<CommunityHubScreen />} />
                  <Route path="/create-community" element={<CreateCommunityScreen />} />
                  <Route path="/tasks" element={<TaskManagementScreen />} />
                  <Route path="/dashboard" element={<DashboardScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </>
          )}
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;