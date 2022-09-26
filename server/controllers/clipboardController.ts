
import express, { Express, Request, Response, NextFunction } from 'express';

type Clipboard = {
  get: (req: Request, res: Response, next: NextFunction) => void,
  append: (req: Request, res: Response, next: NextFunction) => void,
  delete: (req: Request, res: Response, next: NextFunction) => void,
}

export const clipboardController: Clipboard = {
  // Middleware to fetch clipboard data from logged in user
  get: (req: Request, res: Response, next: NextFunction) => {
    // this controller should query the Clipboard table of database 
    // and save an array of code snippets to res.locals.clipboard
    console.log('clipboardController.get');
    res.locals.clipboard = 'nothing to send yet';
    return next();
  },

  // Middleware to ...
  append: (req: Request, res: Response, next: NextFunction) => {
    // this controller should insert a new record in the Clipboard table 
    // and the returned value to res.locals.clipboard
  },

  // Middleware to ...
  delete: (req: Request, res: Response, next: NextFunction) => {
    // this controller should delete all the records for that user on the Clipboard table array  
    // and save the returned array to res.locals.clipboard
  },
};
