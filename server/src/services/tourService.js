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

export async function changeStatus(tourId, status) {
  const tour = await Tour.findById(tourId);

  if (!tour) {
    throw new Error("Tour not found");
  }
  tour.status = status;

  await tour.save();
  return tour;
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

  // ✅ Destination - case-insensitive
  if (filters.destination && filters.destination.trim()) {
    query.destination = { $regex: filters.destination, $options: "i" };
  }

  // ✅ Category - case-insensitive
  if (filters.category && filters.category.trim()) {
    query.category = { $regex: filters.category, $options: "i" };
  }

  // ✅ AGE GROUP - NOW FIXED!
  if (filters.ageGroup && filters.ageGroup.trim()) {
    // Map frontend values to database values
    const ageGroupMap = {
      "": "",
      adults_only: "Adults Only",
      family: "Family Friendly",
      kids: "Kids",
    };

    const mappedAgeGroup = ageGroupMap[filters.ageGroup] || filters.ageGroup;
    if (mappedAgeGroup) {
      query.ageGroup = mappedAgeGroup;
    }
  }

  // Status filter
  if (filters.status) {
    query.status = filters.status;
  }

  // ✅ MIN PRICE - now checks both 'price' and 'pricing.adults'
  if (filters.minPrice) {
    const minPrice = parseFloat(filters.minPrice);
    if (!isNaN(minPrice)) {
      query.$or = query.$or || [];
      query.$or.push(
        { "pricing.adults": { $gte: minPrice } },
        { price: { $gte: minPrice } },
      );
    }
  }

  // ✅ MAX PRICE - now checks both 'price' and 'pricing.adults'
  if (filters.maxPrice) {
    const maxPrice = parseFloat(filters.maxPrice);
    if (!isNaN(maxPrice)) {
      if (!query.$or) {
        query.$or = [];
      }
      query.$or.push(
        { "pricing.adults": { $lte: maxPrice } },
        { price: { $lte: maxPrice } },
      );
    }
  }

  // Handle combined min and max price
  if (filters.minPrice && filters.maxPrice) {
    const minPrice = parseFloat(filters.minPrice);
    const maxPrice = parseFloat(filters.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      query.$and = [
        {
          $or: [
            { "pricing.adults": { $gte: minPrice, $lte: maxPrice } },
            { price: { $gte: minPrice, $lte: maxPrice } },
          ],
        },
      ];
    }
  }

  console.log("🔍 Filter Query:", JSON.stringify(query, null, 2)); // Debug
  const results = await Tour.find(query);
  console.log(`📊 Found ${results.length} tours`); // Debug

  return results;
}
