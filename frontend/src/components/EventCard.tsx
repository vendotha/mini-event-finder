import React from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const participantPercentage = (event.currentParticipants / event.maxParticipants) * 100;
  const isAlmostFull = participantPercentage >= 80;
  const isFull = event.currentParticipants >= event.maxParticipants;

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '30px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#333',
    marginBottom: '15px',
    lineHeight: '1.3',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.6',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    minHeight: '48px'
  };

  const infoRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '12px',
    fontWeight: '500'
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '1.1rem'
  };

  const progressBarContainerStyle: React.CSSProperties = {
    height: '8px',
    background: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '15px',
    marginBottom: '10px'
  };

  const progressBarStyle: React.CSSProperties = {
    height: '100%',
    background: isFull 
      ? 'linear-gradient(90deg, #e74c3c 0%, #c0392b 100%)'
      : isAlmostFull
      ? 'linear-gradient(90deg, #f39c12 0%, #e67e22 100%)'
      : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '10px',
    width: `${participantPercentage}%`,
    transition: 'all 0.5s ease'
  };

  const participantTextStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: '#888',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: isFull 
      ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
      : isAlmostFull
      ? 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
      : 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
  };

  const dateFormatted = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link to={`/events/${event.id}`} style={cardStyle} className="event-card-hover">
      <style>
        {`
          .event-card-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          }
        `}
      </style>
      
      {isFull ? (
        <div style={badgeStyle}>🔒 Full</div>
      ) : isAlmostFull ? (
        <div style={badgeStyle}>🔥 Almost Full</div>
      ) : (
        <div style={badgeStyle}>✨ Open</div>
      )}

      <h2 style={titleStyle}>{event.title}</h2>
      
      <p style={descriptionStyle}>
        {event.description || 'No description provided.'}
      </p>

      <div style={infoRowStyle}>
        <span style={iconStyle}>📍</span>
        <span>{event.location}</span>
      </div>

      <div style={infoRowStyle}>
        <span style={iconStyle}>📅</span>
        <span>{dateFormatted}</span>
      </div>

      <div style={progressBarContainerStyle}>
        <div style={progressBarStyle}></div>
      </div>

      <div style={participantTextStyle}>
        <span>
          👥 {event.currentParticipants} / {event.maxParticipants} participants
        </span>
        <span style={{ fontWeight: '700' }}>
          {participantPercentage.toFixed(0)}%
        </span>
      </div>
    </Link>
  );
};

export default EventCard;