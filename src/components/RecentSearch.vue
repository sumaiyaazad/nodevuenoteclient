<template>
  <div class="card col-lg-4" style="height: fit-content">
    <div class="card-header">
      People
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="user in userList"><a class="nav-link" href="#" @click="getUserPosts(user.username)" >{{user.username}}</a></li>
    </ul>
  </div>
</template>
<script>
  import {eventBus} from "../main";

  export default {
  props:['userList',"username"],
  methods:{
    getUserPosts(user){
      var self=this;

      self.$store.commit('setLoadingTrue');
      this.axios.post('/getusernotes',{
        name:user,
      }).then(function(response){
        eventBus.$emit('nonUserNotes',response.data.usernotes);
      }).catch(function (error) {

      });
    }
  }
  }
</script>
