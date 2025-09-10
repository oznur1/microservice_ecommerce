
const amqp = require("amqplib");



// Business Logic'i yöneticek ve veritabanı ile iletişime geçicek

class AuthService{
     constructor() {
      this.channel=null;  
    this.initializeRabbitMq ();
   
 }

async initializeRabbitMq(){
    try{
    const connection=await amqp.connect(process.env.RABBİTMQ_URL)
     this.channel=await connection.createChannel();
     this.channel.assertExchange(process.env.RABBİTMQ_EXCHANGE,"topiC", {durable:true});
     await this.channel.assertQueue(process.env.RABBİTMQ_QUEUE)
     console.log("RabitMQ'ya bağlandı")
    }catch(error){
        console.log("RabbitMq baglanamadı",error)
    }
}

static async register() {}
static  async login() {}
static async refresh() {}
static async logout() {}
}

module.exports =AuthService