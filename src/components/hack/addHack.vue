<template>
  <div class="section">
    <v-header>
    </v-header>
    <div class="container">
      <div class="alert alert-success fade show mt-3 col-lg-6 col-md-6 col-sm-6" role="alert" id="success-alert" v-if="showAlert" >
      <p> <strong> Success! </strong> Your idea has been successfully added. </p>
    </div>
  <div class="col-lg-6 form-section">
  <div class="form-group">
    <label for="title" class="col-form-label required"><b>Title</b></label>
    <input type="text" class="form-control" v-model="title" id="title" placeholder="Enter Title">
    <small id="title" class="form-text text-muted required-text">
      <v-input-validation
        :inputValue="title"
        :checkFor="['whitespace','validTitle','specialchars']"
        :hasError.sync="titleHasError"
      />
    </small>
  </div>
  <div class="form-group">
    <label for="description" class="col-form-label required"><b>Description</b></label>
    <textarea class="form-control" v-model="description" id="description" rows="3" placeholder="Minimum 30 chars"></textarea>
    <small id="description" class="form-text text-muted required-text">
      <v-input-validation
        :inputValue="description"
        :checkFor="['minimumchar']"
        :hasError.sync="descriptionHasError"
      />
    </small>
  </div>
  <div class="form-group">
    <label for="tags"><b>Tags</b></label>
    <multiselect v-model="tagvalue" :options="options" :multiple="true" :allow-empty="false" :preselect-first="true"></multiselect>
  </div>
  <button type="submit" class="btn btn-primary btn-disabled" @click="saveUser" :disabled="!isValidForm">Submit</button>
</div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import inputValidation from '../generic/general-input-validation';
import Header from '../header/header.vue';
import Multiselect from 'vue-multiselect'
export default {
  components: {
        'v-input-validation': inputValidation,
        'v-header': Header,
        Multiselect
    },
  data () {
    return {
      description: undefined,
      tagvalue: [],
      title: undefined,
      empId: undefined,
      showAlert: false,
      titleHasError: true,
      descriptionHasError: true,
      options: ['Hack', 'Future', 'Science', 'Automation', 'Technology', 'Management']
    }
  },
  created () {
    this.empId = sessionStorage.getItem("emp_id");
  },
  computed: {
    isValidForm () {
        if(this.title && this.description) {
         return (this.titleHasError || this.descriptionHasError) ? false : true;
      } else {
        return false;
      }
    }
  },
  methods: {
    saveUser() {
      let hack_id = Math.floor(Date.now()).toString().slice(-8);
      axios.post("https://leadingfront.backendless.app/api/data/hack", {"title":this.title,"description":this.description,"tags":this.tagvalue.toString(), "hack_id":hack_id, "emp_id":this.empId})
      .then((result) => {
        if(result.status === 200) {
          this.showAlert = true;
          setTimeout(function () {
            $("#success-alert").alert('close');
          }, 1000);
          setTimeout( () => this.$router.push({ path: '/dashboard'}), 1000);
        }
      })
      .catch((error) => {
       console.log(error);
      });      
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>