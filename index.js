require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// connecting to the db
require('./db/connect_db');



// import routers 
const admin_router = require('./routes/admin');
const student_router = require('./routes/student');
const preAdmission_router = require('./routes/pre_admission');
const attendance_router = require('./routes/attendance');


app.get('/', (req, res) => {
    res.send("Hello world!")
})

// other middlewares
app.use(express.json());
app.use(cors());


// using middleware or to set routes
app.use("/api/admin", admin_router);
app.use("/api/student", student_router);
app.use("/api/pre_admission", preAdmission_router);
app.use("/api/attendance", attendance_router);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})