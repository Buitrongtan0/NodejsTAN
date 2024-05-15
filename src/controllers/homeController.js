import db from '../models/index'
import CRUDservices from '../services/CRUDservices';

let getHomePage = (req, res) => {
    return res.send(" helo world tan");
}
let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}
let postCRUD = async (req, res) => {
    let message =  await CRUDservices.createNewUser(req.body)
    console.log(message)
    return res.send("post CRUD")
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}
