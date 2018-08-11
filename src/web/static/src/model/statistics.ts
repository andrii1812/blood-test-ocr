export interface Series {
    data: number[],
    name: string,
    color?: string
}

export interface FillRect {
    from: string;
    to: string;
}

export interface IGraphResponse {
    x: string[]
    y: Series[],
    min?: number,
    max?: number,
    fill?: FillRect[]
}

export interface Line {
    name: string,
    color: string
}

export interface IGraphRequest {
    from?: string, //date
    to?: string, //date
    tag?: string,
    lines: Line[]
}

export function getClassName(name: string) {
    return 'ct-line-' + name;
}

export function seriesData(series: Series[]) {
    return series.map(x => ({
        data: x.data,
        className: getClassName(x.name)
    }));
}

export function seriesNames(series: Series[]) {
    return series.map(x => x.name)
}

export function getMin(data: IGraphResponse) {
    if (data.min) {
        return data.min;
    }

    const m = apply(data.y, Math.min);
    if (m > 0) {
        return m - 1;
    }

    return 0;
}

export function getMax(data: IGraphResponse) {
    if (data.max) {
        return data.max;
    }
    
    const m = apply(data.y, Math.max);
    if (m > 0) {
        return m + 1;
    }

    return 0;
}

function apply(series: Series[], fun: ((...data: number[]) => number)) {
    const seriesM = series.map(x => fun(...x.data));
    return fun(...seriesM)
}