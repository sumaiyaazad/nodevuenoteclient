<template>
  <div class="col-lg-3">
    <div class="form-group">
      <label for="exampleInputEmail1">Username</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  v-model="name">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
    </div>
    <button type="submit" class="btn btn-outline-primary active" style="background-color: #39559F" @click="checkUser">Sign In</button>
    <button type="submit" class="btn btn-outline-primary" style=":hover{background: #39559F;color:#dddddd}" @click="editSign">Sign Up</button>
  </div>
</template>
<script>
  import {eventBus} from "../main";
  export default {
   props:['sign'],
    data:function(){
     return {
       name:'',
       password:'',
       logIn:false
     }
  },
   methods:{
    editSign(){
      this.sign="app-sign-up";
      eventBus.$emit('signChanged',this.sign);
    },
     checkUser(){

      var self=this;

         self.$store.commit('setLoadingTrue');
       this.axios.post('/signin', {
         username: this.name,
         password: this.password
       }).then(function (response) {
           console.log(response.data.success,response.data.message);
           if(response.data.success) {
             console.log('Successful login');
             self.logIn=true;
             eventBus.$emit('loggedIn',self.logIn,self.name,self.password);
           }else{
             console.log('unsuccessful login');
           }
           self.$store.commit('setLoadingFalse');
       }).catch(function (error) {
           self.$store.commit('setLoadingFalse');
       });


     }
  }
  }
</script>
