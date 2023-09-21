import { all } from 'redux-saga/effects';
import mainSaga from '../pages/redux/saga';

function* rootSaga() {
  yield all([
    mainSaga,
  ]);
}

export default rootSaga;