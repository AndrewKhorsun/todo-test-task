import { ITask } from "../types/task";
import { API } from "./API";
import { responseHandler } from "./responseHandler";

export const getTasks = async (): Promise<ITask[]> => {
  return responseHandler(API.get("todo/"));
};

export const updateTasks = async (
  id: string,
  updatedData: ITask
): Promise<ITask> => {
  return responseHandler(API.put(`todo/${id}`, updatedData));
};

export const deleteTasks = async (id: string): Promise<ITask[]> => {
  return responseHandler(API.delete(`todo/${id}`));
};

export const addTasks = async (newTask: ITask): Promise<ITask[]> => {
  return responseHandler(API.post(`todo/`, newTask));
};
