<template>
  <div class="col-lg-3">
    <div class="form-group">
      <label for="exampleInputEmail1">Username</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  v-model="name">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword2" v-model="password">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Confirm Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="confirmPassword">
    </div>
    <button type="submit" class="btn btn-outline-primary" style=":hover{background: #39559F;color:#dddddd}" @click="editSign">Sign In</button>
    <button type="submit" class="btn btn-outline-primary active" style="background-color: #39559F" @click="checkUser">Sign Up</button>
  </div>
</template>
<script>
  import {eventBus} from "../main";
  import {users} from "../data/users";

  export default {
    props:['sign'],
    data:function(){
      return{
       users:users,
      logIn:'false' ,
      name:'',
      password:'',
      confirmPassword:''
      }
    },
    methods:{
      editSign(){
        this.sign="app-sign-in";
        eventBus.$emit('signChanged',this.sign);
      },
      checkUser() {

        if (!(this.name !== '' && this.password !== '' && this.password === this.confirmPassword)) {
          return;
        }

        var self=this;
        console.log('username: ',this.name,' password: ',this.password);

        self.$store.commit('setLoadingTrue');
        this.axios.post('/signup', {
          username: this.name,
          password: this.password
        }).then(function (response) {
          console.log(response.data.success,response.data.message);
          if(response.data.success) {
            self.logIn=true;
            eventBus.$emit('newLoggedIn',self.logIn,self.name,self.password);
          }else{

          }

            self.$store.commit('setLoadingFalse');
        }).catch(function (error) {
          //console.log(error);
        });
      }

    }
  }
</script>
