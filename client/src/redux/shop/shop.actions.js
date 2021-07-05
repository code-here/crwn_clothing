import ShopActionTypes from "./shop.types";

export const startCollectionsFetch = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const successFetchingCollections = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
})

export const failureFetchingCollections = error => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error
})

//! using redux saga insted of below redux thunk
//this works b'cose of redux-thunk middleware
// export const startCollectionsFetchAsync = () => dispatch => {
//     const collectionRef = firestore.collection("collections");
//     dispatch(startCollectionsFetch());

//     collectionRef.get().then((snapshot) => {
//       const collectionMap = convertSnapshotsCollectionToMap(snapshot);
//       dispatch(successFetchingCollections(collectionMap));
//     }).catch(err => dispatch(failureFetchingCollections(err)));

// }