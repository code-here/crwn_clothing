import { call, put, takeLatest, all } from "@redux-saga/core/effects";
import { firestore, convertSnapshotsCollectionToMap } from "../../firebase/firebase.utils";
import { successFetchingCollections, failureFetchingCollections } from './shop.actions';

import ShopActionTypes from "./shop.types";


function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertSnapshotsCollectionToMap, snapshot); //call is used to call functions
        yield put(successFetchingCollections(collectionMap)); // put is like dispatch
    } catch(err) {
        put(failureFetchingCollections(err.message));
    }
}

function* startCollectionsFetch() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all([ call(startCollectionsFetch) ]);
}