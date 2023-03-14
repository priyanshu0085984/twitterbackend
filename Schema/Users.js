const mongoose = require('mongoose'); //importing mongoose library and assigning it to a variable
const validateEmail = require('email-validator') //importing email-validator package to validate email

const UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"First name is required"],
        trim:true
    },
    lastname:{
        type:String,
        required:[true,"Last name is required"],
        trim:true
    },
    username:{
        type:String,
        required:[true,"A user must have a username"],
        unique:[true,"A user must have a unique username"],
        minlength:[6,"Username must have at least 6 characters"],
        maxlength:[30,"Username must have at max 30 characters"],
        enum:['user','guest','admin'], // user is not allowed to input these words
        validate:{
            validator: function(value){
                return /^[a-zA-Z0-9]+$/.test(value) // Only allow alphanumeric characters in username
            },
            message: props => `${props.value} is not a valid username!`
        },
        trim:true
    },
    email:{
        type:String,
        required:[true,"A user must have a username"],
        unique:[true,"Email Already exisits,Try using different email"],
        validate:{
            validator: function(v){ // v is the current value being validated
                return validateEmail.validate(v);
            },
            message: props => `${props.value} is not a valid email address!` // message is optional property which allows us to cutomize error message if validation fails
        },
        trim:true
    },
    password:{
        type:String,
        required:[true,"A user must have a password"],
        minlength: [8, 'Password must have at least 8 characters'],
        validate: {
            validator: function(value) {
              // Custom validation function here
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value); //password contains at least one lowercase letter, one uppercase letter, one digit, and is at least 8 characters long. 
            },
            message: props => `${props.value} is not a valid password!`
        },
        trim:true
    },
    age: {
        type: Number,
        min: [18, 'You must be 18 or older to register'],
        required: [true, 'Age is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        enum:["user",'admin','guest'],
        default:'user'
    },
    isSuperAdmin: {
		type: Boolean,
		default: false
	}
})

const User = mongoose.model("User","UserSchema","users");

module.exports = User;