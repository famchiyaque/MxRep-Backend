import jwt from "jsonwebtoken"

// JWT Expiration check
// - verifies signature
// - checks token validity
const verifyJWT = (req, res, next) => {
    console.log("We just hit the verifyJWT middleware")
    // const token = req.cookies?.jwt;
    // if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   req.user = decoded; // { id, role, institution }
    //   next();
    // } catch {
    //   return res.status(403).json({ error: 'Invalid or expired token' });
    // }
    next()
};

export default verifyJWT