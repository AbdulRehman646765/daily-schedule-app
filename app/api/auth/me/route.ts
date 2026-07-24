import { NextResponse } from "next/server";
// import connectToDB from "@/lib/db";
// import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const { valid, decoded, message } = verifyToken(token);

    if (!valid || !decoded) {
      return NextResponse.json({ message: message || "Unauthorized" }, { status: 401 });
    }

    // await connectToDB();

    /*
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    */

    // Mock User Response based on decoded JWT
    const user = {
      _id: decoded.id,
      id: decoded.id,
      name: decoded.name || "User",
      email: decoded.email,
    };

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Me Route Error:", error);
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
}
