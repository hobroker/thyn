import { Schema } from 'mongoose';

export default {
  volumePercent: {
    type: Number,
    required: false,
  },
  isPrivateSession: {
    type: Boolean,
    required: false,
  },
  shuffleState: {
    type: Boolean,
    required: false,
  },
  repeatState: {
    type: String,
    required: false,
  },
  progressMs: {
    type: Number,
    required: false,
  },
  timestamp: {
    type: Date,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  isPlaying: {
    type: Boolean,
    required: false,
  },
  device: {
    type: Schema.Types.Mixed,
    required: true,
  },
  item: {
    type: Schema.Types.Mixed,
    required: true,
  },
  album: {
    type: Schema.Types.Mixed,
    required: true,
  },
  artists: {
    type: [Schema.Types.Mixed],
    required: true,
  },
};
