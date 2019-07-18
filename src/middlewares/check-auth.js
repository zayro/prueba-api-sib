const jwt = require('jsonwebtoken');
const { checkToken } = require('../utils/tools');

const checkAuth = (req, res, next) => {
    try {

        /*
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        */

        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const checked = checkToken(token);

        //req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
        });
    }
};

module.exports = checkAuth;