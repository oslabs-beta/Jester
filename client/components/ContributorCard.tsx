
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

// import { useAppSelector } from '../redux/hooks';



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
        <Button size="small" color="primary" href={props.linkedInLink}>
          LinkedIn
        </Button>
        <Button size="small" color="primary" href={props.githubLink}>
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