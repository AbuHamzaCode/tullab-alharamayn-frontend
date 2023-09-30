import { put, call, all, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from './constants';
import Cookies from 'js-cookie';
import { login, logout } from '../../services/auth.service';
import { commonErrorAction, commonRequestAction, commonSuccessAction, commonValidationErrorAction, logoutSuccessAction, userDataAction } from './actions';

function* loginSaga({ body }) {
    try {
        const response = yield call(login, body);
        if (response.status === 200) {
            Cookies.set('twj', response.data.user.token, { expires: 1 });
            delete response.data.user.token
            yield put(userDataAction(response.data.user))
            yield put(commonSuccessAction(response.data.message));
            window.location.replace("/");
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

function* logoutSaga({ token }) {
    try {
        yield call(logout, token);
    } catch (error) {
        if (error?.response?.status === 400) {
            yield put(commonValidationErrorAction(error.response.data?.errors.map((errorObj) => Object.values(errorObj)[0])));
            const errorMessages = error.response.data?.errors.map((errorObj) => Object.values(errorObj)[0]).join('\n');
            alert(`${error.response?.status} => ${errorMessages}`)
        } else if (error?.response?.status === 500) {
            yield put(commonErrorAction(error.response.data?.message));
        }
    } finally {
        yield put(logoutSuccessAction());
        window.location.replace("/auth");
    }
}
export default all([
    takeLatest(LOGIN, loginSaga),
    takeLatest(LOGOUT, logoutSaga),
]);