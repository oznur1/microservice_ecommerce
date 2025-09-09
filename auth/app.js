const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const helmet=require("helmet")
const rateLimit =require("express-rate-limit");
const authRoutes=require("./src2/auth.routes")
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();



// express uygulmasını oluştur
const app = express();


// mongodb'ye bağlan
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB'ye bağlandı"))
  .catch((err) => console.error("MongoDB'ye bağlantı hatası", err));


  // middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// rate limiter
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS,
});
app.use("/", limiter);


// route
app.use("/auth", authRoutes);


// hata middleware'i
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ status: "fail", message: err.message || "Bir şeyler ters gitti" });
})


// 404 middleware'i
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint bulunamadı" });
});


// dinlemeye başla
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth servisi ${PORT} portunda çalışıyor`);
});