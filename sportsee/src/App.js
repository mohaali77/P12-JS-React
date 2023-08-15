import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  return <Routes>
    <Route path="/" element={<ProfilePage />} />
  </Routes>
}

export default App;

