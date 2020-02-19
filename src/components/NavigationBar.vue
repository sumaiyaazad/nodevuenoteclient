<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #39559F">

      <!--    NAV BAR LOGO-->
      <a class="navbar-brand" href="#" style="padding-left: 20%">
        <img src="logo.png" width="30" height="30" alt="">
      </a>


      <!--    SEARCH BAR-->
      <div class="form-inline" v-if="logIn">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-on:keyup.enter="search" v-model="searchUser">

      </div>


      <!--    USERNAME AND LOGOUT BUTTON-->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup"  v-if="logIn">
        <div class="navbar-nav" >
          <a class="nav-item nav-link" style="text-decoration-color: white" href="#" @click="userNotes">{{username}}</a>
          <a class="nav-item nav-link" href="#" @click="hide">Log Out</a>
        </div>
      </div>

      <!--SPINNER-->
      <div v-if="spinnerOn" class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </nav>
  </div>
</template>

<script>
    import {eventBus} from "../main";

    export default {
      props:['logIn','username','password'],
      data: function(){
        return {
          spinnerOn: false,
          searchUser:'',
          notes:[]
        }
      },
      watch: {
        // This would be called anytime the value of title changes
        searchUser(){
          if(this.searchUser===''){
            eventBus.$emit("hidePeople",{});
          }
        }
      },
      methods:{
        search(){
          console.log(this.searchUser);
          var self=this;
          this.axios.post('/getusers',{
            username:this.username,
            password:this.password,
            name:this.searchUser
          }).then(function (response) {
              eventBus.$emit("userList",response.data.users);
          }).catch(function (error) {

          });
        },
        hide(){
          this.logIn=false;
          eventBus.$emit('loggedOut',false);
        },
        userNotes(){
          var self=this;
          // console.log('Password inside(nav):');
          // console.log(this.password);
          this.axios.post('/getnotes', {
            username: this.username,
            password: this.password,
          }).then(function (response) {
            console.log(self.username);
            console.log(self.password);
            self.notes = response.data.notes;
            console.log(response.data.notes);
            eventBus.$emit('userNotes',self.notes);
          }).catch(function (error) {

          });
        }
      },
      created() {
        eventBus.$on('spinnerOn',()=>{
          this.spinnerOn=true;
          //console.log('hello spinner');
        });
        eventBus.$on('spinnerOff',()=>{
          this.spinnerOn=false;
          //console.log('goodby spinner');
        });
        // eventBus.$on('passwordChanged', (newPassword) => {
        //   this.password = newPassword;
        //   console.log("Password from eventBusOn(Nav)");
        //   console.log(this.password);
        // });
      }
    }
</script>

<style scoped>

</style>
