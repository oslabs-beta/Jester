import React, { useState } from 'react';
import Button from '@mui/material/Button';

type propsType = {
  start: string | JSX.Element;
  end: string | JSX.Element;
  onClick: () => void;
  testId: string;
};

// This component holds functionality for a button to change icons on user selection
// This component is used for both the copy to clipboard button, and the add to project button

const AppButton = (props: propsType) => {
  const { start, end, onClick, testId } = props;
  const [icon, setIcon] = useState(start);

  const handleClick = (): void => {
    setIcon(end);
    onClick();
    setTimeout(() => setIcon(start), 1000);
  };

  return (
    <Button
      data-testid={testId}
      variant="outlined"
      onClick={handleClick}
      sx={{ marginBottom: 1 }}
    >
      {icon}
    </Button>
  );
};

export default AppButton;
