import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {useMemo} from "react";
import { colorPalette } from './constants';

const BarChartTruck = ({data}) => {
    const config = {fontSize:14}
    const graphData = useMemo(()=>{
        let gh = []
        if(data?.tours){
            data?.tours?.forEach((tour)=>{
                let obj = {name: tour?.vehicleId, distance: tour?.statistic?.distance, duration:tour?.statistic?.duration}
                gh.push(obj)
            })
        }
        return gh
    }, [data])


    return (
        <ResponsiveContainer
            height={300} >
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
                <XAxis tick={config} dataKey="name"/>
                <YAxis tick={config}/>
                <Tooltip style={config} contentStyle={config}/>
                <Legend wrapperStyle={config} className='text-sm'/>
                <Bar dataKey="distance" fill={colorPalette[0]} />
                <Bar dataKey="duration" fill={colorPalette[2]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartTruck;