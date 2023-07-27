import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './AreaChart.css';
const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={300}
      className='areaChartContainer'
    >
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='black' fill='#23272a' />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
