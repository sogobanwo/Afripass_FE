import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, CheckSquare, Award, TrendingUp, Heart, Coins } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import QuickActionCard from '../../components/QuickActionCard/QuickActionCard';

const HomeScreen: React.FC = () => {
  const { user } = useWallet();

  const quickActions = [
    {
      title: 'Join Communities',
      description: 'Discover and join creator communities',
      icon: Users,
      link: '/communities',
      color: 'from-pink-400 to-orange-400',
    },
    {
      title: 'Create Community',
      description: 'Start your own creator community',
      icon: Plus,
      link: '/create-community',
      color: 'from-teal-400 to-blue-400',
    },
    {
      title: 'Complete Tasks',
      description: 'Submit work and earn rewards',
      icon: CheckSquare,
      link: '/tasks',
      color: 'from-green-400 to-teal-400',
    },
    {
      title: 'AfriPass NFT',
      description: 'View your community passes',
      icon: Award,
      link: '/dashboard',
      color: 'from-yellow-400 to-orange-400',
    },
  ];

  const recentActivity = [
    { type: 'task_completed', amount: '$12.50', community: 'accracreators.eth', time: '2 hours ago' },
    { type: 'nft_minted', community: 'lagosartists.eth', action: 'joined', time: '1 day ago' },
    { type: 'reward_earned', amount: '$25.00', task: 'Cocoa delivery proof', time: '2 days ago' },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Ayekoo, {user?.ensName?.split('.')[0] || 'Friend'}! 👋
          </h1>
          <Link to="/profile">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user?.ensName?.charAt(0).toUpperCase() || 'K'}
              </span>
            </div>
          </Link>
        </div>
        <p className="text-gray-600">Ready to empower the community today?</p>
      </div>

      {/* Balance Card */}
      <BalanceCard />

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp size={20} className="mr-2 text-orange-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              link={action.link}
              color={action.color}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'task_completed' ? 'bg-green-100 text-green-600' :
                  activity.type === 'nft_minted' ? 'bg-purple-100 text-purple-600' :
                  'bg-teal-100 text-teal-600'
                }`}>
                  {activity.type === 'task_completed' ? <CheckSquare size={16} /> :
                   activity.type === 'nft_minted' ? <Award size={16} /> :
                   <Coins size={16} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {activity.type === 'task_completed' ? `Task completed in ${activity.community}` :
                     activity.type === 'nft_minted' ? `Joined ${activity.community}` :
                     `Reward from ${activity.task}`}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                activity.type === 'task_completed' || activity.type === 'reward_earned' ? 'text-green-600' : 'text-gray-800'
              }`}>
                {activity.amount || 'NFT'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Cultural Accent */}
      <div className="flex justify-center mt-8">
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-teal-500 rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default HomeScreen;