import { Box, Button, Grid, LinearProgress, SwipeableDrawer } from '@mui/material';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { postLessonFileUpload } from '../../../services/lesson.service';
import { sleep } from '../../../config/helpers';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { CommonLoadingButton, CommonTextField } from '../../../components/CommonComponents';
import './lesson_form.scss'

const LessonForm = (props) => {

  const { handleSubmit, control, formState: { errors } } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);


  const onSubmit = (data) => {
    const formDataToSend = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    })
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const chunkSize = 1 * 1024 * 1024; // 2MB (adjust based on your requirements)
    const totalChunks = Math.ceil(selectedFile.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let remainder;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;

    const uploadNextChunk = async () => {
      if (end <= selectedFile.size) {
        const chunk = selectedFile.slice(start, end);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkNumber", chunkNumber);
        formData.append("totalChunks", totalChunks + 1);
        formData.append("originalname", selectedFile.name);

        try {
          postLessonFileUpload(formData, Cookies.get("twj"));
          const temp = `Chunk ${chunkNumber + 1
            }/${totalChunks + 1} uploaded successfully`;
          setProgress(Number((chunkNumber + 1) * chunkProgress));
          chunkNumber++;
          start = end;
          end = start + chunkSize;
          if (end > selectedFile.size && !remainder) {
            remainder = end - selectedFile.size;
            end -= remainder;
          }
          await sleep(300);
          uploadNextChunk();
        } catch (error) {
          if (error.response.status === 401) {
            console.error(error.response.data.message);
          } else {
            console.error("Error uploading chunk:", error);
          }
        }
      } else {
        setProgress(100);
        setSelectedFile(null);
      }
    };

    uploadNextChunk();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container className="lesson_form">
        <h2>Create Lesson</h2>
        {/* title */}
        <Grid item md={12} xs={12}>
          <Controller
            name="title"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <CommonTextField {...field}
                variant="outlined"
                fullWidth
                ref={null}
                title="Title"
                sx={{ borderRadius: '10px', }}
                error={Boolean(errors.title)}
                helperText={Boolean(errors.title) ? errors.title.message : ""}
                InputProps={{
                  style: { color: '#fff', borderRadius: '10px', border: "1px solid #fff", },
                }}
              />
            )}
            rules={{
              required: 'Field is required!',
            }}
          />
        </Grid>
        {/* description */}
        <Grid item md={12} xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <CommonTextField {...field}
                variant="outlined"
                fullWidth
                ref={null}
                title="Description"
                sx={{ borderRadius: '10px' }}
                error={Boolean(errors.description)}
                helperText={Boolean(errors.description) ? errors.description.message : ""}
                InputProps={{
                  style: { color: '#fff', borderRadius: '10px', border: "1px solid #fff", },
                }}
              />
            )}
            rules={{
              required: 'Field is required!',
            }}
          />
        </Grid>
        {progress > 0 &&
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progress} color='success' />
          </Box>
        }
        {/* <input type="file" onChange={handleFileChange} /> */}
        {/* <Button onClick={handleFileUpload} disabled={!selectedFile}>Save</Button> */}


        <Grid item md={12} xs={12}>
          <CommonLoadingButton
            className="save_button"
            title={"Save"}
            disabled={props.common_requesting}
            loading={props.common_requesting}
          />
        </Grid>
      </Grid>
    </form>
  )
}
const mapStateToProps = state => ({
  common_error: state.mainReducer.common_error,
  common_requesting: state.mainReducer.common_requesting,
});

const mapDispatchToProps = dispatch => ({
  lessonFileUploadAction: (body, callback, token) => dispatch((body, callback, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonForm);