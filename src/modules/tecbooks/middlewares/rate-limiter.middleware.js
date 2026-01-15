import rateLimit from "express-rate-limit"

const emailRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 20,
    statusCode: 429,
    message: "Too many requests, please try again later.",
})

export default emailRateLimiter