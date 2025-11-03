import authUseCases from "../use-cases/auth.use-cases.js"
import generateJWT from "../services/jwt/jwt.js"

export const login = async (req, res) => {
  try {
    // 1. parse email and password from query params
    const { email, password } = req.body
    console.log("Email: ", email)
    console.log("Pass: ", password)

    // 1. Use Case 1: login and get user, institution
    const { user, institution } = await authUseCases.login(email, password)

    // 2. Service 1: Generate JWT for frontend session
    const token = generateJWT(user, "7 days")

    return res.status(200).json({
      success: true, 
      message: "Login successful",
      user: { user, institution },
      token: token
    });
     
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