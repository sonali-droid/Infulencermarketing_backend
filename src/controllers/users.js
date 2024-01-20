const Users = require("../Models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const { name, phone, email, password } = req.body

    const _user = new Users({
        name, email, phone, password
    })
    console.log(password)

    const eUser = await Users.findOne({ email })

    if (!eUser) {
        _user.save().then(newUser => {
            return res.status(201).json({ message: "Account Created Successfully" })

        }).
            catch(error => {
                console.log(error)
                res.status(400).json
                    ({
                        message: "Error occured",
                        error
                    })
            })
    } else {
        return res.status(400).json
            ({ message: "User Already Exist", })

    }



}
exports.login = async (req, res) => {
    const { email, password } = req.body

    const eUser = await Users.findOne({ email })

    if (eUser) {

        if (eUser.password === password) {
            const token = jwt.sign({
                id: eUser._id
            }, "MyAPPSECRET", {
                expiresIn: "24h"
            })
            return res.status(200).json
                ({
                    message: "Login successfull",
                    token, isSuccess:true
                })

        } else {
            return res.status(401).json
                ({ message: "Unauthorized" })



        }


    } else {
        return res.status(404).json
            ({ message: "User Not Found Please Signup" })
    }
}