import React, {useState,useEffect} from "react";
import './app.css'
import { useDispatch } from "react-redux";
import { Button} from '@mui/material'
import PenIcon from '@mui/icons-material/Create'
import {BrowserRouter , Switch, Route,Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import Postlist from "./components/Postlist";
import AddPostForm from "./components/AddPostForm";
import { fetchPost } from "./actions/post";
import PostDetails from './components/PostDetails'
const App = () => {
  const [open,setOpen] = useState(false);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchPost())

  },[dispatch])


  const handleOpen = () => {
    setOpen(true)
  }


  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
    <BrowserRouter>
    <nav>
      <Link to='/posts'><h3>Blogger</h3></Link>
      <Button color='primary' variant='outlined' startIcon={<PenIcon />} onClick={handleOpen}>New Post</Button>
    </nav>

    <div className="container">

      <Switch>
        <Route exact path='/posts' component={Postlist}/>
        <Route exact path='/posts/:id' component={PostDetails}/>
      </Switch>
      <Redirect from='/' to="/posts" />


    </div>
    </BrowserRouter>
    <AddPostForm open={open} handleClose={handleClose} />

    </>
  );
};

export default App;
