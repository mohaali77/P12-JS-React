import { useParams } from 'react-router-dom';
import './style/HexagonGraph.css'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export function HexagonGraph(mockData) {
    const data = [
        {
            value: 80,
            subject: 'intensité'
        },
        {
            value: 120,
            subject: 'vitesse'
        },
        {
            value: 140,
            subject: 'force'
        },
        {
            value: 50,
            subject: 'endurance'
        },
        {
            value: 200,
            subject: 'energie'
        },
        {
            value: 90,
            subject: 'cardio'
        }
    ]

    const { id } = useParams()
    const dataUserId = mockData.data.find(obj => obj.userId === Number(id));
    console.log(dataUserId.data)
    console.log(dataUserId.kind);
    let kind = dataUserId.kind

    /*const dataWithNames = dataUserId.data.map(item => ({
        ...item,
        subject: kind: [item.kind]
    }));

    console.log('aaaaa' + dataWithNames);*/

    return <>
        <section className="hexagonGraph_container">

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid margin={{ top: 10, bottom: 10 }} />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar name="Mike" dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>

        </section>
    </>
}