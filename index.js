const express = require ("express");
const session = require ("express-session");
const passport = require("passport");


const chatRoute = require ("./routes/chat");
const prodRoute = require ("./routes/productos");
const login = require("./routes/login")
const logout = require("./routes/logout")
const register = require ("./routes/register")

const app = express()

app.use(
  session({
  secret: "desafio11",
  resave:false,
  saveUninitialized:false,
  rolling:true, 
  cookie: {maxAge:  600000},
}))


//Midelware
app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(passport.session())


//Routes
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/chat", chatRoute);
app.use("/api/products", prodRoute);
app.use("/api/register", register)

//Servidor HTTP
const http = require("http");
const server = http.createServer(app)

//Servidor de Socket
const { Server } = require ("socket.io");
const io = new Server(server)

io.on("connection", (socket)=> {
    socket.emit("render", "")
    socket.on("actualizacion", ()=>{
      io.sockets.emit("render", "")
    })
  })

server.listen(8081, () => {
    console.log("Servidor 👍 por 8081")
})