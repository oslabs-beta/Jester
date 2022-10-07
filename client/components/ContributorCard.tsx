
import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../redux/hooks';

export const ContributorCard = () => {
  const i = useAppSelector((state) => state.contributors.i);
  const name = useAppSelector((state) => state.contributors.names[i]);
  const githubLink = useAppSelector((state) => state.contributors.githubLinks[i]);
  const linkedInLink = useAppSelector((state) => state.contributors.linkedInLinks[i]);
  const imageUrl = useAppSelector((state) => state.contributors.imageUrls[i]);
  return (
    <Box>
      <img src={imageUrl} />
      <p className="contributorName">{name}</p>
      <p className="contributorDetails">{linkedInLink}</p>
      <p className="contributorDetails">{githubLink}</p>
      <p className="contributorDetails">{linkedInLink}</p>
    </Box>
  );
};