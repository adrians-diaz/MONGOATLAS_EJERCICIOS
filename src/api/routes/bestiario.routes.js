const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const router = express.Router();
const upload = require("../../middlewares/file");
const {
  getAllBestias,
  getBestiasByID,
  createBestias,
  patchBestias,
} = require("../controllers/bestiario.controller");

router.get("/", getAllBestias);
router.get("/:id", getBestiasByID);

router.post("/", [isAuth], upload.single("image"), createBestias);
router.patch('/:id', [isAuth], patchBestias);

module.exports = router;