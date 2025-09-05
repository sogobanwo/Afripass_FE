import React, { useState } from 'react';
import { ChevronRight, Wallet, Globe, Heart, Award } from 'lucide-react';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';

interface OnboardingScreenProps {
  onComplete: () => void;
  onWalletConnect: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onWalletConnect }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to AfriPass',
      subtitle: 'Build communities, earn rewards, empower creators',
      description: 'Join African creator communities, complete tasks for rewards, and showcase your talents with ENS-powered profiles.',
      icon: Heart,
      action: 'Get Started',
    },
    {
      title: 'Connect Your Wallet',
      subtitle: 'Secure and simple with Base Account',
      description: 'No seed phrases needed. Get started with one click using Base Account for the smoothest Web3 experience.',
      icon: Wallet,
      action: 'Connect Wallet',
    },
    {
      title: 'Create Your Identity',
      subtitle: 'Find your creative tribe',
      description: 'Discover communities like accracreators.eth or lagosartists.eth, mint your AfriPass NFT, and start earning rewards.',
      icon: Globe,
      action: 'Claim ENS Name',
    },
    {
      title: 'Earn Your AfriPass',
      subtitle: 'Showcase your work',
      description: 'Submit proof of your creative work, farming activities, or community contributions to earn rewards from community purses.',
      icon: Award,
      action: 'Start Earning',
    },
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleWalletConnect = () => {
    onWalletConnect();
    handleNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-teal-50 flex flex-col justify-center px-4">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E2714E' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 15l15-15v30l-15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-md mx-auto w-full relative z-10">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-orange-500' : 'bg-orange-200'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Icon size={32} className="text-white" />
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h1>
          <h2 className="text-lg text-orange-600 font-semibold mb-4">
            {currentStepData.subtitle}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            {currentStepData.description}
          </p>

          {/* Action Button */}
          <Button
            variant="primary"
            size="large"
            onClick={currentStep === 1 ? handleWalletConnect : handleNext}
            className="w-full group"
          >
            {currentStepData.action}
            <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Skip Option */}
          {currentStep > 0 && (
            <button
              onClick={onComplete}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Skip for now
            </button>
          )}
        </Card>

        {/* Cultural Accent */}
        <div className="flex justify-center mt-8">
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;