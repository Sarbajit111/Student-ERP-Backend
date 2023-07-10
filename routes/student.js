const express = require('express')
const app = express();
const router = express.Router();
const multer = require('multer');
const path = require('path')
const {authenticateToken} = require('../middleware/auth');
const { studentSignup, studentLogin, addStudentsData, getStudentsData, UpdateStudentsData } = require('../controllers/student')

app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/students'), (err, success) => {
            if (err) throw err;
        });
    },
    filename: function (req, file, cb) {
        const file_name = Date.now() + '-' + file.originalname;
        cb(null, file_name, (err1, success) => {
            if (err1) throw err1;
        });
    }
});
const upload = multer({ storage: storage });

router.route('/signup').post(studentSignup);
router.route('/login').post(studentLogin);
router.route('/add_student_data').post([authenticateToken,upload.array('files', 3) ], addStudentsData);
router.route('/student_data').get(authenticateToken, getStudentsData);
router.route('/student_data/:id').patch(authenticateToken, UpdateStudentsData);


module.exports = router;