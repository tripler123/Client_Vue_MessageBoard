<template>
  <div>
    <button @click="showMessageForm = !showMessageForm"
            type="button"
            class="btn btn-info mt-3 mb-3"> Toggle Message Form</button>
    <form v-if="showMessageForm" class="mt-5 mb-3" @submit.prevent="addMessage" >
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{error}}</p>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username"
               type="text" class="form-control"
               id="username">
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="message.subject"
               type="text"
               class="form-control"
               id="subject"
               placeholder="Insert your subject"
               required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message"
                  class="form-control"
                  id="message" rows="3"
                  required></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input v-model="message.imageURL"
               type="text"
               class="form-control"
               id="imageURL"
               placeholder="Insert image's URL">
      </div>
      <button type="submit" class="btn btn-info btn-block" >Postear</button>
    </form>
    <div class="list-unstyled mt-5" v-for="message in reverseMessage" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h5 class="mt-0 mb-1">{{message.username}}</h5>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br/>
          <small>{{message.created}}</small>
        </div>
      </li>
      <hr size="1" color="#00FF00">
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/messages';
export default {
  name: 'home',
  data: () => ({
    error: '',
    showMessageForm: false,
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
    },
  }),
  computed: {
    reverseMessage() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL).then(response => response.json()).then((result) => {
      this.messages = result;
    });
  },
  methods: {
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then(response => response.json()).then((result) => {
        if (result.details) {
          const error = result.details.map(detail => detail.message).join('. ');
          this.error = error;
        } else {
          this.error = '';
          this.showMessageForm = false;
          this.messages.push(result);
          this.message.subject = '';
          this.message.message = '';
          this.message.imageURL = '';
        }
      });
    },
  },
};
</script>

<style>
hr {
  border-top: 1px solid burlywood;
}
img {
  width: 300px;
  height: auto;
}
</style>

