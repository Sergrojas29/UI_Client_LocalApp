import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import CollageSelector from "./pages/CollageSelect";
import StartScreen from "./pages/StartScreen";
import PhotoCapture from "./pages/PhotoCapture";
import Processing  from "./pages/Processing";
import Result from "./pages/Result";
import Print from "./pages/Print";
import Download from "./pages/Download";
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
        path: "CollageSelect",
        element: <CollageSelector />,
      }, 
      {
        path: "PhotoCapture",
        element: <PhotoCapture />,
      },
      {
        path: "Processing",
        element: <Processing />,
      },
      {
        path: "Result",
        element:<Result/>,
      },
      {
        path: "Print",
        element:<Print/>,
      },
      {
        path: "Download",
        element:<Download/>,
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
