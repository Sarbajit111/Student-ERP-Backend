const Admins = require('../model/admin_user');
const Jwt = require('jsonwebtoken');
const Validator = require('validator');
const Bcrypt = require('bcrypt');


const adminSignup = async (req, res) => {
    const {name, email, password, user_role } = req.body;

    try {

        if (!Validator.isEmail(email)) {
            return res.status(403).send({ error: 'an invalid email format' });
        }
        if (password.length < 6) {
            return res.status(403).send({ error: 'A password must be 6 characters long or more' });
        }
        const existingUser = await Admins.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }
        const hashedPassword = await Bcrypt.hash(password, 10);

        const admin = new Admins({name, email, password: hashedPassword, user_role });
        let result = await admin.save();

        return res.status(201).send({ message: 'Signup successful' });
    }
    catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).send({ error: 'Server error' });
    }
};


const adminLogin = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        if (!Validator.isEmail(email)) {
            return res.status(403).send({ error: 'an invalid email format' });
        }
        if (Validator.isEmpty(password)) {
            return res.status(403).send({ error: 'can not be empty' });
        }

        const admin = await Admins.findOne({ email });
        if (!admin) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const passwordMatch = await Bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        Jwt.sign({ admin }, process.env.SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                return res.send({ result: "Something went wrong, Please try again after sometime" })
            }
            return res.status(200).send({ userId: admin._id, auth: token });
        })

    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ error: 'Server error' });
    }

}



module.exports = {adminSignup,adminLogin};