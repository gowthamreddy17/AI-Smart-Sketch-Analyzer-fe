import React, { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, LogIn, UserPlus } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      <BackgroundLines className="flex items-center justify-center h-screen w-full bg-black text-white">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 bg-white/10 border border-white/20 p-8 rounded-xl backdrop-blur-md shadow-lg w-[320px] text-white"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-white/20 border border-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-white/20 border border-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="p-3 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold"
          >
            Login
          </button>
        </form>
      </BackgroundLines>

      {/* Floating Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock
          items={[
            { title: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
            {
              title: "Login",
              icon: <LogIn className="w-5 h-5" />,
              href: "/login",
            },
            {
              title: "Signup",
              icon: <UserPlus className="w-5 h-5" />,
              href: "/signup",
            },
          ]}
        />
      </div>
    </>
  );
};

export default Login;
