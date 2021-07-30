import store from './store';

let currentAuth;

function listener(){
    let previousAuth = currentAuth;
    // update nilai
    currentAuth = store.getState().auth;
    // cek apakah nilai state auth berubah dari nilai sebelumnya
    if(currentAuth !== previousAuth){
        localStorage.setItem('auth',JSON.stringify(currentAuth));
    }
}

function listen(){
    store.subscribe(listener);
}
export {listen}
