import axios from 'axios';

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "562837c4-f081-441e-8b82-efb66f432caa",
  },
});

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export const ResultCode = {
  OK: 0,
  Error: 1,
  Captcha: 10,
} as const;

/*export enum ResultCode {
    OK = 0,
    Error = 1,
    Captcha = 10
}*/
