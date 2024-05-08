import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deleteclient,
  getclients,
  updateclient,
} from "../controllers/client.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getclients", getclients);
router.delete("/deleteclient/:clientId", verifyToken, deleteclient);
router.put("/updateclient/:clientId", verifyToken, updateclient);

export default router;
