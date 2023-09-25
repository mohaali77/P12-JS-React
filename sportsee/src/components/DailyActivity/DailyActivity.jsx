// Import Données API
import { getDataActivity } from '../../data/service'

//Import Fonctionnalités, Hook, Bibliothèque...
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import CSS
import './style/DailyActivity.css'

// Import des composants "recharts" pour construire le graphique
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getDate()}`;
};

export function DailyActivity(mockData) {

    // On récupère l'id présent dans l'URL
    const { id } = useParams()

    class UserSessions {
        constructor(data) {

            if (!Array.isArray(data)) {
                throw new Error('Les données doivent être un tableau.');
            }

            this.sessions = data.map(data => {
                if (typeof data !== 'object') {
                    throw new Error('Chaque élément du tableau doit être un objet.');
                }

                if (typeof data !== 'object') {
                    throw new Error('Les données doivent être un objet.');
                }

                if (!data.hasOwnProperty('day') || !data.hasOwnProperty('kilogram') || !data.hasOwnProperty('calories')) {
                    throw new Error('Les données doivent contenir les propriétés "day", "kilogram" et "calories".');
                }

                if (typeof data.day !== 'string') {
                    throw new Error('La donnée "day" doit être un string');
                }

                if (typeof data.kilogram !== 'number') {
                    throw new Error('La donnée "kilogram" doit être un nombre');
                }

                if (typeof data.calories !== 'number') {
                    throw new Error('La donnée "calories" doit être un nombre');
                }
            })

            this.day = data.day;
            this.kilogram = data.kilogram;
            this.calories = data.calories;
        }
    }

    let newUserSessions = new UserSessions([{
        day: ' ',
        kilogram: 0,
        calories: 0
    }])

    console.log(newUserSessions);

    const [data, setData] = useState([])

    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getDataActivity(id);
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

    // On crée une nouvelle instance de la classe User qu'on mettra à jour avec les données du mock ou de l'API
    let sessionList

    if (data && data.sessions) {
        //console.log(data);
        //console.log(data.sessions);
        //console.log(data.session);
        sessionList = data.sessions.map(data => new UserSessions(data.day, data.kilogram, data.calories));
    }

    return <>
        <section className="dailyActivity_container">
            <div className="title_calories_kg">
                <div className="title">Activité quotidienne</div>
                <div className="kg_calories">
                    <div className="kg"><i className="fa-solid fa-circle"></i>Poids (kg)</div>
                    <div className="calories"><i className="fa-solid fa-circle"></i>Calories brûlées (kCal)</div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="60%">
                <BarChart margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5
                }} data={data.sessions}>
                    <CartesianGrid strokeDasharray="2.5 2.5" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} tickMargin={17} tickFormatter={formatXAxis} />
                    <YAxis axisLine={false} tickLine={false} YAxisId="right" tickCount={3} tickMargin={30} orientation="right" />
                    <Tooltip
                        content={({ payload }) => {
                            if (payload && payload[0] && payload[0].payload) {
                                const session = payload[0].payload;
                                return (
                                    <div className="tooltip">
                                        <p>{session.kilogram}</p>
                                        <p>{session.calories}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />

                    <Bar barSize={7} dataKey="kilogram" radius={[5, 5, 0, 0]} fill="#282D30" />
                    <Bar barSize={7} dataKey="calories" radius={[5, 5, 0, 0]} fill="#E60000" />
                </BarChart>
            </ResponsiveContainer>

        </section>
    </>
}