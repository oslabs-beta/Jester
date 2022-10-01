import express, { Express, Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

type Project = {
  getProjects: (req: Request, res: Response, next: NextFunction) => void;
  addProject: (req: Request, res: Response, next: NextFunction) => void;
  deleteProject: (req: Request, res: Response, next: NextFunction) => void;
};

export const projectController: Project = {
  // this controller queries the projects table and returns all projects found
  //whose user ID matches the user ID from the request body
  getProjects: async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const queryString = `
    SELECT * FROM projects_table
    WHERE user_id=$1
    `;
    const params = [userId];

    const result = await db.query(queryString, params);

    res.locals.projects = result.rows;

    return next(); 
  },

  // Middleware to add a new Project associated with a userId
  addProject: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, project_name } = req.body;

    // this controller should insert a new record in the Projects table
    // with the name of project_name and a foreign key userId
    // and send back the updated project list
    const queryString1 = `
      INSERT INTO projects_table(user_id, project_name)
      VALUES($1, $2)
    `;
    const params1 = [user_id, project_name];
    
    const queryString2 = `
    SELECT * FROM projects_table
    WHERE user_id=$1
    `;
    const params2 = [user_id];

    await db.query(queryString1, params1);

    const allProjs = await db.query(queryString2, params2);
    res.locals.projects = allProjs.rows;
    return next();
  },

  // Middleware to delete a specific project
  deleteProject: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, project_id } = req.body;
    // this controller should delete the project in the Projects table
    // with the provided project_id, AND ALSO all code snippets under this project
    // and send back the updated project list
    const params1 = [project_id];
    const params2 = [user_id];
  

    const snipsQuery = `
    DELETE FROM code_snippets_table
    WHERE project_id = $1
    `; 
    const projQuery = `
    DELETE FROM projects_table
    WHERE project_id = $1
    `;

    await db.query(snipsQuery, params1);
    await db.query(projQuery, params1);

    const updatedListQuery = `
    SELECT * from projects_table
    WHERE user_id = $1
    `;
    const result = await db.query(updatedListQuery, params2);

    res.locals.projects = result.rows;
    return next();
  }
};
