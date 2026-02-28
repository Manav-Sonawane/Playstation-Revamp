import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { continuePlayingGames } from '../data/mockData.js';

const ContinuePlaying = () => {
  const [progressWidths, setProgressWidths] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const widths = {};
      continuePlayingGames.forEach(game => {
        widths[game.id] = game.progress;
      });
      setProgressWidths(widths);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{ marginBottom: '32px' }}>
      {/* HEADER */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: '20px' }}
      >
        {/* Left */}
        <div className="flex items-center" style={{ gap: '8px' }}>
          <Clock size={18} style={{ color: '#0070d1' }} />
          <h2
            style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '-0.3px'
            }}
          >
            Continue Playing
          </h2>
        </div>

        {/* Right */}
        <a
          href="#"
          style={{
            color: '#0070d1',
            fontSize: '13px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          View All
        </a>
      </div>

      {/* CARDS GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}
      >
        {continuePlayingGames.map((game) => (
          <div
            key={game.id}
            style={{
              background: '#141824',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid #1e2d45',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0070d1';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 112, 209, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1e2d45';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* IMAGE AREA */}
            <div
              className="relative"
              style={{
                height: '160px',
                background: game.gradient
              }}
            >
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 30%, #141824 100%)'
                }}
              />

              {/* Genre tag */}
              <div
                className="absolute"
                style={{
                  top: '12px',
                  left: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(8px)',
                  color: '#8a9bb5',
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid #1e2d45'
                }}
              >
                {game.genre}
              </div>
            </div>

            {/* CONTENT AREA */}
            <div style={{ padding: '14px 16px 16px' }}>
              {/* Game title */}
              <h3
                style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '15px',
                  marginBottom: '10px'
                }}
              >
                {game.title}
              </h3>

              {/* Progress row */}
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: '6px' }}
              >
                <span style={{ color: '#8a9bb5', fontSize: '12px' }}>
                  Progress
                </span>
                <span
                  style={{
                    color: '#0070d1',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  {game.progress}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: '3px',
                  background: '#1e2d45',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: progressWidths[game.id] ? `${progressWidths[game.id]}%` : '0%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #0070d1, #00d4ff)',
                    boxShadow: '0 0 6px rgba(0, 208, 255, 0.4)',
                    borderRadius: '2px',
                    transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinuePlaying;
