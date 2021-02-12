<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{post.username}}</h5>
      <p class="card-text">{{post.text}}</p>
      <a href="#" class="btn btn-primary" style="background-color: #39559F" @click="deletePost" v-if="dlt">Delete</a>
    </div>
  </div>
</template>

<script>
    import {eventBus} from "../main";

    export default {
        name: "Post",
      props: [
          'post','password','dlt'
      ],
      data:function(){
        return{
          notes:[],
          user:this.post.username,
        }
      },
      methods:{
        deletePost(){

          var self=this;
          if(self.post._id!='0'){

            this.axios.post('/deletenote', {
              username: this.post.username,
              password: this.password,
              _id: this.post._id,
            }).then(function (response) {
              console.log(response.data.success,response.data.message);
              if(response.data.success) {
                self.getNotes();
              }else{
                console.log(response.data.message);
              }
            }).catch(function (error) {
              //console.log(error);
            });
          }

        },
        getNotes(){
          var self = this;
          console.log('hello babyyyy');
          console.log('username in delete post',self.user);
          console.log(self.password);

            self.$store.commit('setLoadingTrue');
          this.axios.post('/getnotes', {
            username: this.user,
            password: this.password,
          }).then(function (response) {
            console.log(self.user);
            console.log(self.password);
            self.notes = response.data.notes;
            console.log(response.data.notes);
            eventBus.$emit('postDeleted',self.notes);
              self.$store.commit('setLoadingFalse');
          }).catch(function (error) {

          });
        }
      }
    }
</script>

<style scoped>

</style>
