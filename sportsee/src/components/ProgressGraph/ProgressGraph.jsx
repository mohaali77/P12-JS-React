import './style/ProgressGraph.css'
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../data/service'

export function ProgressGraph(mockData) {

    const { id } = useParams()

    const [data, setData] = useState([])

    useEffect(() => {
        async function getDataLoad() {
            try {
                const fetchedData = await getData(id);
                if (fetchedData) {
                    setData(fetchedData.data);
                } else {
                    setData(mockData.data.find(obj => obj.id === Number(id)));
                }
            } catch (error) {
                setData(mockData.data.find(obj => obj.id === Number(id)));
                console.log(error);
            }
        }
        getDataLoad();
    }, [id]);

    let percentage

    if (data.todayScore) {
        percentage = data.todayScore * 100;
    } else if (data.score) {
        percentage = data.score * 100;
    }

    const pieChartData = [
        { value: 100 - percentage },
        { value: percentage }
    ];

    return (
        <section className="progressGraph_container">
            <div className="percentage">
                {percentage}% <br />
                <span>de votre <br /> objectif</span>
            </div>
            <div className="score">
                Score
            </div>
            <div className="percentage-circle-chart">
                <PieChart width={200} height={200}  >
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                        cornerRadius={10}
                    >
                        <Cell key="cell-1" display='none' />
                        <Cell key="cell-0" fill='#E60000' />
                    </Pie>
                </PieChart>
            </div>
        </section>
    );
}
