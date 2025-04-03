import express from "express";
import TeamMember from "../models/TeamMember.js";

const router = express.Router();

// Get all team members
router.get("/", async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error });
  }
});

// Add a new member
router.post("/", async (req, res) => {
  try {
    const newMember = new TeamMember(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: "Error adding member", error });
  }
});

export default router;
