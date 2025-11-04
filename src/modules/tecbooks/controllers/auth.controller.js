import authUseCases from "../use-cases/auth.use-cases.js"
import generateJWT from "../services/jwt/jwt.js"

export const login = async (req, res) => {
  try {
    // 1. parse email and password from query params
    const { email, password } = req.body
    // console.log("Email: ", email)
    // console.log("Pass: ", password)

    // 1. Use Case 1: login and get user, validate, get institution
    const { user, institution } = await authUseCases.login(email, password)
    // console.log("user found: ", user)
    // console.log("institution found: ", institution)

    // 2. Service 1: Generate JWT for frontend session
    const token = generateJWT(user, "15 minutes")
    // console.log("Token being returned: ", token)

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        ...user.toObject?.() || user, // convert Mongoose doc if needed
        institution: institution ? {
          name: institution.name,
          slug: institution.slug,
          city: institution.city,
          country: institution.country,
        } : null
      }
    })
     
    } catch (error) {
      console.error("Error authenticating user: ", error)
      return res.status(401).json({ message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
  console.log("forgot password")

  res.status(400).message({ success: true })
}

const authController = {
  login,
  forgotPassword
}

export default authController