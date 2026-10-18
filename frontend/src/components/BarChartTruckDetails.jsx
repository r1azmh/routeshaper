import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {useMemo} from "react";
import { colorPalette } from './constants';

const BarChartTruckDetails = ({data}) => {
    const config = {fontSize:14}
    const graphData = useMemo(() => {
        let gh = []
        if (data?.tours) {
            data?.tours?.forEach((tour) => {
                let obj = {name: tour?.vehicleId, ...tour?.statistic?.times}
                gh.push(obj)
            })
        }
        return gh
    }, [data])


    return (
        <ResponsiveContainer
            height={300}>
            <BarChart
                data={graphData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis style={config} dataKey="name"/>
                <YAxis style={config}/>
                <Tooltip contentStyle={config}/>
                <Legend wrapperStyle={config}/>
                <Bar dataKey="driving" fill={colorPalette[0]}/>
                <Bar dataKey="serving" fill={colorPalette[1]} />
                <Bar dataKey="waiting" fill={colorPalette[2]}/>
                <Bar dataKey="commuting" fill={colorPalette[3]} />
                <Bar dataKey="parking" fill={colorPalette[4]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartTruckDetails;