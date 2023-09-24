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
        constructor(lastName, firstName, lipid, carbs, calories, protein) {

            // Standardisation des données. Si la données ne correspond pas, on renvoie une erreur. 
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

            this.lastName = lastName;
            this.firstName = firstName;
            this.lipid = lipid;
            this.carbs = carbs;
            this.calories = calories;
            this.protein = protein;
        }
    }

    // On crée une nouvelle instance de la classe User qu'on mettra à jour avec les données du mock ou de l'API
    let newUser = new User('aa', 'aa', 0, 0, 0, 0)

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

    // Si les données sont bien accessibles, alors ont met à jour l'instance de classe avec les donnée API/Mock
    if (data && data.userInfos && data.keyData) {
        newUser = new User(data.userInfos.lastName,
            data.userInfos.firstName,
            data.keyData.lipidCount,
            data.keyData.carbohydrateCount,
            data.keyData.calorieCount,
            data.keyData.proteinCount);
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
                    <ProgressGraph data={mockData.USER_MAIN_DATA} />
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