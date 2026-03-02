import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../features/user/components/Navbar";
import Footer from "../features/user/components/Footer";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = { type: "tween", duration: 0.5 };

export default function UserLayout() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      <motion.main
        className="flex-1"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
}
