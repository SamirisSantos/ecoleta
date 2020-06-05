const express = require ("express")
const server = express()

//pagina inicial
server.get("/", (req,res)=>{
    res.send("Servidor rodando")
})

//iniciar o servidor
server.listen(3000)