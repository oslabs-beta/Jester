import express, { Express, Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

type Project = {
  getProjects: (req: Request, res: Response, next: NextFunction) => void;
  addProject: (req: Request, res: Response, next: NextFunction) => void;
  deleteProject: (req: Request, res: Response, next: NextFunction) => void;
};

export const projectController: Project = {
  // Middleware to fetch list of projects belonging to a user
  getProjects: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    // this controller should query the the Projects table for all
    // projects belonging to userId and save an array of projects to res.locals.projects

    const queryString = `
    SELECT * FROM projects_table
    WHERE user_id=$1`;
    const params = [userId];

    const result = await db.query(queryString, params);

    res.locals.projects = result.rows;

    return next();
  },

  // Middleware to add a new Project associated with a userId
  addProject: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { project_name } = req.body;

    // this controller should insert a new record in the Projects table
    // with the name of project_name and a foreign key userId
    // and save the updated list of projects to res.locals.project
    const queryString = `
      INSERT INTO projects_table(project_name, user_id)
      VALUES($1, $2)
    `
    const params = [project_name, userId];

    const result = await db.query(queryString, params);

    res.locals.projects = result.rows;
    return next();
  },

  // Middleware to delete a specific project
  deleteProject: async (req: Request, res: Response, next: NextFunction) => {
    const { project_id, user_id } = req.params;

    // this controller should delete the project in the Projects table
    // with the provided project_id, AND ALSO all code snippets under this project
    // and save the updated list of projects to res.locals.clipboard


    const params = [project_id, user_id];

    const snipsQuery = `
    DELETE FROM code_snippets_table
    WHERE project_id = $1
    `
    const projQuery = `
    DELETE FROM projects_table
    WHERE project_id = $1
    `

   await db.query(snipsQuery, params);
   await db.query(projQuery, params);

    const updatedListQuery = `
    SELECT * from projects_table
    WHERE user_id = $2
    `
    const result = await db.query(updatedListQuery, params);

    res.locals.projects = result.rows;
    return next();
  }
};
