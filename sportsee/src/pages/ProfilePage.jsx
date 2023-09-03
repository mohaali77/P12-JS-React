import '../styles/MacroNutrients/MacroNutrients.css'
import '../styles/Header/Header.css'
import '../styles/Sidebar/Sidebar.css'
import '../styles/DailyActivity/DailyActivity.css'
import '../styles/ProgressGraph/ProgressGraph.css'
import '../styles/HexagonGraph/HexagonGraph.css'
import '../styles/DurationGraph/DurationGraph.css'
import '../styles/ProfilePage/ProfilePage.css'
import '../styles/General.css'

import { Sidebar } from '../components/Sidebar'
import { MacroNutrients } from '../components/MacroNutrients'
import { DailyActivity } from '../components/DailyActivity'
import { DurationGraph } from '../components/DurationGraph'
import { HexagonGraph } from '../components/HexagonGraph'
import { ProgressGraph } from '../components/ProgressGraph'

import iconProtein from '../images/macro/protein-icon.png'
import iconCalories from '../images/macro/calories-icon.png'
import iconFat from '../images/macro/fat-icon.png'
import iconCarbs from '../images/macro/carbs-icon.png'
import { useEffect, useState } from 'react'
import { getData } from '../data/service'
import { useParams } from 'react-router-dom'

export function ProfilePage() {
    const [data, setData] = useState([])

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getData(id);
                if (fetchedData) {
                    setData(fetchedData);
                } else {
                    // Gérez les erreurs ou traitez les cas où les données ne sont pas disponibles
                }
            } catch (error) {
                console.error(error);
                // Gérez les erreurs ici
            }
        }
        getDataLoad();
    }, []);

    return <>
        <Sidebar fetchedData={data} />
        <main className='main_profile_container'>
            <section className='welcolme_container'>
                <div className='welcolme_message'>Bonjour
                    <span className='red'> </span></div>
                <div className='objective_message'>Félicitation ! Vous avez explosé vos objectifs hier 👏</div>
            </section>
            <section className='dashbord'>
                <DailyActivity />
                <section className='graph_container'>
                    <DurationGraph />
                    <HexagonGraph />
                    <ProgressGraph />
                </section>
            </section>

            <section className="macro_container">
                <MacroNutrients values_name='Calories' img_macro={iconCalories} />
                <MacroNutrients values_name='Proteines' img_macro={iconProtein} />
                <MacroNutrients values_name='Lipides' img_macro={iconCarbs} />
                <MacroNutrients values_name='Glucides' img_macro={iconFat} />
            </section>
        </main>

    </>
}