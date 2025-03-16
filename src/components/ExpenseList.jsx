import React, { useEffect, useState } from "react";
import { ExpenseItem } from "./ExpenseItem";

const ExpenseList = ({ expenses, onSave }) => {



  return (
      <div>
    {expenses?.map((expense,index)=>(
        <ExpenseItem key={expense.id} expense={expense} index={index}/>
    ))}

    </div>
  );
};

export default ExpenseList;
