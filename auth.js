const bcrypt = require('bcryptjs')
const saltRound = 10

const hashPassword = async (password)=>{
    const salt = bcrypt.genSaltSync(saltRound)
    console.log('Salt', salt);
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}

const hashCompare = async (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword)
}

module.exports = {hashPassword, hashCompare}
