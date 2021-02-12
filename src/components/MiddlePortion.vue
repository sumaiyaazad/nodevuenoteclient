<template>
  <!--    MIDDLE COLUMN-->
  <div class="col-lg-5">

    <create-post :username="username" :password="password"></create-post>
    <br>
    <post-list :password="password"></post-list>


    <!--      PAGINATION NAVBAR-->
<!--    <nav aria-label="Page navigation example" style="color: #39559F">-->
<!--      <ul class="pagination">-->
<!--        <li class="page-item">-->
<!--          <a class="page-link" href="#" >-->
<!--            <span aria-hidden="true">&laquo;</span>-->
<!--          </a>-->
<!--        </li>-->

<!--        <li class="page-item"><a class="page-link" href="#">2</a></li>-->

<!--        <li class="page-item">-->
<!--          <a class="page-link" href="#" >-->
<!--            <span aria-hidden="true">&raquo;</span>-->
<!--          </a>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </nav>-->

  </div>
</template>
<script>
  import CreatePost from "./CreatePost";
  import PostList from "./PostList";
  export default {
    props:['username','password'],
    // data:function(){
    //   return{
    //     username:'username',
    //     password:'password'
    //   }
    // },
    components:{
      'create-post':CreatePost,
      'post-list':PostList
    }
  }
</script>
