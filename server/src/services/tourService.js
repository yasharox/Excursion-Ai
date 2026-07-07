import { Tour } from "../models/Tour.js";

export async function getAllTours() {
  return await Tour.find();
}

export async function getToursByStatus(status) {
  return await Tour.find({ status });
}

export async function getToursByDestination(destination) {
  return await Tour.find({ destination });
}

export async function getToursByCategory(category) {
  return await Tour.find({ category });
}

export async function updateTourStatus(tourId, status) {
  return await Tour.findByIdAndUpdate(tourId, { status }, { new: true });
}

export async function bookTour(tourId, adultsCount, childrenCount) {
  const tour = await Tour.findById(tourId);
  if (!tour) throw new Error("Tour not found");

  const bookedSpots = adultsCount + childrenCount;
  const availableSpots = tour.totalSpots - tour.bookedSpots;

  if (bookedSpots > availableSpots) {
    throw new Error("Not enough spots available");
  }

  tour.bookedSpots += bookedSpots;

  // Update status based on availability
  if (tour.bookedSpots >= tour.totalSpots) {
    tour.status = "sold_out";
  } else if (tour.bookedSpots > 0) {
    tour.status = "prebooked";
  }

  await tour.save();
  return tour;
}

export async function searchTours(filters) {
  const query = {};

  // ✅ FIX 1: Case-insensitive destination search
  if (filters.destination && filters.destination.trim()) {
    query.destination = { $regex: filters.destination, $options: "i" };
  }
  // ✅ FIX 2: Case-insensitive category search
  if (filters.category && filters.category.trim()) {
    query.category = { $regex: filters.category, $options: "i" };
  }
  if (filters.status) query.status = filters.status;
  // ✅ FIX 3: Convert price strings to numbers
  if (filters.minPrice) {
    const minPrice = parseFloat(filters.minPrice);
    if (!isNaN(minPrice)) {
      query["pricing.adults"] = { $gte: minPrice };
    }
  }
  if (filters.maxPrice) {
    const maxPrice = parseFloat(filters.maxPrice);
    if (!isNaN(maxPrice)) {
      if (query["pricing.adults"]) {
        query["pricing.adults"].$lte = maxPrice;
      } else {
        query["pricing.adults"] = { $lte: maxPrice };
      }
    }
  }

  console.log("🔍 Filter Query:", query); // Debug log
  const results = await Tour.find(query);
  console.log(`📊 Found ${results.length} tours`); // Debug log

  return results;
}
