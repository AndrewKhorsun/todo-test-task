import { useState, useCallback, useEffect } from "react";
import { addTasks, getTasks } from "../../api/taskListAPI";
import { TaskItem } from "../TaskItem/TaskItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ModalBox } from "../modalBox";
import { ITask } from "../../types/task";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "./taskList.scss";
import { Button } from "../Button/Button";

const defaultTaskValue: ITask = {
  id: uuidv4(),
  title: "",
  completed: false,
  dueDate: new Date(),
};

export const TaskList = () => {
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<ITask>(defaultTaskValue);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const [tasks, setTasks] = useState(data);
  console.log("tasks", tasks);

  const addTaskMutation = useMutation({
    mutationFn: (task: ITask) => addTasks(task),
  });

  const handleDateChange = (date: Date) => {
    setNewTask((prev) => ({ ...prev, dueDate: date }));
  };

  const addNewTask = useCallback(() => {
    addTaskMutation.mutate(newTask, {
      onSuccess() {
        refetch();
        setNewTaskModalOpen(false);
        setNewTask(defaultTaskValue);
      },
      onError(error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    });
  }, [addTaskMutation, newTask, refetch]);

  useEffect(()=> {
    setTasks(data)
  },[data])

  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div className="task-list">
      <Button onClick={() => setNewTaskModalOpen(true)}>Add new task</Button>
      {tasks?.map((el) => (
        <TaskItem task={el} setTasks={setTasks} />
      ))}
      <ModalBox
        isOpenModal={newTaskModalOpen}
        onCloseModal={setNewTaskModalOpen}
      >
        <input
          type="text"
          value={newTask.title}
          placeholder="task title"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <div>
          <label>Дата выполнения:</label>
          <DatePicker
            selected={new Date(newTask.dueDate)}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            showTimeSelect={false}
            minDate={new Date()}
          />
        </div>
        <Button onClick={() => addNewTask()}>add new task</Button>
      </ModalBox>
    </div>
  );
};
