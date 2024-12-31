const express = require("express");
const { create, getAll, update, remove } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, create);
router.get("/", protect, getAll);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;
