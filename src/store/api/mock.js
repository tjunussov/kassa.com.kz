// import axios from 'axios'
import {$http} from '@/store/api/shop'
import MockAdapter from 'axios-mock-adapter'

let mock = new MockAdapter($http,{delayResponse:500})
mock.onPost('/app/fiscalize').reply((cfg)=>{

  var post = JSON.parse(cfg.data)
  // console.log(post);

  var data = {
    created:new Date(),
    ofd:"КГДРК(БЛОКЧЕЙН)",
    code:Math.ceil(Math.random()*100000),
    codeToken:Math.ceil(Math.random()*100),
    isOffline:(Math.random()*100 > 50),
    ink:"KASSA.kz",
    rnk:post.app.fiscal.rnk,
    znk:post.app.fiscal.znk
  }
  data.codeToken = data.code + '0' + data.codeToken
  if((Math.random()*100) > 10)
    return [200,data];
  else {
    // console.log('fakink OFD Error');
    return [400,{error:"Превышено время ожидания запроса!"}]
  }
}).onPost('/app/klik').reply((cfg)=>{
  var post = JSON.parse(cfg.data)
  var data = {confirm:((Math.random()*100) > 10), ...post}
  return [200,data];
})
.onPost('/auth').reply((cfg)=>{
  var post = JSON.parse(cfg.data)
  var data = {confirm:((Math.random()*100) > 10), ...post}
  return [200,data];
})
.onPost('/authAnon').reply((cfg)=>{
  var post = JSON.parse(cfg.data)
  var data = {confirm:((Math.random()*100) > 10), ...post}
  return [200,data];
})
.onPost('/logout').reply((cfg)=>{
  var post = JSON.parse(cfg.data)
  var data = {confirm:((Math.random()*100) > 10), ...post}
  return [200,data];
})
.onGet('/products').reply(200,[
  {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
  {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
  {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
])
.onGet('/items').reply(200,[
  {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
  {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
  {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
])
.onGet('/contacts').reply(200,[
  {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
  {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
  {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
])
.onAny().reply(404);
