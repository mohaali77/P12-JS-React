//Import CSS
import '../../index.css'
import './style/ProfilePage.css'

//Import Composants
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { MacroNutrients } from '../../components/MacroNutrients/MacroNutrients'
import { DailyActivity } from '../../components/DailyActivity/DailyActivity'
import { DurationGraph } from '../../components/DurationGraph/DurationGraph'
import { HexagonGraph } from '../../components/HexagonGraph/HexagonGraph'
import { ProgressGraph } from '../../components/ProgressGraph/ProgressGraph'

//Import Icônes/Images
import iconProtein from '../../images/macro/protein-icon.png'
import iconCalories from '../../images/macro/calories-icon.png'
import iconFat from '../../images/macro/fat-icon.png'
import iconCarbs from '../../images/macro/carbs-icon.png'

//Import Fonctionnalités, Hook, Bibliothèque...
import { useEffect, useState, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'

//Import Données Mock/API
import mockData from '../../data/mock.js'
import { getData } from '../../data/service'

export function ProfilePage() {

    // Variable qui va vérifier si les données de l'API existent
    let isApiDataExist = useRef(false);

    // On récupère l'id présent dans l'URL
    const { id } = useParams();

    // On créé la classe de modélisation. 
    class User {
        constructor(lastName, firstName, lipid, carbs, calories, protein, todayScore) {

            // Standardisation des données. Si la donnée ne correspond pas, on renvoie une erreur. 
            if (typeof lastName !== 'string' || lastName.trim() === '') {
                return new Error('Le nom doit être une chaîne de caractères non vide.');
            }

            if (typeof firstName !== 'string' || firstName.trim() === '') {
                return new Error('Le prénom doit être une chaîne de caractères non vide.');
            }

            if (typeof lipid !== 'number') {
                return new Error('lipid doit être un nombre');
            }

            if (typeof carbs !== 'number') {
                return new Error('carbs doit être un nombre');
            }

            if (typeof calories !== 'number') {
                return new Error('calories doit être un nombre.');
            }

            if (typeof protein !== 'number') {
                return new Error('protein doit être un nombre');
            }

            if (typeof todayScore !== 'number') {
                return new Error('todayScore doit être un nombre');
            }

            this.lastName = lastName;
            this.firstName = firstName;
            this.lipid = lipid;
            this.carbs = carbs;
            this.calories = calories;
            this.protein = protein;
            this.todayScore = todayScore
        }
    }

    // On crée une nouvelle instance de la classe User qu'on mettra à jour avec les données du mock ou de l'API
    let newUser = new User('Nom', 'Prénom', 0, 0, 0, 0, 0)

    // Récupération données via API ou Mock si l'API n'est pas chargé ou qu'il y a une erreur
    const [data, setData] = useState([])

    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getData(id);
                //Si les données de l'API sont accessibles, on les récupères, et on définit la variable isApiDataExist sur true
                if (fetchedData) {
                    setData(fetchedData.data);
                    isApiDataExist.current = true
                } else {
                    //Sinon on récupère les données du mock, et on définit la variable isApiDataExist sur false
                    setData(mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id)));
                    isApiDataExist.current = false
                }
            } catch (error) {
                setData(mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id)));
                isApiDataExist.current = false
            }
        }
        getDataLoad();
    }, [id])

    // Si isApiDataExist est égal à false, ça veut dire que les données de l'API ne sont pas dispo, donc on affiche un message d'erreur
    let errorApiMsg = ''
    if (isApiDataExist.current === false) {
        errorApiMsg = '(API Indisponible. Les données sont mockés !!!)'
    }

    // Si l'id n'est pas trouvé, on renvoie sur la page d'erreur
    if (!mockData.USER_MAIN_DATA.find(obj => obj.id === Number(id))) {
        return <Navigate to="/error" />;
    }

    // Si les données sont bien accessibles, alors ont met à jour l'instance de classe avec les données API/Mock
    if (data && data.userInfos && data.keyData) {

        // Si c'est l'attribut todayScore qui est présent on l'ajoute à l'instance
        if (data.todayScore) {
            newUser = new User(data.userInfos.lastName,
                data.userInfos.firstName,
                data.keyData.lipidCount,
                data.keyData.carbohydrateCount,
                data.keyData.calorieCount,
                data.keyData.proteinCount,
                data.todayScore);
        }

        // Mais si c'est l'attribut todayScore qui est présent on l'ajoute à l'instance
        else if (data.score) {
            newUser = new User(data.userInfos.lastName,
                data.userInfos.firstName,
                data.keyData.lipidCount,
                data.keyData.carbohydrateCount,
                data.keyData.calorieCount,
                data.keyData.proteinCount,
                data.score);
        }
    }

    return <>
        <Sidebar />
        <main className='main_profile_container'>
            <section className='welcolme_container'>
                <div className='welcolme_message'>Bonjour
                    <span className='red'>{' ' + newUser.firstName + ' ' + newUser.lastName} </span>
                    <div className='errorApiMsg'>{errorApiMsg}</div>
                </div>
                <div className='objective_message'>Félicitation ! Vous avez explosé vos objectifs hier 👏</div>
            </section>
            <section className='dashbord'>
                <DailyActivity data={mockData.USER_ACTIVITY} />
                <section className='graph_container'>
                    <DurationGraph data={mockData.USER_AVERAGE_SESSIONS} />
                    <HexagonGraph data={mockData.USER_PERFORMANCE} />
                    <ProgressGraph todayScore={newUser.todayScore} data={mockData.USER_MAIN_DATA} />
                </section>
            </section>

            <section className="macro_container">
                <MacroNutrients value={newUser.calories + 'kCal'} values_name='Calories' img_macro={iconCalories} />
                <MacroNutrients value={newUser.protein + 'g'} values_name='Proteines' img_macro={iconProtein} />
                <MacroNutrients value={newUser.lipid + 'g'} values_name='Lipides' img_macro={iconCarbs} />
                <MacroNutrients value={newUser.carbs + 'g'} values_name='Glucides' img_macro={iconFat} />
            </section>
        </main >
    </>
}

