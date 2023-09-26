const jwt = require('jsonwebtoken');

const decodeToken = (req, res, next) => {
    jwt.verify(req.headers['x-auth-token'], 'PSSMLKDP333', (error, decodedToken) => {
        if (error) {
            console.error('Token verification failed:', error);
        } else {
            req.user = decodedToken;
        }
    });

    next();
}

module.exports = decodeToken;