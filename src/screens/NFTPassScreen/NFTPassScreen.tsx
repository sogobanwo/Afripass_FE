import React, { useState } from 'react';
import { Award, Upload, Check, Clock, Star, Camera } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const NFTPassScreen: React.FC = () => {
  const { user, updateUser } = useWallet();
  const [activeTab, setActiveTab] = useState<'status' | 'verify'>('status');
  const [uploadedProof, setUploadedProof] = useState<File | null>(null);

  const verificationTasks = [
    {
      id: 1,
      title: 'Profile Verification',
      description: 'Complete your ENS profile with role and location',
      status: 'completed',
      points: 25
    },
    {
      id: 2,
      title: 'Community Engagement',
      description: 'Receive 3 tips from community members',
      status: 'in-progress',
      points: 50,
      progress: '2/3'
    },
    {
      id: 3,
      title: 'Creator Proof',
      description: 'Upload proof of your creative work or farming activity',
      status: 'pending',
      points: 75
    },
    {
      id: 4,
      title: 'Community Support',
      description: 'Send 2 tips to other creators',
      status: 'pending',
      points: 25
    }
  ];

  const totalPoints = verificationTasks
    .filter(task => task.status === 'completed')
    .reduce((sum, task) => sum + task.points, 0);
  
  const requiredPoints = 150;
  const progressPercentage = (totalPoints / requiredPoints) * 100;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedProof(file);
    }
  };

  const handleSubmitVerification = () => {
    // Simulate verification submission
    if (uploadedProof) {
      // Update task status and user profile
      updateUser({ hasAfriPass: true });
      alert('Verification submitted! Your AfriPass will be minted soon.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AfriPass NFT</h1>
        <p className="text-gray-600">Your creator community membership pass</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'status'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          My Pass
        </button>
        <button
          onClick={() => setActiveTab('verify')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'verify'
              ? 'bg-white text-orange-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Verification
        </button>
      </div>

      {activeTab === 'status' ? (
        /* NFT Pass Status */
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {user?.hasAfriPass ? 'AfriPass Holder' : 'Earning Your AfriPass'}
              </h3>
              <p className="text-sm text-gray-600">
                {user?.hasAfriPass 
                  ? 'Welcome to the creator community!' 
                  : `${totalPoints}/${requiredPoints} points earned`}
              </p>
            </div>

            {!user?.hasAfriPass && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Benefits */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">AfriPass Benefits</h3>
            <div className="space-y-3">
              {[
                'Receive higher tip amounts from verified supporters',
                'Access to exclusive creator workshops and mentorship',
                'Priority listing in creator discovery',
                'Voting rights in community governance',
                'Special badges and recognition in profiles'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Star size={16} className="text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </Card>

          {user?.hasAfriPass && (
            <Card className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Your AfriPass NFT</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Token ID: #1247 • Minted: Dec 2024
                </p>
                <Button variant="outline" size="small">
                  View on OpenSea
                </Button>
              </div>
            </Card>
          )}
        </div>
      ) : (
        /* Verification Tasks */
        <div className="space-y-4">
          {verificationTasks.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      task.status === 'completed' ? 'bg-green-100' :
                      task.status === 'in-progress' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      {task.status === 'completed' ? (
                        <Check size={12} className="text-green-600" />
                      ) : task.status === 'in-progress' ? (
                        <Clock size={12} className="text-yellow-600" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  {task.progress && (
                    <p className="text-xs text-yellow-600 font-medium">
                      Progress: {task.progress}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-orange-600">
                    +{task.points} pts
                  </span>
                </div>
              </div>

              {task.id === 3 && task.status === 'pending' && (
                <div className="mt-4 space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,video/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="proof-upload"
                    />
                    <label htmlFor="proof-upload" className="cursor-pointer">
                      <Camera size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {uploadedProof ? uploadedProof.name : 'Upload proof of work'}
                      </p>
                    </label>
                  </div>
                  {uploadedProof && (
                    <Button 
                      variant="primary" 
                      size="small" 
                      onClick={handleSubmitVerification}
                      className="w-full"
                    >
                      Submit Verification
                    </Button>
                  )}
                </div>
              )}
            </Card>
          ))}

          {/* Progress Summary */}
          <Card className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Total Progress</p>
              <p className="text-2xl font-bold text-orange-600 mb-1">
                {totalPoints} / {requiredPoints} points
              </p>
              <p className="text-xs text-gray-600">
                {requiredPoints - totalPoints} points needed for AfriPass
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NFTPassScreen;