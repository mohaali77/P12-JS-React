import '../../index.css'
import './style/ProfilePage.css'

import { Sidebar } from '../../components/Sidebar/Sidebar'
import { MacroNutrients } from '../../components/MacroNutrients/MacroNutrients'
import { DailyActivity } from '../../components/DailyActivity/DailyActivity'
import { DurationGraph } from '../../components/DurationGraph/DurationGraph'
import { HexagonGraph } from '../../components/HexagonGraph/HexagonGraph'
import { ProgressGraph } from '../../components/ProgressGraph/ProgressGraph'

import iconProtein from '../../images/macro/protein-icon.png'
import iconCalories from '../../images/macro/calories-icon.png'
import iconFat from '../../images/macro/fat-icon.png'
import iconCarbs from '../../images/macro/carbs-icon.png'

import { useEffect, useState } from 'react'
import { getData } from '../../data/service'
import { Navigate, useParams } from 'react-router-dom'
import mockData from '../../data/mock.js'


export function ProfilePage() {

    const { id } = useParams();

    // récupération données via API ou Mock si l'API n'est pas chargé ou qu'il y a une erreur

    const [data, setData] = useState([])

    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getData(id);
                if (fetchedData) {
                    setData(fetchedData.data);
                } else {
                    setData(mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id)));
                }
            } catch (error) {
                setData(mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id)));
                console.log(error);
            }
        }
        getDataLoad();
    }, [id]);


    if (!mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id))) {
        return <Navigate to="/error" />;
    }



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
                <DailyActivity data={mockData.USER_ACTIVITY} />
                <section className='graph_container'>
                    <DurationGraph data={mockData.USER_AVERAGE_SESSIONS} />
                    <HexagonGraph data={mockData.USER_PERFORMANCE} />
                    <ProgressGraph data={mockData.USER_MAIN_DATA} />
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