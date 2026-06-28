import * as tourService from "../services/tourService.js";

export async function getAllTours(req, res) {
  try {
    const tours = await tourService.getAllTours();
    res.json({ tours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getToursByStatus(req, res) {
  try {
    const { status } = req.params;
    const tours = await tourService.getToursByStatus(status);
    res.json({ tours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function searchTours(req, res) {
  try {
    const filters = req.query;
    const tours = await tourService.searchTours(filters);
    res.json({ tours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function bookTour(req, res) {
  try {
    const { tourId, adultsCount, childrenCount } = req.body;
    const updatedTour = await tourService.bookTour(
      tourId,
      adultsCount,
      childrenCount,
    );
    res.json({
      success: true,
      tour: updatedTour,
      message: "Tour booked successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
