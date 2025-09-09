const amqp = require("amqplib");
const User = require("./auth.model");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor() {
    this.channel = null;
    this.initializeRabbitMq();
  }

  async initializeRabbitMq() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await connection.createChannel();

      await this.channel.assertExchange(
        process.env.RABBITMQ_EXCHANGE,
        "topic",
        { durable: true }
      );

      await this.channel.assertQueue(process.env.RABBITMQ_QUEUE);

      console.log("RabbitMQ'ya bağlandı");
    } catch (error) {
      console.log("RabbitMQ bağlanamadı", error);
    }
  }

  static generateToken(user) {
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }

  static async register(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email zaten kullanımda");
    }

    const user = new User(userData);

    const tokens = AuthService.generateToken(user);
    user.refreshToken = tokens.refreshToken;

    await user.save();

    return { user, ...tokens };
  }

  static async login(userData) {
    // TODO: login mantığı
  }

  static async refresh(token) {
    // TODO: refresh mantığı
  }

  static async logout(userId) {
    // TODO: logout mantığı
  }
}

module.exports = AuthService;

