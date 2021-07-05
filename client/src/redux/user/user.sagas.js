import { takeLatest, put, all, call } from "@redux-saga/core/effects";

import userActionTypes from "./user.types";
import { signInFailure, signInSuccess, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from "./user.action";

import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';


function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch(err) {
        yield put(signInFailure(err.message));
    }
}


function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(err) {
        yield put(signInFailure(err.message));
    }
}

function* signInWithEmail({ payload: { email, password } }) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(err) {
        yield put(signInFailure(err));
    }
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch(err) {
        yield put(signInFailure(err));
    }
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(err) {
        yield put(signOutFailure(err));
    }
}

function* signUp({payload: { email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch(err) {
        yield put(signUpFailure(err.message));
    }
}

function* signInAfterSignUp({payload: { user, additionalData }}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onSignOutStart() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

function* onSignUpStart() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}