import React, { useEffect, useState } from "react";
import { ExpenseItem } from "./ExpenseItem";

const ExpenseList = ({ expenses, onSave }) => {
  const [editableRow, setEditableRow] = useState(null); 
  const [editedData, setEditedData] = useState({}); 

  // Handle input changes

  useEffect(()=>{
    console.log("editied data updates")
    console.log(editedData);
  },[editedData])

  const handleChange = (e, field, id) => {
    setEditedData({
      ...editedData,
      [id]: { ...editedData[id], [field]: e.target.value },
    });
  };

  // Save changes
  const handleSave = (id) => {
    if (onSave && editedData[id]) {
        console.log("handle save");
        console.log(id,editedData[id]);
      onSave(id, editedData[id]);
    }
    setEditableRow(null);
  };

  const getDateFromTimestamp = (timestamp)=>{
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }


  return (
      <div>
    {expenses?.map((expense,index)=>(
        <ExpenseItem key={expense.id} expense={expense} index={index}/>
    ))}

    </div>
  );
};

export default ExpenseList;
