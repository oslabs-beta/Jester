import React from "react";
import { Box, Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { ClipBoard } from "./ClipBoard";
import { setShowClipboard } from '../redux/reducers/userInfoSlice'


type accessClipboardDisplayProps = {
  projectId: number,
}
export const AccessClipboardDisplay = (props: accessClipboardDisplayProps) => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.userInfo.projectsInfo);
  let show;
  for (let project of projects) {
    if (project.project_id === props.projectId) {
      show = project.showAccessClipboard;
    }
  }

  // render button to access clipboard
    // onclick will render clipboard page drilling down project id
  // render button to access test code generator page
    // onclick will render test code generator page drilling down project id
  // render button to access delete project
    // onclick will send delete request to backend and set projectInfo in state with return array
  const handleClipboardClick = () => {
    // onclick will render clipboard page drilling down project id
    dispatch(setShowClipboard(props.projectId));
  }
  if (show) return(
    <Box>
      <Button onClick={handleClipboardClick}>
        Clipboard
      </Button>
      <Button>
        Generate New Test Code
      </Button>
      <Button>
        Delete Project
      </Button>
    </Box>
  )
  else return null;
}