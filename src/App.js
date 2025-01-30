import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Authenticate from "./components/Authenticate";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteForAuth from "./components/ProtectedRouteForAuth";
import Register from "./components/Register";
import DrawingMap from "./components/mapnew";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/auth" element={<Authenticate />}>
//           <Route
//             path="/auth/login"
//             element={
//               <ProtectedRouteForAuth>
//                 <Login>login</Login>
//               </ProtectedRouteForAuth>
//             }
//           />
//           <Route
//             path="/auth/register"
//             element={
//               <ProtectedRouteForAuth>
//                 <Register>register</Register>
//               </ProtectedRouteForAuth>
//             }
//           />
//         </Route>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

function App() {
  return <DrawingMap />;
}

export default App;
