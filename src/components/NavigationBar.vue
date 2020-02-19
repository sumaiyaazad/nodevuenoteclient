<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #39559F">

        <!--    NAV BAR LOGO-->
        <a class="navbar-brand" href="#" style="padding-left: 20%">
          <img src="https://sumaiyaazad.github.io/nodevuenoteclient/logo.png" width="30" height="30" alt="">
        </a>

        <!--SPINNER-->
        <div v-if="$store.getters.getLoadingFlag" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>

        <div class="navbar-nav" >
            <!--    SEARCH BAR-->
            <div class="form-inline" v-if="logIn">
              <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-on:keyup.enter="search" v-model="searchUser">
            </div>
            <a class="nav-item nav-link" v-if="logIn" style="text-decoration-color: white" href="#" @click="userNotes">{{username}}</a>
            <a class="nav-item nav-link" v-if="logIn" href="#" @click="hide">Log Out</a>
        </div>


    </nav>


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

            self.$store.commit('setLoadingTrue');
          this.axios.post('/getusers',{
            username:this.username,
            password:this.password,
            name:this.searchUser
          }).then(function (response) {
              eventBus.$emit("userList",response.data.users);
              self.$store.commit('setLoadingFalse');
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

            self.$store.commit('setLoadingTrue');
          this.axios.post('/getnotes', {
            username: this.username,
            password: this.password,
          }).then(function (response) {
            console.log(self.username);
            console.log(self.password);
            self.notes = response.data.notes;
            console.log(response.data.notes);
            eventBus.$emit('userNotes',self.notes);
              self.$store.commit('setLoadingFalse');
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
          //console.log('goodbye spinner');
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
