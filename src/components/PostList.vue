<template>
  <!--      LIST OF POSTS-->
  <div>

    <post v-for="post in posts" :post="post"  :password="password" :dlt="dlt"></post>

  </div>
</template>

<script>
  import Post from "./Post";
  import {eventBus} from "../main";

  export default {
        name: "PostList",
    props:['password','username'],
      data: function(){
          return{
            posts:[],
            dlt:true
          };

      },
      components: {
          'post':Post
      },
      created() {
          eventBus.$on('userNotes',(notes)=>{
            this.posts=notes;
            console.log('postList: ',this.posts);
          });
        eventBus.$on('nonUserNotes',(notes)=>{
          this.posts=notes;
          this.dlt=false;
          console.log('postList: ',this.posts);
        });
        eventBus.$on('postDeleted',(notes)=>{
             this.posts=notes;
              console.log('postList: ',this.posts);
            });
        eventBus.$on('postAdded',(notes)=>{
          this.posts=notes;
          console.log('postList: ',this.posts);
        })
      }
    }
</script>

<style scoped>

</style>
