import jwt from "jsonwebtoken"

// JWT Expiration check
// - verifies signature
// - checks token validity
const verifyJWT = (req, res, next) => {
    // console.log("We just hit the verifyJWT middleware")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    // console.log("token pulled: ", token)

    if (!token) {
        console.log("There was no token, returning forbidden")
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded token: ", decoded)
      req.user = decoded; // Attach decoded payload to req.user
      next();
    } catch (err) {
      console.error("[Middleware Error] verifyJWT:", err.message);
      return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
    }
};

export default verifyJWT
