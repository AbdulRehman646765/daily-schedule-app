// // lib/auth.ts
// import connectToDB from "./db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// interface RegisterInput {
//   name: string;
//   email: string;
//   password: string;
// }

// export async function registerUser({ name, email, password }: RegisterInput) {
//   try {
//     await connectToDB();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return { error: "User already exists" };
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     return { user: { id: user._id, name: user.name, email: user.email } };
//   } catch (err: any) {
//     return { error: err.message };
//   }
// }

// import jwt from "jsonwebtoken";

// export function verifyToken(token: string) {
//   try {
//     const secret = process.env.JWT_SECRET || "default_secret";
//     const decoded = jwt.verify(token, secret) as { id: string; email: string; name: string };
//     return { valid: true, decoded, message: null };
//   } catch (err: any) {
//     return { valid: false, decoded: null, message: err.message || "Invalid or expired token" };
//   }
// }

