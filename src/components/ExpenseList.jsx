import React, { useEffect, useState } from "react";
import { ExpenseItem } from "./ExpenseItem";

const ExpenseList = ({ expenses, refetch }) => {
  return (
    <div>
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
        <ExpenseItem />
      )}
    </div>
  );
};

export default ExpenseList;
