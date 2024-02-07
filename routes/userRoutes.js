const express = require("express")
const router = express.Router()


const { loginUser, checkToken } = require("../controllers/userController")

router.post("/login", loginUser)
router.post("/checkToken", checkToken)

module.exports = router