import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Calendar.css"
const Calendar = () => {
  const [expense, setExpense] = useState(null);
  const userId = "549fbc85-f71c-4fea-929b-a20af3ba99a1";
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const weekDays = ["Sun","Mon","Tue","wed","Thu","Fri","Sat"]
  useEffect(() => {
    const today = new Date();
    setDate(today.getDate());
    setMonth(today.getMonth() + 1); 
    setYear(today.getFullYear());

    const Initialiser = async () => {
      try {
        const body = { userId };
        const url = "http://localhost:5000/app/initialise";
        const response = await axios.post(url, body);

        setExpense(response.data.data); // Save the full response object
        // console.log("hii");
        console.log(response.data.data); // Adjusted based on structure
      } catch (err) {
        console.log("Failed fetching", err);
      }
    };

    Initialiser();
  }, []);


  const renderExpense = ()=>{
    if (!expense || !expense.months) return <p>Data not available</p>
    const currentMonthData = expense.months.find((m) => m.month === month);
    if (!currentMonthData) return <p>Data not available</p>

    return currentMonthData.expenses.map((expense,index)=>(
        <div className="chart" key={index}>
            <h2 className='dateRep'>{expense.day}</h2>
            <h1 className='balanceRep'>{expense.amount}</h1>
        </div>
    ));
  }
 

  return (
    <div className="calendarBox" >
        <div className="box">
          {weekDays.map((day,index)=>{
            return <div  key={index} className="dayChart">{day}</div>
          })}
        {renderExpense()}

        </div>
    </div>
  );
};

export default Calendar;
