import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashEvents from "../components/DashEvents";

import DashUsers from "../components/DashUsers";

import { motion } from 'framer-motion';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <motion.div className="transition-all duration-1000  min-h-screen flex flex-col md:flex-row"
    initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}>

      <div className="md:w-56">
        <DashSidebar />
      </div>

      {tab === "profile" && <DashProfile />}
     {tab==="events" &&<DashEvents/>}
     {tab === 'users' && <DashUsers />}

    </motion.div>
  );
};

export default Dashboard;
