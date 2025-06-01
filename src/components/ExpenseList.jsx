import React, { useEffect, useState } from "react";
import { ExpenseItem } from "./ExpenseItem";
import LoadingExpenseList from "./LoadingExpenseList";

const ExpenseList = ({ expenses, refetch }) => {
  return (
    <div className="flex-1">
      {expenses ? (
        expenses?.map((expense, index) => (
          <ExpenseItem
            refetch={refetch}
            key={expense.id}
            expense={expense}
            index={index}
          />
        ))
      ) : (
        <span className="text-white">
          No data found, add expense or try a different date range
        </span>
      )}
    </div>
  );
};

export default ExpenseList;
