import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import CollageSelector from "./pages/CollageSelector";
import StartScreen from "./pages/StartScreen";
// import Settings from "./pages/Settings";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "StartScreen",
        element: <StartScreen />,
      },
      {
        path: "CollageSelector",
        element: <CollageSelector />,
      },
      // {
      //   path: "about",
      //   element: <About />,
      // },
      // {
      //   path: "settings",
      //   element: <Settings />,
      //   children: [
      //     {
      //       path: "profile",
      //       element: <Profile />,
      //     },
      //   ],
      // },
    ],
  },
]);
