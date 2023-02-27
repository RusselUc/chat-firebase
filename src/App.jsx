import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import Editor from "./components/Editor";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = () => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return <Home/>;
    }
  };
  return (
    <Editor/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/">
    //       <Route
    //         index
    //         element={
    //           <ProtectedRoute/>
    //         }
    //       />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
