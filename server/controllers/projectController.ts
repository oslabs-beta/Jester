import { NextFunction, Request, Response } from 'express';

import db from '../models/userModel';

type Project = {
  getProjects: (req: Request, res: Response, next: NextFunction) => void;
  addProject: (req: Request, res: Response, next: NextFunction) => void;
  deleteProject: (req: Request, res: Response, next: NextFunction) => void;
};

export const projectController: Project = {
  /*
    This controller queries the projects table and returns all projects found
    whose user ID matches the user ID from the request body
  */
  getProjects: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = res.locals;

    if (!user_id) return next({
      log: 'user ID not found on res.locals',
      status: 400,
      message: 'an error occurred in getProjects middleware function'
    });

    const queryString = `
    SELECT * FROM projects_table
    WHERE user_id=$1
    `;
    const params = [user_id];

    try {
      const result = await db.query(queryString, params);
      res.locals.projects = result.rows;
      return next(); 
    }
    catch(err) {
      return next({
        log: `error in getProjects: ${err}`,
        status: 500,
        message: 'error occurred in getProjects middleware function'
      });
    }
  },

  /*
    Middleware to add a new Project associated with a userId
    This controller should insert a new record in the Projects table
    with the name of project_name and a foreign key userId
    and send back the updated project list
  */
  addProject: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = res.locals;
    const { project_name } = req.body;

    if (!user_id) return next({
      log: 'user ID not found on res.locals',
      status: 400,
      message: 'an error occurred in addProject middleware function'
    });

    if (!project_name) return next({
      log: 'project name not found on request body',
      status: 400,
      message: 'an error occurred in addProject middleware function'
    });
    
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

    try {
      await db.query(queryString1, params1);
      const allProjs = await db.query(queryString2, params2);
      res.locals.projects = allProjs.rows;
      return next();
    }
    catch(err) {
      return next({
        log: `error in addProject: ${err}`,
        status: 500,
        message: 'error occurred in addProject middleware function'
      });
    }   
  },

  /*
    Middleware to delete a specific project
    This controller should delete the project in the Projects table
    with the provided project_id, AND ALSO all code snippets under this project
    and send back the updated project list
  */
  deleteProject: async (req: Request, res: Response, next: NextFunction) => {
    const user_id = res.locals.user_id;
    const { project_id } = req.params;

    if (!project_id) return next({
      log: 'project ID not fond on request body',
      status: 400,
      message: 'error occurred in deleteProject middleware function'
    });

    if (!user_id) return next({
      log: 'user ID not fond on res.locals',
      status: 400,
      message: 'error occurred in deleteProject middleware function'
    });
    
    const params1 = [project_id, user_id];
    const params2 = [user_id];
  

    const snipsQuery = `
    DELETE FROM code_snippets_table
    WHERE project_id = $1
    AND user_id = $2
    `; 
    const projQuery = `
    DELETE FROM projects_table
    WHERE project_id = $1
    AND user_id = $2
    `;
    try {
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

    catch(err) {
      return next({
        log: `error in addProject: ${err}`,
        status: 500,
        message: 'error occurred in deleteProject middleware function'
      });
    }  
  }
};
