const express = require("express");
const router = express.Router();
const authController = require("../controller/auth")
const crudController = require("../controller/crud")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)

router.get("/checkuser/:id", authController.checkUser)
router.put("/like", crudController.like)
router.put("/unlike", crudController.unlike)
module.exports = router;
