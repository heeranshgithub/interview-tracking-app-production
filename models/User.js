import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true, // trims any extra space from start or end
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true, //not a validator in mongoDB docs
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false, //will not send back password. but, it will still send back in case of User.create.
    //but, will work fine for user.save() like in update user.
    //to not send in case of create, will just code the values that need to be sent
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true, // trims any extra space from start or end
    default: 'lastName',
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true, // trims any extra space from start or end
    default: 'my city',
  },
});

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());  
  if(!this.isModified('password')) return; //don't want to hash pass again for updateUser
  //password will get hashed in case of register. because User.create() doesn't invoke pre('save')
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//mongoose custom instance method. createJWT is the name of custom instance method.
//like user.save() is an in-built instance method
UserSchema.methods.createJWT = function () {
  // console.log(this); //logs user document
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model('User', UserSchema);
