import { produce } from 'immer';
import { isEmpty } from 'lodash';
import { create } from 'zustand';
import type { User, UserRow } from '@modules/users/types';
import { reduce } from '@/utils';
import { userAdapter } from '@modules/users/adapters';
import { fetchUsers } from '@modules/users/api';

interface UsersStoreStateData {
    users: Record<string, User>;
}

interface UsersStoreStateFunctions {
    fetchUsers: (userIds: string[]) => Promise<Record<string, User>>;
    upsertUser: (userRow: UserRow) => void;
}

type UsersStoreState = UsersStoreStateData & UsersStoreStateFunctions;

const DEFAULT_DATA: UsersStoreStateData = {
    users: {},
};

const useUsersStore = create<UsersStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    fetchUsers: async (userIds: string[]): Promise<Record<string, User>> => {
        const unknownUserIds = userIds.filter((u) => !get().users[u]);

        if (isEmpty(unknownUserIds)) {
            return reduce(userIds.map((u) => get().users[u]));
        }

        const newUsers = await fetchUsers(unknownUserIds);
        const users = {
            ...get().users,
            ...reduce(newUsers),
        };
        set({ users });
        return reduce(userIds.filter((u) => users[u]).map((u) => users[u]));
    },

    upsertUser: (userRow: UserRow) => {
        console.log(
            `[usersStore][upsertUser] userRow update=${JSON.stringify(userRow)}`
        );

        set((state) => ({
            users: produce(state.users, (draft) => {
                draft[userRow.id] = userAdapter(userRow);
            }),
        }));
    },
}));

export default useUsersStore;
