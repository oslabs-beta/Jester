import React from "react";
import { Box, Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { setProjectsInfo } from '../redux/reducers/userInfoSlice'
import axios from 'axios'


type accessClipboardDisplayProps = {
  projectId: number,
}
export const AccessClipboardDisplay = (props: accessClipboardDisplayProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn)
  const projects = useAppSelector((state) => state.userInfo.projectsInfo);
  let show;
  for (let project of projects) {
    if (project.project_id === props.projectId) {
      show = project.showAccessClipboard;
    }
  }

  const handleClipboardClick = () => {
    if(isLoggedIn) navigate(`/clipboard/${props.projectId}`);
    else navigate('/clipboard/0') // what should this be?
  }
  const handleGenerateClick = () =>{
    if (isLoggedIn) navigate(`/CodeGenerator/${props.projectId}`)
    else navigate('/home');
  }

  const handleDeleteClick = async () => {
    if (isLoggedIn) {
      '/api/project/:projectId'
      const projects = await axios.delete(`/api/project/${props.projectId}`);
      dispatch(setProjectsInfo(projects.data))
    } else {
      // clear clipboard data
    }
  }
  if (show) return(
    <Box>
      <Button onClick={handleClipboardClick}>
        Clipboard
      </Button>
      <Button onClick={handleGenerateClick}>
        Generate New Test Code
      </Button>
      <Button onClick={handleDeleteClick}>
        Delete Project
      </Button>
    </Box>
  )
  else return null;
}