import { Box, Button, Grid, LinearProgress } from '@mui/material';
import React, { Suspense, useRef, useState } from 'react';
import Loader from '../../components/Loader';
import PauseCircleFilledSharpIcon from '@mui/icons-material/PauseCircleFilledSharp';
import PlayCircleFilledSharpIcon from '@mui/icons-material/PlayCircleFilledSharp';
import { connect } from 'react-redux';
import { lessonFileUploadAction } from './redux/actions';
import Cookies from 'js-cookie';
import { LESSON } from '../../config/constants';

const Lessons = (props) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

        fetch(`http://localhost:8080${LESSON}/file-upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then(async (data) => {
            console.log({ data });
            const temp = `Chunk ${chunkNumber + 1
              }/${totalChunks + 1} uploaded successfully`;
            setStatus(temp);
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
          })
          .catch((error) => {
            console.error("Error uploading chunk:", error);
          });
      } else {
        setProgress(100);
        setSelectedFile(null);
        setStatus("File upload completed");
      }
    };

    uploadNextChunk();
  };



  return (
    <Grid className="ml-[320px] mt-[70px] w-full h-full text-main_text">
      <Suspense fallback={<Loader />}>
        <div>
          <h2>Resumable File Upload</h2>
          <h3>{status}</h3>
          {progress > 0 &&
            <Box sx={{ width: '300px', mr: 1 }}>
              <LinearProgress variant="determinate" value={progress} color='success' />
            </Box>
          }
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleFileUpload}>Upload File</Button>
        </div>
        {/* <Grid className="flex flex-col gap-5 w-1/3">
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Enter filename (optional)"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <button onClick={handleUpload}>Upload</button>
        </Grid> */}
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


// const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState('');
//   const chunkNumberRef = useRef(0);
//   const totalChunksRef = useRef(0);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     totalChunksRef.current = 0;
//     chunkNumberRef.current = 0;
//     setFilename('');
//   };


//   const sendChunk = async (start, end) => {
//     const chunk = file.slice(start, end);
//     const reader = new FileReader();
//     reader.readAsDataURL(chunk);

//     return new Promise(async (resolve, reject) => {
//       reader.onload = async (event) => {
//         const chunkData = event.target.result;
//         chunkNumberRef.current += 1;

//         const formData = new FormData();
//         formData.append('chunk', chunkData);
//         formData.append('chunkNumber', chunkNumberRef.current);
//         formData.append('totalChunks', totalChunksRef.current);
//         formData.append('filename', filename || file.name);
//         try {
//           const response = await fetch(`http://localhost:8080${LESSON}/file-upload`, {
//             method: 'POST',
//             body: formData,
//           });

//           if (response.ok) {
//             console.log(`Chunk ${chunkNumberRef.current} uploaded successfully`);
//             if (chunkNumberRef.current === totalChunksRef.current) {
//               console.log(`total chunks ${totalChunksRef.current}`);
//             }
//             resolve();
//           } else {
//             console.error('Error uploading chunk');
//             reject();
//           }
//         } catch (error) {
//           console.error('Error uploading chunk:', error);
//           reject();
//         }
//       };
//     });
//   };

//   const handleUpload = async () => {
//     if (file) {
//       const chunkSize = 1024 * 1024; // 1MB chunks (you can adjust this)
//       const totalSize = file.size;
//       const totalChunks = Math.ceil(totalSize / chunkSize);

//       totalChunksRef.current = totalChunks;

//       for (let start = 0; start < totalSize; start += chunkSize) {
//         const end = Math.min(start + chunkSize, totalSize);
//         await sendChunk(start, end);
//         await sleep(500); // Add a delay if needed to prevent too many requests in a short time
//       }
//     }
//   };

//   const callback = (response) => {
//     debugger
//   }
