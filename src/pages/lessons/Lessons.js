import { Box, Button, Grid, IconButton, LinearProgress, SwipeableDrawer } from '@mui/material';
import React, { Suspense, useRef, useState } from 'react';
import Loader from '../../components/Loader';
import { connect } from 'react-redux';
import { lessonFileUploadAction } from './redux/actions';
import Cookies from 'js-cookie';
import { LESSON } from '../../config/constants';
import { postLessonFileUpload } from '../../services/lesson.service';
import { sleep } from '../../config/helpers';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LessonForm from './content/LessonForm';

const demoLessons = [
  {
    id: 1,
    title: "Lesson 1 - Akyda",
    thumbnail: "",
    description: "lesson description here....",
    filePath: "http://localhost:8080/uploaded_audios/ТАКФИР_ПО_ДАРУ_ОТВЕТ_ТАКФИРИТАМ_2_часть.mp3",
  },
  {
    id: 2,
    title: "Lesson 2 - Akyda",
    thumbnail: "",
    description: "lesson description here....",
    filePath: "http://localhost:8080/uploaded_audios/ТАКФИР_ПО_ДАРУ_ОТВЕТ_ТАКФИРИТАМ_2_часть.mp3",
  },
  {
    id: 3,
    title: "Lesson 3 - Akyda",
    thumbnail: "",
    description: "lesson description here....",
    filePath: "http://localhost:8080/uploaded_audios/ТАКФИР_ПО_ДАРУ_ОТВЕТ_ТАКФИРИТАМ_2_часть.mp3",
  },
  {
    id: 4,
    title: "Lesson 4 - Akyda",
    thumbnail: "",
    description: "lesson description here....",
    filePath: "http://localhost:8080/uploaded_audios/ТАКФИР_ПО_ДАРУ_ОТВЕТ_ТАКФИРИТАМ_2_часть.mp3",
  },
]

const Lessons = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  /**
   *  Drawer handler
   * @param {Boolean} action - open/close drawer 
   * @returns press tab or shift focusing the item
   */
  const toggleDrawer = (action) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(action);
  };

  return (
    <Grid className="ml-[330px] mt-[100px] mr-[30px] w-full h-full text-main_text">
      <Suspense fallback={<Loader />}>
        <Grid container className="w-full flex-col">
          {/* label and create button */}
          <Grid item md={12} xs={12} className="flex justify-between">
            <label className="text-[25px] font-bold">Lessons</label>
            <Button onClick={toggleDrawer(true)}
              className="bg-[#fff] rounded-[10px] text-bg_text_icon hover:bg-main_text px-4"
              startIcon={<AddBoxIcon />}
            >
              Lesson
            </Button>
          </Grid>
          {/* list of lesson */}
          <Grid item md={12} xs={12} container className="w-full flex-col gap-3 mt-2">
            {demoLessons.map((val, key) => (
              <Grid key={key} className="flex w-full rounded-[10px] bg-[#fff] flex-col text-bg_text_icon p-5">
                <Grid>
                  {/* <IconButton onClick={() => { }}
                    className="bg-player_bg text-white"
                  >
                    <PlayArrowIcon />
                  </IconButton> */}

                  <audio controls>
                    <source src={val.filePath} type="audio/mp3" />
                  </audio>

                </Grid>
                <span>{val.title}</span>

              </Grid>
            ))}
          </Grid>
          <SwipeableDrawer
            anchor={"right"}
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            PaperProps={{
              sx: {
                width: '450px', p: '20px',
                background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(38,38,38,1) 100%, rgba(13,17,18,1) 100%)"
              }
            }}
          >
            <LessonForm />
          </SwipeableDrawer>
        </Grid>


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






// function CustomAudioPlayer() {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlayback = () => {
//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const adjustVolume = (delta) => {
//     const newVolume = Math.min(Math.max(0, audioRef.current.volume + delta), 1);
//     audioRef.current.volume = newVolume;
//   };

//   return (
//     <div className="custom-audio-player">
//       <audio ref={audioRef}>
//         <source src="your-audio-file.mp3" type="audio/mp3" />
//         Your browser does not support the audio element.
//       </audio>
//       <div className="custom-controls">
//         <button onClick={togglePlayback}>
//           {isPlaying ? 'Pause' : 'Play'}
//         </button>
//         <div>
//           <button onClick={() => adjustVolume(0.1)}>Vol Up</button>
//           <button onClick={() => adjustVolume(-0.1)}>Vol Down</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomAudioPlayer;
