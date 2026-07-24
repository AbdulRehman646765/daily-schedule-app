// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
// import User from "@/models/User";
// import connectToDB from "@/lib/db";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    // await connectToDB();
    const body = await req.json();
    const { email } = body;

    /*
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    */

    // Mock Login response for Vercel deployment without MongoDB
    const mockUser = {
      id: "user_mock_123",
      name: email ? email.split("@")[0] : "User",
      email: email || "user@example.com",
    };

    // JWT Token
    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email, name: mockUser.name },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        message: "Login successful (Mock Mode)",
        user: mockUser,
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
