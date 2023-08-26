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

export function DailyActivity() {

    const data = [
        {
            day: '2020-07-01',
            kilogram: 80,
            calories: 240
        },
        {
            day: '2020-07-02',
            kilogram: 80,
            calories: 220
        },
        {
            day: '2020-07-03',
            kilogram: 81,
            calories: 280
        },
        {
            day: '2020-07-04',
            kilogram: 81,
            calories: 290
        },
        {
            day: '2020-07-05',
            kilogram: 80,
            calories: 160
        },
        {
            day: '2020-07-06',
            kilogram: 78,
            calories: 162
        },
        {
            day: '2020-07-07',
            kilogram: 76,
            calories: 390
        }
    ]

    return <>
        <section className="dailyActivity_container">
            <div className="title_calories_kg">
                <div className="title">Activité quotidienne</div>
                <div className="kg_calories">
                    <div className="kg"><i class="fa-solid fa-circle"></i>Poids (kg)</div>
                    <div className="calories"><i class="fa-solid fa-circle"></i>Calories brûlées (kCal)</div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="60%">
                <BarChart margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }} data={data}>
                    <CartesianGrid strokeDasharray="2.5 2.5" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} tickMargin={17} tickFormatter={formatXAxis} />
                    <YAxis axisLine={false} tickLine={false} YAxisId="right" tickCount={3} tickMargin={30} orientation="right" />
                    <Tooltip />
                    <Bar barSize={7} dataKey="kilogram" radius={[5, 5, 0, 0]} fill="#282D30" />
                    <Bar barSize={7} dataKey="calories" radius={[5, 5, 0, 0]} fill="#E60000" />
                </BarChart>
            </ResponsiveContainer>

        </section>
    </>
}