import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Users, Award, Search, TrendingUp, Heart } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import QuickActionCard from '../../components/QuickActionCard/QuickActionCard';

const HomeScreen: React.FC = () => {
  const { user } = useWallet();

  const quickActions = [
    {
      title: 'Send Tips',
      description: 'Support creators with micro-payments',
      icon: Heart,
      link: '/pay',
      color: 'from-pink-400 to-orange-400',
    },
    {
      title: 'Find Creators',
      description: 'Discover amazing African talent',
      icon: Search,
      link: '/search',
      color: 'from-teal-400 to-blue-400',
    },
    {
      title: 'Family Fund',
      description: 'Manage shared family finances',
      icon: Users,
      link: '/family',
      color: 'from-green-400 to-teal-400',
    },
    {
      title: 'AfriPass NFT',
      description: 'Earn your creator community pass',
      icon: Award,
      link: '/pass',
      color: 'from-yellow-400 to-orange-400',
    },
  ];

  const recentActivity = [
    { type: 'tip', amount: '$2.50', recipient: 'amafarmer.eth', time: '2 hours ago' },
    { type: 'received', amount: '$5.00', sender: 'supporter.eth', time: '1 day ago' },
    { type: 'family', amount: '$25.00', action: 'approved', time: '2 days ago' },
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
                  activity.type === 'tip' ? 'bg-pink-100 text-pink-600' :
                  activity.type === 'received' ? 'bg-green-100 text-green-600' :
                  'bg-teal-100 text-teal-600'
                }`}>
                  {activity.type === 'tip' ? <Heart size={16} /> :
                   activity.type === 'received' ? <TrendingUp size={16} /> :
                   <Users size={16} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {activity.type === 'tip' ? `Sent to ${activity.recipient}` :
                     activity.type === 'received' ? `Received from ${activity.sender}` :
                     `Family fund ${activity.action}`}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              <span className={`font-semibold ${
                activity.type === 'received' ? 'text-green-600' : 'text-gray-800'
              }`}>
                {activity.amount}
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