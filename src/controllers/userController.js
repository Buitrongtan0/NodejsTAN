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
        userData : userData.errCode,
        message:  userData.message,
        user : userData.user ?userData.user : {},
    })
}
module.exports = {
    handleLogin
};