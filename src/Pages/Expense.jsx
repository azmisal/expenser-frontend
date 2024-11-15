import React, { useState } from "react";
import "./Styles/Expense.css";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState({});
  const [popup, setPopup] = useState({ show: false, date: null });
  const [amount, setAmount] = useState("");
  const [limit, setLimit] = useState(200);
  const [todayExpense, setTodayExpense] = useState(50);

  // States for selected year and month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Function to calculate the number of days in the selected month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate(); // month is 1-indexed
  };

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

  // Function to open the popup for today's date
  const openPopup = (date) => {
    if (date.year === currentYear && date.month === currentMonth && date.day === currentDay) {
      setPopup({ show: true, date });
    } else {
      alert("You can only edit today's expenditure.");
    }
  };

//   const handleSubmit = () => {
//     const { year, month, day } = popup.date;
//     const dateKey = `${year}-${month}-${day}`;

//     setExpenses((prevExpenses) => ({
//       ...prevExpenses,
//       [dateKey]: (prevExpenses[dateKey] || 0) + parseFloat(amount)
//     }));

//     setPopup({ show: false, date: null });
//     setAmount("");
//   };


const handleSubmit = async () => {
    const { year, month, day } = popup.date;
  
    try {
      await fetch("http://localhost:5000/app/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "129", // Replace with logged-in user ID
          year,
          month,
          day,
          limit: 500,
          amount: parseFloat(amount),
        }),
      });
  
      alert("Expense saved successfully!");
      setPopup({ show: false, date: null });
      setAmount("");
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save expense.");
    }
  };
  

  const handleYearChange = (e) => setSelectedYear(Number(e.target.value));
  const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value));

  const getCellClass = (date) => {
    const cellDate = new Date(selectedYear, selectedMonth - 1, date);
    const todayDate = new Date(currentYear, currentMonth - 1, currentDay);

    if (cellDate.toDateString() === todayDate.toDateString()) {
      return "today-cell";
    } else if (cellDate < todayDate) {
      return "faded-cell";
    }
    return "";
  };

  return (
    <div className="expense-tracker">
      <div className="dropdown-menu">
        <select value={selectedYear} onChange={handleYearChange}>
          {[2022, 2023, 2024].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index + 1} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="expenseSide">
        <h2>Monthly Expense Tracker</h2>
        <div className="calendar-container">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
          {[...Array(daysInMonth)].map((_, i) => {
            const date = i + 1;
            const dateKey = `${selectedYear}-${selectedMonth}-${date}`;
            return (
              <div
                key={date}
                className={`calendar-cell ${getCellClass(date)}`}
                onClick={() => openPopup({ year: selectedYear, month: selectedMonth, day: date })}
              >
                <span className="date">{date}</span>
                <span className="amount">{expenses[dateKey] || 0}</span>
              </div>
            );
          })}
        </div>

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
        <h2>Today's Limit: {limit}</h2>
        <h2>Today's Expense: {todayExpense}</h2>
        <h2>Remaining: {limit - todayExpense}</h2>
      </div>
    </div>
  );
};

export default ExpenseTracker;
