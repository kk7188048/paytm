const mongoose = require("mongoose");

const DB = 'mongodb+srv://kk7188048:admin@cluster0.wejddns.mongodb.net/paytm'

mongoose.set("strictQuery" , true);

mongoose.connect(DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Database Connected");
}).catch((err)=> console.log(err));


const userSchema = new mongoose.Schema({
  
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }

}, {timestamps: true});


const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Account = mongoose.model('Account', accountSchema);

const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};
