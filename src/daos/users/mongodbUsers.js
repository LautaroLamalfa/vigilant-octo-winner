const res = require("express/lib/response");
const ContenedorMongoDb = require ("../../contenedores/contenedorMongo")

class chatMongoDb extends ContenedorMongoDb {

    constructor() {
        super('usuarios', {
            email:{type:String, required:true},
            password:{type:String, required:true}
        })
    }

    async user(username) {
        try {
            let docs = false;
            docs = await super.getAll();
            for (const doc of docs) {
                if (doc.email === username) {
                    return doc;
                }
            }
            return false
        }
        catch(err) {
            res.send(300).json("Error en user")
        }
    }
}



module.exports = chatMongoDb