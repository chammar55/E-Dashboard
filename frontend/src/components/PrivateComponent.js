import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// we can alo name it privateRoute
function PrivateComponent() {
  const auth = localStorage.getItem("user");

  return auth ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateComponent;
