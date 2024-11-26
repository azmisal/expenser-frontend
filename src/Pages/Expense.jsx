// import React, { useState,useEffect } from "react";
// import "./Styles/Expense.css";

// const ExpenseTracker = () => {
//   const [expenses, setExpenses] = useState({});
//   const [popup, setPopup] = useState({ show: false, date: null });
//   const [amount, setAmount] = useState("");
//   const [limit, setLimit] = useState(200);
//   const [todayExpense, setTodayExpense] = useState(50);

//   // States for selected year and month
  
//   const today = new Date();
//   const currentYear = today.getFullYear();
//   const currentMonth = today.getMonth() + 1;
//   const currentDay = today.getDate();

//   // Function to calculate the number of days in the selected month
//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month, 0).getDate(); // month is 1-indexed
//   };


//   const openPopup = (date) => {
//     if (date.year === currentYear && date.month === currentMonth && date.day === currentDay) {
//       setPopup({ show: true, date });
//     } else {
//       alert("You can only edit today's expenditure.");
//     }
//   };


//   return (
//     <div className="expense-tracker">
      

//       <div className="expenseSide">
//         <h2>Monthly Expense Tracker</h2>
//         <div className="calendar-container">
//           {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//             <div key={day} className="day-header">
//               {day}
//             </div>
//           ))}
//           {[...Array(daysInMonth)].map((_, i) => {
//             const date = i + 1;
//             const dateKey = `${selectedYear}-${selectedMonth}-${date}`;
//             return (
//               <div
//                 key={date}
//                 className={`calendar-cell ${getCellClass(date)}`}
//                 onClick={() => openPopup({ year: selectedYear, month: selectedMonth, day: date })}
//               >
//                 <span className="date">{date}</span>
//                 <span className="amount">{expenses[dateKey] || 0}</span>
//               </div>
//             );
//           })}
//         </div>

//         {popup.show && (
//           <>
//             <div className="overlay" onClick={() => setPopup({ show: false, date: null })}></div>
//             <div className="popup">
//               <h3>Enter Expense for {popup.date.day}/{popup.date.month}/{popup.date.year}</h3>
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Enter amount"
//               />
//               <button onClick={handleSubmit}>Submit</button>
//               <button onClick={() => setPopup({ show: false, date: null })}>Cancel</button>
//             </div>
//           </>
//         )}
//       </div>

//       <div className="dataSide">
//         <h1>Expense Data</h1>
//         <h2>Today's Limit: {limit}</h2>
//         <h2>Today's Expense: {todayExpense}</h2>
//         <h2>Remaining: {limit - todayExpense}</h2>
//       </div>
//     </div>
//   );
// };

// export default ExpenseTracker;
