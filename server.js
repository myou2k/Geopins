const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { findOrCreateUser } = require('./controllers/UserController')

const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true })
.then(() => {
    console.log("Databse Connected")
}).catch(err => {
    console.log(err)
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let authToken = null
        let currUser = null
        try {
            authToken = req.headers.authorization
            if(authToken){
                currUser = await findOrCreateUser(authToken)
            }
        } catch(error){
            console.error(`Unable to authorize user with token ${authToken}`)
        }

        return { currUser }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`)
})