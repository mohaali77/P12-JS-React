import React from "react";
import { PieChart, Pie, Cell } from "recharts";

import "../styles/ProgressGraph/ProgressGraph.css"; // Assurez-vous d'avoir les styles CSS appropriés

export function ProgressGraph() {

    let percentage = 75; // Remplacez par le pourcentage souhaité

    const data = [
        { value: percentage },
        { value: 100 - percentage }
    ];

    return (
        <section className="progressGraph_container">
            <div className="percentage-circle-chart">
                <div className="percentage">
                    {percentage}%
                </div>
                <PieChart width={120} height={120}>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={48}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                        isAnimationActive={false}
                        cornerRadius={10} // Ajustez cette valeur pour arrondir les coins
                    >
                        <Cell key="cell-0" fill='#E60000' />
                        <Cell key="cell-1" display='none' />
                    </Pie>
                </PieChart>
            </div>
        </section>
    );
}
