import '../styles/MacroNutrients/MacroNutrients.css'
import '../styles/Header/Header.css'
import '../styles/Sidebar/Sidebar.css'
import '../styles/General.css'

import { Sidebar } from '../components/Sidebar'
import { MacroNutrients } from '../components/MacroNutrients'
import { DailyActivity } from '../components/DailyActivity'

import iconProtein from '../images/macro/protein-icon.png'
import iconCalories from '../images/macro/calories-icon.png'
import iconFat from '../images/macro/fat-icon.png'
import iconCarbs from '../images/macro/carbs-icon.png'

export function ProfilePage() {
    return <>
        <Sidebar />
        <main className='main_profile_container'>
            <section className='dashbord'>
                <DailyActivity />
                <section className='graph_container'>

                </section>
            </section>

            <section className="macro_container">
                <MacroNutrients values_name='Proteines' img_macro={iconCalories} />
                <MacroNutrients values_name='Calories' img_macro={iconProtein} />
                <MacroNutrients values_name='Lipides' img_macro={iconCarbs} />
                <MacroNutrients values_name='Glucides' img_macro={iconFat} />
            </section>
        </main>

    </>
}