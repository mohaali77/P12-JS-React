import { Header } from "./components/Header";
import { MacroNutrients } from "./components/MacroNutrients";
import { Sidebar } from "./components/Sidebar";
import './styles/General.css'

function App() {
  return <>
    <Header />
    <Sidebar />
    <MacroNutrients />
  </>
}



export default App;
