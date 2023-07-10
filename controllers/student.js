const Students = require('../model/students_user');
const StudentsData = require('../model/students_data')
const Jwt = require('jsonwebtoken');
const Validator = require('validator');
// const { body, validationResult } = require('express-validator');
const { validateEmail, validateContactNumber } = require('../middleware/auth')
const Bcrypt = require('bcrypt');


const studentSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!Validator.isEmail(email)) {
            return res.status(403).send({ error: 'an invalid email format' });
        }
        if (password.length < 6) {
            return res.status(403).send({ error: 'A password must be 6 characters long or more' });
        }
        const existingUser = await Students.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }
        const hashedPassword = await Bcrypt.hash(password, 10);

        const student = new Students({ name, email, password: hashedPassword });
        let result = await student.save();

        // {
        // result = result.toObject();
        // delete result.password;
        // Jwt.sign({ result }, process.env.SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
        //     if (err) {
        //         res.send({ result: "Something went wrong, Please try again after sometime" })
        //     }
        //     res.send({ result, auth: token })
        // })
        // }

        return res.status(201).send({ message: 'Signup successful' });
    }
    catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).send({ error: 'Server error' });
    }


};

const studentLogin = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!Validator.isEmail(email)) {
            return res.status(403).send({ error: 'an invalid email format' });
        }
        if (Validator.isEmpty(password)) {
            return res.status(403).send({ error: 'can not be empty' });
        }

        const student = await Students.findOne({ email });
        if (!student) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const passwordMatch = await Bcrypt.compare(password, student.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        Jwt.sign({ student }, process.env.SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                return res.send({ result: "Something went wrong, Please try again after sometime" })
            }
            return res.status(200).send({ userId: student._id, auth: token });
        })

    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ error: 'Server error' });
    }

}

const addStudentsData = async (req, res) => {
    try {

        validateEmail(req.body.studentsInformation.email);
        validateEmail(req.body.parentsOrguardianInformation.father.email);
        validateEmail(req.body.parentsOrguardianInformation.mother.email);
        validateEmail(req.body.parentsOrguardianInformation.localGuardian.email);

        validateContactNumber(req.body.studentsInformation.contactNumber);
        validateContactNumber(req.body.parentsOrguardianInformation.father.contactNumber);
        validateContactNumber(req.body.parentsOrguardianInformation.mother.contactNumber);
        validateContactNumber(req.body.parentsOrguardianInformation.localGuardian.contactNumber);

        const newStudent = new StudentsData(req.body);

        await newStudent.save();

        res.status(201).send({ message: 'Student data added successfully' });
    } catch (error) {
        if (error === '') {
            // Handle validation errors
            res.status(400).json({ errors: error });
        }
        else {
            console.error(error);
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}


const getStudentsData = async (req, res) => {
    try {

        let studentsData = await StudentsData.find();
        if (studentsData.length > 0) {
            res.json(studentsData)
        } else {
            res.status(404).send({ message: 'No studentData found' });
        }
    }
    catch (err) {
        console.log('Error retrieving studentsData:', err);
        res.status(500).json({ error: 'Failed to retrieve studentsData' });
    }
}


const UpdateStudentsData = async (req, res) => {

    const _id = req.params.id;

    try {
        const student = await StudentsData.findByIdAndUpdate(_id, req.body, { new: true });
        if (!student) {
            // console.log('Student not found:', _id);
            return res.status(404).json({ message: 'Student not found' });
        }

        console.log('Student updated successfully:', student);
        res.json(student);
    }
    catch (err) {
        console.log('Error updating student:', err);
        res.status(500).json({ error: 'Failed to update student' });
    }
}

module.exports = { studentSignup, studentLogin, addStudentsData, getStudentsData, UpdateStudentsData };



// "YYYY-MM-DD"

