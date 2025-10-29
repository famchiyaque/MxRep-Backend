const jwt = require('jsonwebtoken');

exports.generateJWTUseCase = (user) => {

    // Generate a mock JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiration
      },
        process.env.JWT_SECRET,
    );

    return token;
        
};