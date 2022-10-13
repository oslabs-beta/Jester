
import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type ContributorCardProps = {
  imageUrl: string,
  name: string,
  githubLink: string,
  linkedInLink: string
}

export const ContributorCard = (props: ContributorCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="250"
        width="250"
        image={props.imageUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography className="contributorName" gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={props.linkedInLink} target="_blank">
          LinkedIn
        </Button>
        <Button size="small" color="primary" href={props.githubLink} target="_blank">
          GitHub
        </Button>
      </CardActions>
    </Card>
  );
};