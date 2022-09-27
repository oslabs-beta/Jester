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
    SELECT * FROM project_table
    WHERE user_id=$1`;
    const params = [userId];

    const result = await db.query(queryString, params);

    res.locals.projects = result.rows;
    return next();
  },

  // Middleware to add a new Project associated with a userId
  addProject: (req: Request, res: Response, next: NextFunction) => {
    // const { userId } = req.params;
    // const { project_name } = req.body;

    // this controller should insert a new record in the Projects table
    // with the name of project_name and a foreign key userId
    // and save the updated list of projects to res.locals.project

    res.locals.projects = 'nothing to send yet';
    return next();
  },

  // Middleware to delete a specific project
  deleteProject: (req: Request, res: Response, next: NextFunction) => {
    // const { project_id } = req.params;

    // this controller should delete the project in the Projects table
    // with the provided project_id, AND ALSO all code snippets under this project
    // and save the updated list of projects to res.locals.clipboard

    res.locals.projects = 'nothing to send yet';
    return next();
  }
};
