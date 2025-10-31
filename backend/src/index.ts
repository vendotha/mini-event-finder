import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Allows requests from our frontend
app.use(express.json()); // Parses incoming JSON requests

// --- In-Memory Database ---
interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string; // Using string for simplicity, e.g., "2025-11-20"
  maxParticipants: number;
  currentParticipants: number;
}

let events: Event[] = [
    // Some initial mock data
    { id: '1', title: 'Tech Meetup Hyderabad', description: 'A meetup for tech enthusiasts.', location: 'Hyderabad', date: '2025-11-15', maxParticipants: 50, currentParticipants: 25 },
    { id: '2', title: 'Startup Pitch Night', description: 'Pitch your startup idea.', location: 'Hyderabad', date: '2025-11-20', maxParticipants: 30, currentParticipants: 10 },
    { id: '3', title: 'Open Source Conference', description: 'Discussing the future of open source.', location: 'Bangalore', date: '2025-12-05', maxParticipants: 100, currentParticipants: 45 }
];
let nextEventId = 4;

// --- API Endpoints ---

// 1. GET /api/events - List all events (with optional location filter)
app.get('/api/events', (req: Request, res: Response) => {
  const { location } = req.query;

  if (location && typeof location === 'string') {
    const filteredEvents = events.filter(event => 
      event.location.toLowerCase() === location.toLowerCase()
    );
    return res.json(filteredEvents);
  }

  res.json(events);
});

// 2. GET /api/events/:id - Get a single event's details
app.get('/api/events/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const event = events.find(e => e.id === id);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  res.json(event);
});

// 3. POST /api/events - Create a new event
app.post('/api/events', (req: Request, res: Response) => {
  const { title, description, location, date, maxParticipants } = req.body;

  // Basic validation
  if (!title || !location || !date || !maxParticipants) {
    return res.status(400).json({ message: 'Missing required fields: title, location, date, maxParticipants' });
  }

  const newEvent: Event = {
    id: (nextEventId++).toString(),
    title,
    description,
    location,
    date,
    maxParticipants: Number(maxParticipants),
    currentParticipants: 0, // New events start with 0 participants
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});