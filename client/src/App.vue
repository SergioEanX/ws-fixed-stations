<template>
  <v-app>
    <v-toolbar
      dark
      dense
     color="teal"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
   

      <v-toolbar-title 
        >Air Heritage Fixed Stations by Websocket ---  </v-toolbar-title
      >
      
      <v-icon >mdi-server-network</v-icon>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout row mb-4>
          <v-flex> 
            <jsonData></jsonData>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="teal" dark dense>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading"
            >Get connected with us on social networks!</strong
          >

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>


      </v-card>
    </v-footer>
    <popupMessage></popupMessage>
  </v-app>
</template>
<script>
import jsonData from './components/jsonData'
import popupMessage from './components/popupMessage'
export default {
  
  name: "App",

  components: {
    jsonData,
    popupMessage,
  },

  data: () => ({
    //
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
