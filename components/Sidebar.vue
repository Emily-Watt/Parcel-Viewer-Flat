<template>
    <div data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="gutters:false" region="left" style="width: 23%;height:100%;">
                <div id="header" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top'">
                    <button id="btn" onclick="myFunction()">Buffer</button>
                    <div id="featureCount" alt="featureCount">From the search drop-down, select which type you would like to search, then enter an address within Alameda County.</div>
                    <hr>
                    <p>Distance</p>
                    <input id="distance" type="number" name="Distance">
                    <p>Unit of Measurement</p>
                    <select id="units">
                        <option value="9002">Feet (ft)</option>
                        <option value="9001">Meters (m)</option>
                        <option value="9036">Kilometers (km)</option>
                        <option value="9035">Miles (mi)</option>
                        <option value="9030">Nautical Miles (NM)</option>
                    </select>
                </div>
                <div id="leftPane" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'center'"></div>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar'
        
    }
</script>

<style scoped>

</style>