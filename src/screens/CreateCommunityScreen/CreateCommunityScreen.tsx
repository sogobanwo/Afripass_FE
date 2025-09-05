import React, { useState } from 'react';
import { Plus, Globe, Users, Lock, Coins, Check, AlertCircle } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const CreateCommunityScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    communityName: '',
    ensName: '',
    description: '',
    category: '',
    location: '',
    type: 'public',
    nftCost: 'free',
    customCost: '',
    initialDeposit: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Agriculture', 'Art & Design', 'Technology', 'Music', 'Crafts', 
    'Education', 'Health', 'Business', 'Mixed', 'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate ENS name from community name
    if (field === 'communityName') {
      const ensName = value.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '')
        .slice(0, 20) + '.eth';
      setFormData(prev => ({ ...prev, ensName }));
    }
  };

  const handleCreateCommunity = async () => {
    setIsCreating(true);
    // Simulate community creation
    setTimeout(() => {
      setIsCreating(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form or redirect
        setFormData({
          communityName: '',
          ensName: '',
          description: '',
          category: '',
          location: '',
          type: 'public',
          nftCost: 'free',
          customCost: '',
          initialDeposit: ''
        });
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Community Created!</h2>
          <p className="text-gray-600 mb-4">
            {formData.ensName} is now live and ready for members
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Share your community link to start growing! 🌱
          </p>
          <Button
            variant="primary"
            onClick={() => setShowSuccess(false)}
            className="w-full"
          >
            Create Another
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Community</h1>
        <p className="text-gray-600">Start your own ENS-powered creator community</p>
      </div>

      {/* Community Form */}
      <div className="space-y-6">
        {/* Basic Info */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Community Details</h3>
          <div className="space-y-4">
            <Input
              type="text"
              label="Community Name"
              placeholder="Accra Creators"
              value={formData.communityName}
              onChange={(e) => handleInputChange('communityName', e.target.value)}
              icon={<Users size={16} />}
            />
            
            <Input
              type="text"
              label="ENS Name"
              placeholder="accracreators.eth"
              value={formData.ensName}
              onChange={(e) => handleInputChange('ensName', e.target.value)}
              icon={<Globe size={16} />}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe your community's mission and goals..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <Input
                type="text"
                label="Location"
                placeholder="Accra, Ghana"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Community Settings */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Community Settings</h3>
          <div className="space-y-4">
            {/* Community Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Community Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleInputChange('type', 'public')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.type === 'public'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Users size={20} className="mx-auto mb-1 text-green-500" />
                  <span className="text-sm font-medium">Public</span>
                  <p className="text-xs text-gray-500 mt-1">Anyone can join</p>
                </button>
                <button
                  onClick={() => handleInputChange('type', 'private')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.type === 'private'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Lock size={20} className="mx-auto mb-1 text-blue-500" />
                  <span className="text-sm font-medium">Private</span>
                  <p className="text-xs text-gray-500 mt-1">Invite only</p>
                </button>
              </div>
            </div>

            {/* NFT Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                AfriPass NFT Cost
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="free"
                    name="nftCost"
                    value="free"
                    checked={formData.nftCost === 'free'}
                    onChange={(e) => handleInputChange('nftCost', e.target.value)}
                    className="text-orange-500"
                  />
                  <label htmlFor="free" className="text-sm">Free to mint</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="paid"
                    name="nftCost"
                    value="paid"
                    checked={formData.nftCost === 'paid'}
                    onChange={(e) => handleInputChange('nftCost', e.target.value)}
                    className="text-orange-500"
                  />
                  <label htmlFor="paid" className="text-sm">Set custom price</label>
                </div>
                {formData.nftCost === 'paid' && (
                  <Input
                    type="number"
                    placeholder="0.01"
                    value={formData.customCost}
                    onChange={(e) => handleInputChange('customCost', e.target.value)}
                    className="ml-6"
                  />
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Initial Deposit */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Community Purse</h3>
          <div className="space-y-4">
            <Input
              type="number"
              label="Initial Deposit (Optional)"
              placeholder="0.1"
              value={formData.initialDeposit}
              onChange={(e) => handleInputChange('initialDeposit', e.target.value)}
              icon={<Coins size={16} />}
            />
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Community Purse</p>
                <p className="text-xs text-blue-600 mt-1">
                  Funds deposited here will be used to reward community members for completing tasks.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Create Button */}
        <Button
          variant="primary"
          size="large"
          onClick={handleCreateCommunity}
          disabled={!formData.communityName || !formData.ensName || !formData.description || isCreating}
          className="w-full"
          loading={isCreating}
        >
          {isCreating ? 'Creating Community...' : 'Create Community'}
        </Button>

        {/* Preview Card */}
        {formData.communityName && (
          <Card className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <h4 className="font-medium text-gray-800 mb-2">Preview</h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {formData.communityName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{formData.communityName}</p>
                <p className="text-sm text-orange-600">{formData.ensName}</p>
                <p className="text-xs text-gray-500">
                  {formData.type === 'public' ? 'Public' : 'Private'} • {formData.category}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateCommunityScreen;