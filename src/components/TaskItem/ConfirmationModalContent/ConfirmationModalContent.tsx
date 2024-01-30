import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { deleteTasks } from "../../../api/taskListAPI";
import { toast } from "react-toastify";
import { Button } from "../../Button/Button";
import './confirmationModalContent.scss'

interface Props {
  id: string;
  setRemovedItemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmationModalContent = (props: Props) => {
  const { id, setRemovedItemModal } = props;
  const queryClient = useQueryClient();
  const deleteTask = useMutation({
    mutationFn: (taskId: string) => deleteTasks(taskId),
  });

  const deleteItemHandler = useCallback(() => {
    deleteTask.mutate(id, {
      onSuccess() {
        queryClient.refetchQueries({ queryKey: ["tasks"] });
        setRemovedItemModal(false);
      },
      onError(error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    });
  }, [deleteTask, id, queryClient, setRemovedItemModal]);
  return (
    <div className="confirm-modal-content">
      <p>Are you sure you want to delete the task?</p>
      <div className="confirm-modal-content__btn-block">
        <Button
          className="confirm-modal-content__btn-block--btn"
          onClick={() => deleteItemHandler()}
        >
          Yes
        </Button>

        <Button
          className="confirm-modal-content__btn-block--btn"
          onClick={() => setRemovedItemModal(false)}
        >
          No
        </Button>
      </div>
    </div>
  );
};
