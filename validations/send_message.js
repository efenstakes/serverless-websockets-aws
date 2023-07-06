const { object, string, } = require('yup')


// validate send message data
module.exports.SendMessage = object({
    to: string().optional().min(3).max(200),
    from: string().required().min(3).max(200),
    text: string().required().min(0).max(800),
    image: string().optional().min(3).max(200),
})

