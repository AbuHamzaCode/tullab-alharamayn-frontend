import { Grid } from '@mui/material';
import React, { Suspense } from 'react';
import Loader from '../../components/Loader';

const Lessons = (props) => {

  return (
    <Grid className="ml-[320px] mt-[70px] w-full h-full text-main_text">
      <Suspense fallback={<Loader />}>
        <h2>Lessons</h2>
      </Suspense>
    </Grid>
  );
};

export default Lessons;
