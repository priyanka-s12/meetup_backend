const mongoosee = require('mongoose');

const eventSchema = new mongoosee.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ['Both', 'Online', 'Offline'],
      default: 'Both',
      required: true,
    },
    eventHostedBy: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    eventTags: [
      {
        type: String,
        required: true,
      },
    ],
    eventStartTime: {
      type: Date,
      required: true,
    },
    eventEndTime: {
      type: Date,
      required: true,
    },
    speakers: [
      {
        name: {
          type: String,
          required: true,
        },
        designation: {
          type: String,
          required: true,
        },
        profileImgUrl: {
          type: String,
          required: true,
        },
      },
    ],
    pricing: {
      type: Number,
      required: true,
    },
    eventVenue: {
      type: String,
      required: true,
    },
    eventAddress: {
      type: String,
      required: true,
    },
    age: String,
    dressCode: String,
  },
  { timestamps: true }
);

const Event = mongoosee.model('Event', eventSchema);

module.exports = Event;
