// Import Données API
import { getDataPerformance } from '../../data/service'

//Import Fonctionnalités, Hook, Bibliothèque...
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Import CSS
import './style/HexagonGraph.css'

// Import des composants "recharts" pour construire le graphique
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';



export function HexagonGraph(mockData) {

    // On récupère l'id présent dans l'URL
    const { id } = useParams()

    // On créé la classe de modélisation. 
    class UserDuration {
        constructor(data) {

            // Standardisation des données. Si la donnée ne correspond pas, on renvoie une erreur. 
            if (typeof data !== 'object') {
                throw new Error('Chaque élément du tableau doit être un objet.');
            }

            if (!data.hasOwnProperty('day') || !data.hasOwnProperty('sessionLength')) {
                throw new Error('Les données doivent contenir les propriétés "day" et "sessionLength"');
            }

            if (typeof data.day !== 'number') {
                throw new Error('La donnée "day" doit être un nombre');
            }

            if (typeof data.sessionLength !== 'number') {
                throw new Error('La donnée "sessionLength" doit être un nombre');
            }

            this.day = data.day
            this.sessionLength = data.sessionLength
        }
    }

    // On crée une nouvelle instance de la classe User qu'on mettra à jour avec les données du mock ou de l'API
    let newUserDuration = new UserDuration({
        day: 0,
        sessionLength: 0,
    })

    const [data, setData] = useState([])

    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getDataPerformance(id);
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

    if (data && data.data && data.kind) {
        console.log(data);

        const kind = data.kind;

        dataWithNames = data.data.map(item => ({
            ...item,
            subject: kind[item.kind]
        }));
    }

    let dataWithNames = [];


    console.log(dataWithNames);

    return <>
        <section className="hexagonGraph_container">

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="60%"
                    data={dataWithNames}
                >
                    <PolarGrid margin={{ top: 10, bottom: 10 }} />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>

        </section >
    </>
}