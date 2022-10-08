import React, { useState } from 'react';
import Button from '@mui/material/Button';

type propsType = {
  start: string | JSX.Element ,
  end: string | JSX.Element ,
  onClick: () => void,
  testId: string,
};

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
      data-testid={ testId }
      variant='outlined'
      color="info" 
      onClick = { handleClick }
      sx={{ marginBottom: 1 }}
    >
      { icon }
    </Button>
  );
};

export default AppButton;
