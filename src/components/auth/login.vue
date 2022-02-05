<template>
  <div class="container">
    <div class="col-lg-4 login-section mt-5">
      <span><i class="fa fa-user fa-5x"></i></span>
      <h1 class="h3 mb-3 font-weight-normal">Enter SignIn</h1>
      <small> (Enter any 4 digit number to login)</small>
      <input
        type="text"
        id="empId"
        v-model="empId"
        class="form-control"
        placeholder="Employee id"
        maxlength="4"
        required
        autofocus
      />
      <small id="title" class="form-text text-muted required-text">
        <v-input-validation
          :inputValue="empId"
          :checkFor="['numbers']"
          :hasError.sync="empIdHasError"
        />
      </small>
      <button
        class="btn btn-lg btn-primary btn-block mt-3 btn-disabled"
        id="login"
        @click="empLogin"
        :disabled="!isValidForm"
      >
        Sign in
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import inputValidation from '../generic/general-input-validation';
export default {
    components: {
        'v-input-validation': inputValidation
    },
    data() {
        return {
            empId: undefined,
            empIdHasError: true,
            empResponse: undefined
        }
    },
    computed: {
        isValidForm() {
            if (this.empId) {
                return (this.empIdHasError) ? false : true;
            } else {
                return false;
            }
        }
    },
    methods: {
        empLogin() {
            axios.get("https://leadingfront.backendless.app/api/data/employee?where=emp_id=" + this.empId)
              .then((result) => {
                  this.empResponse = result;
                  if (this.empResponse.status === 200) {
                      if (this.empResponse.data.length === 0) {
                          this.saveEmployee();
                      } else {
                          let employeeId = this.empResponse.data[0].emp_id;
                          sessionStorage.setItem("emp_id", employeeId);
                          this.$router.push({
                              path: "/dashboard"
                          })
                      }
                  }
              })
              .catch((error) => {
                  console.log(error);
              });
        },
        saveEmployee(id) {
            axios.post("https://leadingfront.backendless.app/api/data/employee", {
                "emp_id": this.empId
            })
            .then((result) => {
                if (result.status === 200) {
                    console.log("success");
                    sessionStorage.setItem("emp_id", this.empId);
                    this.$router.push({
                        path: "/dashboard"
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>


