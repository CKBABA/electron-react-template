import { createHashRouter } from "react-router-dom";
import Capture from "@/capture";
import React from "react";

const router = createHashRouter([
  {
    path: "/",
    element: <Capture />,
  },
]);

export default router;
