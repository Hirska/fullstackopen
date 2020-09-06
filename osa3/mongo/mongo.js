const mongoose = require('mongoose');

if(process.argv.length< 3) {
    console.log('Give password as argument')
    process.exit(1);
}

const password = process.argv[2]
const url = `mongodb+srv://dbUser:${password}@cluster0.zw9px.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = {
    name : String,
    number: String
}

const User = mongoose.model('User', userSchema)

if(process.argv.length < 5) {
    User.find({}).then(response => {
        response.forEach(user => {
            console.log(`${user.name} ${user.number}`)
        })
        mongoose.connection.close();
    })
} else {
    const user = new User({
        name: process.argv[3],
        number: process.argv[4],
    })
    user.save().then(response => {
        console.log(`added ${response.name} number ${response.number} to phonebook`)
        mongoose.connection.close()
    }).catch(error => console.log("Error occured"))
}
