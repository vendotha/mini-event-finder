import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
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

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'almost-full' | 'full'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'participants' | 'title'>('date');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/events');
        setEvents(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events. Is the backend server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter and sort events
  const getFilteredAndSortedEvents = () => {
    let filtered = events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const participantPercentage = (event.currentParticipants / event.maxParticipants) * 100;
      const matchesFilter = 
        filterStatus === 'all' ||
        (filterStatus === 'open' && participantPercentage < 80) ||
        (filterStatus === 'almost-full' && participantPercentage >= 80 && participantPercentage < 100) ||
        (filterStatus === 'full' && participantPercentage >= 100);

      return matchesSearch && matchesFilter;
    });

    // Sort events
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'participants') {
        return b.currentParticipants - a.currentParticipants;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  };

  const filteredEvents = getFilteredAndSortedEvents();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '3rem',
    fontWeight: '800',
    color: 'white',
    margin: 0,
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    letterSpacing: '-1px'
  };

  const createButtonStyle: React.CSSProperties = {
    textDecoration: 'none',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    padding: '14px 32px',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    boxShadow: '0 10px 30px rgba(245, 87, 108, 0.4)',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer'
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const filterSectionStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    padding: '25px',
    borderRadius: '20px',
    marginBottom: '30px',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const searchBarStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    fontSize: '1rem',
    borderRadius: '50px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.9)',
    outline: 'none',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    fontFamily: 'inherit'
  };

  const filterControlsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    alignItems: 'center'
  };

  const filterLabelStyle: React.CSSProperties = {
    color: 'white',
    fontWeight: '600',
    fontSize: '0.9rem',
    marginRight: '10px'
  };

  const filterButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    borderRadius: '50px',
    border: 'none',
    background: isActive 
      ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      : 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 5px 15px rgba(245, 87, 108, 0.4)' : 'none'
  });

  const selectStyle: React.CSSProperties = {
    padding: '10px 20px',
    borderRadius: '50px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'inherit'
  };

  const resultsCountStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.2rem',
    padding: '60px 20px',
    animation: 'pulse 2s infinite'
  };

  const errorStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '20px',
    color: '#e74c3c',
    fontSize: '1.1rem',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    maxWidth: '600px',
    margin: '40px auto'
  };

  const eventsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '30px',
    marginTop: '20px'
  };

  const noEventsStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '60px 40px',
    borderRadius: '20px',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.3rem',
    border: '2px dashed rgba(255, 255, 255, 0.3)'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          
          .create-btn-hover:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 40px rgba(245, 87, 108, 0.6);
          }

          input:focus {
            border-color: rgba(245, 87, 108, 0.8) !important;
            box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.2);
          }

          .filter-btn:hover {
            transform: scale(1.05);
          }

          select:hover {
            background: white;
          }
        `}
      </style>
      
      <div style={headerStyle}>
        <h1 style={titleStyle}>✨ Upcoming Events</h1>
        <Link 
          to="/create" 
          style={createButtonStyle}
          className="create-btn-hover"
        >
          + Create Event
        </Link>
      </div>

      <div style={contentStyle}>
        {loading && <div style={loadingStyle}>Loading magical events...</div>}
        {error && <div style={errorStyle}>⚠️ {error}</div>}
        
        {!loading && !error && (
          <>
            <div style={filterSectionStyle}>
              <input
                type="text"
                placeholder="🔍 Search events by title, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchBarStyle}
              />
              
              <div style={filterControlsStyle}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={filterLabelStyle}>Filter:</span>
                  <button
                    onClick={() => setFilterStatus('all')}
                    style={filterButtonStyle(filterStatus === 'all')}
                    className="filter-btn"
                  >
                    All Events
                  </button>
                  <button
                    onClick={() => setFilterStatus('open')}
                    style={filterButtonStyle(filterStatus === 'open')}
                    className="filter-btn"
                  >
                    ✨ Open
                  </button>
                  <button
                    onClick={() => setFilterStatus('almost-full')}
                    style={filterButtonStyle(filterStatus === 'almost-full')}
                    className="filter-btn"
                  >
                    🔥 Almost Full
                  </button>
                  <button
                    onClick={() => setFilterStatus('full')}
                    style={filterButtonStyle(filterStatus === 'full')}
                    className="filter-btn"
                  >
                    🔒 Full
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
                  <span style={filterLabelStyle}>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'participants' | 'title')}
                    style={selectStyle}
                  >
                    <option value="date">📅 Date</option>
                    <option value="participants">👥 Participants</option>
                    <option value="title">🔤 Title</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredEvents.length > 0 && (
              <div style={resultsCountStyle}>
                <span>📊 Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}</span>
                {(searchTerm || filterStatus !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      color: 'white',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}
                    className="filter-btn"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {filteredEvents.length > 0 ? (
              <div style={eventsGridStyle}>
                {filteredEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            ) : (
              <div style={noEventsStyle}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                  {events.length === 0 ? '🎉' : '🔍'}
                </div>
                <div>
                  {events.length === 0 
                    ? 'No events found. Be the first to create one!' 
                    : 'No events match your search criteria. Try adjusting your filters.'}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventListPage;