import { useCallback, useState } from "react";
import { ITask } from "../../../types/task";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import { Button } from "../../Button/Button";
import "./newTaskModalContent.scss";

interface Props {
  addNewTask: (newTask: ITask) => void;
}

const defaultTaskValue: ITask = {
  id: uuidv4(),
  title: "",
  completed: false,
  dueDate: new Date(),
};

export const NewTaskModalContent = (props: Props) => {
  const { addNewTask } = props;
  const [newTask, setNewTask] = useState<ITask>(defaultTaskValue);

  const handleDateChange = (date: Date) => {
    setNewTask((prev) => ({ ...prev, dueDate: date }));
  };

  const addTask = useCallback(() => {
    addNewTask(newTask);
    setNewTask(defaultTaskValue);
  }, [addNewTask, newTask]);

  return (
    <div className="new-task">
      <input
        type="text"
        className="new-task__input"
        value={newTask.title}
        placeholder="Enter task name"
        onChange={(e) =>
          setNewTask((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <div>
        <label htmlFor="DatePicker">Final completion date: </label>
        <DatePicker
          id="DatePicker"
          className="new-task__date"
          selected={new Date(newTask.dueDate)}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showTimeSelect={false}
          minDate={new Date()}
        />
      </div>
      <Button onClick={() => addTask()}>add new task</Button>
    </div>
  );
};
