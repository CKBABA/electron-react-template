import { createHashRouter } from "react-router-dom";
import Capture from "@/capture";
import React from "react";

const router = createHashRouter([
  {
    path: "/",
    element: <Capture />,
  },
  {
    path: "/two",
    element: (
      <>
        <button> 231 </button>
      </>
    ),
  },
]);

export default router;
