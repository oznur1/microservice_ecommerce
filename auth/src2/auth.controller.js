const { validateDto, registerSchema } = require("./auth.dto");
const AuthService = require("./auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const value = validateDto(registerSchema, req.body);

      const result = await AuthService.register(value);

      res.status(201).json(result);
    } catch (error) {
      if (error.message === "Email zaten kullanımda") {
        return res.status(409).json({ message: error.message });
      }
      next(error);
    }
  }

    async login(req,res){}

    async refresh(req,res){}

    async logout(req,res){}
}

module.exports=new AuthController();