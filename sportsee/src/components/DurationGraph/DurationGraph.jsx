// Import Données API
import { getDataSessions } from '../../data/service';

//Import Fonctionnalités, Hook, Bibliothèque...
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import CSS
import './style/DurationGraph.css'

// Import des composants "recharts" pour construire le graphique
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';


export function DurationGraph(mockData) {

    // On récupère l'id présent dans l'URL
    const { id } = useParams()

    // On créé la classe de modélisation. 
    class UserDuration {
        constructor(data) {

            // Standardisation des données. Si la donnée ne correspond pas, on renvoie une erreur. 
            if (typeof data !== 'object') {
                throw new Error('Chaque élément du tableau doit être un objet.');
            }

            if (!data.hasOwnProperty('day') || !data.hasOwnProperty('sessionLenght')) {
                throw new Error('Les données doivent contenir les propriétés "day", "kilogram" et "calories".');
            }

            if (typeof data.day !== 'number' || data.day < 0) {
                throw new Error('La donnée "day" doit être un nombre');
            }

            if (typeof data.sessionLenght !== 'number') {
                throw new Error('La donnée "sessionLenght" doit être un nombre');
            }

            this.day = data.day
            this.sessionLenght = data.sessionLenght
        }
    }

    // On crée une nouvelle instance de la classe User qu'on mettra à jour avec les données du mock ou de l'API
    let newUserDuration = new UserDuration({
        day: 0,
        sessionLenght: 0,
    })

    // Récupération données via API ou Mock si l'API n'est pas chargé ou qu'il y a une erreur
    const [data, setData] = useState([])

    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getDataSessions(id);
                if (fetchedData) {
                    setData(fetchedData.data);
                } else {
                    setData(mockData.data.find(obj => obj.userId === Number(id)));
                }
            } catch (error) {
                setData(mockData.data.find(obj => obj.userId === Number(id)));
                console.log(error);
            }
        }
        getDataLoad();
    }, [id]);

    // Si les données sont bien accessibles, alors ont met à jour l'instance de classe avec les données API/Mock
    if (data && data.sessions) {
        newUserDuration = data.sessions.map(data => new UserDuration({
            day: data.day,
            sessionLenght: data.sessionLenght,
        }
        ));
    }

    return <>
        <section className="durationGraph_container">
            <div className="durationGraph_part"></div>
            <div className="durationSessions">Durée moyenne des <br /> sessions</div>
            <ResponsiveContainer width="100%" height="55%" >
                <LineChart width={300} height={100} data={data.sessions}>
                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        stroke="#FFFF"
                        strokeWidth={2}
                        dot={false} //supprimes les points du graph

                    />
                    <Tooltip content={({ payload }) => {
                        if (payload && payload[0] && payload[0].payload) {
                            const session = payload[0].payload;
                            return (
                                <div className="tooltip_duration">
                                    <p>{session.sessionLength} min</p>
                                </div>
                            );
                        }
                        return null;
                    }} />
                </LineChart >
            </ResponsiveContainer >
            <ul className="daysWeek">
                <li>L</li>
                <li>M</li>
                <li>M</li>
                <li>J</li>
                <li>V</li>
                <li>S</li>
                <li>D</li>
            </ul>
        </section>
    </>
}
