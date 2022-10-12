// Package Imports
import 'dotenv/config';

import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import path from 'path';

import authRoutes from './routes/auth';
import clipboardRoutes from './routes/clipboard';
import projectRoutes from './routes/project';
import testsRoutes from './routes/tests';
import { GlobalError } from './serverTypes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport and cookie-session methods for OAuth 2
app.use(
  cookieSession({
    name: 'github-auth-session',
    keys: [process.env.key1 || '', process.env.key2 || '']
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/auth', authRoutes);
app.use('/api/tests', testsRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/clipboard', clipboardRoutes);
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.use(
  '/stylesheets',
  express.static(path.join(__dirname, '../client/stylesheets'))
);

// Serve base HTML file
app.get('*', (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

// Global error handling middleware
app.use((err: GlobalError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});

export default app;
