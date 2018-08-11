import React = require('react');
const chartistReactModule = require('react-chartist');
const ChartistGraph = chartistReactModule.default;

import './graph.scss';
import { IGraphResponse, seriesData, getMin, getMax, getClassName, Series } from '../../model';

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

function lineColorPlugin(lines: Series[]) {
    return function(chart: any) {
        chart.on('draw', function(data: any) {
            if (data.type === 'line') {
                lines.forEach(line => {
                    const g = data.group;
                    const classes = g.classes();
                    const className = getClassName(line.name)
                    if (classes.indexOf(className) !== -1) {
                        g.getNode().style.stroke = line.color;
                    }
                });
            }
        });        
    }
}

class DateGraph extends React.Component<IDateGraphProps> {
    render() {
        const data = this.props.data;
        const series = this.props.data.y;
        const chartData = {
            labels: this.props.data.x,
            series: seriesData(series)
        }
        const chartOptions = {
            ...defaultOptions, 
            low: getMin(data), 
            high: getMax(data),
            plugins: [
                lineColorPlugin(series)
            ]
        };

        return (
            <div className="graph-container">
                <ChartistGraph data={chartData} options={chartOptions} type={'Line'} className="ct-major-tenth" />
            </div>
        )
    }
}

export default DateGraph