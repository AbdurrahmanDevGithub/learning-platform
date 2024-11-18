const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    }
  },

  password:{
    type:String,
    required:true,
    minlength: [6, 'Password must be at least 6 characters long']
  },

  role: {
    type: String,
    required: true,
    enum: ['user', 'tutor'], 
    default: 'user'
  }
});


userSchema.pre('save', async function(next){
  let user=this
  if(user.isModified('password')){
    const salt =await bcrypt.genSalt(10)
    const hash =await bcrypt.hash(user.password,salt)
    user.password = hash
  }
  next()
})

//Already email taken
userSchema.statics.emailIsTaken = async function(email){
  const user = await this.findOne({email})
  return !!user
}

// //Email verification
// userSchema.statics.verifyEmail = async function(email){
//   const user = await findOne({email})
//   return !!user
// }

//Verify Password
userSchema.methods.comparePassword = async function(candidatePassword){
  let user = this
  const match = await bcrypt.compare(candidatePassword,user.password)
  return match
}

const User = mongoose.model("User",userSchema);

module.exports = User
