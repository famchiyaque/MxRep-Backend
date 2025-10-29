const loginUseCases = require ("../../../domain/use-cases/tecbooks/login.use-cases.js");
const generateTokenUseCases = require ("../../../domain/use-cases/tecbooks/generateToken.use-cases.js");

exports.loginController = async (req, res) => {
  try {
    // 1. parse email and password from query params
    const { email, password } = req.body;

    // 1. Use case 1: userLogin
    const user = await loginUseCases.loginUseCase(email, password);

    // 2. Use case 2: generateJWT

    const token = generateTokenUseCases.generateJWTUseCase(user);

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

module.exports = {
  loginController,
};