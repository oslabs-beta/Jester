import React from "react";
import { Box } from "@mui/material";
import { ProjectPanelContainer } from "./ProjectPanelContainer";
import { HistoryPanel } from "../components/HistoryPanel";
import { NavPanelDisplay } from "../components/NavPanelDisplay";

export const NavPanelContainer: any = () => {
  return(
    <Box sx={{display: 'flex', flexDirection:'row'}}>
      <NavPanelDisplay />
      <HistoryPanel />
      <ProjectPanelContainer />
    </Box>
  )

}