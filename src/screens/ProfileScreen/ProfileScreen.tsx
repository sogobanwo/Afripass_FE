import React, { useState } from 'react';
import { Edit2, MapPin, Briefcase, Globe, ExternalLink, Copy, Check } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const ProfileScreen: React.FC = () => {
  const { user, updateUser, disconnect } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editForm, setEditForm] = useState({
    role: user?.role || '',
    location: user?.location || '',
    bio: user?.description || ''
  });

  const handleCopyAddress = () => {
    if (user?.address) {
      navigator.clipboard.writeText(user.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveProfile = () => {
    updateUser({
      role: editForm.role,
      location: editForm.location,
      description: editForm.bio
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your AfriPass identity</p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 mb-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">
              {user?.ensName?.charAt(0).toUpperCase() || 'K'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">{user?.ensName}</h2>
          
          {/* Address */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-sm text-gray-500 font-mono">
              {user?.address?.slice(0, 6)}...{user?.address?.slice(-4)}
            </span>
            <button
              onClick={handleCopyAddress}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {copied ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy size={14} className="text-gray-400" />
              )}
            </button>
          </div>

          {/* AfriPass Badge */}
          {user?.hasAfriPass && (
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
              <Award size={14} className="mr-1" />
              AfriPass Holder
            </div>
          )}
        </div>

        {/* Profile Info */}
        {!isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Briefcase size={16} className="mr-2 text-orange-500" />
              <span className="text-sm">{user?.role || 'Community Member'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2 text-teal-500" />
              <span className="text-sm">{user?.location || 'Location not set'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Globe size={16} className="mr-2 text-blue-500" />
              <span className="text-sm">Base Network</span>
            </div>
            
            <Button
              variant="outline"
              size="small"
              onClick={() => setIsEditing(true)}
              className="w-full mt-4"
            >
              <Edit2 size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              type="text"
              label="Role"
              value={editForm.role}
              onChange={(e) => setEditForm({...editForm, role: e.target.value})}
              placeholder="e.g., Farmer, Artist, Musician"
            />
            <Input
              type="text"
              label="Location"
              value={editForm.location}
              onChange={(e) => setEditForm({...editForm, location: e.target.value})}
              placeholder="e.g., Accra, Ghana"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                placeholder="Tell the community about yourself..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveProfile}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Profile Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">156</p>
          <p className="text-xs text-gray-600">Total Supporters</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-teal-600">28</p>
          <p className="text-xs text-gray-600">Creators Supported</p>
        </Card>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-between"
        >
          View on ENS App
          <ExternalLink size={16} />
        </Button>
        <Button
          variant="outline"
          className="w-full"
        >
          Share Profile
        </Button>
        <Button
          variant="danger"
          onClick={disconnect}
          className="w-full"
        >
          Disconnect Wallet
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;