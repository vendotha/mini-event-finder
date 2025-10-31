import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    maxParticipants: number;
    currentParticipants: number;
}

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      // --- THIS IS THE FIX ---
      // 1. Get the API URL from the environment variable (for deployment)
      //    or use localhost as a fallback (for local testing).
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
      // -----------------------
      
      try {
        setLoading(true);
        // 2. Use the API_URL variable here
        const response = await axios.get(`${API_URL}/api/events/${id}`);
        setEvent(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch event details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // ... all your style code remains exactly the same ...
  // (containerStyle, cardStyle, titleStyle, etc.)

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const contentWrapperStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto'
  };

  const backButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50px',
    marginBottom: '30px',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    padding: '50px',
    boxShadow: '0 30px 90px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  };

  const decorativeCircleStyle: React.CSSProperties = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    top: '-100px',
    right: '-100px',
    zIndex: 0
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '30px',
    lineHeight: '1.2',
    letterSpacing: '-1px'
  };

  const infoSectionStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginTop: '40px'
  };

  const infoCardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '25px',
    borderRadius: '20px',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
  };

  const infoLabelStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const infoValueStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#333',
    wordBreak: 'break-word'
  };

  const descriptionSectionStyle: React.CSSProperties = {
    marginTop: '40px',
    padding: '30px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
    borderRadius: '20px',
    borderLeft: '5px solid #667eea'
  };

  const descriptionLabelStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#667eea',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '15px'
  };

  const descriptionTextStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#333'
  };

  const participantsBarStyle: React.CSSProperties = {
    marginTop: '40px',
    padding: '30px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
  };

  const progressBarContainerStyle: React.CSSProperties = {
    height: '12px',
    background: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '15px'
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5rem',
    padding: '100px 20px',
    animation: 'pulse 2s infinite'
  };

  const errorStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '40px',
    borderRadius: '20px',
    color: '#e74c3c',
    fontSize: '1.2rem',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
          `}
        </style>
        <div style={loadingStyle}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎪</div>
          Loading event details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={contentWrapperStyle}>
          <Link to="/" style={backButtonStyle} className="back-btn-hover">
            ← Back to Events
          </Link>
          <div style={errorStyle}>⚠️ {error}</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={containerStyle}>
        <div style={contentWrapperStyle}>
          <Link to="/" style={backButtonStyle} className="back-btn-hover">
            ← Back to Events
          </Link>
          <div style={errorStyle}>Event not found.</div>
        </div>
      </div>
    );
  }

  const participantPercentage = (event.currentParticipants / event.maxParticipants) * 100;
  const progressBarStyle: React.CSSProperties = {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '10px',
    width: `${participantPercentage}%`,
    transition: 'width 0.5s ease'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          .back-btn-hover:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateX(-5px);
          }
        `}
      </style>
      
      <div style={contentWrapperStyle}>
        <Link to="/" style={backButtonStyle} className="back-btn-hover">
          ← Back to Events
        </Link>
        
        <div style={cardStyle}>
          <div style={decorativeCircleStyle}></div>
          
          <div style={contentStyle}>
            <h1 style={titleStyle}>{event.title}</h1>
            
            <div style={infoSectionStyle}>
              <div style={infoCardStyle}>
                <div style={infoLabelStyle}>
                  📍 Location
                </div>
                <div style={infoValueStyle}>{event.location}</div>
              </div>
              
              <div style={infoCardStyle}>
                <div style={infoLabelStyle}>
                  📅 Date
                </div>
                <div style={infoValueStyle}>
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            {event.description && (
              <div style={descriptionSectionStyle}>
                <div style={descriptionLabelStyle}>📝 Description</div>
                <div style={descriptionTextStyle}>
                  {event.description}
                </div>
              </div>
            )}

            <div style={participantsBarStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={infoLabelStyle}>
                  👥 Participants
                </div>
                <div style={infoValueStyle}>
                  {event.currentParticipants} / {event.maxParticipants}
                </div>
              </div>
              <div style={progressBarContainerStyle}>
                <div style={progressBarStyle}></div>
              </div>
              <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                {participantPercentage.toFixed(0)}% Full
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;