import { Router } from "express";
import main from "../../geminiApi.js";

const router = Router();

router.post("/prompt-post", async (req, res) => {
  try {
    const { preference } = req.body;

    const response = await main(preference);
    // const response = "Hello from backend";
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
