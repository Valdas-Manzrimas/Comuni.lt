import React from 'react';
import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import worldFamily from '../../../media/pictures/world_family.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: '20ex',    
    width: '100%',
    height: '35vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1400,
  },
  divider: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gridArea: '2',
    margin: '0 auto',
    padding: 'auto',
    backgroundImage: 'linear-gradient(to right bottom, #e9e3ca, #ded9b8, #d2cfa7, #c5c596, #b8bc85, #a0b17c, #88a574, #71996e, #52866c, #3b7267, #2d5d5e, #274950)',
    '@media (min-width: 1200px)': {
      maxWidth: '100% !important',
      width: '100%'
    },
  },
  imageContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'auto',
    top: '-4rem',
  },
  image: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  contentContainer: {
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem 3rem auto auto',
    padding: '0 1.5rem',
    height: '90%',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  title: {
    margin: 'auto',
    paddingBottom: '2rem'
  },
  quote: {
    paddingBottom: '2rem'
  },

  button: {
    margin: 'auto',
  },
}));

const QuoteDivider: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.divider} component={Paper} elevation={3}>
          <Box className={classes.imageContainer} sx={{width: '40%',   BoxAutoColumns: 'column'}}>
            <img
              src={worldFamily}
              alt="Profile"
              className={classes.image}
            />
          </Box>
          <Box className={classes.contentContainer}>
            <Typography variant="h6" className={classes.title}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
            <Typography variant="body1" className={classes.quote}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, facere esse modi eos quos architecto illo quisquam maxime rem odit deleniti, possimus asperiores autem nihil omnis cum impedit sit porro. Voluptates, assumenda! Veniam quam nobis voluptate aperiam ut porro sapiente deleniti expedita odit nisi nostrum quibusdam, eligendi neque in suscipit?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Learn More
            </Button>
          </Box>
      </Container>
    </div>
  );
};

export default QuoteDivider;
