export type clipboardStateType = {
  server: string;
  codeSnippets: Array<string>;
  codeDisplay: string;
};

export type postSnippetPayload = {
  projectId: number,
  codeOutput: string[],
}

export type projectsType = {
  project_id: number;
  project_name: string;
  user_id: number;
  clipboardInfo?: string[];
  showAccessClipboard: boolean;
};

export type userInfoStateType = {
  showLogin: boolean;
  showSave: boolean;
  userId: number;
  projectsInfo: projectsType[];
  currentProject: string;
  currentProjectId: number;
  newProject: string;
};