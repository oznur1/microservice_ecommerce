const { validateDto, registerSchema, loginSchema } = require("./auth.dto");
const AuthService = require("./auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const value = await validateDto(registerSchema, req.body);

      const { refreshToken, ...result } = await AuthService.register(value);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }).status(201).json(result);

    } catch (error) {
      if (error.message === "Email zaten kullanımda") {
        return res.status(409).json({ message: error.message });
      }
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const {email,password} = await validateDto(loginSchema, req.body);
     
    const { refreshToken, ...result } = await AuthService.login(email, password);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }


  
  async refresh(req, res, next) {
   
  }

  async logout(req, res, next) {
   
}
}

module.exports = new AuthController();
