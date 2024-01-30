import { useState } from "react";
import { ITask } from "../../../types/task";
import DatePicker from "react-datepicker";
import { Button } from "../../Button/Button";
import "./editModalContent.scss";

interface Props {
  taskItem: ITask;
  editItemHandler: (newValue: ITask) => void;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditModalContent = (props: Props) => {
  const { taskItem, editItemHandler } = props;
  const [editedTask, setEditedTask] = useState(taskItem);

  const handleDateChange = (date: Date) => {
    setEditedTask((prev) => ({ ...prev, dueDate: date }));
  };

  const taskStatus = editedTask.completed ? "Completed" : "Not completed";

  return (
    <div className="edit-modal-content">
      <input
        className="edit-modal-content__input"
        id="inputTitle"
        type="text"
        placeholder="Enter task name"
        value={editedTask.title}
        onChange={(e) =>
          setEditedTask((prev) => ({ ...prev, title: e.target.value }))
        }
      />

      <div>
        <label htmlFor="DatePicker">Final completion date: </label>
        <DatePicker
          id="DatePicker"
          className="edit-modal-content__date"
          selected={new Date(editedTask.dueDate)}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showTimeSelect={false}
          minDate={new Date()}
        />
      </div>
      <div>
        <input
          type="checkbox"
          id={`checkboxLabel-${editedTask.id}`}
          checked={editedTask.completed}
          onChange={(e) =>
            setEditedTask((prev) => ({
              ...prev,
              completed: e.target.checked,
            }))
          }
        />
        <label htmlFor={`checkboxLabel-${editedTask.id}`}>
          Execution status: {taskStatus}
        </label>
      </div>
      <Button
        className="todo-item__edit-btn"
        onClick={() => editItemHandler(editedTask)}
      >
        Edit
      </Button>
    </div>
  );
};
