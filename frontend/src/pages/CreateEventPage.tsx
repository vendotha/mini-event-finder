import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEventPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.post('http://localhost:5001/api/events', {
        title,
        description,
        location,
        date,
        maxParticipants: Number(maxParticipants)
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create event. Please check your input.');
      console.error(err);
      setSubmitting(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    padding: '50px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 30px 90px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
    letterSpacing: '-1px'
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '1rem',
    marginBottom: '40px',
    fontWeight: '400'
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    display: 'block'
  };

  const inputStyle: React.CSSProperties = {
    padding: '16px 20px',
    borderRadius: '12px',
    border: '2px solid #e0e0e0',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '18px',
    borderRadius: '12px',
    border: 'none',
    background: submitting 
      ? 'linear-gradient(135deg, #a8b3ea 0%, #b89ac2 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    cursor: submitting ? 'not-allowed' : 'pointer',
    fontSize: '1.1rem',
    fontWeight: '700',
    marginTop: '10px',
    boxShadow: submitting 
      ? 'none'
      : '0 10px 30px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const errorStyle: React.CSSProperties = {
    color: '#e74c3c',
    background: '#fee',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '0.95rem',
    border: '2px solid #fcc',
    marginTop: '10px',
    fontWeight: '500'
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
  };

  const emojiStyle: React.CSSProperties = {
    fontSize: '3rem',
    marginBottom: '20px',
    textAlign: 'center',
    animation: 'float 3s ease-in-out infinite'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          input:focus, textarea:focus {
            border-color: #667eea !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          
          button:not(:disabled):hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
          }
          
          button:not(:disabled):active {
            transform: translateY(0px);
          }
        `}
      </style>
      
      <div style={cardStyle}>
        <div style={emojiStyle}>🎉</div>
        <h1 style={titleStyle}>Create New Event</h1>
        <p style={subtitleStyle}>Fill in the details to create an amazing event</p>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Event Title *</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Summer Music Festival" 
              required 
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Tell people what makes this event special..." 
              style={textareaStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Location *</label>
            <input 
              type="text" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              placeholder="Central Park, New York" 
              required 
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Event Date *</label>
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              required 
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Max Participants *</label>
            <input 
              type="number" 
              value={maxParticipants} 
              onChange={e => setMaxParticipants(e.target.value)} 
              placeholder="100" 
              required 
              min="1"
              style={inputStyle}
            />
          </div>

          <button type="submit" disabled={submitting} style={buttonStyle}>
            {submitting ? '✨ Creating Event...' : '🚀 Create Event'}
          </button>
          
          {error && <div style={errorStyle}>⚠️ {error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;