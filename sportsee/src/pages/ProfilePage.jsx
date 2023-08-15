import '../styles/MacroNutrients/MacroNutrients.css'
import '../styles/Header/Header.css'
import '../styles/Sidebar/Sidebar.css'
import '../styles/General.css'

import { Sidebar } from '../components/Sidebar'
import { MacroNutrients } from '../components/MacroNutrients'

export function ProfilePage() {
    return <>
        <Sidebar />
        <section className='dashbord'>
            <section className="activity_container"></section>
            <section className='graph_container'></section>
        </section>

        <section className="macro_container">
            <MacroNutrients />
            <MacroNutrients />
            <MacroNutrients />
            <MacroNutrients />
        </section>

    </>
}