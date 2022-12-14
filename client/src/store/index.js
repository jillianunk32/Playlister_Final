import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'


/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    CHANGE_CURRENT_PLAYING_SONG: "CHANGE_CURRENT_PLAYING_SONG",
    OPEN_LIST: "OPEN_LIST",
    YOUTUBE_PLAYLIST: "YOUTUBE_PLAYLIST",
    YOUTUBE_CURR_SONG: "YOUTUBE_CURR_SONG",
    YOUTUBE_PLAYER: "YOUTUBE_PLAYER",
    HOME_SCREEN_VIEW: "HOME_SCREEN_VIEW",
    SEARCH_VALUE: "SEARCH_VALUE",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
    ERROR : "ERROR"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        youTubePlaylist: [],
        youTubeCurrentSong: null,
        openList: {},
        youTubePlayer: null,
        homeScreenView: 1,
        searchValue: [],
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: null,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: payload,
                    youTubeCurrentSong: payload,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: store.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.CHANGE_CURRENT_PLAYING_SONG: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: payload.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.OPEN_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: store.youTubeCurrentSong,
                    openList: payload,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.YOUTUBE_PLAYLIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: payload,
                    youTubeCurrentSong: payload.songs,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.YOUTUBE_CURR_SONG: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.currentList,
                    youTubeCurrentSong: payload,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.YOUTUBE_PLAYER: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: store.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: payload,
                    homeScreenView: store.homeScreenView,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.HOME_SCREEN_VIEW: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: store.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: payload,
                    searchValue: store.searchValue
                });
            }
            case GlobalStoreActionType.SEARCH_VALUE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    youTubePlaylist: store.youTubePlaylist,
                    youTubeCurrentSong: store.youTubeCurrentSong,
                    openList: store.openList,
                    youTubePlayer: store.youTubePlayer,
                    homeScreenView: store.homeScreenView,
                    searchValue: []
                });
            }
            default:
                return store;
        }
    }
    let searchVal = '';

    store.tryAcessingOtherAccountPlaylist = function(){
        let id = "635f203d2e072037af2e6284";
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: playlist
                });
            }
        }
        asyncSetCurrentList(id);
        history.push("/playlist/635f203d2e072037af2e6284");
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                                store.setCurrentList(id);
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        console.log(auth.user.userName)
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createPlaylist(newListName, [], auth.user.email, auth.user.userName, false, 0, 0, 0, "", []);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/");
            store.loadIdNamePairs();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        console.log("load id name pairs");
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                console.log(pairsArray);
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            store.loadIdNamePairs();
            if (response.data.success) {
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
        
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        auth.errorMessage = null;
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        console.log(store.currentModal);
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }
    store.isErrorModalOpen = () => {
        return store.currentModal === CurrentModal.ERROR;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    // history.push("/");
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        console.log("addnewsong");
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        console.log("createsong");
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        console.log(store.currentList);
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
        history.push("/");
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // store.addNewSong = () => {
    //     let playlistSize = store.getPlaylistSize();
    //     store.addCreateSongTransaction(
    //         playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    // }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        console.log("trans")
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.setCurrentYouTubeSong= function (index){
        console.log(index);
        storeReducer({
            type: GlobalStoreActionType.CHANGE_CURRENT_PLAYING_SONG,
            payload: index
        });
    }

    store.openListEdit = function (playlist){
        console.log(playlist)
        let list = (store.openList === playlist ? false : playlist)
        async function asyncOpen(playlist){
            let response = await api.getPlaylistById(playlist);
            if(response.data.success){
                let p1 = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.OPEN_LIST,
                payload: {value: list, playlist: p1}
            });
        }
        }
           asyncOpen(playlist);     
    }

    store.closeListEdit = function (id){
        let playlist = store.openList;
        delete playlist[id];
        storeReducer({
            type: GlobalStoreActionType.OPEN_LIST,
            payload: playlist
        });
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: null
        });
        history.push("/");

    }

    store.setCurrentYouTubeSong = function (index){
        console.log(index);
        let song = store.currentList.songs[index];
        storeReducer({
            type: GlobalStoreActionType.YOUTUBE_CURR_SONG,
            payload: song
        });
    }

    store.addYouTubePlayer = function(player) {
        storeReducer({
            type: GlobalStoreActionType.YOUTUBE_PLAYER,
            payload: player
        });
    }

    store.setCurrentYouTubeList = function (playlist){
        console.log(playlist);
        storeReducer({
            type: GlobalStoreActionType.YOUTUBE_PLAYLIST,
            payload: playlist
        });
    }

    store.updateYouTubePlaylist = function (songs){
        storeReducer({
            type: GlobalStoreActionType.YOUTUBE_PLAYLIST,
            payload: songs
        });
    }

    store.publishList = function(){
        tps.clearAllTransactions();
        store.currentList.published = true;
        console.log(store.currentList.published);
        store.currentList.publishedDate = (new Date()).toLocaleString("en-us", {year:"numeric", month: "short", day:"numeric"});
        store.updateCurrentList();
        store.loadIdNamePairs();
    }

    store.loadIdNamePairs1 = async function (){
        const response = await api.getPlaylistPairs();
    if (response.data.success) {
      let pairsArray = response.data.idNamePairs;
      storeReducer({
        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
        payload: pairsArray,
      });
    } else {
      console.log("API FAILED TO GET THE LIST PAIRS");
    }
    }

    store.changeHomeScreenView = function(index){
        storeReducer({
            type: GlobalStoreActionType.HOME_SCREEN_VIEW,
            payload: index,
          });
    }

    store.searchBy = function (value){
        console.log(store.homeScreenView);
        async function findSearchedPlaylistPairs(value){
            let response = '';
            if(store.homeScreenView===1 || store.homeScreenView===2){
                response = await api.getPlaylistsPairsSearch(value);
            }
            else{
                response = await api.getPlaylistPairs(value);
            }
            let searchValue = response.data.idNamePairs;
            searchVal = searchValue[0].name;
            console.log(searchVal);
            console.log(searchValue);
            storeReducer({
                type: GlobalStoreActionType.SEARCH_VALUE,
                payload: searchValue,
              });
              storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: searchValue,
              });  
        }
        findSearchedPlaylistPairs(value);
    }

    store.findPublishedLists = function (){
        async function findAllPublishedLists(){
            let response = await api.getPublishedPlaylists();
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: response.data.idNamePairs
            })
        }
        findAllPublishedLists();
    }

    store.updateList = function(id){
        async function getPlaylistForUpdate(id){
            let response = await api.getPlaylistById(id);
            if(response.data.success){
                let playlist = response.data.playlist;
                async function updateListById(id){
                    let r2 = await api.updatePlaylistById(id, playlist);
                    if(r2.data.success){
                        console.log("updated");
                    }
                    
                    store.loadIdNamePairs();
                    history.push("/");
                }
                updateListById(id);
            }
        }
        getPlaylistForUpdate(id);
    }

    store.addDislike = function (id){
        async function getListForDislike(id){
            let response = await api.getPlaylistById(id);
            if(response.data.success){
                let playlist = response.data.playlist;
                playlist.dislikes+=1;
                async function updateListById(id){
                    let r2 = await api.updatePlaylistById(id, playlist);
                    if(r2.data.success){
                        console.log("updated");
                    }
                }
                updateListById(id);
        }
        }
        getListForDislike(id);
    }

    store.addLike = function (id){
        async function getListForDislike(id){
            let response = await api.getPlaylistById(id);
            if(response.data.success){
                let playlist = response.data.playlist;
                playlist.likes+=1;
                async function updateListById(id){
                    let r2 = await api.updatePlaylistById(id, playlist);
                    if(r2.data.success){
                        console.log("updated");
                    }
                }
                updateListById(id);
        }
        }
        getListForDislike(id);
    }

    function KeyPress(event) {
        if (!store.modalOpen && event.ctrlKey){
            if(event.key === 'z'){
                store.undo();
            } 
            if(event.key === 'y'){
                store.redo();
            }
        }
    }
  
    document.onkeydown = (event) => KeyPress(event);

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };