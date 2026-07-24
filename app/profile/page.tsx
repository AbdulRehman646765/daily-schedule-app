"use client";

import React from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User as UserIcon, Mail, LogOut, Calendar, ShieldCheck } from "lucide-react";
import PageTitle from "../components/pageTitle";

export default function ProfilePage() {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const profileImage = user?.profilePic || null;
  const fallbackLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <PageTitle text="👤 My Profile" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-200 text-purple-900"
        >
          {user ? (
            <div className="flex flex-col items-center text-center">
              {/* Profile Avatar */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-1 shadow-lg">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full bg-white"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-purple-700 flex items-center justify-center text-white text-4xl font-bold">
                      {fallbackLetter}
                    </div>
                  )}
                </div>
              </div>

              {/* User Name & Email */}
              <h2 className="text-3xl font-extrabold text-purple-950 mb-1">{user.name}</h2>
              {user.email && (
                <p className="text-purple-700 flex items-center gap-2 mb-6">
                  <Mail size={18} className="text-purple-500" />
                  {user.email}
                </p>
              )}

              {/* Status Badges */}
              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-3 bg-purple-600 text-white rounded-xl">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-purple-600 font-medium">Account Status</p>
                    <p className="text-sm font-semibold text-purple-900">Active Member</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-3 bg-pink-500 text-white rounded-xl">
                    <Calendar size={22} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-purple-600 font-medium">Planner Role</p>
                    <p className="text-sm font-semibold text-purple-900">Daily Organizer</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 w-full">
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold bg-purple-100 text-purple-800 hover:bg-purple-200 transition"
                >
                  Go to Schedule
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-2 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <UserIcon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">You are not logged in</h3>
              <p className="text-purple-700 mb-6">
                Please log in to view your profile and manage your personal daily schedule.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="py-3 px-8 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 text-white transition shadow-md"
              >
                Log In Now
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
