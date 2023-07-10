const express = require('express')
const router = express.Router();
const {adminSignup,adminLogin} = require("../controllers/admin")


router.route('/signup').post(adminSignup);
router.route('/login').post(adminLogin);


module.exports = router;