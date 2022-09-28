import express, { Express, Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

type Clipboard = {
  getClipboard: (req: Request, res: Response, next: NextFunction) => void;
  appendClipboard: (req: Request, res: Response, next: NextFunction) => void;
  deleteSnippet: (req: Request, res: Response, next: NextFunction) => void;
};

export const clipboardController: Clipboard = {
  // Middleware to fetch clipboard for a specified project
  getClipboard: async (req: Request, res: Response, next: NextFunction) => {
  
    const { projectId } = req.params;

    // this controller should query the Snippets table for all snippets belonging
    // to a project and save an array of code snippets to res.locals.clipboard

    const queryString = `
      SELECT * FROM code_snippets_table
      WHERE project_id = $1
    `
    const params = [projectId];

    const result = await db.query(queryString, params);

    res.locals.clipboard = result.rows;
    return next();
  },

  // Middleware to add a code snippet to the clipboard of a specified project
  appendClipboard: async (req: Request, res: Response, next: NextFunction) => {
    const { projectId, userId } = req.params;
    const { code_snippet } = req.body

    // this controller should insert a new record in the Clipboard table
    // and save the updated clipboard to res.locals.clipboard
    const date = Date.now();
    const params = [code_snippet, date, userId, projectId];

    const addClipQuery = `
    INSERT INTO code_snippets_table(code_snippet, created_at, user_id, project_id)
    VALUES $1, $2, $3, $4
    RETURNING * FROM code_snippets_table WHERE project_id=$4
    `
    const result = await db.query(addClipQuery, params)

    res.locals.clipboard = result;
    return next();
  },

  // Middleware to delete a specific code snippet in a project's clipboard
  deleteSnippet: async (req: Request, res: Response, next: NextFunction) => {
    const { snippetId, projectId } = req.params;

    // this controller should delete one specific code snippet
    // and save the updated clipboard to res.locals.clipboard
    const params = [snippetId, projectId];

    const deleteSnipQuery = `
    DELETE FROM code_snippets_table
    WHERE snippet_id=$1
    RETURNING * FROM code_snippets_table WHERE project_id=$2
    `
    const result = await db.query(deleteSnipQuery, params);

    res.locals.clipboard = result;
    return next();
  }
};
