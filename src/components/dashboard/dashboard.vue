<template>
  <div class="section">
    <v-header> </v-header>
    <div class="container-fluid container-section">
      <h2>Hack Ideas List</h2>
      <small>Note: Cannot upvote on your idea</small>
      <div class="col-lg-12" v-if="details">
        <table
          id="example"
          class="table table-striped table-bordered"
          style="width: 100%"
        >
          <thead>
            <tr>
              <th>Hack ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Votes</th>
              <th>Upvote</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detail of details">
              <td>{{detail.hack_id}}</td>
              <td>{{detail.title}}</td>
              <td>{{detail.description}}</td>
              <td>{{detail.created | timeStampConversion}}</td>
              <td>{{detail.vote}}</td>
              <td v-if="detail.emp_id != empId">
                <template v-if="isVotingLoading && detail.hack_id == hackId">
                  <span>
                    <i class="fa fa-spinner fa-spin"></i>
                  </span>
                </template>
                <template v-else>
                  <span
                    class="upvote-span"
                    v-if="!detail.voted"
                    @click="upVote(detail.hack_id,detail.vote,detail.objectId)"
                  >
                    <i class="far fa-thumbs-up fa-lg not-voted"></i>
                  </span>
                  <span v-else>
                    <i class="fas fa-thumbs-up fa-lg voted"></i>
                  </span>
                </template>
              </td>
              <td v-else>
                <span>
                  <i class="fas fa-thumbs-up fa-lg icon-disabled"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-5" v-else>
        <span><i class="fa fa-spinner fa-spin fa-2x"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import axios from 'axios';
import $ from 'jquery';
import inputValidation from '../generic/general-input-validation';
import Header from '../header/header.vue';
export default {
    components: {
        'v-input-validation': inputValidation,
        'v-header': Header
    },
    data() {
        return {
            details: undefined,
            isLoading: true,
            empId: sessionStorage.getItem("emp_id"),
            isVotingLoading: false,
            hackId: undefined
        }
    },
    created() {
        this.getHackDetails();
    },
    updated() {
        if (this.details) {
            $('#example').DataTable({
                "columns": [{
                        "width": "8%"
                    },
                    {
                        "width": "18%"
                    },
                    {
                        "width": "50%"
                    },
                    {
                        "width": "12%"
                    },
                    {
                        "width": "2%"
                    },
                    {
                        "width": "5%"
                    },
                ],
                columnDefs: [{
                    orderable: false,
                    targets: -1
                }],
                "bDestroy": true,
                pageLength: 5,
                lengthMenu: [
                    [5, 10, 20, -1],
                    [5, 10, 20, 50]
                ]
            });
        }
    },
    filters: {
        timeStampConversion(value) {
            var date = new Date(value);
            return date.getDate() +
                "/" + (date.getMonth() + 1) +
                "/" + date.getFullYear() +
                " " + date.getHours() +
                ":" + date.getMinutes() +
                ":" + date.getSeconds()
        }
    },
    methods: {
        getHackDetails() {
            axios.get("https://leadingfront.backendless.app/api/data/hack")
            .then((result) => {
                if (result.status === 200) {
                    this.getVoteDetails(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getVoteDetails(hackDetails) {
            axios.get("https://leadingfront.backendless.app/api/data/upvote?where=emp_id=" + this.empId)
            .then((result) => {
                if (result.status === 200) {
                    let response = result.data;
                    let hackArray = response.map(x => x.hack_id);
                    hackDetails.filter(function (val) {
                        if (hackArray.includes(val.hack_id)) {
                            val.voted = true
                        }
                    })
                    this.details = hackDetails;
                    this.isVotingLoading = false;

                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        upVote(hack_id, vote, objectId) {
            this.isVotingLoading = true;
            this.hackId = hack_id;
            vote += 1;
            axios.put("https://leadingfront.backendless.app/api/data/hack/" + objectId, {
                "vote": vote
            })
            .then((result) => {
                if (result.status === 200) {
                    this.updateVote(hack_id);
                    this.getHackDetails(hack_id);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        updateVote(hack_id) {
            axios.post("https://leadingfront.backendless.app/api/data/upvote", {
                "hack_id": hack_id,
                "emp_id": this.empId,
                "voted": 1
            })
            .then((result) => {
                if (result.status === 200) {}
            })
            .catch((error) => {
                console.log(error);
            });
        },
    }
}


</script>

