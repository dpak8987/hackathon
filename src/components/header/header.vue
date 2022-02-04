<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Hackathon</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link :class="{'router-link-active': $route.fullPath ==='/dashboard'}" class="nav-link" to="/dashboard">Home </router-link>
      </li>
      <li class="nav-item">
        <router-link :class="{'router-link-active': $route.fullPath ==='/add_hack'}" class="nav-link" to="/add_hack">Add Ideas</router-link>
      </li>
    </ul>
    <div class="my-2 my-lg-0">
      <a class="router-logout-link" @click="logOut" >Logout</a>
    </div>
  </div>
</nav>
</template>
<script>

export default {
  data () {
    return {
      
    }
  },  
  methods: {
    logOut() {
    	sessionStorage.removeItem("emp_id");
    	this.$router.push({"name":"Login"})
    }
  }
}
</script>

