export interface User {
    userId: string;
    username: string;
    passwordHash: string;
    avatarUrl: string | null;
    age: number;
    city: string;
    province: string;
    signature: string | null;
    aboutMe: string | null;
    starRating: number;
    token: string;
    salt: string;
    lastLogin: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}