import React from "react";
import { Box } from "@mui/material";
import { NavPanel } from "../components/NavPanel";
import { ProjectPanel } from "../components/ProjectPanel";

export const NavPanelContainer = () => {
  return(
    <Box sx={{display: 'flex', flexDirection:'row'}}>
      <NavPanel />
      <ProjectPanel />
    </Box>
  )

}