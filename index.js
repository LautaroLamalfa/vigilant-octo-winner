const express = require ("express");
const session = require ("express-session");
const passport = require("passport");

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
const login = require("./routes/login");
app.use("/api/login", login);
const logout = require("./routes/logout")
app.use("/api/logout", logout);
const chatRoute = require ("./routes/chat");
app.use("/api/chat", chatRoute);
const prodRoute = require ("./routes/productos");
app.use("/api/products", prodRoute);
const register = require ("./routes/register");
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