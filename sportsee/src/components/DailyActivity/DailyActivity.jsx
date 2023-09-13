import { useParams } from 'react-router-dom';
import { getDataActivity } from '../../data/service'
import { useEffect, useState } from 'react';
import './style/DailyActivity.css'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getDate()}`;
};

export function DailyActivity(mockData) {

    const { id } = useParams()

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
                                    <div className="custom-tooltip">
                                        <p>{session.kilogram}</p>
                                        <p>{session.calories}</p>
                                    </div>
                                );
                            }
                            return null; // Si payload est null ou non défini, n'affiche rien
                        }}
                    />

                    <Bar barSize={7} dataKey="kilogram" radius={[5, 5, 0, 0]} fill="#282D30" />
                    <Bar barSize={7} dataKey="calories" radius={[5, 5, 0, 0]} fill="#E60000" />
                </BarChart>
            </ResponsiveContainer>

        </section>
    </>
}