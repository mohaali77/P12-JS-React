import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/HomePage";

function App() {
  return <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/user/:id" element={<ProfilePage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
}

export default App;

