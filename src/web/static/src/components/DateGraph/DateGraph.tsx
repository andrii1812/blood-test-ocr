import React = require('react');
const chartistModule = require('react-chartist');
const ChartistGraph = chartistModule.default;

import './graph.scss';
import { IGraphResponse, seriesData, getMin, getMax } from '../../model';

const defaultOptions = {
    showLine: true,
    showPoint: true,
    axisX: {
        showLabel: true,
        showGrid: true
    },
    axisY: {
        showLabel: true,
        showGrid: true
    }
}

interface IDateGraphProps {
    data: IGraphResponse
}

class DateGraph extends React.Component<IDateGraphProps> {
    render() {
        const data = this.props.data;
        const series = this.props.data.y;
        const chartData = {
            labels: this.props.data.x,
            series: seriesData(series)
        }
        const chartOptions = {...defaultOptions, low: getMin(data), high: getMax(data)};

        return (
            <ChartistGraph data={chartData} options={chartOptions} type={'Line'} />
        )
    }
}

export default DateGraph