import express from "express";
import fetchUser from "../middleware/fetchuser.js";
import Notes from "../models/Notes.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

// Routes 1 : Get all the notes /api/notes/fetchallnotes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Routes 2 : Add the notes /api/notes/addnotes
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title")
      .notEmpty()
      .withMessage("Enter a valid title")
      .isLength({ min: 3 }),
    body(
      "description",
      "Please provide a description it should be atleast 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Send error response with validation messages
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
