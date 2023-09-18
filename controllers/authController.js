import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
// all errors being sent to error middleware
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    //if all fields are not entered
    throw new BadRequestError('Please provide all values!');
  // if(name==='' || email==='' || password==='') throw new CustomAPIError('please provide all values');

  //check for email already in use
  const emailExists = await User.findOne({ email }); //don't need to do {email:email}, also can use User.exists

  if (emailExists) throw new BadRequestError('Email already in use!');

  if (password.length < 6)
    throw new BadRequestError('password must be longer than 6 characters!');
  const user = await User.create({ name, email, password }); //if mongoDB throws error here it will go to error middleware
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
      lastName: user.lastName,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('Please provide all values');

  const user = await User.findOne({ email }).select('+password'); //returns null if doesn't exist
  if (!user) throw new UnAuthenticatedError('Invalid email');
  // console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnAuthenticatedError('Invalid password');

  const token = user.createJWT();

  user.password = undefined; //with = null, password:null will come. but, with undefined it will completely get removed

  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body;
  if (!name || !lastName || !email || !location) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findById({ _id: req.user.userId }); //findOneAndUpdate will not trigger pre('save') & user.save() will.
  //password set to select:false

  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const changePassword = async (req, res) => {
  const { oldPass, newPass } = req.body;

  if (!oldPass || !newPass) {
    throw new BadRequestError('Please provide old password and new password.');
  }

  if (newPass.length < 6) {
    throw new BadRequestError('Password must be longer than 6 characters!');
  }

  const user = await User.findById({ _id: req.user.userId }).select(
    '+password'
  );

  const isPasswordCorrect = await user.comparePassword(oldPass);

  if (!isPasswordCorrect)
    throw new BadRequestError('Invalid old password.');

  user.password = newPass;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Password changed successfully!' });
};

export { register, login, updateUser, changePassword };
