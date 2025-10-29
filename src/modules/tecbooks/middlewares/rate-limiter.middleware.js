import rateLimit from "express-rate-limit"

const emailRateLimiter = (req, res, next) => {
  // rateLimit({
  //     windowMs: 60 * 60 * 1000, // 1 hour
  //     max: 5, // max 5 email sends per IP/hour
  //     message: "Too many requests, please try again later.",
  // })(req, res, next);
  console.log("We just hit the rate limiter middleware");
  next();
};

export default emailRateLimiter