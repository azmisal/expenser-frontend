import React, { useState } from 'react';
import "./Styles/Expense.css";

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState({});
    const [popup, setPopup] = useState({ show: false, date: null });
    const [amount, setAmount] = useState('');
    const [limit , setLimit]  = useState(200);
    const [todayExpense, setTodayExpense] = useState(50);
    // Get today's date details
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Function to open the popup, only for today's date
    const openPopup = (date) => {
        if (date.year === currentYear && date.month === currentMonth && date.day === currentDay) {
            setPopup({ show: true, date });
        } else {
            alert("You can only edit today's expenditure.");
        }
    };

    // Function to handle amount submission
    const handleSubmit = () => {
        const { year, month, day } = popup.date;
        const dateKey = `${year}-${month}-${day}`;

        // Update expenses state
        setExpenses((prevExpenses) => ({
            ...prevExpenses,
            [dateKey]: (prevExpenses[dateKey] || 0) + parseFloat(amount)
        }));

        setPopup({ show: false, date: null });
        setAmount('');
    };

    return (
        <div className="expense-tracker">
        <div className='expenseSide'>
            <h2>Monthly Expense Tracker</h2>
            <div className="calendar-container">
                {/* Days of the Week Headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="day-header">
                        {day}
                    </div>
                ))}

                {/* Calendar Cells for Each Day */}
                {[...Array(31)].map((_, i) => {
                    const date = i + 1;
                    const dateKey = `${currentYear}-${currentMonth}-${date}`;
                    return (
                        <div
                            key={date}
                            className="calendar-cell"
                            onClick={() => openPopup({ year: currentYear, month: currentMonth, day: date })}
                        >
                            <span className="date">{date}</span>
                            <span className="amount">{expenses[dateKey] || 0}</span>
                        </div>
                    );
                })}
            </div>

            {/* Popup for entering amount */}
            {popup.show && (
                <>
                    <div className="overlay" onClick={() => setPopup({ show: false, date: null })}></div>
                    <div className="popup">
                        <h3>Enter Expense for {popup.date.day}/{popup.date.month}/{popup.date.year}</h3>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={() => setPopup({ show: false, date: null })}>Cancel</button>
                    </div>
                </>
            )}
        </div>
        <div className="dataSide">
            <h1>Expense Data</h1>
            <h2>Todays Limit  :  {limit}</h2>
            <h2>Today's Expense : {todayExpense}</h2>
            <h2>Remaining  :  {limit-todayExpense}</h2>
        </div>
        </div>
    );
};

export default ExpenseTracker;
