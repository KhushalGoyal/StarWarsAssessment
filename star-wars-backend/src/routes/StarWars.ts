import { Router } from "express";
import StarWars from "../controllers/StartWars";

const router = Router();
router.get('/star-wars', StarWars.get)

export default router;