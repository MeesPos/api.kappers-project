import express from "express";
import controller from "../controllers/index";
const router = express.Router();

router.get("/", controller.getIndex);

export = router;
