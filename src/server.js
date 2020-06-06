const express = require ("express")
const server = express()
//inserir DB
const db = require("./datebase/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

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
    //req.query QUERY String da nossa url
    //console.log(req.query)
    return res.render("create-point.html", {saved: true})
})

server.post("/savepoint", (req,res)=>{
    //req.body corpo do formulario
    //inserir dados no BD
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?); `
    
    const valeus = [ 
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertDate(err){
        if(err){
            console.log(err)
            return res.send("create-point.html", {error: true})
        } 
        console.log("cadastrado com sucesso")
        //console.log(this)

        return res.send("create-point.html", {saved: true})
    }
    db.run(query, valeus, afterInsertDate)

})

server.get("/search-results", (req,res)=>{
    
    const search = req.query.search
    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }

    //pegar os dados do Banco
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("Erro no Cadastro!")
        }
        let total = rows.length 
        //console.log("Aqui estão seus resgistros")
        //console.log(rows)
        // mostar dados no HTML
        return res.render("search-results.html", {places: rows, total: total})
    }) 
})


//iniciar o servidor
server.listen(3000)