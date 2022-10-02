<template>
    <div>
        <div class="query">
            <el-autocomplete
                    class="inline-input"
                    v-model="incidentName"
                    :fetch-suggestions="querySearch"
                    placeholder="输入名称查询"
                    @select="handleSelect"
            ></el-autocomplete>
        </div>
        <div id="map" class="mapcontainer"></div>
        <div id="tooltip" class="tooltip"></div>
        
    </div>
</template>

<script>
    import {IconLayer} from '@deck.gl/layers';
    import {MapboxLayer} from '@deck.gl/mapbox';
    import axios from 'axios'
    import Supercluster from 'supercluster';
    import {ScatterplotLayer,LineLayer,PolygonLayer} from '@deck.gl/layers'
    import data from 'assets/json/ComicEvents'
    import 'mapbox-gl/dist/mapbox-gl.css'//不加这句会有警告，还是加上好点
    let mapboxgl = require('mapbox-gl');
    mapboxgl.accessToken = 'pk.eyJ1IjoiaW52aXNpdmxlIiwiYSI6ImNrMjAwd3ZpODBqYWczanJ6cjR2MnVzN2EifQ.HfLXEXo4beVSXenqVeCu-w';
    export default {
        data() {
            return {
                map:null,
                showVideo: false,
                showStreetView: false,
                show3D:false,
                info: null,
                count:0,
                incidentNameList:[],
                incidentName:''

            }
        },
        mounted() {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            //s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCxBtCnJUEVflWBy55v4VQ2lebr5Wnwryc&callback=initialize';
            s.src = 'https://cn.bing.com/api/maps/mapcontrol?key=AqT2t9EmhkpEDyVhcuVQ55mWAIjhzTRulqVN20WqaSwzNt9D4TlOb6DBU9lJsAUa'
            document.body.appendChild(s);
            this.init();
            this.loadData()

            
        },
        methods: {
            
            handleSelect(item,map) {
                console.log(item);
                this.map.flyTo({
                            center:[parseFloat(item.coordinates[0]),parseFloat(item.coordinates[1])],
                            zoom:12,
                            duration:1000
                        })
            },
             querySearch(queryString, cb) {
                let incidentList = this.incidentNameList;
                let results = queryString ? incidentList.filter(this.createFilter(queryString)) : incidentList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (item) => {
                    return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadData(){
                axios({
                    url:'http://106.52.187.27:8088/incidentName.json'
                }).then(res => {
                    this.incidentNameList = res.data.incident
                    console.log(res);
                    // console.log(res);
                })
            },

            init() {
                
                let INITIAL_VIEW_STATE = {
                    latitude: 39.092074,
                    longitude: -14.591807,
                    zoom: 2,
                    bearing: 0,
                    pitch: 30
                };
                mapboxgl.accessToken = 'pk.eyJ1IjoiaW52aXNpdmxlIiwiYSI6ImNrYTlwOGh5aTBwMjUzMG10c3R0dTltOG4ifQ.ZP3u66pJEeSZX4fJ7lL3SQ'; // eslint-disable-line
                this.map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/dark-v10',
                    attributionControl: false,
                    // Note: deck.gl will be in charge of interaction and event handling
                    interactive: true,
                    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
                    zoom: INITIAL_VIEW_STATE.zoom,
                    bearing: INITIAL_VIEW_STATE.bearing,
                    pitch: INITIAL_VIEW_STATE.pitch
                });
                
                this.map.setMaxBounds([
                [-180,-90],
                [180,90]
                                ])
                let ICON_MAPPING = {
                    marker: {x: 0, y: 0, width: 200, height: 200, mask: false}
                    
                };
                
                this.map.on('load', () => {
                    this.map.addLayer(new MapboxLayer({
                        id: 'icon-layer',
                        type: IconLayer,
                        data: data.features,
                        pickable: true,
                        opacity:0.7,
                        // iconAtlas and iconMapping are required
                        // getIcon: return a string
                        iconAtlas: require('../../assets/img/point1.png'),
                        iconMapping: ICON_MAPPING,
                        getIcon: d => 'marker',
                        sizeScale: 10,
                        getPosition: d => d.geometry.coordinates,
                        getSize: 4,
                        getColor: d => [Math.sqrt(d.exits), 140, 0],
                        onHover: ({object, x, y}) => {
                            // const tooltip = `${object[0].name}\n${object[0].film}`;
                            let el = document.getElementById('tooltip');
                            if (object) {
                                el.innerHTML = `事件:${object.properties.name}<br>描述:${object.properties.description}</br>`;
                                el.style.display = 'block';
                                el.style.left = x + 40 + 'px';
                                el.style.top = y - 20 + 'px';
                            } else {
                                el.style.display = 'none';
                            }
                        },
                        onClick:({object})=>{
                        console.log(object)
                        this.map.flyTo({
                            center:object.geometry.coordinates,
                            zoom:12,
                            duration:1000
                        })
                    }
                        
                    }));
                    
                }); 
                /*
                this.$watch("incidentName", function (newValue, oldValue) {
                    console.log(newValue)
                    this.querySearch()
                    map.flyTo({
                            center:[parseFloat(newValue.coordinates[0]),parseFloat(newValue.coordinates[1])],
                            zoom:12,
                            duration:1000
                        })
                })*/
                this.$bus.$on('addIncident',res => {
                    //var temp = data.features
                    //console.log(temp)
                    console.log(res)
                    var a={
                        "type": "Feature",
                        "properties": {
                            "name": res.name,
                            "description": res.description,
                            
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                parseFloat(res.posX),
                                parseFloat(res.posY)
                            ]
                        }
                    }
                    console.log(a)
                    this.map.addLayer(new MapboxLayer({
                        id: `custom-location${this.count}`,
                        type: IconLayer,
                        data: [a],
                        pickable: true,
                        opacity:0.7,
                        // iconAtlas and iconMapping are required
                        // getIcon: return a string
                        iconAtlas: require('../../assets/img/point2.png'),
                        iconMapping: ICON_MAPPING,
                        getIcon: d => 'marker',
                        sizeScale: 10,
                        getPosition: d => d.geometry.coordinates,
                        getSize: 4,
                        getColor: d => [Math.sqrt(d.exits), 140, 0],
                        onHover: ({object, x, y}) => {
                            // const tooltip = `${object[0].name}\n${object[0].film}`;
                            let el = document.getElementById('tooltip');
                            if (object) {
                                el.innerHTML = `事件:${object.properties.name}<br>描述:${object.properties.description}</br>`;
                                el.style.display = 'block';
                                el.style.left = x + 40 + 'px';
                                el.style.top = y - 20 + 'px';
                            } else {
                                el.style.display = 'none';
                            }
                        },
                        
                    }));
                    this.count++
                    this.map.flyTo({
                            center:[parseFloat(res.posX),parseFloat(res.posY)],
                            zoom:12,
                            duration:1000
                        })
                })
                
                

                
            }
          
        }
    }
</script>

<style scoped>
    .mapcontainer {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        mask-border: url("../../assets/img/mainBody/mainBodyBack.svg");
    }
    .query{
        position: fixed;
        left: 60px;
        top: 80px;
        z-index: 5;
    }

    /deep/.el-input__inner{
        background-color: rgba(0,0,0,0.1);
        border: rgba(255,255,255,0.3) 1px solid;
        color: white;
    }

    .tooltip {
        position: absolute;
        z-index: 1;
        padding: 6px;
        border: rgb(27, 3, 3) 1px solid;
        border-radius: 30px;
        pointer-events: none;
        background-color: rgba(0,0,0,0.7);
        max-width: 400px;
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    }
</style>