const mongoose = require('mongoose')
const Roles = require('./models/Roles')
const MONGO_URL = `mongodb+srv://debbaner1:GCjhYPYqEMtQoRoT@cluster0.ptuzqyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


mongoose.connect(MONGO_URL, {

})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo...')
})
mongoose.connection.on('error', (err) => {
    console.log('error connecting...', err)
})


async function genRoles() {
    try {
        const rolesData = await Roles.find();
    }
    catch (e) {
        console.log(e);
    }
}

genRoles();