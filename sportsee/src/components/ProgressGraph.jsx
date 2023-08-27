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
                        <Cell key="cell-0" fill='#E60000' />
                        <Cell key="cell-1" display='none' />
                    </Pie>
                </PieChart>
            </div>
        </section>
        /** */
    );
}
