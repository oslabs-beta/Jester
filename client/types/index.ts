export type clipboardStateType = {
  server: string;
  codeSnippets: Array<string>;
  codeDisplay: string;
};

export type postSnippetPayload = {
  projectId: number,
  codeOutput: string,
}