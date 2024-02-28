import User from '../models/user_model.js';

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: 'No user found' });
  }

  return res.status(200).json({ users });
};

export const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res.status(404).json({ message: 'User Already exists! Login instead! ' });
  }

  const user = new User({
    name,
    email,
    password,
    blogs: []
  });

  try {
    await user.save(); //saves new user in the db
  } catch (err) {
    return console.log(err);
  }

  return res.status(201).json({ user });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: 'User don not exits! Need to singup!' });
  }

  if (password != existingUser.password) {
    return res.status(404).json({ message: 'Incorrect Password' });
  }

  return res.status(404).json({ message: 'user Loged In successfully' });
};
