import express, { Express, Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

type Clipboard = {
  getClipboard: (req: Request, res: Response, next: NextFunction) => void;
  appendClipboard: (req: Request, res: Response, next: NextFunction) => void;
  deleteSnippet: (req: Request, res: Response, next: NextFunction) => void;
};

export const clipboardController: Clipboard = {
  // Middleware to fetch clipboard for a specified project
  getClipboard: (req: Request, res: Response, next: NextFunction) => {
    // const { projectId } = req.params;

    // this controller should query the Snippets table for all snippets belonging
    // to a project and save an array of code snippets to res.locals.clipboard

    res.locals.clipboard = 'nothing to send yet';
    return next();
  },

  // Middleware to add a code snippet to the clipboard of a specified project
  appendClipboard: (req: Request, res: Response, next: NextFunction) => {
    // const { projectId } = req.params;
    // const { code_snippet } = req.body

    // this controller should insert a new record in the Clipboard table
    // and save the updated clipboard to res.locals.clipboard

    res.locals.clipboard = 'nothing to send yet';
    return next();
  },

  // Middleware to delete a specific code snippet in a project's clipboard
  deleteSnippet: (req: Request, res: Response, next: NextFunction) => {
    // const { snippetId } = req.params;

    // this controller should delete one specific code snippet
    // and save the updated clipboard to res.locals.clipboard

    res.locals.clipboard = 'nothing to send yet';
    return next();
  }
};
