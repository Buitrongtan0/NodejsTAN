import db from '../models/index'
import bcrypt  from 'bcryptjs';
const salt  = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hasdPasswordFromBcrypt = await hasdUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hasdPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true:false,
                roleId: data.roleid,
            })
            resolve('ok create a new user succeend')
        } catch(e) {
            reject(e);
        }
    })
    let hasdPasswordFromBcrypt = await hasdUserPassword(data.password);
    // console.log("data")
    // console.log(data)
    // console.log(hasdPasswordFromBcrypt)
}
let hasdUserPassword = (password) => {
    return new Promise (async (resolve, reject)=> {
        try {
            let hasdPassword = await bcrypt.hashSync(password, salt);
            resolve(hasdPassword)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser : createNewUser
}