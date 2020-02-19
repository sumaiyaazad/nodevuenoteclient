<template>
  <div class="col-lg-3">
    <br><br>
    <div class="form-group">
      <label for="exampleInputEmail1" >Password</label>
      <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="password">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" >New Password</label>
      <input type="password" class="form-control" id="exampleInputPassword2" v-model="newPassword">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" >Confirm Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="confirmPassword">
    </div>
    <button type="submit" class="btn btn-outline-primary active" style="background-color: #39559F" @click="cancel">Cancel</button>
    <button type="submit" class="btn btn-outline-primary active" style="background: #39559F" @click="passwordChange">Confirm</button>
  </div>
</template>
<script>
  import {eventBus} from "../main";

  export default {
    props:['username'],
    data:function () {
      return{
        password:'',
        newPassword:'',
        confirmPassword: ''
      }
    },
    methods:{
      cancel(){
        this.password='';
        this.newPassword='';
        this.confirmPassword='';
      },
      passwordChange(){
        var self=this;

        if(this.newPassword.length===0){
          console.log(this.newPassword,this.confirmPassword);
          console.log('password zero');
          return;
        }

        if(this.newPassword!==this.confirmPassword){

          console.log('password not match');
          return;
        }

          self.$store.commit('setLoadingTrue');
        this.axios.post('/changepassword', {
          username: this.username,
          password: this.password,
          newpassword: this.newPassword
        }).then(function (response) {

          if(response.data.success) {
            console.log(response.data.success,response.data.message);
            eventBus.$emit('passwordChanged',self.newPassword);
            console.log(self.newPassword);
            self.cancel();
          }else{
            console.log(response.data.message);
          }
            self.$store.commit('setLoadingFalse');
        }).catch(function (error) {
          //console.log(error);
        });
      }
    }
  }
</script>
