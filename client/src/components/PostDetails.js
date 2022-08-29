import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Paper, Divider, Button, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditPostForm from "./EditPostForm";
import { fetchSinglePost, deletePost } from "../actions/post";
import noImage from "../images/noimage.svg";



const PostDetails = ({ history, location, match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const currentPost = useSelector((state) => state.posts.currentPost);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const removePost = () => {
    dispatch(deletePost(currentPost._id));
    history.push("/posts");
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };


  return (
    <Paper style={{padding: '25px',
      marginBottom: '18px',}} elevation={0}>
      {editMode ? (
        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
      ) : (
        <div>
          <div style={{display : 'flex',justifyContent: "space-between",marginBottom : '10px'}}>
            <Typography variant="h2" gutterBottom>
              {currentPost?.title}
            </Typography>
            <div>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={openEditMode}
              >
                Edit
              </Button>{" "}
              <Button
                color="secondary"
                variant="outlined"
                onClick={removePost}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          </div>

          <Divider />
          <Typography  style={{fontSize : '1.3rem'}} variant="overline" gutterBottom>
            {currentPost?.subtitle}
          </Typography>
          <Typography style={{fontSize:'1.2rem'}}  variant="caption" component="p" gutterBottom>
            {convertRelativeTime(currentPost?.createdAt)} by Bahadir
          </Typography>
          <Chip
            label={`# ${currentPost?.tag}`}
            variant="outlined"

            style={{marginTop : '10px'}}

          />

          <div style={{marginTop : '10px'}} >
            <img
              src={currentPost?.image || noImage}
              alt="Post"
              style={{width: "100%",
              borderRadius: '5',
              marginTop: '3px',
              marginBottom: '4px',}}

            />
            <Typography style={{fontSize : '1.5rem',marginTop:'10px'}} variant="body1" gutterBottom>
              {currentPost?.content}
            </Typography>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
