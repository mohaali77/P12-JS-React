import './style/ProgressGraph.css'
import { PieChart, Pie, Cell } from "recharts";
import { useParams } from 'react-router-dom';


export function ProgressGraph(mockData) {

    const { id } = useParams()
    const dataUserId = mockData.data.find(obj => obj.id === Number(id));

    let percentage

    if (dataUserId.todayScore) {
        percentage = dataUserId.todayScore * 100;
    } else if (dataUserId.score) {
        percentage = dataUserId.score * 100;
    }

    const data = [
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
                        data={data}
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
