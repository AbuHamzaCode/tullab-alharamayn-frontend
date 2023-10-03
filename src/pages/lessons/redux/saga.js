import { put, call, all, takeLatest } from 'redux-saga/effects';
import { LESSON_FILE_UPLOAD } from './constants';
import Cookies from 'js-cookie';
import { postLessonFileUpload } from '../../../services/lesson.service';
import { commonErrorAction, commonRequestAction, commonValidationErrorAction } from '../../redux/actions';

function* lessonFileUploadSaga({ body, callback, token }) {
    yield put(commonRequestAction(true));
    try {
        const response = yield call(postLessonFileUpload, body, token);
        if (response.status === 200) {
            if (callback) {
                callback(response.data);
            }
        }
    } catch (error) {
        if (error?.response?.status === 400) {
            yield put(commonValidationErrorAction(error.response.data?.errors.map((errorObj) => Object.values(errorObj)[0])));
            const errorMessages = error.response.data?.errors.map((errorObj) => Object.values(errorObj)[0]).join('\n');
            alert(`${error.response?.status} => ${errorMessages}`)
        } else if (error?.response?.status === 500) {
            yield put(commonErrorAction(error.response.data?.message));
        }
    } finally {
        yield put(commonRequestAction(false));
    }
}

export default all([
    takeLatest(LESSON_FILE_UPLOAD, lessonFileUploadSaga),
]);