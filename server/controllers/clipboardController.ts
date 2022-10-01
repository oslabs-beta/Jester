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
  
    const { project_id } = req.params;

    // this controller should query the Snippets table for all snippets belonging
    // to a project and save an array of code snippets to res.locals.clipboard

    const queryString = `
      SELECT * FROM code_snippets_table
      WHERE project_id = $1
    `;
    const params = [project_id];

    const result = await db.query(queryString, params);

    res.locals.clipboard = result.rows;
    return next();
  },

  // Middleware to add a code snippet to the clipboard of a specified project
  appendClipboard: async (req: Request, res: Response, next: NextFunction) => {
    const { project_id } = req.params;
    const { code_snippet, user_id } = req.body;

    // this controller should insert a new record in the Clipboard table
    // and save the updated clipboard to res.locals.clipboard
    const date = Date.now();
    

    const addClipQuery = `
    INSERT INTO code_snippets_table(code_snippet, created_at, user_id, project_id)
    VALUES ($1, $2, $3, $4)
    `;
    const params1 = [code_snippet, date, user_id, project_id];

    const getClipsQuery = `
    SELECT * FROM code_snippets_table
    WHERE project_id = $1
    `;
    const params2 = [project_id];

    await db.query(addClipQuery, params1);

    const result = await db.query(getClipsQuery, params2);

    res.locals.clipboard = result.rows;
    return next();
  },

  // Middleware to delete a specific code snippet in a project's clipboard
  deleteSnippet: async (req: Request, res: Response, next: NextFunction) => {
    const { snippet_id, project_id } = req.body;

    // this controller should delete one specific code snippet
    // and save the updated clipboard to res.locals.clipboard
    const params1 = [snippet_id];
    const params2 = [project_id];

    const deleteSnipQuery = `
    DELETE FROM code_snippets_table
    WHERE snippet_id=$1
    `;

    const getClipsQuery = `
    SELECT * FROM code_snippets_table
    WHERE project_id = $1
    `;

    await db.query(deleteSnipQuery, params1);

    const result = await db.query(getClipsQuery, params2);

    res.locals.clipboard = result.rows;
    return next();
  }
};
