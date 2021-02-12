export const users= [
  {userName:'Mahathir',password:'TAAHA'},
  {userName:'Azad',password:'MALA'},
  {userName:'Mala',password:'AZAD'},
  {userName:'Taaha',password:'MAHATHIR'},
  {userName:'Turja',password:'1911'},
  {userName:'Toha',password:'UTSHAEVIL'}
]
import {eventBus} from "../main";
export default {
  created() {
    eventBus.$on('newUser',(name,pword)=>{
      users.push({userName: name, password: pword});
      console.log(users);
    })
  }
}
