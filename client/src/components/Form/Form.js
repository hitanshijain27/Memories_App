import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Checkbox } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ id: '', customer_name: '', customer_email: '', product: '', quantity: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ id: '', customer_name: '', customer_email: '', product: '', quantity: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Edit "${post.id}"` : 'Create New Order'}</Typography>
        <TextField name="id" variant="outlined" label="Order ID" fullWidth value={postData.id} onChange={(e) => setPostData({ ...postData, id: e.target.value })} />
        <TextField name="customer_name" variant="outlined" label="Customer name" fullWidth value={postData.customer_name} onChange={(e) => setPostData({ ...postData, customer_name: e.target.value })} />
        <TextField name="customer_email" variant="outlined" label="Customer email" fullWidth value={postData.customer_email} onChange={(e) => setPostData({ ...postData, customer_email: e.target.value })} />
        <TextField name="product" variant= "outlined" label="Product 1/2/3" fullWidth value={postData.product} onChange={(e) => setPostData({ ...postData, product: e.target.value })}/>
        
        <label>
          Quantity:
          <input type="number" min="0" name="quantity" variant= "outlined"  value={postData.quantity} onChange={(e) => setPostData({ ...postData, quantity: e.target.value })}/>
        </label>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;