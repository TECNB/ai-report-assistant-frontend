import axios from '.';
// 引入LoginResData接口
import { User } from '../interfaces/User';


// 用户登录
export const login = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<User>('api/users/login', params);
}
// 用户注册
export const signup = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<User>('api/users/signup', params);
}
