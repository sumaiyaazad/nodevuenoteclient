<template>
  <div id="app">
    <app-navigation-bar :logIn="logIn" :username="username" v-bind:password="password"></app-navigation-bar>
    <div class="p-5">
      <div class="row">
        <app-middle-portion v-if="logIn" :username="username" :password="password"></app-middle-portion>
        <br>
        <app-recent-search v-if="logIn && userList.length!==0" :userList="userList"  :username="username"></app-recent-search>
        <br>
        <component :is="sign" :sign="sign" :username="username" :password="password"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import NavigationBar from "./components/NavigationBar";
  import SignIn from "./components/SignIn.vue";
  import SignUp from "./components/SignUp.vue";
  import ChangePassword from "./components/ChangePassword";
  import MiddlePortion from "./components/MiddlePortion";
  import RecentSearch from "./components/RecentSearch";
  import {eventBus} from "./main";
export default {
  name: 'app',
  data () {
    return {
      username:'',
      password:'',
      sign:"app-sign-in",
      logIn:false,
      userList:[]
    }
  },
  components: {
      appNavigationBar:NavigationBar,
      appSignIn :SignIn,
      appSignUp:SignUp,
      appMiddlePortion:MiddlePortion,
      appRecentSearch:RecentSearch,
      appChangePassword:ChangePassword
    },
  created: function () {
    eventBus.$on('signChanged', (sign) => {
      this.sign = sign;
    });
    eventBus.$on('loggedIn', (logIn, username, password) => {
      this.logIn = logIn;
      this.sign = "app-change-password";
      this.username = username;
      this.password = password
    });
    eventBus.$on('newLoggedIn', (logIn, username, password) => {
      this.logIn = logIn;
      this.sign = "app-change-password";
      this.username = username;
      this.password = password
    });
    eventBus.$on('loggedOut', (logOut) => {
      this.logIn = false;
      this.username = "";
      this.password = "";
      this.userList=[];
      this.sign = "app-sign-in";
      console.log(this.logIn);
    });
    eventBus.$on('passwordChanged', (newPassword) => {
      this.password = newPassword;
      console.log(newPassword);
      console.log("Password from eventBusOn");
      console.log(this.password);
    });
    eventBus.$on('userList',(searchedUser)=>{
      this.userList=searchedUser;
      console.log(this.userList);
    });
    eventBus.$on('hidePeople',()=>{
      this.userList=[];
      console.log(this.userList);
    });
  }
}
</script>

<style>
</style>
