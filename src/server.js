const express = require ("express")
const server = express()

//configurar pasta publica
server.use(express.static("public"))

// utilizando tempalte engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/view", {
    express: server,
    noCache: true
})

//pagina inicial
server.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req,res)=>{
    res.sendFile(__dirname + "/views/create-point.html")
})

server.get("/search-results", (req,res)=>{
    res.sendFile(__dirname + "/views/search-results.html")
})

//iniciar o servidor
server.listen(3000)