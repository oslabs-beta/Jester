import React from "react";
import { Box } from "@mui/material";
import { NavPanel } from "../components/NavPanel";
import { ProjectPanel } from "../containers/ProjectPanelContainer";
import { HistoryPanel } from "../components/HistoryPanel";

export const NavPanelContainer = () => {
  return(
    <Box sx={{display: 'flex', flexDirection:'row'}}>
      <NavPanel />
      <HistoryPanel />
      <ProjectPanel />
    </Box>
  )

}