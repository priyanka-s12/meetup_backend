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
      res.status(400).json({ error: 'No events found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

async function createEvent(newEvent) {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    console.log(error);
  }
}

app.post('/events', async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    res
      .status(201)
      .json({ message: 'Event added successfully', event: savedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event.', error });
  }
});

async function updateEvent(eventId, dataToUpdate) {
  try {
    const updateEvent = await Event.findByIdAndUpdate(eventId, dataToUpdate, {
      new: true,
    });
    return updateEvent;
  } catch (error) {
    console.log(error);
  }
}

app.post('/events/:eventId', async (req, res) => {
  try {
    const updatedEvent = await updateEvent(req.params.eventId, req.body);
    if (updatedEvent) {
      res
        .status(200)
        .json({ message: 'Event updated successfully', event: updatedEvent });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event', error });
  }
});
