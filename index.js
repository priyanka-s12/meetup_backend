const express = require('express');
const { initializeDatabase } = require('./db/db.connect');
const Event = require('./models/event.models');
const cors = require('cors');
const app = express();
const PORT = 3000;
// const fs = require('fs');

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

initializeDatabase();

app.use(express.json());
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const jsonData = fs.readFileSync('./events.json');
// const eventsData = JSON.parse(jsonData);
// function seedData() {
//   try {
//     for (const eventData of eventsData) {
//       const newEvent = new Event({
//         eventTitle: eventData.eventTitle,
//         eventType: eventData.eventType,
//         eventHostedBy: eventData.eventHostedBy,
//         coverImageUrl: eventData.coverImageUrl,
//         eventDescription: eventData.eventDescription,
//         eventTags: eventData.eventTags,
//         eventStartTime: eventData.eventStartTime,
//         eventEndTime: eventData.eventEndTime,
//         speakers: eventData.speakers,
//         pricing: eventData.pricing,
//         eventVenue: eventData.eventVenue,
//         eventAddress: eventData.eventAddress,
//         age: eventData.age,
//         dressCode: eventData.dressCode,
//       });
//       newEvent.save();
//     }
//   } catch (error) {
//     console.log('Error seeding the data', error);
//   }
// }

// seedData();

app.get('/', (req, res) => res.send('Hello, express'));

//read all events
async function getAllEvents() {
  try {
    const allEvents = await Event.find();
    return allEvents;
  } catch (error) {
    console.log(error);
  }
}

app.get('/events', async (req, res) => {
  try {
    const events = await getAllEvents();
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: 'No events found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

//get event by Id
async function getEventById(eventId) {
  try {
    const event = await Event.findOne({ _id: eventId });
    // console.log(event);
    return event;
  } catch (error) {
    console.log(error);
  }
}

app.get('/events/:eventId', async (req, res) => {
  try {
    const event = await getEventById(req.params.eventId);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'No event found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get an event' });
  }
});

//get event by event title
async function getEventByTitle(title) {
  try {
    const event = await Event.findOne({ eventTitle: title });
    return event;
  } catch (error) {
    console.log(error);
  }
}

app.get('/events/title/:eventTitle', async (req, res) => {
  try {
    const event = await getEventByTitle(req.params.eventTitle);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'No event found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get an event' });
  }
});

//get event by tag name
async function getEventByTagname(tagName) {
  try {
    const events = await Event.find({ eventTags: tagName });
    console.log(events);
    return events;
  } catch (error) {
    console.log(error);
  }
}

app.get('/events/tags/:tagName', async (req, res) => {
  try {
    const events = await getEventByTagname(req.params.tagName);
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: 'No events found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

//get event by event type
async function getEventsByType(type) {
  try {
    const events = await Event.find({ eventType: type });
    return events;
  } catch (error) {
    console.log(error);
  }
}

app.get('/events/eventType/:type', async (req, res) => {
  try {
    const events = await getEventsByType(req.params.type);
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: 'No events found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get events' });
  }
});

// async function createEvent(newEvent) {
//   try {
//     const event = new Event(newEvent);
//     const saveEvent = await event.save();
//     return saveEvent;
//   } catch (error) {
//     console.log(error);
//   }
// }

// app.post('/events', async (req, res) => {
//   try {
//     const savedEvent = await createEvent(req.body);
//     res
//       .status(201)
//       .json({ message: 'Event added successfully', event: savedEvent });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add event.', error });
//   }
// });

//delete event by id
// async function deleteEvent(eventId) {
//   try {
//     const deletedEvent = await Event.findByIdAndDelete(eventId);
//     return deletedEvent;
//   } catch (error) {
//     console.log(error);
//   }
// }

// app.delete('/events/:eventId', async (req, res) => {
//   try {
//     const deletedEvent = await deleteEvent(req.params.eventId);
//     if (deletedEvent) {
//       res.status(200).json({ message: 'Event deleted successfully' });
//     } else {
//       res.status(404).json({ error: 'Event not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete a event' });
//   }
// });
