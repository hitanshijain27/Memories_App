import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay2: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    color: 'black',
  },
  grid: {
    display: 'flex',
  },
  title: {
    padding: '0 1px',
    margin: '20px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    justifyContent: 'space-between',
  },
});