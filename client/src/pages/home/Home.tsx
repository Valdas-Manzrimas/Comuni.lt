import QuoteDivider from '../../components/base/quoteDivider/quoteDivider';
import background from '../../media/backgound/cool-background.png'
import { Box, Paper, Typography, Grow } from '@mui/material';

const Home = () => {

  return (
    <>
    <Typography
      component="div"
      variant="body1"
      sx={{
        width: '100%',
        height: '200vh',
        position: 'relative',
        
      }}
    > 

      <Box
        component="img"
        sx={{
          height: 'calc(100% - 3rem)',
          width: '100%',
          maxHeight: { xs: 600, md: 1000},
          maxWidth: { xs: 900, md: 1300, lg: 1920  },
          position: 'fixed',
          overflowY: 'clip',
          '@media (min-width: 1200px)': {
            maxWidth: '100%',
            width: '100%'
          },
        }}
        alt="The house from the offer."
        src={background}
      />
      <Paper 
        elevation={4}
        sx={{ 
          opacity: 1,
          visibility: 'visible',
          position: 'fixed', 
          zIndex: '1400', 
          backgroundColor: 'rgba(0, 0, 0, 0.05)', 
          margin: '10% 15%', 
          padding: '2rem 3rem',
          width: '45%',
          right: '2rem'
        }}>
        <h1>The title</h1>
        <br />
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quaerat quibusdam optio facere culpa, delectus incidunt esse repellat, quia perspiciatis labore porro eveniet modi vero nobis perferendis eum. Odit, eligendi!</h3>
      </Paper>
      <QuoteDivider />

    </Typography>
    
    </>
  )
}

export default Home;