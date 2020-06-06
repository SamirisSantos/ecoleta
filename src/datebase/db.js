// importa a dependencia do sqlite3
 const sqlite3 = require("sqlite3").verbose()

 //criar o objeto do bando de dados
const db = new sqlite3.Database("./src/datebase/database.db")


module.exports = db

//CRUD SQL
/*db.serialize(()=>{
//criar tabela
    db.run(` 
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
// add dados tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?); `
    
    const valeus = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "Paperside",
        "Guilherme Gemballa, Jardim America",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletronicos, Lampadas"
    ]

    function afterInsertDate(err){
        if(err){
            return console.log(err)
        } 
        console.log("cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, valeus, afterInsertDate)
  
//del um dado tabela
    db.run(`DELETE FROM places WHERE id=?`, [2], function(err){
        if(err){
            return console.log(err)
        } 
        console.log("Resgistro Apagado com sucesso")
    })

//consultar tabela
     db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        } 
        console.log("Aqui estão seus resgistros")
        console.log(rows)
    }) 
})*/