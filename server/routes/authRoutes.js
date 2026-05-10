import crypto from "crypto";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      isVerified: true,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name,
        email,
      },
    });
  } catch (err) {
    console.log("REGISTER ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// LOGIN (Email/Password)
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Please login with Google or GitHub" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// GOOGLE LOGIN
// =========================
router.post("/google", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ message: "Access token required" });
    }

    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    const { email, name, sub: googleId } = googleResponse.data;

    if (!email) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        googleId,
        password: null,
        isVerified: true,
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("GOOGLE ERROR 👉", err);
    
    if (err.response?.status === 401) {
      return res.status(401).json({ message: "Invalid Google token" });
    }
    
    res.status(500).json({ message: "Google authentication failed" });
  }
});

// =========================
// GITHUB LOGIN (NEW ✅)
// =========================
router.post("/github", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Authorization code required" });
    }

    console.log("GitHub code received:", code);

    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      console.log("Failed to get access token:", tokenResponse.data);
      return res.status(400).json({ message: "Failed to get access token" });
    }

    console.log("Access token received");

    // Get user info from GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { email, name, id: githubId, login, avatar_url } = userResponse.data;

    console.log("GitHub user:", { email, name, login, githubId });

    // Get user's email if not public
    let userEmail = email;
    if (!userEmail) {
      const emailResponse = await axios.get("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const primaryEmail = emailResponse.data.find(e => e.primary === true);
      userEmail = primaryEmail?.email || `${login}@github.com`;
    }

    // Check if user exists
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      // Create new user
      user = await User.create({
        name: name || login,
        email: userEmail,
        githubId: String(githubId),
        password: null,
        isVerified: true,
        avatar: avatar_url,
      });
      console.log("New user created:", user.email);
    } else if (!user.githubId) {
      // Update existing user with githubId
      user.githubId = String(githubId);
      user.avatar = avatar_url || user.avatar;
      await user.save();
      console.log("Existing user updated with GitHub ID:", user.email);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log("GITHUB ERROR 👉", err.response?.data || err.message);
    res.status(500).json({ message: "GitHub authentication failed: " + (err.response?.data?.error_description || err.message) });
  }
});

// =========================
// GET CURRENT USER
// =========================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -resetToken -resetTokenExpiry");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.log("ME ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// FORGOT PASSWORD
// =========================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `http://localhost:3000/reset/${resetToken}`;

    console.log("RESET LINK 👉", resetLink);

    res.json({
      message: "Reset link generated",
      resetLink,
    });
  } catch (err) {
    console.log("FORGOT ERROR 👉", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// =========================
// CHANGE PASSWORD
// =========================
router.post("/change-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Google/GitHub users cannot change password here" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.log("CHANGE PASS ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// RESET PASSWORD
// =========================
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.log("RESET ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;