import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      error: 'Invalid email and password',
    });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      profilePic: user.profilePic,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      shippingInfo: user.shippingInfo,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      profilePic: user.profilePic,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      number: user.shippingInfo.number,
      line1: user.shippingInfo.line1,
      line2: user.shippingInfo.line2,
      city: user.shippingInfo.city,
      state: user.shippingInfo.state,
      zip: user.shippingInfo.zip,
      country: user.shippingInfo.country,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isSeller = req.body.isSeller || user.isSeller;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      profilePic: updatedUser.profilePic,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone,
      shippingInfo: updatedUser.shippingInfo,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
