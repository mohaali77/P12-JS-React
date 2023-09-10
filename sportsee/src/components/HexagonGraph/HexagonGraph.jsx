import { useParams } from 'react-router-dom';
import './style/HexagonGraph.css'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export function HexagonGraph(mockData) {

    const { id } = useParams()
    const dataUserId = mockData.data.find(obj => obj.userId === Number(id));
    const kind = dataUserId.kind

    const dataWithNames = dataUserId.data.map(item => ({
        ...item,
        subject: kind[item.kind]
    }));

    console.log(dataWithNames);

    return <>
        <section className="hexagonGraph_container">

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%"
                    data={dataWithNames}>
                    <PolarGrid margin={{ top: 10, bottom: 10 }} />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>

        </section >
    </>
}