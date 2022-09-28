import React from "react";
import { Box, Button } from "@mui/material";
import { useAppSelector } from "../redux/hooks";

export const AccessClipboardDisplay = () => {
  const show = useAppSelector((state) => state.navPanel.showAccessClipboard);
  // render button to access clipboard
    // onclick will render clipboard page drilling down project id
  // render button to access test code generator page
    // onclick will render test code generator page drilling down project id
  // render button to access delete project
    // onclick will send delete request to backend and set projectInfo in state with return array
  if (show) return(
    <Box>
      <Button>
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