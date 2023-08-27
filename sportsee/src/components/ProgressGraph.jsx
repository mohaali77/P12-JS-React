import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
                    {percentage}% <br />
                    <span>de votre <br /> objectif</span>
                </div>
                <PieChart width={200} height={200}  >
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
                        cornerRadius={10}
                    >
                        <Cell key="cell-0" fill='#E60000' />
                        <Cell key="cell-1" display='none' />
                    </Pie>
                </PieChart>
            </div>
        </section>
    );
}
