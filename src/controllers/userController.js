import USERservices from "../services/USERservices";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;


    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing Inputs parameter"
        })
    }

    let userData = await USERservices.handleUserLogin(email, password);


    return res.status(200).json({
        errCode :  userData.errCode,
        message:  userData.errMessage,
        user : userData.user ?userData.user : {},
    })
}
let handleGetAllUser = async (req,res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Misiing required parameters",
            users: []
       })
    }
    let users = await USERservices.getAllUsers(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: "0k",
        users
   })
}
let handleCreatrNewUser = async (req, res) => {
    let message = await USERservices.createNewUser(req.body)
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(300).json({
            errCode: 1,
            message: 'Mising required parameters '
        })
    }
    let message = await USERservices.deleteUser(req.body.id)
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(300).json({
            errCode: 1,
            message: 'Mising required parameters '
        })
    }
    let data = req.body;
    let message = await USERservices.updataUserData(data);
    return res.status(200).json(message)
}
let getAllCode = async (req, res) => {
    try {
        let data = await USERservices.getAllCodeService(req.query.type)
        return res.status(200).json({data })
    } catch (e)
    {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage : 'error from server'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreatrNewUser: handleCreatrNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllCode : getAllCode,
};