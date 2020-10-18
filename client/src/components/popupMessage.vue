<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="color"
    multi-line:true
    top
    rounded="pill"
    elevation="24"
  >
    {{ notification_text }}  <span v-show="display_id"> (id: {{socket_id}})</span>
    <v-btn flat right @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  sockets: {
    notifications: function(socket_data) {
      this.notification_text = socket_data.message;
      this.socket_id= socket_data.id;
      this.color = socket_data.color || "success";

      // Display snackbar
      this.snackbar = true;
    },
    disconnect: function() {
      this.notification_text = "Connection to server lost!!";
      this.color = "red";
      this.snackbar = true;
      this.timeout = 10000;
      this.display_id=false;
    },
  },
  data: () => ({
    snackbar: false,
    notification_text: "",
    socket_id:"",
    timeout: 5000,
    color: "success",
    display_id: true
  }),
};
</script>
