
// -------Middlewares---------
// 2 kinds of middlewares:
// 1. Rate Limiter: 
//      limits apis that trigger email
//      service to 5 per hour by ip address (redis?)
// 2. Auth/Session Management:
//      - parses cookies from request
//      - verifies jwt
//      - checks expiration
// 3. RBAC:
//      - user has role to access this route


// -------------- MIDDLEWARES -----------------

// 1️⃣ Rate limiter (for email-triggering routes)
// import rateLimit from 'express-rate-limit';
// export const emailRateLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 5, // max 5 email sends per IP/hour
//   message: 'Too many requests, please try again later.',
// });

// JWT Expiration check
// - just verifies the expiry attribute of the jwt
// - needs to verify the signature first
// returns true/false or 200 OK

// 2️⃣ Auth & session management
// export const verifyJWT = (req, res, next) => {
//   const token = req.cookies?.jwt;
//   if (!token) return res.status(401).json({ error: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role, institution }
//     next();
//   } catch {
//     return res.status(403).json({ error: 'Invalid or expired token' });
//   }
// };

// 3️⃣ Role-based access control (RBAC)
// export const allowRoles = (...roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role))
//     return res.status(403).json({ error: 'Forbidden: Insufficient role' });
//   next();
// };
