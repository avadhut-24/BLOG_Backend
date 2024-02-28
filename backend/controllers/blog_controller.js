import mongoose from 'mongoose';
import Blog from '../models/blog_model.js';
import User from '../models/user_model.js';

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find(); //Finds all the blogs
  } catch (err) {
    return console.log(err);
  }

  if (!blogs) {
    return res.status(404).json({ message: 'blogs not found!' });
  }

  return res.status(200).json({ blogs });
};

export const addBlogs = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  // Check if userId is provided
  if (!user) {
    return res.status(400).json({ message: 'userId is required' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Create new blog document
    const newBlog = new Blog({
      title,
      description,
      image,
      user: user // Map userId to the user field
    });
    await newBlog.save({ session });

    // Step 2: Update corresponding user document
    await User.findByIdAndUpdate(
      user,
      { $push: { blogs: newBlog._id } }, // Add reference to the new blog in the user's blogs array
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: 'Blog created and user updated successfully', blog: newBlog });
  } catch (error) {
    // Abort the transaction if any error occurs
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ message: 'Failed to create blog and update user' });
  }
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description
    });
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(500).json({ message: 'Unable to update the blog' });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(500).json({ message: 'cannot find the blog!' });
  }
  return res.status(200).json({ blog });
};

export const deleteById = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndDelete(blogId);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(404).json({ message: 'blog not found to be deleted!' });
  }
  return res.status(200).json({ blog });
};
