import React,{useState} from "react";

import {useDispatch} from 'react-redux'
import FileBase64 from 'react-file-base64';
import {Button,TextField,Select,Input,MenuItem,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@mui/material"
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { createPost,fetchPost } from "../actions/post";


const tags = ['fun','programming','health','science']
const postSchema = yup.object().shape({
  title : yup.string().required(),
  subtitle : yup.string().required(),
  content : yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags)
})
const AddPostForm = ({open,handleClose}) => {
  const dispatch = useDispatch()
  const [file,setFile] = useState(null)
  const {register, handleSubmit,control,formState: { errors },reset} = useForm({
    resolver : yupResolver(postSchema)
  })

  const onSubmit = (data) => {
    //Dispatch create post action
    console.log(data)
    dispatch(createPost({...data, image : file}))
    clearForm()
    console.log('submitted')
    dispatch(fetchPost())
  }


  const clearForm = () => {
    reset()
    setFile(null)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Yeni yazi</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add new post
        </DialogContentText>
        <div>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id='title'
              label='header'
              name='title'
              variant="outlined"
              size='small'
              {...register("title")}
              error={errors.title ? true : false}
              fullWidth
            />
            <TextField
              id='subtitle'
              label='altheader'
              name='subtitle'
              variant="outlined"
              size='small'
              {...register("subtitle")}
              error={errors.subtitle ? true : false}
              fullWidth
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
              defaultValue={tags[0]}
            />
            <TextField
              id='content'
              label='Content'
              name='content'
              multiline
              rows={4}
              variant="outlined"
              size='small'
              {...register("content")}
              error={errors.content ? true : false}
              fullWidth
            />
            <FileBase64 multiple={false} onDone={({base64}) => setFile(base64)} />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color='inherit' onClick={clearForm}>Discard</Button>
        <Button  variant='outlined' color='primary' type='submit' onClick={() => handleSubmit(onSubmit)()}>Publish</Button>
      </DialogActions>
    </Dialog>
  )
};

export default AddPostForm;

