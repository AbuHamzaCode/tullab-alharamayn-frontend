import { Grid } from '@mui/material';
import React, { Suspense, useRef, useState } from 'react';
import Loader from '../../components/Loader';
import PauseCircleFilledSharpIcon from '@mui/icons-material/PauseCircleFilledSharp';
import PlayCircleFilledSharpIcon from '@mui/icons-material/PlayCircleFilledSharp';
import { connect } from 'react-redux';
import { lessonFileUploadAction } from './redux/actions';
import Cookies from 'js-cookie';
import { LESSON } from '../../config/constants';

const Lessons = (props) => {

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const chunkNumberRef = useRef(0);
  const totalChunksRef = useRef(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    totalChunksRef.current = 0;
    chunkNumberRef.current = 0;
    setFilename('');
    debugger
  };
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const sendChunk = async (start, end) => {
    const chunk = file.slice(start, end);
    const reader = new FileReader();
    reader.readAsDataURL(chunk);

    return new Promise(async (resolve, reject) => {
      reader.onload = async (event) => {
        const chunkData = event.target.result;
        chunkNumberRef.current += 1;

        const formData = new FormData();
        formData.append('chunk', chunkData);
        formData.append('chunkNumber', chunkNumberRef.current);
        formData.append('totalChunks', totalChunksRef.current);
        formData.append('filename', filename || file.name);
        try {
          const response = await fetch(`http://localhost:8080${LESSON}/file-upload`, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            console.log(`Chunk ${chunkNumberRef.current} uploaded successfully`);
            if (chunkNumberRef.current === totalChunksRef.current) {
              console.log(`total chunks ${totalChunksRef.current}`);
            }
            resolve();
          } else {
            console.error('Error uploading chunk');
            reject();
          }
        } catch (error) {
          console.error('Error uploading chunk:', error);
          reject();
        }
      };
    });
  };

  const handleUpload = async () => {
    if (file) {
      const chunkSize = 1024 * 1024; // 1MB chunks (you can adjust this)
      const totalSize = file.size;
      const totalChunks = Math.ceil(totalSize / chunkSize);

      totalChunksRef.current = totalChunks;

      for (let start = 0; start < totalSize; start += chunkSize) {
        const end = Math.min(start + chunkSize, totalSize);
        await sendChunk(start, end);
        await sleep(500); // Add a delay if needed to prevent too many requests in a short time
      }
    }
  };

  const callback = (response) => {
    debugger
  }


  return (
    <Grid className="ml-[320px] mt-[70px] w-full h-full text-main_text">
      <Suspense fallback={<Loader />}>
        <Grid className="flex flex-col gap-5 w-1/3">
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Enter filename (optional)"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <button onClick={handleUpload}>Upload</button>
        </Grid>
        <h2>Lessons</h2>
      </Suspense>
    </Grid>
  );
};
const mapStateToProps = state => ({
  common_error: state.mainReducer.common_error,
  common_requesting: state.mainReducer.common_requesting,
});

const mapDispatchToProps = dispatch => ({
  lessonFileUploadAction: (body, callback, token) => dispatch(lessonFileUploadAction(body, callback, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
