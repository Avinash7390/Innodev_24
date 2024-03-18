import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

//update user
export const updateUser = async (req, res, next) => {
  const emailSchema = z.string().email().refine(email => email.endsWith('@gmail.com') || email.endsWith('@mnnit.ac.in'));
  const usernameSchema = z.string().min(1).max(20).refine(username => /^[a-zA-Z0-9]+$/.test(username));
  const passwordSchema = z.string().min(6).max(100);

  const { username, email, password } = req.body;

  const { success: emailSuccess, error: emailError } = emailSchema.safeParse(email);
  if (!emailSuccess) {
    return next(errorHandler(400, "Invalid Email , It should end with @gmail.com or @mnnit.ac.in"));
  }

  const { success: usernameSuccess, error: usernameError } = usernameSchema.safeParse(username);
  if (!usernameSuccess) {
    return next(errorHandler(400, "Invalid Username , It should contain only alphanumeric characters"));
  }

  const { success: passwordSuccess, error: passwordError } = passwordSchema.safeParse(password);
  if (!passwordSuccess) {
    return next(errorHandler(400, "Invalid Password , It should contain atleast 6 characters"));
  }

  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "You can only update your account"));
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          password: hashedPassword,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin &&req.user.id != req.params.id) {
    return next(errorHandler(401, "You can delete only your account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted ...");
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin &&!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find({ isAdmin: false })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};