import React, { useState } from "react";

const ExpenseList = ({ expenses, onSave }) => {
  const [editableRow, setEditableRow] = useState(null); // Track which row is being edited
  const [editedData, setEditedData] = useState({}); // Store edited values

  // Handle input changes
  const handleChange = (e, field, id) => {
    setEditedData({
      ...editedData,
      [id]: { ...editedData[id], [field]: e.target.value },
    });
  };

  // Save changes
  const handleSave = (id) => {
    if (onSave && editedData[id]) {
      onSave(id, editedData[id]);
    }
    setEditableRow(null);
  };

  return (
    <table className="w-full border-collapse border border-gray-300 text-white">
      <thead>
        <tr className="">
          <th className="border p-2">Expense</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">Primary Category</th>
          <th className="border p-2">Secondary Category</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses?.map((expense) => (
          <tr key={expense.id} className="border">
            <td className="border p-2">
              {editableRow === expense.id ? (
                <input
                  type="text"
                  value={editedData[expense.id]?.expense || expense.expense}
                  onChange={(e) => handleChange(e, "expense", expense.id)}
                  className="border p-1 w-full"
                />
              ) : (
                expense.expense
              )}
            </td>
            <td className="border p-2">
              {editableRow === expense.id ? (
                <input
                  type="text"
                  value={editedData[expense.id]?.amount || expense.amount}
                  onChange={(e) => handleChange(e, "expense", expense.id)}
                  className="border p-1 w-full"
                />
              ) : (
                expense.amount
              )}
            </td>
            <td className="border p-2">
              {editableRow === expense.id ? (
                <input
                  type="date"
                  value={editedData[expense.id]?.created || expense.created}
                  onChange={(e) => handleChange(e, "created", expense.id)}
                  className="border p-1 w-full"
                />
              ) : (
                expense.created
              )}
            </td>
            <td className="border p-2">
              {editableRow === expense.id ? (
                <input
                  type="text"
                  value={
                    editedData[expense.id]?.primarycategory ||
                    expense.primarycategory
                  }
                  onChange={(e) => handleChange(e, "primarycategory", expense.id)}
                  className="border p-1 w-full"
                />
              ) : (
                expense.primarycategory
              )}
            </td>
            <td className="border p-2">
              {editableRow === expense.id ? (
                <input
                  type="text"
                  value={
                    editedData[expense.id]?.secondarycategory ||
                    expense.secondarycategory
                  }
                  onChange={(e) =>
                    handleChange(e, "secondarycategory", expense.id)
                  }
                  className="border p-1 w-full"
                />
              ) : (
                expense.secondarycategory
              )}
            </td>
            <td className="border p-2 text-center">
              {editableRow === expense.id ? (
                <button
                  onClick={() => handleSave(expense.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditableRow(expense.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
