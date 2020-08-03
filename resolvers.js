const { AuthenticationError } = require('apollo-server')

// Dummy user 
// const user = {
//     _id: "1",
//     name: "Michael",
//     email: "myou2k112@gmail.com",
//     picture: "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
// }

const authenticated = next => (root, args, context, info) => {
    if(!context.currUser){
        throw new AuthenticationError('You must be logged in')
    }
    return next(root, args, context, info)
}

module.exports = {
    Query: {
        me: authenticated((root, args, context) => context.currUser)
    }
}