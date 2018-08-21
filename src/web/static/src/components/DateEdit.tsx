import { parseDate, formatDate } from "../model/util";
import React = require("react");
import { DatePicker } from "material-ui";
import { Translate } from "react-localize-redux";


interface IDateEditProps {
    date: string,
    className?: string,
    onChange: (date: string) => void    
}

interface IDateEditState {
    date?: Date
}

class DateEdit extends React.Component<IDateEditProps, IDateEditState> {
    state = {
        date: undefined
    }

    componentWillReceiveProps(newProps: IDateEditProps) {
        this.date = newProps.date;
    }

    set date(date: string) {
        if(!date) {
            return;
        }

        this.setState({date: parseDate(date)})
    }
    
    componentDidMount() {
        this.date = this.props.date;
    }

    dateChanged(_: any, date: Date) {
        this.props.onChange(formatDate(date));
    }

    isValid(): boolean {
        return this.state.date !== undefined;
    }

    render() {
        return (
            <Translate >
                {({translate}) =>             
                    <DatePicker 
                        textFieldStyle={{width: '100%', height: 32}} 
                        className={this.props.className} 
                        value={this.state.date} 
                        onChange={this.dateChanged.bind(this)}
                        errorText={this.isValid() ? '' : translate('required')}
                        formatDate={formatDate}/>
                }
            </Translate>
        )
    }
}

export default DateEdit