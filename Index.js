const express = require("express")
const mongoose = require("mongoose")
const { register, login } = require("./src/controllers/users")
const server = express()
const cors = require("cors")
const { validateForm, IsValidated} = require('./src/Middleware/Index')
const { addForm } = require("./src/controllers/Form")
const http = require('http')
const app = http.createServer(server)
const {Server} =  require("socket.io")
const { constants } = require("buffer")
const { Socket } = require("dgram")
const io = new Server(app)

server.use(express.json())
server.use(cors())



server.get("/", (req, res) => {

    return res.status(200).json({

        uname: "Sonali",
        uphone: "000000000"
    })

})

server.post("/register", register)
server.post("/login" , login)
server.post("/addForm",validateForm,IsValidated,addForm)

io.on("connection",socket =>{
   console.log("new user connected");
   socket.on("message",(message,room)=> {
    console.log(`New message received in ${room} and message is ${message}`);
    socket.to(room).emit("message",message)
   })
  
   socket.on("join",(room)=>{
    socket.join(room)
    socket.emit("joined")
   })
})




app.listen("3000", () => {
    console.log("Server Started")

})

mongoose.connect("mongodb://localhost:27017/School")
    .then(data => console.log("Database Connected"))
    .catch(error => console.log("Error"))