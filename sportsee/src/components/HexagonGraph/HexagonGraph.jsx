import { useParams } from 'react-router-dom';
import { getDataPerformance } from '../../data/service'
import { useEffect, useState } from 'react';

//Import CSS
import './style/HexagonGraph.css'

// Import des composants "recharts" pour construire le graphique
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';



export function HexagonGraph(mockData) {

    const { id } = useParams()

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

    let dataWithNames = [];

    if (data && data.kind) {
        const kind = data.kind;

        dataWithNames = data.data.map(item => ({
            ...item,
            subject: kind[item.kind]
        }));
    }

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