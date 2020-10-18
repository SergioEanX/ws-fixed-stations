<template>
  <json-viewer
    :value="json"
    :expand-depth="5"
    copyable
    boxed
    sort
  ></json-viewer>
</template>

<script>
export default {
  name: "jsonData",

  sockets: {
    "ws-fixed-stations": function(jsonFromWS) {
      this.json = jsonFromWS;
    },
  },

  data: () => ({
    json: {},
  }),
  methods: {},
  created() {
    this.json = {
      total: 25,
      limit: 10,
      skip: 0,
      links: {
        previous: undefined,
        next: function() {},
      },
      data: [
        {
          id: "5968fcad629fa84ab65a5247",
          firstname: "Ada",
          lastname: "Lovelace",
          awards: null,
          known: ["mathematics", "computing"],
          position: {
            lat: 44.563836,
            lng: 6.495139,
          },
        },
      ],
    };
  },
};
</script>

<style></style>
