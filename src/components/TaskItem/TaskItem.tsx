import { useCallback, useState } from "react";
import { ITask } from "../../types/task";
import "./taskItem.scss";
import { ModalBox } from "../modalBox";
import moment from "moment";
import { Button } from "../Button/Button";
import { EditModalContent } from "./EditModalContent/EditModalContent";
import { ConfirmationModalContent } from "./ConfirmationModalContent/ConfirmationModalContent";
import { useMutation } from "@tanstack/react-query";
import { updateTasks } from "../../api/taskListAPI";
import { toast } from "react-toastify";
interface Props {
  task: ITask;
  setTasks: React.Dispatch<React.SetStateAction<ITask[] | undefined>>;
}

export const TaskItem = (props: Props) => {
  const { setTasks, task } = props;
  const [editedTodo, setEditedTodo] = useState(task);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removedItemModal, setRemovedItemModal] = useState(false);
  const { completed, title, dueDate, id } = editedTodo;

  const date = moment(dueDate).format("DD-MM-YYYY");

  const taskStatus = completed ? "Completed" : "Not completed";

  const updateTask = useMutation({
    mutationFn: (updatedData: ITask) => updateTasks(id, updatedData),
  });

  const editItemHandler = useCallback(
    (newValue: ITask) => {
      if (!newValue.title) {
        toast.error("A task cannot be without a name");
        return;
      }
      setEditedTodo(newValue);

      updateTask.mutate(newValue, {
        onSuccess(updatedTask) {
          setTasks((prev) => {
            return prev?.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            );
          });
          setEditModalOpen(false);
        },
        onError(error) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        },
      });
    },
    [setTasks, updateTask]
  );

  return (
    <>
      <div className="task-item">
        <p>Task: {title}</p>
        <p>Complete by: {date}</p>
        <div>
          <input
            type="checkbox"
            id="checkboxLabel"
            checked={editedTodo.completed}
            onChange={(e) =>
              editItemHandler({ ...editedTodo, completed: e.target.checked })
            }
          />
          <label htmlFor="checkboxLabel">Execution status: {taskStatus}</label>
        </div>
        <div className="task-item__btn">
          <Button
            onClick={() => setRemovedItemModal(true)}
            className="todo-item__removed-btn"
          >
            Delete task
          </Button>

          <Button
            className="todo-item__edit-btn"
            onClick={() => setEditModalOpen(true)}
          >
            Edit
          </Button>
        </div>
      </div>

      <ModalBox isOpenModal={editModalOpen} onCloseModal={setEditModalOpen}>
        <EditModalContent
          taskItem={task}
          editItemHandler={editItemHandler}
          setEditModalOpen={setEditModalOpen}
        />
      </ModalBox>

      <ModalBox
        isOpenModal={removedItemModal}
        onCloseModal={setRemovedItemModal}
      >
        <ConfirmationModalContent
          id={id}
          setRemovedItemModal={setRemovedItemModal}
        />
      </ModalBox>
    </>
  );
};
