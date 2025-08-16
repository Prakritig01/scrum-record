import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}


export interface IUserModel extends Model<IUser> {}


const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// 4️⃣ Pre-save hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 5️⃣ Instance method
userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

// 6️⃣ Model
userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
