import { Schema } from 'mongoose';

export const schema = {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  durationMs: {
    type: Number,
    required: true,
  },
  discNumber: {
    type: Number,
    required: true,
  },
  explicit: {
    type: Boolean,
    required: true,
  },
  externalIds: {
    type: Object,
    required: true,
  },
  isLocal: {
    type: Boolean,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  trackNumber: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  album: {
    type: Schema.Types.ObjectId,
    ref: 'SpotifyAlbum',
    required: true,
  },
  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SpotifyAlbum',
      required: true,
    },
  ],
};
