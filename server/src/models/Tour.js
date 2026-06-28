import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: String, required: true },
  port: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, // e.g., "3 hours"
  image: { type: String },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: { type: Number, default: 0 },

  // Availability
  status: {
    type: String,
    enum: ["available", "prebooked", "sold_out"],
    default: "available",
  },
  totalSpots: { type: Number, required: true },
  bookedSpots: { type: Number, default: 0 },

  // Pricing by age
  pricing: {
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
  },

  // Schedule
  departureTime: String,
  returnTime: String,
  daysAvailable: [String], // ['Monday', 'Tuesday', etc.]

  // Category
  category: String, // 'beach', 'adventure', 'cultural', 'water', etc.
  ageRequirement: { type: String, default: "all" }, // 'all', 'adults_only', 'kids', etc.

  // Ratings & Reviews
  highlights: [String],
  includedItems: [String],
  excludedItems: [String],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Tour = mongoose.model("Tour", tourSchema);
