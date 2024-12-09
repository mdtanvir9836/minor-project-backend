const express = require("express");
const { createPageGroup } = require("../controllers/pagegroupController");

const router = express.Router();

router.post("/page-groups", createPageGroup);

module.exports = router;
