// //  import { where } from "sequelize"
import { where } from "sequelize";
import db from "../models/index"
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
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

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes :['email' , 'roleId','password'],
                    where: { email: email },
                    raw : true
                });
                if (user) {
                    let check =  bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `0k`;
                        // console.log(user);
                        delete user.password;
                        // console.log(user);
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
            resolve(userData)
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
let getAllUsers = (userId) => {
     return new Promise( async (resolve, reject) => {
         try {
             let users = '';
             if (userId==="ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                 })
             }
             if (userId && userId !== 'ALL'){
                 users = await db.User.findOne({
                     where: { id: userId },
                     attributes: {
                        exclude: ['password']
                    }
                })
             }
             resolve(users)
         } catch (e) {
             reject(e);
        }
     })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check ===true) {
                resolve({
                    errCode: 1,
                    message: "your email is already in user, pls try another email!"
                })
            }
            let hasdPasswordFromBcrypt = await hasdUserPassword(data.password);
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
            resolve({
                errCode: 0,
                message: '0k'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        let user = await db.User.findOne({
            where :{ id: id}
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `the user isn't exist`
            })
        }
        await db.User.destroy({
            where: {id : id}
        })
        resolve({
            errCode: 0,
            errMessage: "OK"
        })
    })
}
let updataUserData =(data) => {
    return new Promise( async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage:"Missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw : false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
            }
            resolve({
                errCode: 0,
                errMessage:"OK"
            })
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail :checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser, 
    deleteUser: deleteUser,
    updataUserData : updataUserData,
}