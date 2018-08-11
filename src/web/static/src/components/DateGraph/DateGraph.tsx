import React = require('react');
const chartistReactModule = require('react-chartist');
const randomColor = require('randomcolor');
const ChartistGraph = chartistReactModule.default;

import './graph.scss';
import { IGraphResponse, seriesData, getMin, getMax, getClassName, Series, FillRect } from '../../model';

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

interface GraphRect extends FillRect {
    color?: string, 
    opacity?: number
}

interface FillRectOptions {
    rects: GraphRect[],
    color: string,
    opacity: number
}

function fillRectPlugin(options: FillRectOptions) {
    return function(chart: any) {
        chart.on('created', () => {
            let xs = chart.svg.querySelectorAll('.ct-grid.ct-horizontal')
                                .svgElements
                                .map((x: any) => x.getNode().attributes.x1)
            xs = xs.map((x: any) => parseFloat(x.nodeValue));
            const labels = chart.data.labels;
            for (const rect of options.rects) {
                const startIndex = labels.indexOf(rect.from);
                const endIndex = labels.indexOf(rect.to);
                
                if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {                    
                    continue
                }

                const height = chart.svg.height() 
                                - chart.options.axisY.offset 
                                - chart.options.chartPadding.top 
                                + chart.options.chartPadding.bottom;                
                chart.svg.elem('rect', {
                    x: xs[startIndex],
                    y: 15,
                    width: xs[endIndex] - xs[startIndex],
                    height: chart.svg.height() - chart.options.axisY.offset - chart.options.chartPadding.top + chart.options.chartPadding.bottom,
                    fill: rect.color || options.color,
                    opacity: rect.opacity || options.opacity
                }, 'ct-fill-rect', true);
            }       
        });
    }
}

class DateGraph extends React.Component<IDateGraphProps> {
    isFillFullscreen(rects: FillRect[], axis: string[]) {
        for (const rect of rects) {
            if (rect.from === axis[0] && rect.to === axis[axis.length - 1]) {
                return true
            }
        }
        return false
    }

    render() {
        const data = this.props.data;
        const series = this.props.data.y;
        const chartData = {
            labels: this.props.data.x,
            series: seriesData(series)
        }
        const plugins = [lineColorPlugin(series)];
        if (data.fill) {
            const rects = data.fill.map(x => ({...x, color: randomColor()}));
            if (!this.isFillFullscreen(rects, data.x)) {
                plugins.push(fillRectPlugin({
                    rects,
                    color: 'green',
                    opacity: 0.3
                }))
            }
        }
        const chartOptions = {
            ...defaultOptions, 
            low: getMin(data), 
            high: getMax(data),
            plugins
        };

        return (
            <div className="graph-container">
                <ChartistGraph data={chartData} options={chartOptions} type={'Line'} className="ct-major-tenth" />
            </div>
        )
    }
}

export default DateGraph