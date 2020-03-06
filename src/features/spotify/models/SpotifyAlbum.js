export default {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  totalTracks: {
    type: Number,
    required: true,
  },
};
