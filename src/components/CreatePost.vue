<template>
  <!--      NEW POST COMPONENT-->
  <div class="card text-center" >
    <div class="card-header">
      Create Post
    </div>
    <div class="card-body">
      <input type="text" style="width: 100%" v-model="post">
    </div>
    <div class="card-footer">
      <a href="#" class="btn btn-primary" style="background-color: #39559F" @click="postCreated">Post</a>
      <a href="#" class="btn btn-primary" style="background-color: #39559F" @click="postCancelled">Cancel</a>
    </div>
  </div>

</template>

<script>
    import {eventBus} from "../main";

    export default {
      props:['username','password'],
        name: "CreatePost",
        data:function(){
        return {
          post:''
        }
        },
      methods:{
        postCreated(){
          var self=this;
            self.$store.commit('setLoadingTrue');
            this.axios.post('/newnote', {
              username: this.username,
              password: this.password,
              text: self.post
            }).then(function (response) {
              console.log(self.username,self.password);
              console.log(response.data.success,response.data.message,'hello');
              if(response.data.success) {
                self.post='';
                self.getNotes();
                console.log('Successful Note creation')
              }else{
                console.log(response.data.message);
              }
                self.$store.commit('setLoadingFalse');
            }).catch(function (error) {
              //console.log(error);
            });
        //   }else{
        //     this.axios.post('http://localhost:4000/editnote', {
        //       username: this.$store.getters.username,
        //       password: this.$store.getters.password,
        //       _id: this.$route.params.id,
        //       text: this.text
        //     }).then(function (response) {
        //       console.log(response.data.success,response.data.message);
        //       if(response.data.success) {
        //         self.$router.push({name: 'home'});
        //         self.setNotification(response.data.message);
        //       }else{
        //         self.setNotification(response.data.message);
        //       }
        //     }).catch(function (error) {
        //       //console.log(error);
        //     });
        //   }
        // },
        },
        postCancelled(){
          this.post='';
        },
        getNotes(){
          var self = this;
          console.log('hello babyyyy');
          console.log('username in delete post',self.user);
          console.log(self.password);
            self.$store.commit('setLoadingTrue');
          this.axios.post('/getnotes', {
            username: this.username,
            password: this.password,
          }).then(function (response) {
            console.log(self.user);
            console.log(self.password);
            self.notes = response.data.notes;
            console.log(response.data.notes);
            eventBus.$emit('postAdded',self.notes);
              self.$store.commit('setLoadingFalse');
          }).catch(function (error) {

          });
        }
      }
    }
</script>

<style scoped>

</style>
