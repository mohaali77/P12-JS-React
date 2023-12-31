// Import CSS
import './style/ProgressGraph.css'

// Import des composants "recharts" pour construire le graphique
import { PieChart, Pie, Cell } from "recharts";

export function ProgressGraph({ todayScore }) {

    let percentage

    // On multiplie la valeur par 100 pour obtenir le pourcentage
    if (todayScore) {
        percentage = todayScore * 100;
    }

    // On récupères les valeurs qui serviront de données pour le graphique
    const pieChartData = [
        { value: 100 - percentage },
        { value: percentage }
    ];

    return <>
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
    </>
}
