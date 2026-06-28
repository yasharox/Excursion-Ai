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

  if (filters.destination) query.destination = filters.destination;
  if (filters.category) query.category = filters.category;
  if (filters.status) query.status = filters.status;
  if (filters.minPrice) query["pricing.adults"] = { $gte: filters.minPrice };
  if (filters.maxPrice)
    query["pricing.adults"] = {
      ...query["pricing.adults"],
      $lte: filters.maxPrice,
    };

  return await Tour.find(query);
}
