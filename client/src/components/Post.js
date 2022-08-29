import React from "react";
import moment from "moment";
import './post.css'
import { Link } from "react-router-dom";
import noImage from "../images/noimage.svg";
import {
  Card,
  Chip,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
const Post = ({ _id, title, subtitle, content, tag, image, createdAt }) => {

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };
  const imageStyle = {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  }
  const overlayStyle = {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  }
  return (
    <Card style={{
      maxWidth: 374,
      position: "relative",
    }} >
      <CardMedia
        style={imageStyle}
        className='.media'
        image={image || noImage}
        title="Paella dish"
      />
      <div style={overlayStyle} >
        <Typography variant="h6">Bahadir</Typography>
        <Typography variant="body2">
          {convertRelativeTime(createdAt)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="h6" component="p" gutterBottom>
          {title}
        </Typography>{" "}
        <Typography variant="overline" component="p" gutterBottom>
          {subtitle}
        </Typography>{" "}
        <Typography variant="body2" component="p">
          {content?.substring(0, 250) + "..."}
        </Typography>
        <Chip label={`# ${tag}`} variant="outlined"  style={{
    marginTop: '5px',
  }} />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/posts/${_id}`}>Read More</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
