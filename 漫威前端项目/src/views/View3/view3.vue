<template>
    <div>
        <div class="query">
            <el-autocomplete
                    class="inline-input"
                    v-model="queryInput"
                    :fetch-suggestions="querySearch"
                    placeholder="输入名称查询"
                    @select="handleSelect"
            ></el-autocomplete>
        </div>
        <div class="mapcontainer" id="map"></div>
        <div class="tooltip" id="tooltip"></div>
        <el-switch @change="loadCesium($event)" active-text="3D" id="dim" inactive-text="2D"
                   style="right: 30px;bottom:50px;position:absolute;z-index: 6" v-model="show3D"></el-switch>
        <div class="street-view" id="street-view" v-if="this.showStreetView"></div>
        <video v-if="this.showVideo" id="filmCut" class="filmCut" autoplay loop controls
               @mousedown="dragFunc($event,'filmCut')"></video>
        <el-col class="switches" v-if="this.showStreetView||this.showVideo">
            <el-switch @change="streetViewChange($event)" active-text="显示街景" v-model="showStreetView"></el-switch>
            <el-switch @change="fimlCutChange($event)" active-text="显示视频" style="margin-top: 10px"
                       v-model="showVideo"></el-switch>
        </el-col>
        <div id="cesium-container"
             style="display: none;top:0;left: 0;height: 100vh;width: 100vw;position: absolute;z-index: 5"></div>
    </div>
</template>
<script>
    import {IconLayer} from '@deck.gl/layers';
    import {MapboxLayer} from '@deck.gl/mapbox';
    import data from '../../assets/json/movie.json'
    import 'mapbox-gl/dist/mapbox-gl.css'//不加这句会有警告，还是加上好点
    let mapboxgl = require('mapbox-gl');
    mapboxgl.accessToken = 'pk.eyJ1IjoiaW52aXNpdmxlIiwiYSI6ImNrMjAwd3ZpODBqYWczanJ6cjR2MnVzN2EifQ.HfLXEXo4beVSXenqVeCu-w';
    export default {
        data() {
            return {
                showVideo: false,
                showStreetView: false,
                show3D: false,
                info: null,
                count: 0,
                locations:[],
                queryInput:"",
                map:null
            }
        },
        mounted() {
            this.locations=data.map(function (value,index,array) {
                return {
                    value:value.name,
                    film:value.film,
                    coordinates:[value.coordinates[1],value.coordinates[0]],
                }
            })
            console.log(data)
            let s1 = document.createElement('script');
            s1.type = 'text/javascript';
            //s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCxBtCnJUEVflWBy55v4VQ2lebr5Wnwryc&callback=initialize';
            s1.src = 'https://cn.bing.com/api/maps/mapcontrol?key=AqT2t9EmhkpEDyVhcuVQ55mWAIjhzTRulqVN20WqaSwzNt9D4TlOb6DBU9lJsAUa'
            document.body.appendChild(s1);
            let s2 = document.createElement('script');
            s2.type = 'text/javascript';
            s2.src = 'https://cesium.com/downloads/cesiumjs/releases/1.70/Build/Cesium/Cesium.js'
            document.body.appendChild(s2);
            let l = document.createElement('link');
            l.href = 'https://cesium.com/downloads/cesiumjs/releases/1.70/Build/Cesium/Widgets/widgets.css'
            l.rel = 'stylesheet'
            document.body.appendChild(l);
            this.init();
        },
        methods: {
            init() {
                let INITIAL_VIEW_STATE = {
                    latitude: 40.759363,
                    longitude: -73.984532,
                    zoom: 12,
                    bearing: 0,
                    pitch: 30
                };
                mapboxgl.accessToken = 'pk.eyJ1IjoiaW52aXNpdmxlIiwiYSI6ImNrYTlwOGh5aTBwMjUzMG10c3R0dTltOG4ifQ.ZP3u66pJEeSZX4fJ7lL3SQ'; // eslint-disable-line
                let map = new mapboxgl.Map({
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
                map.setMaxBounds([
                [-180,-90],
                [180,90]
                 ])
                let ICON_MAPPING = {
                    marker1: {x: 0, y: 0, width: 128, height: 128, mask: true},
                    marker2: {x: 128, y: 0, width: 128, height: 128, mask: false}
                };
                map.on('load', () => {
                    map.addLayer(new MapboxLayer({
                        id: 'shootingLocations',
                        type: IconLayer,
                        data: data,
                        pickable: true,
                        // iconAtlas and iconMapping are required
                        // getIcon: return a string
                        iconAtlas: require('../../assets/img/icon-atlas.png'),
                        iconMapping: ICON_MAPPING,
                        getIcon: d => 'marker1',
                        sizeScale: 15,
                        getPosition: d => [d.coordinates[1],d.coordinates[0]],
                        getSize: d => 5,
                        getColor: d => [Math.sqrt(d.exits), 140, 0],
                        onHover: ({object, x, y}) => {
                            // const tooltip = `${object[0].name}\n${object[0].film}`;
                            let el = document.getElementById('tooltip');
                            if (object) {
                                el.innerHTML = `<p style="text-align: center">取景地:${object.name}</p><img src="${require("../../assets/img/event_picture/" + object.name + ".png")}" style="vertical-align: middle" width="390"><br>电影:${object.film}<br>取景地描述:${object.text1}<br>涉及电影情节:${object.text2}</br>`;
                                el.style.display = 'block';
                                el.style.left = x + 40 + 'px';
                                el.style.top = y - 20 + 'px';
                            } else {
                                el.style.display = 'none';
                            }
                        },
                        onClick: (info, event) => {
                            this.info = info;
                            if (event.leftButton) {
                                this.loadStreetView(info.lngLat);
                                this.loadVideo(info.object.name)
                            }
                        }
                    }));
                });
                this.map=map;
                this.$bus.$on('addLocation', res => {
                    let point = {
                        name: res.name,
                        film: res.film,
                        description: res.description,
                        plot: res.plot,
                        lng: parseFloat(res.posX),
                        lat: parseFloat(res.posY)
                    }
                    map.addLayer(new MapboxLayer({
                        id: `custom-location${this.count}`,
                        type: IconLayer,
                        data: [point],
                        pickable: true,
                        // iconAtlas and iconMapping are required
                        // getIcon: return a string
                        iconAtlas: require('../../assets/img/icon-atlas.png'),
                        iconMapping: ICON_MAPPING,
                        getIcon: d => 'marker2',
                        sizeScale: 15,
                        getPosition: d => [d.lng, d.lat],
                        getSize: d => 5,
                        getColor: d => [Math.sqrt(d.exits), 140, 0],
                        onHover: ({object, x, y}) => {
                            // const tooltip = `${object[0].name}\n${object[0].film}`;
                            let el = document.getElementById('tooltip');
                            if (object) {
                                el.innerHTML = `取景地:${object.name}<br>电影:${object.film}<br>取景地描述:${object.description}<br>涉及电影情节:${object.plot}</br>`;
                                el.style.display = 'block';
                                el.style.left = x + 40 + 'px';
                                el.style.top = y - 20 + 'px';
                            } else {
                                el.style.display = 'none';
                            }
                        },
                    }))
                    this.count++
                })
            },
            loadStreetView(lngLat) {
                if (this.showStreetView === false) {
                    this.showStreetView = true;
                }
                setTimeout(function () {
                    let map = new Microsoft.Maps.Map(document.getElementById('street-view'), {
                        /* No need to set credentials if already passed in URL */
                        mapTypeId: Microsoft.Maps.MapTypeId.streetside,
                        zoom: 18,
                        center: new Microsoft.Maps.Location(lngLat[1], lngLat[0])
                    });
                    map.setView({mapTypeId: Microsoft.Maps.MapTypeId.streetside});
                }, 500)
            },
            loadVideo(name) {
                if (this.showVideo === false) {
                    this.showVideo = true;
                }
                console.log(name)
                setTimeout(function () {
                    let videoNode = document.getElementById('filmCut');
                    videoNode.style.display = 'block';
                    videoNode.setAttribute('src', require(`../../assets/video/shootLocations/${name}.mp4`));
                }, 3000)
            },
            streetViewChange($event) {
                if ($event) {
                    this.loadStreetView(this.info.lngLat);
                }
            },
            fimlCutChange($event) {
                if ($event) {
                    this.loadVideo(this.info.object.name);
                }
            },
            dragFunc($event, id) {
                let dom = document.getElementById(id);
                let startX = $event.clientX - dom.offsetLeft;
                let startY = $event.clientY - dom.offsetTop;
                dom.onmousemove = function (event) {
                    dom.style.left = event.clientX - startX + 'px';
                    dom.style.top = event.clientY - startY + 'px';
                    dom.style.cursor = 'move';
                }
                dom.onmouseout = function () {
                    dom.onmousemove = null;
                    dom.style.cursor = 'default';
                }
                dom.onmouseup = function (event) {
                    dom.onmousemove = null;
                    dom.style.cursor = 'default';
                }
            },
            loadCesium($event) {
                let dom = document.getElementById('cesium-container');
                if ($event) {
                    dom.style.display = 'block';
                    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYzQzZjIwZC05OTk5LTQyYzAtYjBhNS0yNTQ1YTRlODY0Y2IiLCJpZCI6Mjc2MTIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODk4MTcwNTB9.Z3ZabA2_JEtiW0ioBsxtnZlizBnmV4QcFbWvUvcr4lo";
                    let viewer = new Cesium.Viewer("cesium-container", {
                        terrainProvider: Cesium.createWorldTerrain(),
                    })
                    let tileset = viewer.scene.primitives.add(
                        new Cesium.Cesium3DTileset({
                            url: Cesium.IonResource.fromAssetId(57587),
                        })
                    );
                    tileset.readyPromise.then(function () {
                        viewer.zoomTo(tileset);

                        // Apply the default style if it exists
                        let extras = tileset.asset.extras;
                        if (
                            Cesium.defined(extras) &&
                            Cesium.defined(extras.ion) &&
                            Cesium.defined(extras.ion.defaultStyle)
                        ) {
                            tileset.style = new cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
                        }
                    })
                        .otherwise(function (error) {
                            console.log(error);
                        });

                    Cesium.GeoJsonDataSource.load('../json/shootingLocations.geojson').then(function (dataSource) {
                        viewer.dataSources.add(dataSource);
                        let entities = dataSource.entities.values;
                        for (let i = 0; i < entities.length; i++) {
                            let entity = entities[i];
                            entity.billboard = undefined;
                            entity.model = new Cesium.ModelGraphics({
                                uri: '../model/xyz_hw10_full_pipeline_-_eve_dusty/scene.gltf',
                                maximumScale: 20000,
                                minimumPixelSize: 128,
                                scale: 0.5
                            })
                            // entity.point = new Cesium.PointGraphics({
                            //     color: Cesium.Color.RED,
                            //     pixelSize: 10
                            // });
                            // entity.model={
                            //     uri:'../model/xyz_hw10_full_pipeline_-_eve_dusty/scene.gltf',
                            //     minimumPixelSize: 128,
                            //     maximumScale: 20000,
                            // }
                        }
                    });
                } else {
                    dom.style.display = 'none';
                }
            },
            querySearch(queryString, cb){
                //结果列表的每个对象必须有value属性，显示的就是这个
                let results=queryString?this.locations.filter(function (location) {
                    return location.value.includes(queryString)||location.film.includes(queryString)
                }):this.locations
                cb(results)
            },
            handleSelect(item){
                this.map.flyTo({
                    center: item.coordinates,
                    zoom: 17,
                    speed: 0.8,
                    curve: 1,
                })
            },
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
    }

    .tooltip {
        position: absolute;
        z-index: 1;
        padding: 6px;
        border: rgb(27, 3, 3) 1px solid;
        border-radius: 30px;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.7);
        max-width: 400px;
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        text-shadow: 0 0 5px rgba(2, 54, 94, 0.99), 0 0 15px rgba(2, 54, 94, 0.99), 0 0 25px rgba(2, 54, 94, 0.99);
    }

    .street-view {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
    }

    .filmCut {
        position: absolute;
        z-index: 3;
        height: 270px;
        width: 480px;
        display: none;
        /*transform:translateX(-50%) translateY(-50%);*/
        /*-moz-transform:translateX(-50%) translateY(-50%);*/
        /*-webkit-transform:translateX(-50%) translateY(-50%);*/
        /*-ms-transform:translateX(-50%) translateY(-50%);*/
        right: 0;
        top: 0;
    }

    .switches {
        position: absolute;
        left: 60px;
        top: 60px;
        z-index: 2;
        display: flex;
        flex-direction: column;

    }

    /deep/ .el-switch {
        color: white;
    }
    .query{
        position: fixed;
        left: 60px;
        top: 80px;
        z-index: 10;
    }

    /deep/.el-input__inner{
        background-color: rgba(0,0,0,0.1);
        border: rgba(255,255,255,0.3) 1px solid;
        color: white;
    }

</style>