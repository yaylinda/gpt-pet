import { create } from 'zustand';

interface CompletedTasksStoreStateData {
    completedTasks: Record<string, string[]>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CompletedTasksStoreStateFunctions {}

type CompletedTasksStoreState = CompletedTasksStoreStateData &
    CompletedTasksStoreStateFunctions;

const DEFAULT_DATA: CompletedTasksStoreStateData = {
    completedTasks: {},
};

const useCompletedTasksStore = create<CompletedTasksStoreState>()(() => ({
    ...DEFAULT_DATA,
}));

export default useCompletedTasksStore;
