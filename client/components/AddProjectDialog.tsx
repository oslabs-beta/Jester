import React, {useState, ChangeEvent} from "react";
import { Dialog, InputLabel, TextField, Button, FormControl } from "@mui/material";
import { setShowAddProject } from "../redux/reducers/navPanelSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setProjectsInfo } from "../redux/reducers/userInfoSlice";
import axios from "axios";

export const AddProjectDialog = () => {
  const [projectName, setProjectName] = useState('');
  const showAddProject = useAppSelector((state) => state.navPanel.showAddProject)
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setShowAddProject())
  } 
  const handleAddProject = async () => {
    // send post request to backend (/api/project/:userId)
    const response = await axios.post('/api/project/userId', {project_name: projectName}) // need to get userId
    // update projectNames array in state with response.data
    dispatch(setProjectsInfo(response.data))
    handleClose();
  }

  const updateProjectName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectName(e.target.value)
  }

  return(
    <Dialog onClose={handleClose} open={showAddProject}>
        <TextField label="Project Name:" onChange={updateProjectName}></TextField>
      <Button onClick={handleAddProject}>Create Project</Button>
    </Dialog>

  )
}