//  import { where } from "sequelize"
import db from "../models/index"
import bcrypt  from 'bcryptjs';
let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email }
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `0k`
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage =`User's not found`
                }
               

            } else {
                userData.errCode = 1;
                userData.errMessage =`Your's Email isn't in your system. Plz try other email!`
            }
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise( async(resolve, recjet) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch(e) {
            recjet(e);
        }
    })
}

module.exports = {
    handleUserLogin:handleUserLogin,
}