
import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
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
  console.log(props.name);
  // const i = useAppSelector((state) => state.contributors.i);
  // const name = useAppSelector((state) => state.contributors.names[i]);
  // const githubLink = useAppSelector((state) => state.contributors.githubLinks[i]);
  // const linkedInLink = useAppSelector((state) => state.contributors.linkedInLinks[i]);
  // const imageUrl = useAppSelector((state) => state.contributors.imageUrls[i]);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
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
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={props.linkedInLink} target="_blank">
          LinkedIn
        </Button>
        <Button size="small" color="primary" href={props.githubLink} target="_blank">
          GitHub
        </Button>
      </CardActions>
    </Card>
    // <Box className="contributorBox">
    //   <img src={props.imageUrl} />
    //   <p className="contributorName">{props.name}</p>
    //   <div className="contributorLinks">
    //     <a href={props.linkedInLink} className="contributorLink">LinkedIn</a>
    //     <a href={props.githubLink} className="contributorLink">GitHub</a>
    //   </div>
    // </Box>
  );
};