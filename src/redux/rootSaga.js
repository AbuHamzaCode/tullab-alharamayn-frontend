import { all } from 'redux-saga/effects';
import mainSaga from '../pages/redux/saga';
import lessonSaga from '../pages/lessons/redux/saga';

function* rootSaga() {
  yield all([
    mainSaga,
    lessonSaga,
  ]);
}

export default rootSaga;