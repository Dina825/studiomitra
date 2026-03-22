/**
 * Studio Routes - StudioMitra
 *
 * GET    /api/v1/studios          - List all studios
 * POST   /api/v1/studios          - Create a studio
 * GET    /api/v1/studios/:id      - Get studio by ID
 * PUT    /api/v1/studios/:id      - Update studio
 * DELETE /api/v1/studios/:id      - Delete studio
 */

const express = require("express");
const router = express.Router();
const StudioController = require("../../controllers/studio");

const studio = new StudioController();

router.get("/", studio.list.bind(studio));
router.post("/", studio.create.bind(studio));
router.get("/:id", studio.show.bind(studio));
router.put("/:id", studio.update.bind(studio));
router.delete("/:id", studio.remove.bind(studio));

module.exports = router;
