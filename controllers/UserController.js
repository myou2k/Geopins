const User = require('../models/User')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

exports.findOrCreateUser = async token => {
    // Verify Token
    // Check if user exists
    // Return or create new in db

    const googleUser = await verifyAuthToken(token)
    const user = await checkIfUserExists(googleUser.email)

    return user ? user : createUser(googleUser)
}

const verifyAuthToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        })

        return ticket.getPayload()
    } catch (err) {
        console.error(`Error verifying token, ${err}`)

    }
}

const checkIfUserExists = async email => await User.findOne({ email }).exec() // Executes the query to return as promise

const createUser = googleUser => {
    const { name, email, picture } = googleUser
    const user  = { name, email, picture }
    return new User(user).save()
}