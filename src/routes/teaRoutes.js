import { Router } from "express";
import {
  createTea,
  getAllTeas,
  getTea,
  updateTea,
  deleteTea,
} from "../controllers/teaController.js";

const router = Router();

router.route("/").post(createTea).get(getAllTeas);
router.route("/:id").patch(updateTea).get(getTea).delete(deleteTea);

export default router;
