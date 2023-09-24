import { useParams } from 'react-router-dom';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { getDataSessions } from '../../data/service';
import { useState, useEffect } from 'react';
import './style/DurationGraph.css'


export function DurationGraph(mockData) {

    const { id } = useParams()

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

    console.log(data);

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
