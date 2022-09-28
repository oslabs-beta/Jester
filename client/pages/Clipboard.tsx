import React from 'react';
import Typography from '@mui/material/Typography';

type clipboardProps = {
  show: boolean;
};
const Clipboard = (props: clipboardProps) => {

  if (props.show)
    return (
      <div className="center">
        <Typography variant="h3">This is the clipboard page.</Typography>
      </div>
    );
  else return null;
};

export default Clipboard;
