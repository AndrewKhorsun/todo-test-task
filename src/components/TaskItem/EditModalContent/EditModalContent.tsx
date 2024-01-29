import { useState } from "react";
import "./editModalContent.scss";
import { ITask } from "../../../types/task";
import DatePicker from "react-datepicker";
import { Button } from "../../Button/Button";

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

  return (
    <>
      <input
        type="text"
        placeholder="title"
        value={editedTask.title}
        onChange={(e) =>
          setEditedTask((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <div>
        <label>Дата выполнения:</label>
        <DatePicker
          selected={new Date(editedTask.dueDate)}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showTimeSelect={false}
          minDate={new Date()}
        />
      </div>
      <input
        type="checkbox"
        checked={editedTask.completed}
        onChange={(e) =>
          setEditedTask((prev) => ({
            ...prev,
            completed: e.target.checked,
          }))
        }
      />
      <Button
        className="todo-item__edit-btn"
        onClick={() => editItemHandler(editedTask)}
      >
        Edit
      </Button>
    </>
  );
};
