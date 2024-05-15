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

    let userData = await USERservices.handleLogin(email, password);


    return res.status(200).json({
        userData
    })
}
module.exports = {
    handleLogin :handleLogin,
}