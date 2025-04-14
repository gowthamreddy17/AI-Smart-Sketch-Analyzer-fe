// import { Link } from 'react-router-dom'
// import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
// import { WavyBackground } from '@/components/ui/wavy-background'
// import { FloatingDock } from '@/components/ui/floating-dock'
// import { Home, LogIn, UserPlus } from 'lucide-react'

// const Landing = () => {
//   const dockItems = [
//     {
//       title: 'Home',
//       icon: <Home className="w-5 h-5" />,
//       href: '/',
//     },
//     {
//       title: 'Login',
//       icon: <LogIn className="w-5 h-5" />,
//       href: '/login',
//     },
//     {
//       title: 'Signup',
//       icon: <UserPlus className="w-5 h-5" />,
//       href: '/signup',
//     },
//   ]

//   return (
//     <WavyBackground>
//       <div className="text-center mt-20 z-10">
//         {/* Animated Text */}
//         <div className="mb-6 text-2xl font-semibold text-white-800 dark:text-white">
//           <TextGenerateEffect
//             words="Welcome to the App"
//             duration={1.5}
//             filter
//           />
//         </div>

//         {/* Buttons */}
//         <div>
//           <Link to="/login">
//             <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
//               Login
//             </button>
//           </Link>
//           <Link to="/signup">
//             <button className="px-4 py-2 bg-green-500 text-white rounded">
//               Signup
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Floating Dock at the bottom-center */}
//       <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
//         <FloatingDock items={dockItems} />
//       </div>
//     </WavyBackground>
//   )
// }

import { Link } from "react-router-dom";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { SparklesCore as Sparkles } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { WavyBackground } from "@/components/ui/wavy-background";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, LogIn, UserPlus } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "@/assets/Animation.json";
import { motion } from "framer-motion";

const Landing = () => {
  const dockItems = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
    { title: "Login", icon: <LogIn className="w-5 h-5" />, href: "/login" },
    {
      title: "Signup",
      icon: <UserPlus className="w-5 h-5" />,
      href: "/signup",
    },
  ];

  return (
    <div className="w-full h-full bg-black">
      {/* === Hero Section === */}
      <section className="relative  w-full overflow-hidden bg-black h-[80vh]">
        {/* Sparkles Background */}
        <Sparkles
          id="sparkles-hero"
          className="absolute inset-0 z-0 h-full w-full"
          background="#000000"
          particleColor="#ffffff"
          minSize={1}
          maxSize={2}
          speed={1}
          particleDensity={25}
        />

        {/* App Name Top Left */}
        <div className="absolute top-20 left-10 text-white text-xl md:text-3xl font-bold z-20 text-green-300">
          ✨ EASA 📝
        </div>

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row h-full items-center justify-center px-6 md:px-16 py-10 gap-10">
          {/* Left: Static + Flip Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
            className="w-full md:w-2/3 space-y-6 text-center md:text-left z-10"
          >
            <h1 className="text-yellow-300 text-3xl md:text-5xl font-semibold leading-snug">
              Unleash your drawings and imaginations to&nbsp;
              <span className="block mt-4">
                <ContainerTextFlip
                  words={["Drawing", "Analyze", "Text Response"]}
                  interval={2000}
                />
              </span>
            </h1>
          </motion.div>

          {/* Right: Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="w-full md:w-1/3 max-w-xs sm:max-w-md"
            // className="w-full md:w-1/4 max-w-xs sm:max-w-sm"
          >
            <Lottie animationData={animationData} loop />
          </motion.div>
        </div>
      </section>

      {/* === Login/Signup Section === */}
      {/* <section className="relative h-screen w-full overflow-hidden bg-black"> */}
      <section className="relative h-full w-full overflow-hidden bg-black">
        <WavyBackground>
          <motion.div
            className="text-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {/* <div className="mb-20 text-white"><p>Hello</p></div> */}
            {/* <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl p-8 shadow-lg max-w-xl mx-auto"> */}
            <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl px-4 py-2 shadow-lg max-w-xl mx-auto">
              <div className="mb-6 text-3xl font-semibold text-white">
                <TextGenerateEffect
                  words="Welcome to the EASA App"
                  duration={1.5}
                  filter
                />
              </div>
              <div className="mb-6 text-xl font-semibold text-orange-300">
                Just Login and enjoy the features
              </div>
              <div className="space-x-4 text-center">
                <Link to="/login">
                  <button className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-5 py-2 rounded bg-green-600 hover:bg-green-700 text-white transition">
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </WavyBackground>

        {/* Floating Dock */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <FloatingDock items={dockItems} />
        </div>
      </section>
    </div>
  );
};

export default Landing;

// src/pages/Landing.tsx

// import { Link } from "react-router-dom";
// import ColourfulText from "@/components/ui/colourful-text";
// import { ContainerTextFlip } from "@/components/ui/container-text-flip";
// import { SparklesCore as Sparkles } from "@/components/ui/sparkles";
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
// import { WavyBackground } from "@/components/ui/wavy-background";
// import { FloatingDock } from "@/components/ui/floating-dock";
// import { Home, LogIn, UserPlus } from "lucide-react";
// import Lottie from "lottie-react";
// import animationData from "@/assets/animation.json";
// import { motion } from "framer-motion";

// const Landing = () => {
//   const dockItems = [
//     { title: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
//     { title: "Login", icon: <LogIn className="w-5 h-5" />, href: "/login" },
//     {
//       title: "Signup",
//       icon: <UserPlus className="w-5 h-5" />,
//       href: "/signup",
//     },
//   ];

//   return (
//     <div className="w-full h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
//       {/* === Scroll 1: Hero Section === */}
//       <section className="relative h-screen w-full snap-start overflow-hidden bg-black">
//         {/* Sparkles background */}
//         <Sparkles
//           id="sparkles-hero"
//           className="absolute inset-0 -z-10"
//           background="#020202"
//           particleColor="#8b5cf6"
//           speed={1}
//           particleSize={2}
//           particleDensity={100}
//         />

//         {/* Hero Content */}
//         <div className="flex flex-col md:flex-row h-full items-center justify-center px-6 md:px-16 py-10 gap-10">
//           {/* Left: Static + Flip Text */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//             className="w-full md:w-2/3 space-y-6 text-center md:text-left"
//           >
//             <h1 className="text-white text-3xl md:text-5xl font-semibold">
//               Unleash your drawings and imaginations to&nbsp;
//               <span className="block mt-4">
//                 <ContainerTextFlip
//                   words={["Drawing", "Analyze", "Text Response"]}
//                   interval={2000}
//                   textClassName="inline-block text-orangered"
//                 />
//               </span>
//             </h1>
//           </motion.div>

//           {/* Right: Lottie animation */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2 }}
//             className="w-full md:w-1/3 max-w-xs sm:max-w-md"
//           >
//             <Lottie animationData={animationData} loop />
//           </motion.div>
//         </div>
//       </section>

//       {/* === Scroll 2: Login/Signup Section === */}
//       <section className="relative h-screen w-full snap-start overflow-hidden">
//         <WavyBackground>
//           <motion.div
//             className="text-center mt-24 z-10"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 1 }}
//           >
//             <div className="mb-6 text-3xl font-semibold text-white">
//               <TextGenerateEffect
//                 words="Welcome to the App"
//                 duration={1.5}
//                 filter
//               />
//             </div>
//             <div className="space-x-4">
//               <Link to="/login">
//                 <button className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="px-5 py-2 rounded bg-green-600 hover:bg-green-700 text-white transition">
//                   Signup
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//         </WavyBackground>

//         {/* Floating Dock */}
//         <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
//           <FloatingDock items={dockItems} />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Landing;

// import { Link } from 'react-router-dom'

// const Landing = () => {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Welcome to the App</h1>
//       <div style={{ marginTop: '20px' }}>
//         <Link to="/login">
//           <button style={{ marginRight: '10px' }}>Login</button>
//         </Link>
//         <Link to="/signup">
//           <button>Signup</button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Landing
