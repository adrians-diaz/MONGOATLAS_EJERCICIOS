const express = require("express");

const { isAuth } = require("../../middlewares/auth.middleware");
const router = express.Router();
const upload = require("../../middlewares/file");
const {getAllRelatos, getRelatosByID, createRelatos, deleteRelatos} = require("../controllers/relatos.controller");

router.get("/", getAllRelatos);
router.get("/:id", getRelatosByID);
router.post("/", [isAuth], upload.single("image"), createRelatos);
router.patch('/:id', [isAuth], deleteRelatos);

module.exports = router;