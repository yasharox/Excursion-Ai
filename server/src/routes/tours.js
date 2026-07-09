import express from "express";
import * as tourController from "../controllers/tourController.js";

const router = express.Router();

router.get("/", tourController.getAllTours);
router.get("/status/:status", tourController.getToursByStatus);
router.get("/search", tourController.searchTours);
router.post("/book", tourController.bookTour);
router.post("/cancel", tourController.cancelBooking);

export default router;
