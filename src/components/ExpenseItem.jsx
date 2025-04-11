import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconButton from "./IconButton";
import SkeletonLoaderLinear from "./SkeletonLoader";
import Dropdown from "./DropDown";
import {
  formatDate,
  primaryCategories,
  secondaryCategories,
} from "../lib/utils";
import apiRequest from "../lib/apiRequest";
import { useNotifier } from "../hooks/useNotifier";

export const ExpenseItem = ({ expense, handleChange, index ,refetch}) => {
  const [edit, setEdit] = useState(false);
  const [editedExpense, setEditedExpense] = useState({
    ...expense,
    id: expense?.id,
  });
  const getDateFromTimestamp = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  });

  const notify = useNotifier();

  const updateExpense = useCallback(async () => {
    try {
      const result = await apiRequest.put(
        `/expense/${expense?.id}`,
        editedExpense
      );
      setEdit(false);
      notify({
        type: "success",
        message: "Expense updated",
      });
    } catch (error) {
      console.error(error);
      notify({
        type: "error",
        message: "Unable to update expense",
      });
    }
  });

  const deleteExpense = useCallback(async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this expense item?"
      );

      if (!confirmed) {
        return;
      }
      const result = await apiRequest.delete(`/expense/${expense?.id}`);
      notify({
        type: "success",
        message: "Expense deleted",
      });
      setEdit(false);
      console.log(refetch);
      refetch((pre)=>!pre);
    } catch (error) {
      console.error(error);
      notify({
        type: "error",
        message: "Unable to update expense",
      });
    }
  });

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 120 },
    }),
    exit: { opacity: 0, x: 10 },
  };

  return (
    <motion.div
      className="flex text-white border-b-2 border-white/10 relative"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      transition={{ type: "spring", stiffness: 200 }}
      custom={index}
    >
      {/* Expense Info */}
      <div className="flex-6 flex flex-col justify-around px-2 transition">
        {edit ? (
          <input
            className="outline outline-white/30 px-2 py-1 my-1"
            name="expense"
            type="text"
            value={editedExpense.expense || expense?.expense}
            onChange={(e) =>
              setEditedExpense({ ...editedExpense, expense: e.target.value })
            }
          />
        ) : (
          <p>
            {editedExpense.expense || expense?.expense || (
              <SkeletonLoaderLinear />
            )}
          </p>
        )}

        <div className="flex w-full justify-between">
          {edit ? (
            <Dropdown
              options={primaryCategories}
              defaultOption={
                editedExpense.primarycategory || expense?.primarycategory
              }
              onSelect={(option) => {
                setEditedExpense({ ...editedExpense, primarycategory: option });
              }}
            />
          ) : (
            <p>
              {editedExpense.primarycategory || expense?.primarycategory || (
                <SkeletonLoaderLinear />
              )}
            </p>
          )}

          {edit ? (
            <Dropdown
              options={secondaryCategories}
              defaultOption={
                editedExpense.secondarycategory || expense?.secondarycategory
              }
              onSelect={(option) => {
                setEditedExpense({
                  ...editedExpense,
                  secondarycategory: option,
                });
              }}
            />
          ) : (
            <p>
              {editedExpense.secondarycategory ||
                expense?.secondarycategory || <SkeletonLoaderLinear />}
            </p>
          )}
        </div>

        <div className=" flex items-center">
          {editedExpense.created || expense?.created ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              {edit ? (
                <input
                  type="date"
                  value={formatDate(
                    new Date(editedExpense.created || expense?.created)
                  )}
                  onChange={(e) => {
                    setEditedExpense({
                      ...editedExpense,
                      created: e.target.value,
                    });
                  }}
                  className="bg-gray-100/5 p-2  cursor-pointer inset-shadow-m hover:bg-gray-100/20"
                />
              ) : (
                <p>
                  {getDateFromTimestamp(
                    editedExpense.created || expense?.created
                  )}
                </p>
              )}
            </>
          ) : (
            <SkeletonLoaderLinear />
          )}
        </div>
        <div className="">
          {edit && (
            <motion.div
              className="flex"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
            >
              {/* Save */}
              <IconButton
                onClick={updateExpense}
                buttonContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="oklch(0.723 0.219 149.579)"
                  >
                    <path d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM15 9H5V5H15V9Z" />
                  </svg>
                }
              />
              {/* Save */}

              <IconButton
                onClick={() => setEdit(false)}
                buttonContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#fff"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                }
              />

              {/* Delete */}
              <IconButton
                onClick={deleteExpense}
                buttonContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#f00"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                }
              />
            </motion.div>
          )}
        </div>
      </div>

      <div className=" flex-1  flex items-center justify-center">
        {edit ? (
          <input
            className="outline outline-white/30 px-2 py-1 w-12"
            name="amount"
            type="number"
            value={editedExpense.amount || expense?.amount}
            onChange={(e) =>
              setEditedExpense({ ...editedExpense, amount: e.target.value })
            }
          />
        ) : (
          editedExpense.amount || (expense?.amount)?.toString() || <SkeletonLoaderLinear />
        )}
      </div>
      {editedExpense.created || expense?.created ? (
        <motion.div className="flex-1 flex">
          {/* Action buttons */}
          {!edit && (
            // edit
            <div className="flex items-center flex-1 justify-center">
              <IconButton
                onClick={() => setEdit(true)}
                buttonContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#fff"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                }
                iconColor={"white"}
              />
            </div>
          )}
        </motion.div>
      ) : (
        <div className="flex-1 flex items-center">
          <SkeletonLoaderLinear />
        </div>
      )}
    </motion.div>
  );
};
