// userInfoStore.ts
import { defineStore } from 'pinia';
// 引入登录接口返回的数据类型User
import { User } from '../interfaces/User';


export interface UserInfoState {
    sessionToken: string;
    user: User | null;
}

export const userInfoStore = defineStore({
    id: 'auth',
    state: (): UserInfoState => ({
        sessionToken: localStorage.getItem('token') || '',
        user: null,
    }),
    actions: {
        setSessionToken(sessionToken: string) {
            this.sessionToken = sessionToken;
            localStorage.setItem('sessionToken', sessionToken);
        },
        setUser(user: User) {
            this.user = user;
        },
        clearSessionToken() {
            this.sessionToken = '';
            localStorage.removeItem('sessionToken');
        },
    },
});
