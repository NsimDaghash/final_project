import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container:{
    display: 'flex',
    width: '100%',
  },
  appBarSearch: {
    borderRadius: 4,
    marginTop: '1rem',
    display: 'flex',
    flexDirection:'row',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '0.5rem',
    padding: '16px',
    marginBottom : '0.5rem'
  },
  searchInput:{
    maxWidth:'75%',
  },
  searchButton:{
    marginTop: '5px',
    maxWidth : '50%',
    margin:'auto',
    marginBottom: '10px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  
}));