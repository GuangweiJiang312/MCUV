<template>
    <div id="track-map">
        <el-slider id="time-scroll" v-model="currentValue" :min="minTime" :max="maxTime"></el-slider>
        <div id="tooltip"></div>
        <div class = "characterChoose">
            <div v-for="item in characterList" class="content">
                <span><el-radio v-model="selectedChar" :label=item class = "characterSelect">{{item}}</el-radio></span>
            </div>
        </div>
        <div class = "layerChoose">
            <el-checkbox-group v-model=layerChoose v-for="item in layerList" class = "content">
                <span><el-checkbox :label="item">{{item}}</el-checkbox></span>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    import {Deck} from "@deck.gl/core"
    import {MapboxLayer} from '@deck.gl/mapbox';
    import {ScatterplotLayer,LineLayer,PolygonLayer} from '@deck.gl/layers'
    import {TripsLayer} from '@deck.gl/geo-layers'
    import {HeatmapLayer} from '@deck.gl/aggregation-layers'
    import Supercluster from 'supercluster';
    import * as css from 'mapbox-gl/dist/mapbox-gl.css'
    import rawData from 'assets/json/point.json'
    import stdEclipse from 'assets/json/stdEclipse.json'

    import axios from 'axios'

    let mapboxgl = require('mapbox-gl');
    mapboxgl.accessToken = 'pk.eyJ1Ijoiems3ODIwMTkxODIiLCJhIjoiY2s1eHAwdDlmMWcxZDNnbXgzOXE1MnM4byJ9.ZNi-AvA4IbSDpkoglJL-rA';
    

    export default {
        name: "view2",
        data() {
            return {
                map:null,
                trackPointLayer:null,
                trackLineLayer:null,
                colors:{
                    stever:[[208,208,208],[17,17,153]],
                    tonys:[[255,204,85],[204,0,0]],
                    bruceb:[[119,0,102],[0,136,0]],
                    scottl:[[217,217,217],[136,0,0]],
                    stephens:[[34,17,136],[170,0,0]],
                    tchalla:[[68,0,85],[32,32,32]],
                    carold:[[17,17,136],[221,34,17]],
                    peterp:[[208,208,208],[204,0,0]],
                    blackw:[[204,51,17],[32,32,32]]
                },
                currentValue:50,
                minTime:0,
                maxTime:3344112,
                selectedMovies:[],
                selectedChars:[],
                layerList:['轨迹点','轨迹','热力图','轨迹点聚合','人物轨迹范围'],
                layerChoose:['轨迹点','轨迹'],
                characterList:['Captain America','Iron Man','Hulk','Ant Man','Doctor Strange','Black Panther','Captain Marvel','Spider Man','Black Widow'],
                selectedChar:null,
            }
        },
        mounted() {
            const slider1 = document.getElementById('time-scroll');
            this.map=new mapboxgl.Map({
                container: 'track-map',
                style: 'mapbox://styles/mapbox/dark-v10',
                center:[-14.591807,39.092074],
                zoom:2,
                bearing:0,
                ptich:60
            })
            this.map.setMinZoom(1.5)
            this.map.setMaxBounds([
                [-180,-90],
                [180,90]
            ])
            this.map.on('load',()=>{
                this.initLayers()
            })
        },
        methods:{
            initLayers() {
                var processedData=this.dataProcessing(rawData)
                var trackPointData=processedData.trackPointData
                var trackLineData=processedData.trackLineData
                var tripData=processedData.tripData

                var trackPointLayer=new MapboxLayer({
                    id:'track-point-layer',
                    type:ScatterplotLayer,
                    pickable:true,
                    filled:true,
                    highlightColor:[15,107,190],
                    autoHighlight:true,
                    radiusMinPixels:6,
                    radiusMaxPixels:20,
                    lineWidthUnits:'pixels',
                    lineWidthMinPixels: 4,
                    stroked:true,
                    data:trackPointData,
                    getPosition:d=>[d.coordinates[0],d.coordinates[1]],
                    getRadius:d=>d.rank*10,
                    getFillColor:d=>this.colors[d.id][0],
                    getLineColor:d=>this.colors[d.id][1],
                    onHover:({object,x,y})=>{
                        let tipwin=document.getElementById('tooltip')
                        if(object) {
                            tipwin.innerHTML = `人物:${object.name}</br>时间:${object.date}</br>地点:${object.place}</br>事件:${object.event}`;
                            tipwin.style.display = 'block';
                            tipwin.style.left = x + 'px';
                            tipwin.style.top = y + 'px';
                        }
                        else {
                            tipwin.style.display='none'
                        }
                    },
                    onClick:({object})=>{
                        this.map.flyTo({
                            center:object.coordinates,
                            zoom:12,
                            duration:1000
                        })
                    }
                })

                var trackLineLayer=new MapboxLayer({
                    id:'track-line-layer',
                    type:LineLayer,
                    pickable:true,
                    data:trackLineData,
                    getWidth:5,
                    highlightColor:[240,240,240],
                    autoHighlight: true,
                    getSourcePosition: d => d.from.coordinates,
                    getTargetPosition: d => d.to.coordinates,
                    getColor:[175,175,175],
                    onHover:(ev)=>{
                        let tipwin=document.getElementById('tooltip')
                        if(ev.object) {
                            tipwin.innerHTML = `${ev.object.from.place}——————${ev.object.to.place}</br>`;
                            tipwin.style.display = 'block';
                            tipwin.style.left = ev.x + 'px';
                            tipwin.style.top = ev.y + 'px';
                        }
                        else {
                            tipwin.style.display='none'
                        }
                    },
                    onClick:({object})=>{
                        let fromLoc=object.from.coordinates
                        let toLoc=object.to.coordinates
                        let westSouth=[fromLoc[0]<toLoc[0]?fromLoc[0]:toLoc[0],fromLoc[1]<toLoc[1]?fromLoc[1]:toLoc[1]]
                        let eastNorth=[fromLoc[0]>toLoc[0]?fromLoc[0]:toLoc[0],fromLoc[1]>toLoc[1]?fromLoc[1]:toLoc[1]]
                        this.map.fitBounds([westSouth,eastNorth],{
                            padding: {top: 10, bottom:10, left: 10, right: 10},
                            duration:1000
                        })
                    }
                })

                var tripLayer=new MapboxLayer({
                    id:'trip-layer',
                    type:TripsLayer,
                    data:tripData,
                    getPath: d => d.waypoints.map(p => p.coordinates),
                    getTimestamps: d => d.waypoints.map(p => p.timestamp),
                    currentTime:0,
                    trailLength:150000,
                    getColor: d=>this.colors[d.waypoints[0].id][0],
                    opacity: 0.8,
                    widthUnits:'pixels',
                    widthMinPixels: 6,
                    rounded: true,
                    pickable:true,
                })

                var clustering = new Supercluster({
                    radius: 80,
                    maxZoom: 16
                });
                clustering.load(rawData.features)
                var clusteredPoint=clustering.getClusters([-180, -85, 180, 85], this.map.getZoom())

                var clusterLayer=new MapboxLayer({
                    id:'cluster-layer',
                    type:ScatterplotLayer,
                    radiusMinPixels: 4,
                    radiusMaxPixels:100,
                    lineWidthMinPixels: 2,
                    lineWidthUnits:'pixels',
                    opacity:0.25,
                    pickable:true,
                    filled:true,
                    stroked:true,
                    data:clusteredPoint,
                    visible:false,
                    getFillColor:[0,158,234],
                    getLineColor:[255,255,255],
                    getPosition:d=>d.geometry.coordinates,
                    getRadius:d=>Math.sqrt(d.properties.point_count+1)*35000,
                    onHover:({object,x,y})=>{
                        let tipwin=document.getElementById('tooltip')
                        if(object) {
                            if(object.properties.point_count) {
                                tipwin.innerHTML = `轨迹点数量:${object.properties.point_count}`;
                            }
                            else {
                                tipwin.innerHTML = `轨迹点数量:1`;
                            }
                            tipwin.style.display = 'block';
                            tipwin.style.left = x + 'px';
                            tipwin.style.top = y + 'px';
                        }
                        else {
                            tipwin.style.display='none'
                        }
                    },
                })
                this.map.on('zoom',()=>{
                    if(this.layerChoose.includes('轨迹点聚合')) {
                        clusteredPoint=clustering.getClusters([-180, -85, 180, 85],parseInt(this.map.getZoom()))
                        clusterLayer.setProps({data:clusteredPoint})
                    }
                })
                
                var eclipseLayer=new MapboxLayer({
                    id:'eclipse-layer',
                    type:PolygonLayer,
                    data:stdEclipse.features,
                    pickable: true,
                    stroked: true,
                    filled: true,
                    wireframe: true,
                    opacity:0.1,
                    visible:false,
                    lineWidthMinPixels: 2,
                    getPolygon:d=>d.geometry.coordinates,
                    getFillColor:d=>this.colors[d.properties.id][1],
                    getLineColor:[255,255,255],
                    getLineWidth:1,
                    onHover:({object,x,y})=>{
                        let tipwin=document.getElementById('tooltip')
                        if(object) {
                            tipwin.innerHTML = `面积:${object.properties.Area}</br>扁率:${object.properties.Oblateness}</br>
                                                方位角:${object.properties.Rotation}`;
                            tipwin.style.display = 'block';
                            tipwin.style.left = x + 'px';
                            tipwin.style.top = y + 'px';
                        }
                        else {
                            tipwin.style.display='none'
                        }
                    }
                })

                var heatmapLayer= new MapboxLayer({
                    id:'heatmap-layer',
                    type:HeatmapLayer,
                    data:trackPointData,
                    visible:false,
                    getPosition:d=>d.coordinates,
                    getWeight:d=>d.rank,
                    threshold:0.4,
                    intensity:5,
                    radiusPixels:50
                })

                this.map.addLayer(trackLineLayer)
                this.map.addLayer(tripLayer)
                this.map.addLayer(trackPointLayer)
                this.map.addLayer(eclipseLayer)
                this.map.addLayer(heatmapLayer)
                this.map.addLayer(clusterLayer)

                this.$bus.$on('addPoint',res=>{
                    console.log(res)
                    var PointID=null
                    switch (res.name) {
                        case 'Captain America':PointID='stever';break;
                        case 'Iron Man':PointID='tonys';break;
                        case 'Hulk':PointID='bruceb';break;
                        case 'Black Widow':PointID='blackw';break;
                        case 'Ant Man':PointID='scottl';break;
                        case 'Doctor Strange':PointID='stephens';break;
                        case 'Captain Marvel':PointID='carold';break;
                        case 'Spider Man':PointID='peterp';break;
                        case 'Black Panther':PointID='tchalla';break;
                        default:alert('不存在该角色！');return;
                    } 
                    let trackPoint={
                        type:"Feature",
                        properties:{
                            id:PointID,
                            name:res.name,
                            event:res.description,
                            rank:1,
                            date:res.time,
                            place:res.location,
                            movie:res.movie
                        },
                        geometry:{
                            type:"Point",
                            coordinates:[parseFloat(res.posX),parseFloat(res.posY)]
                        }
                    }

                    for (var i=0;i<rawData.features.length;i++) {
                        if (rawData.features[i].properties.id==trackPoint.properties.id
                            &&(new Date(rawData.features[i].properties.date).getTime())>=(new Date(trackPoint.properties.date).getTime())) {
                            rawData.features.splice(i,0,trackPoint)
                            break
                        }
                    }
                    var updatedData=this.dataProcessing(rawData)
                    trackPointData=updatedData.trackPointData
                    trackLineData=updatedData.trackLineData
                    tripData=updatedData.tripData
                    trackPointLayer.setProps({data:trackPointData})
                    trackLineLayer.setProps({data:trackLineData})
                    tripLayer.setProps({data:tripData})
                    heatmapLayer.setProps({data:trackPointData})

                    clustering.load(rawData.features)
                    clusteredPoint=clustering.getClusters([-180, -85, 180, 85], this.map.getZoom())
                    clusterLayer.setProps({data:clusteredPoint})
                })

                this.$watch("currentValue", function (newValue, oldValue) {
                    tripLayer.setProps({
                        currentTime:newValue
                    })
                })

                this.$watch("selectedChar",function(newValue,oldValue) {
                    console.log(newValue)
                    let filterdEclipse=stdEclipse.features.filter(d=>d.properties.name==newValue)
                    eclipseLayer.setProps({data:filterdEclipse})
                })

                this.$watch("layerChoose",function(newValue,oldValue) {
                    if (newValue.includes("轨迹点")) {trackPointLayer.setProps({visible:true})}
                    else {trackPointLayer.setProps({visible:false})}
                    if (newValue.includes("轨迹")) {
                        trackLineLayer.setProps({visible:true})
                        tripLayer.setProps({visible:true})
                    }
                    else {
                        trackLineLayer.setProps({visible:false})
                        tripLayer.setProps({visible:false})
                    }
                    if (newValue.includes("热力图")) {heatmapLayer.setProps({visible:true})}
                    else {heatmapLayer.setProps({visible:false})}
                    if (newValue.includes("轨迹点聚合")) {clusterLayer.setProps({visible:true})}
                    else {clusterLayer.setProps({visible:false})}
                    if (newValue.includes("人物轨迹范围")) {
                        eclipseLayer.setProps({visible:true})
                        document.getElementsByClassName('characterChoose')[0].style.display='block'
                    }
                    else {
                        eclipseLayer.setProps({visible:false})
                        document.getElementsByClassName('characterChoose')[0].style.display='none'
                    }
                })

                this.$bus.$on('movieClick',res => {
                    this.selectedMovies=res
                    if (this.selectedChars.length>0&&res.length>0) {
                        let filteredPointSet=[]
                        let filteredLineSet=[]
                        let filteredTripSet=[]
                        this.selectedChars.forEach((character)=>{
                            let tempTrip=tripData.filter(d => d.waypoints[0].id==character.id)[0].waypoints
                            res.forEach((movie)=>{
                                filteredPointSet.push(trackPointData.filter((d)=>d.id==character.id&&d.movie==movie))
                                filteredLineSet.push(trackLineData.filter((d)=>d.id==character.id&&d.from.movie==movie&&d.to.movie==movie))
                                filteredTripSet.push({waypoints:tempTrip.filter((d)=>d.movie==movie)})
                            })
                        })
                        let filteredPoint=[]
                        filteredPointSet.forEach((pSet)=>{
                            filteredPoint.push.apply(filteredPoint,pSet)
                        })
                        let filteredLine=[]
                        filteredLineSet.forEach((lSet)=>{
                            filteredLine.push.apply(filteredLine,lSet)
                        })
                        let filteredTrip=filteredTripSet.filter((d)=>d.waypoints.length>0)
                        console.log(filteredTrip)
                        //动态修改时间轴区间
                        if(filteredTrip.length>0) {
                            let fixedMinTime=filteredTrip[0].waypoints[0].timestamp
                            let fixedMaxTime=filteredTrip[0].waypoints[0].timestamp
                            filteredTrip.forEach((trip)=>{
                                trip.waypoints.forEach((tripPoint)=>{
                                    if(tripPoint.timestamp<fixedMinTime) {
                                        fixedMinTime=tripPoint.timestamp
                                    }
                                    if(tripPoint.timestamp>fixedMaxTime) {
                                        fixedMaxTime=tripPoint.timestamp
                                    }
                                })
                            })
                            this.minTime=fixedMinTime
                            this.maxTime=fixedMaxTime
                            this.currentValue=this.minTime
                            tripLayer.setProps({currentTime:this.minTime})
                        }

                        trackPointLayer.setProps({data:filteredPoint})
                        trackLineLayer.setProps({data:filteredLine})
                        let currentTrailLength=(this.maxTime-this.minTime)/10<150000?(this.maxTime-this.minTime)/10:150000
                        tripLayer.setProps({data:filteredTrip,trailLength:currentTrailLength})
                    }
                    else {
                        trackPointLayer.setProps({data:[]})
                        trackLineLayer.setProps({data:[]})
                        tripLayer.setProps({data:[]})
                    }
                })

                this.$bus.$on('charClick',res => {
                    this.selectedChars=res
                    if(this.selectedMovies.length>0&&res.length>0) {
                        let filteredPointSet=[]
                        let filteredLineSet=[]
                        let filteredTripSet=[]
                        res.forEach((character)=>{
                            let tempTrip=tripData.filter(d => d.waypoints[0].id==character.id)[0].waypoints
                            this.selectedMovies.forEach((movie)=>{
                                filteredPointSet.push(trackPointData.filter((d)=>d.id==character.id&&d.movie==movie))
                                filteredLineSet.push(trackLineData.filter((d)=>d.id==character.id&&d.from.movie==movie&&d.to.movie==movie))
                                filteredTripSet.push({waypoints:tempTrip.filter((d)=>d.movie==movie)})
                            })
                        })
                        let filteredPoint=[]
                        filteredPointSet.forEach((pSet)=>{
                            filteredPoint.push.apply(filteredPoint,pSet)
                        })
                        let filteredLine=[]
                        filteredLineSet.forEach((lSet)=>{
                            filteredLine.push.apply(filteredLine,lSet)
                        })
                        let filteredTrip=filteredTripSet.filter((d)=>d.waypoints.length>0)
                        //动态修改时间轴区间
                        if(filteredTrip.length>0) {
                            let fixedMinTime=filteredTrip[0].waypoints[0].timestamp
                            let fixedMaxTime=filteredTrip[0].waypoints[0].timestamp
                            filteredTrip.forEach((trip)=>{
                                trip.waypoints.forEach((tripPoint)=>{
                                    if(tripPoint.timestamp<fixedMinTime) {
                                        fixedMinTime=tripPoint.timestamp
                                    }
                                    if(tripPoint.timestamp>fixedMaxTime) {
                                        fixedMaxTime=tripPoint.timestamp
                                    }
                                })
                            })
                            this.minTime=fixedMinTime
                            this.maxTime=fixedMaxTime
                            this.currentValue=this.minTime
                            tripLayer.setProps({currentTime:this.minTime})
                        }

                        trackPointLayer.setProps({data:filteredPoint})
                        trackLineLayer.setProps({data:filteredLine})
                        let currentTrailLength=(this.maxTime-this.minTime)/10<150000?(this.maxTime-this.minTime)/10:150000
                        tripLayer.setProps({data:filteredTrip,trailLength:currentTrailLength})
                    }
                    else {
                        trackPointLayer.setProps({data:[]})
                        trackLineLayer.setProps({data:[]})
                        tripLayer.setProps({data:[]})
                    }
                })
            },
            dataProcessing(inputData) {
                let trackPointData=[]
                let trackLineData=[]
                let tripData=[]
                inputData.features.forEach((item,index)=>{
                    trackPointData.push({
                        id:item.properties.id,
                        name:item.properties.name,
                        event:item.properties.event,
                        date:item.properties.date,
                        rank:item.properties.rank,
                        coordinates:item.geometry.coordinates,
                        place:item.properties.place,
                        movie:item.properties.movie
                    })

                    if(index==0||item.properties.id!=inputData.features[index-1].properties.id) {
                        tripData.push({waypoints:[]})
                    }
                    tripData[tripData.length-1].waypoints.push({
                        coordinates:item.geometry.coordinates,
                        timestamp:parseInt((new Date(item.properties.date).getTime()+1625097600000)/1000000),
                        id:item.properties.id,
                        name:item.properties.name,
                        event:item.properties.event,
                        place:item.properties.place,
                        movie:item.properties.movie
                    })

                    if(index<inputData.features.length-1) {
                        if(item.properties.id===inputData.features[index+1].properties.id) {
                            trackLineData.push({
                                id:item.properties.id,
                                name:item.properties.name,
                                from:{
                                    event:item.properties.event,
                                    date:item.properties.date,
                                    coordinates:item.geometry.coordinates,
                                    place:item.properties.place,
                                    movie:item.properties.movie
                                },
                                to:{
                                    event:inputData.features[index+1].properties.event,
                                    date:inputData.features[index+1].properties.date,
                                    coordinates:inputData.features[index+1].geometry.coordinates,
                                    place:inputData.features[index+1].properties.place,
                                    movie:inputData.features[index+1].properties.movie
                                }
                            })
                        }
                    }
                })
                return {trackPointData:trackPointData,trackLineData:trackLineData,tripData:tripData}
            },
        }
    }
</script>

<style scoped>
    #track-map {
        width: 100%;
        height: 100%;
        z-index: 0;
        position:relative;
    }

    #time-scroll {
        position: absolute;
        width:500px;
        
        right:1.5%;
        bottom:3%;
        z-index:10;
    }

    #stever{
        position:absolute;
        top:0;
        right:0;
        z-index:1;
    }

    #tooltip {
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: rgba(0,0,0,0.8);
        color: #fff;
    }

    .layerChoose{
        background-color: rgba(255,255,255,0.2);
        font-size: 14px;
        position: fixed;
        right:20px;
        top: 120px;
        z-index: 10;
        border-radius: 10px;
    }

    .content{
        height: 34px;
        line-height: 34px;
        font-size: 16px;
        cursor: pointer;
        padding-left: 16px;
        padding-right: 16px;
    }

    .content span{
        margin-left: 8px;
    }

    .content:hover{
        background-color: rgba(0,0,0,0.2);
    }

    /deep/.el-checkbox{
        color: white;
    }

    .characterChoose{
        background-color: rgba(255,255,255,0.2);
        display:none;
        font-size: 14px;
        position: fixed;
        right:20px;
        top: 300px;
        border-radius: 5px;
        z-index: 11;
    }

    /deep/.el-radio{
        color: white;
    }

</style>