import React, { useState } from 'react';
import { BarChart3, TrendingUp, Heart, Users, Award, Calendar } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import Card from '../../components/UI/Card';
import StatsCard from '../../components/StatsCard/StatsCard';

const DashboardScreen: React.FC = () => {
  const { user } = useWallet();
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { label: 'Tips Received', value: '$127.50', change: '+12%', icon: Heart, color: 'pink' },
    { label: 'Tips Sent', value: '$45.20', change: '+8%', icon: TrendingUp, color: 'green' },
    { label: 'Family Transfers', value: '$320.00', change: '+5%', icon: Users, color: 'blue' },
    { label: 'Community Rank', value: '#156', change: '↑12', icon: Award, color: 'yellow' },
  ];

  const recentTransactions = [
    {
      type: 'tip_received',
      from: 'supporter.eth',
      amount: '$5.00',
      message: 'Love your latest artwork! 🎨',
      timestamp: '2 hours ago'
    },
    {
      type: 'tip_sent',
      to: 'amafarmer.eth',
      amount: '$2.50',
      message: 'Great harvest update!',
      timestamp: '1 day ago'
    },
    {
      type: 'family_approved',
      amount: '$150.00',
      purpose: 'Monthly support',
      timestamp: '3 days ago'
    },
    {
      type: 'pass_progress',
      points: '+25',
      task: 'Community engagement',
      timestamp: '5 days ago'
    }
  ];

  const monthlyTrends = [
    { month: 'Nov', received: 85, sent: 32 },
    { month: 'Dec', received: 127, sent: 45 },
    { month: 'Jan', received: 96, sent: 38 },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Dashboard</h1>
        <p className="text-gray-600">Track your impact and earnings</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        {['7d', '30d', '90d'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              timeRange === range
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last month' : 'Last 3 months'}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Monthly Trends */}
      <Card className="p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 size={20} className="mr-2 text-orange-500" />
          Monthly Trends
        </h3>
        <div className="space-y-3">
          {monthlyTrends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{trend.month}</span>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Received</div>
                  <div className="text-sm font-semibold text-green-600">${trend.received}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Sent</div>
                  <div className="text-sm font-semibold text-gray-600">${trend.sent}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar size={20} className="mr-2 text-teal-500" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentTransactions.map((tx, index) => (
            <div key={index} className="flex items-start space-x-3 py-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                tx.type === 'tip_received' ? 'bg-green-100' :
                tx.type === 'tip_sent' ? 'bg-pink-100' :
                tx.type === 'family_approved' ? 'bg-blue-100' :
                'bg-yellow-100'
              }`}>
                {tx.type === 'tip_received' ? <TrendingUp size={14} className="text-green-600" /> :
                 tx.type === 'tip_sent' ? <Heart size={14} className="text-pink-600" /> :
                 tx.type === 'family_approved' ? <Users size={14} className="text-blue-600" /> :
                 <Award size={14} className="text-yellow-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {tx.type === 'tip_received' ? `Tip from ${tx.from}` :
                   tx.type === 'tip_sent' ? `Tip to ${tx.to}` :
                   tx.type === 'family_approved' ? 'Family fund approved' :
                   'AfriPass progress'}
                </p>
                <p className="text-xs text-gray-600">
                  {'message' in tx ? tx.message : 
                   'purpose' in tx ? tx.purpose :
                   'task' in tx ? tx.task : ''}
                </p>
                <p className="text-xs text-gray-500 mt-1">{tx.timestamp}</p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold ${'amount' in tx ? 'text-gray-800' : 'text-orange-600'}`}>
                  {'amount' in tx ? tx.amount : 'points' in tx ? tx.points : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardScreen;