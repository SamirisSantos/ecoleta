const express = require ("express")
const server = express()
//inserir DB
const db = require("./datebase/db.js")

//configurar pasta publica
server.use(express.static("public"))

// utilizando tempalte engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//pagina inicial
server.get("/", (req,res)=>{
    return res.render("index.html")
})

server.get("/create-point", (req,res)=>{
    return res.render("create-point.html")
})

server.get("/search-results", (req,res)=>{
    //pegar os dados do Banco
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        let total = rows.length 
        console.log("Aqui estão seus resgistros")
        console.log(rows)
        // mostar dados no HTML
        return res.render("search-results.html", {places: rows, total: total})
    }) 
})

//iniciar o servidor
server.listen(3000)