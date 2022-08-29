import React from "react";
import { useSelector } from "react-redux";
import { Grid, Button } from "@mui/material";
import Post from "./Post";
const Postlist = () => {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <Grid container spacing={2} alignContent="stretch">
      {posts.length > 0 &&
        posts.map((post) => (
          <Grid item key={post?._id} xs={12} md={4}>
            <Post {...post} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Postlist;
