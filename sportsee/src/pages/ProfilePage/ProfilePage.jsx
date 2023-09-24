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

import { useEffect, useState, useRef } from 'react'
import { getData } from '../../data/service'
import { Navigate, useParams } from 'react-router-dom'
import mockData from '../../data/mock.js'


export function ProfilePage() {

    class Rectangle {
        constructor(lastname, name, age, city) {
            this.name = name;
            this.lastname = lastname;
            this.city = city;
            this.age = age;
        }

    }



    const { id } = useParams();

    // récupération données via API ou Mock si l'API n'est pas chargé ou qu'il y a une erreur

    //const data = mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id))

    const [data, setData] = useState([])

    let isApiDataExist = useRef(false);
    console.log('isApiDataExistRef:', isApiDataExist.current)


    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getData(id);
                if (fetchedData) {
                    setData(fetchedData.data);
                    isApiDataExist.current = true
                } else {
                    setData(mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id)));
                    isApiDataExist.current = false
                }
            } catch (error) {
                setData(mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id)));
                isApiDataExist.current = false
            }
        }
        getDataLoad();
    }, [id]);


    let errorApiMsg

    if (isApiDataExist.current === false) {
        errorApiMsg = '(API Indisponible. Les données sont mockés !!!)'
    }

    //si l'id n'est pas trouvé, on renvoie sur la page d'erreur
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
                    <span className='red'>{' ' + firstName + ' ' + lastName} </span>
                    <div className='errorApiMsg'>{errorApiMsg}</div>
                </div>
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
        </main >

    </>
}

/*Assurer la qualité des données dans une application web
Le code est complet quand :
❒ Les données récupérées sont transformées en JSON.
❒ Une classe de modélisation permet de formater les données une fois récupérées auprès de l’API.
❒ Quelles que soient les données envoyées (mockées ou de l’API), ces dernières complètent les charts.
Le code est pertinent quand :
❒ L’étudiant peut changer la source des données (les données mockées et les données de l’API) en changeant uniquement le service utilisant l’API et la classe de modélisation. Le code des composants ne doit pas être changé.
🎯 Interagir avec un service web
Le code de l’API est complet quand :
❒ Les données sont récupérées auprès de l’API.
❒ L’étudiant utilise soit l’API Fetch, soit la librairie axios.
Le code de l’API est pertinent quand :
❒ Les calls API ont été réalisés dans un service situé en dehors d’un composant React.
❒ Les cas d’erreurs (indisponibilité de l’API) ne font pas planter le site. Dans le cas d’une indisponibilité, un message d’erreur est affiché.*/