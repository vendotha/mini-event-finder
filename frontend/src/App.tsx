import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';

const containerStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'sans-serif'
};

function App() {
  return (
    <div style={containerStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<EventListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/create" element={<CreateEventPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App