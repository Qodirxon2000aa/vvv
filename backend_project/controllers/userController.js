const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ message: "Username, password va role kiritilishi kerak" });
  }

  try {
    const newUser = new User({
      id: uuidv4(),
      username,
      password,
      role,
      avatarUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newUser.save();
    res.status(201).json({
      message: "Foydalanuvchi muvaffaqiyatli qo‘shildi",
      user: newUser,
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ id });
    if (!user) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    if (req.file && user.avatarUrl) {
      const oldAvatarPath = path.join(__dirname, '..', user.avatarUrl);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    user.username = username || user.username;
    user.password = password || user.password;
    user.role = role || user.role;
    user.avatarUrl = req.file ? `/uploads/${req.file.filename}` : user.avatarUrl;

    await user.save();
    res.status(200).json({
      message: "Foydalanuvchi muvaffaqiyatli yangilandi",
      user,
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({ id });
    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    if (user.avatarUrl) {
      const avatarPath = path.join(__dirname, '..', user.avatarUrl);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    res.status(200).json({
      message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};