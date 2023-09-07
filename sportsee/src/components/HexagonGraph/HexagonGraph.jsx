import './style/HexagonGraph.css'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export function HexagonGraph() {
    const data = [
        {
            subject: 'Intensité',
            A: 120,
            B: 110,
            fullMark: 150,
        },
        {
            subject: 'Vitesse',
            A: 98,
            B: 130,
            fullMark: 150,
        },
        {
            subject: 'Force',
            A: 86,
            B: 130,
            fullMark: 150,
        },
        {
            subject: 'Endurance',
            A: 99,
            B: 100,
            fullMark: 150,
        },
        {
            subject: 'Energie',
            A: 85,
            B: 90,
            fullMark: 150,
        },
        {
            subject: 'Cardio',
            A: 65,
            B: 85,
            fullMark: 150,
        },
    ]
    return <>
        <section className="hexagonGraph_container">

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid margin={{ top: 10, bottom: 10 }} />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar name="Mike" dataKey="A" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>

        </section>
    </>
}