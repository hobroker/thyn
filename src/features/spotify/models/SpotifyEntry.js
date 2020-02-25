import { Schema } from 'mongoose';

export const schema = {
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
    type: Schema.Types.ObjectId,
    ref: 'SpotifyDevice',
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'SpotifyItem',
  },
};
