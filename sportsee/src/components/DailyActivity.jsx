import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export function DailyActivity() {

    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 7800,
            amt: 2290
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ]

    return <>
        <section className="dailyActivity_container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="2.5 2.5" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis YAxisId="right" tickCount={3} tickMargin={50} orientation="right" />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Bar barSize={7} dataKey="pv" margin={5} radius={[5, 5, 0, 0]} fill="#282D30" />
                    <Bar barSize={7} dataKey="uv" margin={5} radius={[5, 5, 0, 0]} fill="#E60000" />
                </BarChart>
            </ResponsiveContainer>

        </section>
    </>
}