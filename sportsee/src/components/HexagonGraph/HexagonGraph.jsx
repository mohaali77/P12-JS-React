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
    class UserHexagon {
        constructor(data) {

            // Standardisation des données. Si la donnée ne correspond pas, on renvoie une erreur. 
            if (typeof data !== 'object') {
                throw new Error('Chaque élément du tableau doit être un objet.');
            }

            if (!data.hasOwnProperty('value') || !data.hasOwnProperty('kind') || !data.hasOwnProperty('subject')) {
                throw new Error('Les données doivent contenir les propriétés "value", "kind" et "subject"');
            }

            if (typeof data.value !== 'number') {
                throw new Error('La donnée "value" doit être un nombre');
            }

            if (typeof data.kind !== 'number') {
                throw new Error('La donnée "kind" doit être un nombre');
            }

            if (typeof data.subject !== 'string') {
                throw new Error('La donnée "subject" doit être un string');
            }

            this.value = data.value
            this.kind = data.kind
            this.subject = data.subject
        }
    }

    // On crée une nouvelle instance de la classe User qu'on mettra à jour avec les données du mock ou de l'API
    let newUserHexagon = new UserHexagon({
        value: 0,
        kind: 0,
        subject: 'aa'
    })

    // Récupération données via API ou Mock si l'API n'est pas chargé ou qu'il y a une erreur
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

    let dataCompleted = [];

    // Si les données sont bien accessibles, alors ont met à jour l'instance de classe avec les données API/Mock
    if (data && data.data && data.kind) {

        const kind = data.kind;

        dataCompleted = data.data.map(item => ({
            ...item,
            subject: kind[item.kind]
        }));

        newUserHexagon = dataCompleted.map(data => new UserHexagon({
            value: data.value,
            kind: data.kind,
            subject: data.subject
        }
        ));
    }

    return <>
        <section className="hexagonGraph_container">

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="60%"
                    data={newUserHexagon}
                >
                    <PolarGrid margin={{ top: 10, bottom: 10 }} />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>

        </section >
    </>
}