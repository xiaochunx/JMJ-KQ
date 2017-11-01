<template>
  <div>
    <map-view :height="height" :longitude="longitude" :latitude="latitude"></map-view>
  </div>
</template>
<script>
  import MapView from '../../MapView.vue'
  export default {
    data(){
      return{
        height:500,
        longitude:116.404,
        latitude:50.915
      }
    },
    components: {
      MapView
    }
  }
</script>
