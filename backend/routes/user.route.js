import express from "express";
import { getUserProfileAndRepos,likeProfile,getLikes } from "../controllers/user.controller.js";
import {ensureAuthenticated} from "../middlewares/ensureAuthenticated.js"


const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);

// Todo GET Likes (who liked your profiles)
router.get("/likes",ensureAuthenticated,getLikes)
// Todo Post like a profile
router.post("/like/:username",ensureAuthenticated,likeProfile)

export default router;
