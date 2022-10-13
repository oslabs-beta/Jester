/* 
 This file contains types used for the backend
 */

export type GlobalError = {
  log: string;
  status: number;
  message: { err: string };
};
