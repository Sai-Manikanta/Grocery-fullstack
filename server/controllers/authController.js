const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

const register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req?.body?.password, 10);

        let user = new User({
            ...req.body,
            password: hashedPassword
        });

        user = await user.save();

        res.status(200).json({
            status: 'success',
            message: 'user created',
            data: user
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            status: 'fail',
            message: 'something went wrong while registering user'
        })
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User not found with given email!',
                data: null
            })
        }

        const { _id, name, email: userEmail, mobileNumber, role, password: userPassword } = user;

        const isMatch = await bcrypt.compare(password, userPassword);

        if (!isMatch) {
            return res.status(400).json({
                status: 'failed',
                message: 'Passwords do not matched!',
                data: null
            })
        }

        const token = jwt.sign({ _id, name, email: userEmail, mobileNumber, role }, 'PSSMLKDP333');

        res.status(200).json({
            status: 'success',
            message: 'User Successfully logged in',
            data: {
                _id,
                name,
                email: userEmail,
                mobileNumber,
                role,
                token
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
            data: {}
        })
    }
}

module.exports = {
    register,
    login
}