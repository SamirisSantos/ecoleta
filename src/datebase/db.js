// importa a dependencia do sqlite3
 const sqlite3 = require("sqlite3").verbose()

 //criar o objeto do bando de dados
const db = new sqlite3.Database("./src/datebase/database.db")
