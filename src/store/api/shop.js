import axios from 'axios'
import { $fauth } from '@/store/api/firebase'

/*************************************/

const baseURL = "https://api.kassa.ga/v1";

export const $http = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
  // headers: {
  // //   Authorization: 'Bearer {token}'
  //   'Accept':'application/hal+json, application/json; q=0.5'
  // }
})

export default {
  getProducts (cb) {
    return $http.get('/products').then(function(response) {
      cb(_products)
      return response.data;
    });
  },
  checkout (items, cb, errorCb) {
    console.log('checkout');
    cb()
  },
  fiscalize(cart){
    return $http.post('/app/fiscalize', cart).then(function(response) {
      // console.log("response",response.data);
      return response.data;
    }).catch(function(e){
      // console.error("Zresponse",e.response);
      return e.response.data;
    });
  },
  auth(username){
    return axios.post('https://auth.kassa.com.kz',username,{
      headers: { 'Content-Type': 'text/plain' }
    }).then(function(response) {

      console.log("response",response.data);

      return $fauth.signInWithCustomToken(response.data.token).then(()=>{
        return response.data;
      }).catch(function(error) {
        console.error(error);
      });
      
    }).catch(function(e){
      console.error("Zresponse",e);
      return e.response;
    });
  },
  anonAuth(){
    $fauth.signInAnonymously().catch(function(error) {
    });
  },
  logout(){
    $fauth.signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
}
