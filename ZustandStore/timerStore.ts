import { create } from "zustand";

type SelectedTask = {
    taskName: string;
    minutes: number;
};

type TimerStore = {
    isTimer: boolean;
    setIsTimer: (value: boolean) => void;

    selectedTask: SelectedTask;
    setSelectedTask: (taskName: string, minutes: number) => void;
};

export const useTimerStore = create<TimerStore>((set) => ({
    isTimer: false,
    setIsTimer: (value) => set({ isTimer: value }),

    selectedTask: { taskName: "", minutes: 0 },
    setSelectedTask: (taskName, minutes) =>
        set({
            selectedTask: { taskName, minutes },
        }),
}));