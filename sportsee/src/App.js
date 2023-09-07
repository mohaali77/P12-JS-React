import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

function App() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/user/:id" element={<ProfilePage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
}

export default App;

