import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: false,
      default: null,
      minlength: 6,
    },

    // 🔐 Google OAuth
    googleId: {
      type: String,
      default: null,
      sparse: true,
      index: true,
    },

    // 🔐 GitHub OAuth
    githubId: {
      type: String,
      default: null,
      sparse: true,
      index: true,
    },

    // ✅ Email verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    // 🔐 Forgot Password Support
    resetToken: {
      type: String,
      default: null,
    },

    resetTokenExpiry: {
      type: Date,
      default: null,
    },

    // 📅 Timestamps
    lastLogin: {
      type: Date,
      default: null,
    },

    // 👤 Profile
    avatar: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ✅ Compound indexes for faster queries
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ githubId: 1 });
userSchema.index({ resetToken: 1 });

// ✅ Virtual fields (optional)
userSchema.virtual("isOAuthUser").get(function () {
  return this.googleId !== null || this.githubId !== null;
});

userSchema.virtual("hasPassword").get(function () {
  return this.password !== null && this.password !== undefined;
});

// ✅ To JSON options (hide sensitive data)
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.resetToken;
    delete ret.resetTokenExpiry;
    delete ret.__v;
    return ret;
  },
});

// ✅ Method to check if user can login with password
userSchema.methods.canLoginWithPassword = function () {
  return this.password !== null && this.password !== undefined && this.password.length > 0;
};

// ✅ Static method to find or create OAuth user
userSchema.statics.findOrCreateOAuthUser = async function (provider, profile) {
  const query = {};
  
  if (provider === "google") {
    query.googleId = profile.id;
  } else if (provider === "github") {
    query.githubId = profile.id;
  }
  
  let user = await this.findOne(query);
  
  if (!user) {
    user = await this.create({
      name: profile.name,
      email: profile.email,
      [`${provider}Id`]: profile.id,
      isVerified: true,
      lastLogin: new Date(),
    });
  } else {
    user.lastLogin = new Date();
    await user.save();
  }
  
  return user;
};

export default mongoose.model("User", userSchema);