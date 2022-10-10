import { ContributorCard } from '../components/ContributorCard';
import React from 'react';
import { photosObj } from '../assets/photosObj';
import { Typography } from '@mui/material';


export const Contributors = () => {

    type userObjType = {
      name: string,
      githubLink: string,
      linkedInLink: string,
      imageUrl: string
  }
  

    const users: userObjType[] = [{
      name: 'Michael Lam',
      githubLink: 'https://github.com/mlamchamkee',
      linkedInLink: 'https://www.linkedin.com/in/mlamchamkee',
      imageUrl: photosObj.michael
    },
    {
      name: 'Lilah August',
      githubLink: 'https://github.com/lilahaugust',
      linkedInLink: 'https://www.linkedin.com/in/lilahaugust/',
      imageUrl: photosObj.lilah
    },
    {
      name: 'Brian Hao',
      githubLink: 'https://www.github.com/BrianHao',
      linkedInLink: 'https://www.linkedin.com/in/brianhao/',
      imageUrl: photosObj.brian
    },
    {
      name: 'Serena Amos',
      githubLink: 'https://github.com/samos17',
      linkedInLink: 'https://www.linkedin.com/in/serena-amos/',
      imageUrl: photosObj.serena
    },
    {
      name: 'Anshuman Sinha',
      githubLink: 'https://github.com/AnshumanSinha8',
      linkedInLink: 'https://www.linkedin.com/in/anshuman-sinha1998/',
      imageUrl: photosObj.anshu
    },
    ];




    return (
      <div>
        <div>
          <Typography variant="h3" align="center" gutterBottom  sx={{ mb: 7, mt: 5, ml: -13, color:'primary.main' }} className="contributors-header">Contributors</Typography>
        </div>
        <div className="contributors-page">
          {users.map((devObj:userObjType, i) => {
            return <ContributorCard 
              name={devObj.name} 
              githubLink={devObj.githubLink} 
              linkedInLink={devObj.linkedInLink} 
              imageUrl={devObj.imageUrl} 
              key={i}
            />;
          })}
        </div>
      </div>
    );     
};