const bcrypt = require('bcryptjs')
const saltRound = 10
const secretKey = 'PoINbwjnd23434%$#%$#^'
const jwt = require('jsonwebtoken')

const hashPassword = async (password) => {
    const salt = bcrypt.genSalt(saltRound)
    console.log('Salt', salt);
    const hashedPassword = bcrypt.hash(password, salt)
    return hashedPassword
}

const hashCompare = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

const createToken = async (email, password) => {
    const token = jwt.sign({ email, password }, secretKey, { expiresIn: '30m' })
    return token
}

const jwtDecode = async (token) => {
    let data = jwt.decode(token)
    return data
}

let validate = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1]
        let data = await jwtDecode(token)
        let currentTime = Math.round(new Date() / 1000)
        if (currentTime <= data.exp) {
            next()
        } else {
            res.send({
                statusCode: 401,
                message: "Token Expired"
            })
        }
    } else {
        res.send({
            statusCode: 401,
            message: "Invalid Token or No Token"
        })
    }
}
module.exports = { hashPassword, hashCompare, createToken, jwtDecode, validate }
