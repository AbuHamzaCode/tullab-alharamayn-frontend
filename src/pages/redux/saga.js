import { put, call, all, takeLatest } from 'redux-saga/effects';
import { LOGIN } from './constants';
import Cookies from 'js-cookie';
import { login } from '../../services/auth.service';
import { commonErrorAction, commonRequestAction, commonSuccessAction, commonValidationErrorAction } from './actions';

function* loginSaga({ body }) {
    try {
        const response = yield call(login, body);
        if (response.status === 200) {
            Cookies.set('token', response.data.user.token, { expires: 1 });
            yield put(commonSuccessAction(response.data.message));
        }
        // Cookies.set('currentUser', JSON.stringify(response.user), { expires: 1 });
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
    takeLatest(LOGIN, loginSaga),
]);