<template>
  <div id="mainWindow" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design:'headline',gutters:false"style="width:100%; height:100%;">
       <Sidebar />
       <Map />
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'

export default {
    head: {
      bodyAttrs: {
        class: 'claro'
      }
  },
  components: {
    Sidebar,
    Map
  },
  mounted() {

  }
}
</script>

<style>

</style>
