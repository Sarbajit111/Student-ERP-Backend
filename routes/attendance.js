const express = require('express')
const router = express.Router();
const {authenticateToken} = require('../middleware/auth');
const {takeAttendanceRecords, getAttendanceRecords, updateAttendanceRecords} = require("../controllers/attendance")


router.route('/').post(authenticateToken,takeAttendanceRecords);
router.route('/records').get(authenticateToken,getAttendanceRecords);
router.route('/records/:id').patch(authenticateToken, updateAttendanceRecords);


module.exports = router;