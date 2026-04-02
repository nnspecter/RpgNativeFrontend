import { useMutation } from "@tanstack/react-query";
import { AuthData, Task } from "../axios/apiTypes";
import { delTask, newTask, startLogin, startRegistration, updTask } from "../axios/api";
import { invalidateAll } from "./onSuccess";
import { loadToken, saveToken } from "../secureStore";
import { useUserStore } from "../../ZustandStore/store";

//login
export const useLogin = () => {
  const {setUser} = useUserStore();

  return useMutation({
    mutationFn: (data: AuthData) => startLogin(data),
    onSuccess: async (data) => {
      await saveToken(data);
      setUser(data);
      console.log("TOKEN SAVED:", data);
      invalidateAll();
    },  
  });
};

//registration
export const useRegistration = () => {
  const {setUser} = useUserStore();
  return useMutation({
    mutationFn: (data: AuthData) => startRegistration(data),
    onSuccess: async (data) => {
      await saveToken(data);
      setUser(data);
      console.log("TOKEN SAVED:", data);
      invalidateAll();
    },  
  });
};
//Tasks 
export const useNewTask = () => {
  return useMutation({
    mutationFn: (data: Task) => newTask(data),
    onSuccess: ()=> {invalidateAll(); console.log("Таска создана")},
  });
};
//Tasks 
export const useUpdTask = () => {
  return useMutation({
    mutationFn: (data: Task) => updTask(data),
    onSuccess: ()=> {invalidateAll(); console.log("Таска изменена")},
  });
};
export const useDelTask = () => {
  return useMutation({
    mutationFn: (taskId: number) => delTask(taskId),
    onSuccess: ()=> {invalidateAll(); console.log("Таска удалена")},
  });
};
