<template>
    <div data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="gutters:false" region="left">
                <div :id="sidebarId" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top'">
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
<!-- 
                //Click-Info
            var template = new InfoTemplate();
            template.setTitle("<b>Parcel</b>");
            template.setContent(
                //"<hr><button id='btn' onclick="myFunction()">Buffer</button>" 

                //"<hr><a href:'https://google.com/maps/api

                `
                <b>Parcel</b>
                <hr><a href='https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${SitusAddress}&heading=360&fov=120&pitch=-5&sensor=false&key=AIzaSyAtsysKdAwT9jbKdgDJJPlaPVBm2wZRR2c' target='_blank'><b><img src='https://maps.googleapis.com/maps/api/streetview?size=350x250&location=${SitusAddress}&fov=120&pitch=-5&sensor=false&key=AIzaSyAtsysKdAwT9jbKdgDJJPlaPVBm2wZRR2c'></b></a> 
                
                <hr>X:   ex 

                <hr>Y:   why 

                <hr>APN Book No: <b>${BOOK}</b> 

                <hr>APN Page No: <b>${PAGE}</b> 
                
                <hr>APN Parcel No: <b>${APN}</b> 

                <hr>APN Sub Parcel No: <b>${SUB_PARCEL}</b> 

                <hr>Sort Parcel: <b>${SORT_APN}</b> 

                <hr>Parcel No: <b>${PARCEL}</b> 

                <hr>Year Built: <b>${YearBuilt}</b> 

                <hr>TRA Primary (City): <b>${TRAPrimary}</b> 

                <hr>TRA Secondary: <b>${TRASecondary}</b> 

                <hr>Land Value: <b>${Land}</b> 

                <hr>Improvement Value: <b>${Imps}</b> 

                <hr>CLCA Land Value: <b>${CLCALand}</b> 

                <hr>CLCA Improvement Value: <b>${CLCAImps}</b> 

                <hr>Homeowner's Exemption: <b>${HOEX}</b> 

                <hr>Other Exemption: <b>${OTEX}</b> 

                <hr>Total Net Value: <b>${TotalNetValue}</b> 

                <hr>Latest Document Prefix: <b>${LatestDocument_Prefix}</b> 

                <hr>Latest Document Series: <b>${LatestDocumentSeries}</b> 

                <hr>Latest Document Date: <b>${LatestDocumentDate}</b> 

                <hr>Use Code: <b>${UseCode}</b> 

                <hr>Economic Unit Flag: <b>${EconUnit}</b> 
                
                <hr>Situs Address: <b>${SitusAddress}</b> 

                <hr>Mailing Address: <b>${MailingAddress}</b> 
                
                <hr> View Assessor's Map: <a href=http://www.acgov.org/MS/prop/index.aspx?PRINT_PARCEL=${APN} target='_blank'><b>View Parcel Info</b></a> 
                
                <hr> View Assessor's Map: <a href=https://www.acgov.org/ptax_pub_app/RealSearchInit.do?searchByParcel=true&parcelNumber=${APN} target='_blank'><b>View Tax Info</b></a>
                `
            ); -->
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        data(){
            return {
                sidebarId: 'header'
            }
        },
        mounted(){
            // debugger
        }
        
    }
</script>

<style scoped>

</style>