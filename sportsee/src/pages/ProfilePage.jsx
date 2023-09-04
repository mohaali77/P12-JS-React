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
import { Link, Navigate, useParams } from 'react-router-dom'

export function ProfilePage() {
    const [data, setData] = useState([])

    const { id } = useParams();

    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getData(id);
                if (fetchedData) {
                    setData(fetchedData.data);
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

    const userInfos = data && data.userInfos
    const keyData = data && data.keyData
    let calories
    let protein
    let carbs
    let lipid
    let firstName
    let lastName

    //on vérifie que les data existe sont correctement initialisé pour accéder au userInfos
    if (userInfos && keyData) {
        firstName = userInfos.firstName
        lastName = userInfos.lastName
        calories = keyData.calorieCount
        protein = keyData.proteinCount
        carbs = keyData.carbohydrateCount
        lipid = keyData.lipidCount
    }

    return <>
        <Sidebar />
        <main className='main_profile_container'>
            <section className='welcolme_container'>
                <div className='welcolme_message'>Bonjour
                    <span className='red'>{' ' + firstName + ' ' + lastName} </span></div>
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
                <MacroNutrients value={calories + 'g'} values_name='Calories' img_macro={iconCalories} />
                <MacroNutrients value={protein + 'g'} values_name='Proteines' img_macro={iconProtein} />
                <MacroNutrients value={lipid + 'g'} values_name='Lipides' img_macro={iconCarbs} />
                <MacroNutrients value={carbs + 'kCal'} values_name='Glucides' img_macro={iconFat} />
            </section>
        </main>

    </>
}