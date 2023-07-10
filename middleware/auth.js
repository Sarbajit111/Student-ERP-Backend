const Jwt = require('jsonwebtoken');
const Validator = require('validator');

const authenticateToken = (req, res, next) => {
    
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).send({error: 'No token provided'});
    }
    
    Jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if(err){
            return res.status(403).send({ message: 'Invalid token' });
        }

        req.user = decodedToken;
        next();
    })
}

// Function to validate email format
const validateEmail = (email) => {
    if (!Validator.isEmail(email)) {
      throw new Error('Invalid email format');
    }
  };
  
  // Function to validate contact number format
  const validateContactNumber = (contactNumber) => {
    if (!Validator.isMobilePhone(contactNumber)) {
      throw new Error('Invalid contact number format');
    }
  };

module.exports = {authenticateToken,validateEmail,validateContactNumber};
