import React from 'react';
import { Users, TrendingUp, Star } from 'lucide-react';
import { onlineFriends, recentAchievements } from '../data/mockData.js';

const FriendsPanel = () => {
  const getInitials = (username) => {
    return username.substring(0, 2).toUpperCase();
  };

  const onlineCount = onlineFriends.length;

  return (
    <div
      style={{
        width: '280px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {/* FRIENDS ONLINE CARD */}
      <div
        style={{
          background: '#141824',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #1e2d45'
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: '16px' }}
        >
          {/* Left */}
          <div className="flex items-center" style={{ gap: '8px' }}>
            <Users size={18} style={{ color: '#0070d1' }} />
            <h3
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '-0.3px'
              }}
            >
              Friends Online
            </h3>
          </div>

          {/* Right */}
          <div
            style={{
              background: 'rgba(0, 230, 118, 0.12)',
              color: '#00e676',
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '20px'
            }}
          >
            {onlineCount} online
          </div>
        </div>

        {/* Friends list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {onlineFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-[10px]"
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                padding: '4px',
                borderRadius: '8px',
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 112, 209, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Avatar */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(135deg, #1e2d45, #0d1830)',
                  borderRadius: '50%',
                  color: '#8a9bb5',
                  fontSize: '12px',
                  fontWeight: 700
                }}
              >
                {getInitials(friend.username)}
                
                {/* Status dot */}
                <div
                  className="absolute"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: '2px solid #141824',
                    background: friend.status === 'in-game' ? '#0070d1' : '#00e676'
                  }}
                />
              </div>

              {/* Info column */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {friend.username}
                </div>
                <div
                  style={{
                    color: '#8a9bb5',
                    fontSize: '11px'
                  }}
                >
                  {friend.currentGame || 'Online'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Friends button */}
        <button
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '8px',
            background: 'transparent',
            border: '1px solid #1e2d45',
            borderRadius: '8px',
            color: '#0070d1',
            fontSize: '13px',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'background 150ms ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1e2d45';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          View All Friends
        </button>
      </div>

      {/* RECENT ACHIEVEMENTS CARD */}
      <div
        style={{
          background: '#141824',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #1e2d45'
        }}
      >
        {/* Header */}
        <div className="flex items-center" style={{ gap: '8px' }}>
          <TrendingUp size={18} style={{ color: '#0070d1' }} />
          <h3
            style={{
              color: 'white',
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '-0.3px'
            }}
          >
            Recent Achievements
          </h3>
        </div>

        {/* Achievements list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '16px'
          }}
        >
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center gap-3"
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                padding: '4px',
                borderRadius: '8px',
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245, 166, 35, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Icon box */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #f5a623, #e8920f)',
                  borderRadius: '10px'
                }}
              >
                <Star size={18} style={{ color: 'white', fill: 'white' }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {achievement.name}
                </div>
                <div
                  style={{
                    color: '#f5a623',
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  {achievement.xp} XP
                </div>
                <div
                  style={{
                    color: '#8a9bb5',
                    fontSize: '11px',
                    marginTop: '1px'
                  }}
                >
                  {achievement.unlockedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsPanel;
