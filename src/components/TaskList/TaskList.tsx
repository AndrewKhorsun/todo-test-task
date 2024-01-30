import { useState, useCallback, useEffect } from "react";
import { addTasks, getTasks } from "../../api/taskListAPI";
import { TaskItem } from "../TaskItem/TaskItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ModalBox } from "../modalBox";
import { ITask } from "../../types/task";

import { toast } from "react-toastify";
import "./taskList.scss";
import { Button } from "../Button/Button";
import { NewTaskModalContent } from "./NewTaskModalContent/NewTaskModalContent";

export const TaskList = () => {
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const [tasks, setTasks] = useState(data);

  const addTaskMutation = useMutation({
    mutationFn: (task: ITask) => addTasks(task),
  });

  const addNewTask = useCallback(
    (newTask: ITask) => {
      if (!newTask.title) {
        toast.error("A task cannot be without a name");
        return;
      }

      addTaskMutation.mutate(newTask, {
        onSuccess() {
          refetch();
          setNewTaskModalOpen(false);
        },
        onError(error) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        },
      });
    },
    [addTaskMutation, refetch]
  );

  useEffect(() => {
    setTasks(data);
  }, [data]);

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
        <NewTaskModalContent addNewTask={addNewTask} />
      </ModalBox>
    </div>
  );
};
