import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Award, Coins, CheckSquare, Plus, Settings, Eye, EyeOff } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const CommunityHubScreen: React.FC = () => {
  const { ensName } = useParams<{ ensName: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'members' | 'purse'>('overview');
  const [showBalance, setShowBalance] = useState(true);

  // Mock community data
  const community = {
    ensName: ensName || 'accracreators.eth',
    name: 'Accra Creators',
    description: 'A vibrant community of Ghanaian farmers, artists, and entrepreneurs building sustainable livelihoods.',
    type: 'Public',
    members: 247,
    purseBalance: '$1,240.50',
    nftCost: 'Free',
    location: 'Accra, Ghana',
    category: 'Mixed',
    avatar: '🌾',
    isVerified: true,
    isAdmin: false,
    isMember: false
  };

  const tasks = [
    {
      id: 1,
      title: 'Cocoa Harvest Documentation',
      description: 'Submit proof of your latest cocoa harvest with photos and weight records',
      reward: '$25.00',
      status: 'available',
      submissions: 12,
      deadline: '3 days left'
    },
    {
      id: 2,
      title: 'Community Workshop Attendance',
      description: 'Attend the monthly farming techniques workshop and submit reflection',
      reward: '$15.00',
      status: 'completed',
      submissions: 45,
      deadline: 'Completed'
    },
    {
      id: 3,
      title: 'Sustainable Farming Practice',
      description: 'Document implementation of sustainable farming practices in your field',
      reward: '$30.00',
      status: 'pending_approval',
      submissions: 8,
      deadline: '1 week left'
    }
  ];

  const members = [
    { ensName: 'kofifarmer.eth', role: 'Cocoa Farmer', earnings: '$145', avatar: '🌾' },
    { ensName: 'amaartist.eth', role: 'Digital Artist', earnings: '$89', avatar: '🎨' },
    { ensName: 'kwametech.eth', role: 'Developer', earnings: '$234', avatar: '💻' },
    { ensName: 'akosua.eth', role: 'Craft Maker', earnings: '$67', avatar: '🏺' }
  ];

  const handleJoinCommunity = () => {
    // Handle NFT minting and community joining
    console.log('Joining community:', community.ensName);
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="p-4 mb-3">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{task.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{task.submissions} submissions</span>
            <span>{task.deadline}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">{task.reward}</p>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.status === 'available' ? 'bg-green-100 text-green-700' :
            task.status === 'completed' ? 'bg-blue-100 text-blue-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {task.status === 'available' ? 'Available' :
             task.status === 'completed' ? 'Completed' :
             'Pending'}
          </div>
        </div>
      </div>
      
      {task.status === 'available' && community.isMember && (
        <Button variant="primary" size="small" className="w-full">
          Submit Task
        </Button>
      )}
      
      {task.status === 'pending_approval' && community.isAdmin && (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="success" size="small">Approve</Button>
          <Button variant="outline" size="small">Review</Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Community Header */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-2xl">
            {community.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-xl font-bold text-gray-800">{community.name}</h1>
              {community.isVerified && (
                <Award size={18} className="text-yellow-500" />
              )}
            </div>
            <p className="text-sm text-orange-600 font-medium">{community.ensName}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-600 mt-2">
              <span>{community.type}</span>
              <span>{community.category}</span>
              <span>{community.location}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4">{community.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-lg font-bold text-gray-800">{community.members}</p>
            <p className="text-xs text-gray-600">Members</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600">{community.purseBalance}</p>
            <p className="text-xs text-gray-600">Purse</p>
          </div>
          <div>
            <p className="text-lg font-bold text-teal-600">{community.nftCost}</p>
            <p className="text-xs text-gray-600">NFT Cost</p>
          </div>
        </div>

        {/* Join/Member Status */}
        {!community.isMember ? (
          <Button
            variant="primary"
            onClick={handleJoinCommunity}
            className="w-full"
          >
            <Award size={16} className="mr-2" />
            Mint AfriPass & Join
          </Button>
        ) : (
          <div className="flex items-center justify-center space-x-2 py-2 bg-green-100 rounded-lg">
            <Award size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-700">AfriPass Member</span>
          </div>
        )}
      </Card>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6 overflow-x-auto">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'tasks', label: 'Tasks' },
          { key: 'members', label: 'Members' },
          { key: 'purse', label: 'Purse' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckSquare size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Task completed by kofifarmer.eth</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600">$25</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New member joined</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">amaartist.eth</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Available Tasks</h3>
            <div className="space-y-2">
              {tasks.filter(t => t.status === 'available').slice(0, 2).map(task => (
                <div key={task.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.deadline}</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{task.reward}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="small" className="w-full mt-3">
              View All Tasks
            </Button>
          </Card>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Community Tasks</h3>
            {community.isAdmin && (
              <Button variant="primary" size="small">
                <Plus size={16} className="mr-1" />
                Add Task
              </Button>
            )}
          </div>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Members ({community.members})</h3>
            {community.isAdmin && (
              <Button variant="outline" size="small">
                <Settings size={16} className="mr-1" />
                Manage
              </Button>
            )}
          </div>
          <div className="space-y-3">
            {members.map((member, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{member.ensName}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{member.earnings}</p>
                    <p className="text-xs text-gray-500">Total earned</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'purse' && (
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-blue-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Community Purse</h3>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 mb-1">
                {showBalance ? community.purseBalance : '••••••'}
              </p>
              <p className="text-sm text-gray-600">Available for rewards</p>
            </div>
          </Card>

          {community.isAdmin && (
            <Card className="p-4">
              <h4 className="font-semibold text-gray-800 mb-4">Manage Purse</h4>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Amount to deposit"
                  icon={<Coins size={16} />}
                />
                <Button variant="primary" className="w-full">
                  Deposit to Purse
                </Button>
              </div>
            </Card>
          )}

          <Card className="p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Recent Transactions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Task reward paid</p>
                  <p className="text-xs text-gray-500">To kofifarmer.eth</p>
                </div>
                <span className="text-sm font-semibold text-red-600">-$25.00</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Community deposit</p>
                  <p className="text-xs text-gray-500">From admin</p>
                </div>
                <span className="text-sm font-semibold text-green-600">+$100.00</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CommunityHubScreen;