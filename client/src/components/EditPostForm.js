import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";

import { TextField, Select, Input, MenuItem, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updatePost } from "../actions/post";


const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const EditPostForm = ({ history, post, closeEditMode }) => {

  const dispatch = useDispatch();

  const [file, setFile] = useState(post?.image);
  const { register, handleSubmit, control,formState: { errors }, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    const updatedPost = {
      _id: post._id,
      ...data,
      image: file,
    };
    dispatch(updatePost(post._id, updatedPost));
    console.log('hello form submitted')
    reset();
    setFile(null);
    closeEditMode();
  };


  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="title"
          label="header"
          name="title"
          variant="outlined"
          size="small"
          style={{marginTop : '10px'}}
          {...register("title")}
          error={errors.title ? true : false}
          fullWidth
          defaultValue={post?.title}
        />
        <TextField
          id="subtitle"
          label="altheader"
          name="subtitle"
          variant="outlined"
          style={{marginTop : '10px'}}
          size="small"
          {...register("subtitle")}
          error={errors.subtitle ? true : false}
          fullWidth
          defaultValue={post?.subtitle}
        />
        <Controller

              render = {({field})=> (
                <Select
                input={<Input />}
                fullWidth
                >
                  {
                    tags.map((tag,index) =>{
                      return (
                        <MenuItem key={index} value={tag}>
                        {tag}
                        </MenuItem>
                      )
                    })
                  }

                </Select>
            )}


              name='tag'
              control={control}
              error={errors.tag ? true : false}
              defaultValue={post?.tag}
            />
        <TextField
          id="content"
          label="Content"
          name="content"
          multiline
          size="small"
          {...register("content")}
          rows={4}
          style={{marginTop : '10px'}}
          variant="outlined"
          error={errors.content ? true : false}
          fullWidth
          defaultValue={post?.content}
        />
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <div style={{float : 'right',marginTop: '10px'}}>
          <Button color="primary" variant="outlined" onClick={closeEditMode}>
            Discard
          </Button>{" "}
          <Button color="secondary" variant="outlined" type="submit" >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
