import jwt from 'jsonwebtoken'

function getExpiryInSeconds(expiry) {
    switch (expiry) {
        case "7 days": return 7 * 24 * 60 * 60 // 7 days in seconds
        case "1 hour": return 60 * 60 // 1 hour in seconds
        case "30 minutes": return 30 * 60 // 30 minutes in seconds
        case "15 minutes": return 15 * 60 // 15 minutes in seconds
        default: throw new Error("Invalid expiry passed")
    }
}

function generateJWT(body, expiry) {
    try {
        const newExpiry = Math.floor(Date.now() / 1000) + getExpiryInSeconds(expiry)

        const token = jwt.sign(
            {
                body,
                exp: newExpiry
            },
            process.env.JWT_SECRET,
        )

        return token
    } catch (err) {
        throw new Error("Failed to make token: ", err)
    }
}

export default generateJWT