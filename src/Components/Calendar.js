import React, { Component } from 'react';
import * as dateFns from 'date-fns' 
// import { format } from 'date-fns'

import '../Styles/Calendar.css'

class Calendar extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMoth: new Date(),
            selectedDate: new Date()
        };
        // this.renderHeader = this.renderHeader.bind(this);
        // this.renderDays = this.renderDays.bind(this);
        // this.renderCells = this.renderCells.bind(this);
        this.nextMoth = this.nextMoth.bind(this);
        this.prevMoth = this.prevMoth.bind(this)
    }

    renderHeader(){
        const dateFormat ="MMMM - yyyy";

        return(
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMoth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMoth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMoth}>
                    <div className="icon">
                        chevron_right
                    </div>
                </div>
            </div>
        )
    };

    renderDays(){
        const dateFormat = "EEEE";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMoth);

        for(let i = 0 ; i < 7; i++){
            days.push(
            <div className="col col-center" key={i}>
                {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
            );
        }
        return <div className="days row"> {days} </div> 
    };

    renderCells(){
        const {currentMoth, selectedDate} = this.state;
        const monthStart = dateFns.startOfMonth(currentMoth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = 'd';
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = '';

        while(day <= endDate){
            for(let i = 0 ; i < 7 ; i++){
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div className=
                        {`col  cell ${!dateFns.isSameMonth(day, monthStart)
                        ? "disable" 
                        :dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                    }`}
                    key={day}
                    onClick={()=>this.onDateClick(cloneDay)}
                    >
                        <span className='number'>{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>

                );
                day = dateFns.addDays(day, 1);
            }

            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days =[];
        }

        return <div className="body">
            {rows}
        </div>
    };

    onDateClick= day => {
        this.setState({
            selectedDate: day
        });
    };

    nextMoth(){
        this.setState({
            currentMoth: dateFns.addMonths(this.state.currentMoth, 1)
        });
    };

    prevMoth(){
        this.setState({
            currentMoth: dateFns.subMonths(this.state.currentMoth, 1)
        })
    }

    render() {
        return (
            <div className="calendar">
                {/* <h3>Calendar Component</h3> */}
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        )
    }
}

export default Calendar;
