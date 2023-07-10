const express = require('express')
const router = express.Router();
const { addPreAdmissionData, updatePreAdmissionData } = require("../controllers/pre_admission")


router.route('/mail').post(addPreAdmissionData);
router.route('/:id').patch(updatePreAdmissionData);


module.exports = router;