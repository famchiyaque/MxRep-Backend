import authUseCases from "../use-cases/auth.use-cases.js"
import generateJWT from "../services/jwt/jwt.js"

export const login = async (req, res) => {
  try {
    // 1. parse email and password from query params
    const { email, password } = req.body;

    // 1. Action 1: userLogin model
    const user = await authUseCases.login(email, password);

    // 2. Action 2: generateJWT service
    const token = generateJWT(user, "7 days")

    res.cookie('jwt', token, {
            httpOnly: true,
        });

        return res.status(200).json({ 
            message: "Login successful",
            user: user 
        });

        
     
      }catch (error) {
        return res.status(401).json({ message: "Error: Credenciales inválidas" });
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