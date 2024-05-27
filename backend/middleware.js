const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch(err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}



// req.userId = decoded.userId;
// Assuming the token was created with the userId as part of its payload, the decoded object will contain the userId. This line assigns the userId from the decoded token to req.userId, making it available to subsequent middleware and route handlers.

// Proceed to the Next Middleware/Route Handler:

// const token = jwt.sign({
//     userId: user._id
// }, JWT_SECRET);
// This creates a token with a payload containing the userId. When this token is sent to the client and then back to the server in subsequent requests, it allows the server to identify the user.