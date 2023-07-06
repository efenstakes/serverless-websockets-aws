const { object, string, } = require('yup')

// validate connection string data
module.exports.ConnectSchema = object({
    name: string().required().min(3).max(200),
})
