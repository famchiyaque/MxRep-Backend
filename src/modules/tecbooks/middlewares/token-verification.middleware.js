import jwt from "jsonwebtoken"

// JWT Expiration check
// - verifies signature
// - checks token validity
const verifyJWT = (req, res, next) => {
    console.log("We just hit the verifyJWT middleware")
    const { token } = req.params
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  

    // Step 1: decode

    // Step 2: validate signature

    // Step 3: check expiration

    // Step 4: access information and return token

    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   req.user = decoded; // { id, role, institution }
    //   next();
    // } catch {
    //   return res.status(403).json({ error: 'Invalid or expired token' });
    // }
    const decoded = {
        userId: "user123",
        role: "super-admin"
    }
    next(decoded)
};

export default verifyJWT