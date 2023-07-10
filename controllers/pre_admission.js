const pre_admission = require('../model/pre_admission');
const nodemailer = require("nodemailer");
const Validator = require('validator');


const addPreAdmissionData = async (req, res) => {
    const { name, email, contactNumber, studentId, source, status } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ima.hessel45@ethereal.email',
            pass: 'YabYe6kSXfUHEkHDW6'
        }
    });

    const mailOptions = {
        from: '"Soumya Halder 👻" <soumya@gmail.com>',
        to: email,
        subject: `Hello, ${name}`,
        text: `hii, ${name}`,
        html: `<b>what's up? is this your contact number ${contactNumber}?</b>`
    };

    try {

        if (!Validator.isEmail(email)) {
            return res.status(403).send({ error: 'an invalid email format' });
        }
        if (!Validator.isMobilePhone(contactNumber.toString(), "any")) {
            return res.status(403).send({ error: 'an invalid contact number' });
        }
        const existingUser = await pre_admission.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }
        const student = new pre_admission({ name, email, contactNumber, studentId, source, status });
        await student.save();

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern && error.keyPattern.email === 1) {
                return res.status(400).send({ error: 'Email already exists 2' });
            }
            if (error.keyPattern && error.keyPattern.contactNumber === 1) {
                return res.status(400).send({ error: 'Contact number already exists 2' });
            }
        }
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

const updatePreAdmissionData = async (req, res) => {
    const _id = req.params.id;
    try {
        const student = await pre_admission.findByIdAndUpdate(_id, req.body, { new: true });
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


module.exports = { addPreAdmissionData, updatePreAdmissionData } 