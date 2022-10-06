<template>
    <div>
        <div class="query">
            <el-autocomplete
                    class="inline-input"
                    v-model="marvelid"
                    :fetch-suggestions="querySearch"
                    placeholder="输入名称查询"
                    @select="handleSelect"
            ></el-autocomplete>
        </div>
        <div id="3d-graph">
        </div>
        <el-checkbox v-model="selectAll" style="position: absolute;z-index: 5;top: 80px;left: 60px"
                     @change="initGraph1Again">ALL
        </el-checkbox>
        <el-checkbox-group v-model="checkedList"
                           style="position: absolute;z-index: 5;top: 100px;left: 60px;display:flex;flex-direction: column"
                           @change="filterGraphData">
            <el-checkbox v-for="opt in checkList" :label="opt" :key="opt"></el-checkbox>
        </el-checkbox-group>
        <canvas id="legend" width="370px" height="60px" class="legend"></canvas>
    </div>
</template>

<script>
    import rawData from '../../assets/json/marvel-data.json';
    import * as THREE from 'three';
    import ForceGraph3D from '3d-force-graph';
    import {request} from "network/request";

    export default {
        name: "graph",
        data() {
            return {
                marvelid: "",
                idList: [],
                Graph: null,
                gData: null,
                checkList: ['HERO', 'AVENGERS', 'SHIELD', 'ARMY', 'VILLAIN', 'HYDRA', 'TEN_RINGS', 'AIM', 'RAVAGERS', 'NOVA_CORP', 'BLACK_ORDER', 'STAN_LEE'],
                checkedList: [],
                selectAll: true,
                relationMap: {
                    "0": {
                        "typeName": "friend",
                        "color": "#FF7F00"
                    },
                    "1": {
                        "typeName": "enemy",
                        "color": "#FF0000"
                    },
                    "2": {
                        "typeName": "creation",
                        "color": "#FFFF00"
                    },
                    "3": {
                        "typeName": "family",
                        "color": "#00FF00"
                    },
                    "4": {
                        "typeName": "work",
                        "color": "#00FFFF"
                    },
                    "5": {
                        "typeName": "romance",
                        "color": "#8B00FF"
                    },
                    "6": {
                        "typeName": "alter_ego",
                        "color": "#0000FF"
                    }
                }
            }
        },
        mounted() {
            this.initGraph()
            this.loadData()
        },
        methods: {
            initGraph() {
                let characters = rawData["characters"];
                let relationship = rawData["relationship"];
                let characters_arr = [];
                let links = [];
                let id_aff_type_map = {}
                for (let key in characters) {
                    let tmpNode = characters[key]
                    tmpNode.is_alter = false
                    characters_arr.push(tmpNode)
                    id_aff_type_map[tmpNode['id']] = {
                        "affiliation": tmpNode.affiliation,
                        "type": tmpNode.type
                    }
                }
                for (let key in relationship) {
                    links.push({
                        "source": relationship[key]["id"],
                        "target": relationship[key]["target_id"],
                        // "type": parseInt(relationship[key]["relationship"])
                        "type": relationship[key]["relationship"]
                    })
                }
                for (let key in rawData['alter_ego']) {
                    let tmpNode = rawData['alter_ego'][key]
                    tmpNode.is_alter = true
                    tmpNode.affiliation = id_aff_type_map[tmpNode['origin_id']].affiliation
                    tmpNode.type = id_aff_type_map[tmpNode['origin_id']].type
                    characters_arr.push(tmpNode)
                    links.push({
                        "source": tmpNode['id'],
                        "target": tmpNode['origin_id'],
                        "type": 6
                    })
                }
                let gData = {
                    nodes: characters_arr,
                    links: links
                };
                //console.log(gData);
                const Graph = ForceGraph3D();
                Graph(document.getElementById('3d-graph'))
                    // .linkAutoColorBy(d=>d.type)
                    .linkColor(d => this.relationMap[d.type]["color"])
                    .linkWidth(0.5)
                    .linkOpacity(0.4)
                    .nodeThreeObject(({id}) => {
                        // use a sphere as a drag handle
                        // const obj = new THREE.Mesh(
                        //     new THREE.SphereGeometry(7),
                        //     new THREE.MeshBasicMaterial({depthWrite: false, transparent: true, opacity: 0})
                        // );
                        //
                        // // add img sprite as child
                        // let imgurl = require(`../../assets/img/marvel_svg/${id}.svg`);
                        // const imgTexture = new THREE.TextureLoader().load(imgurl);
                        // const material = new THREE.SpriteMaterial({map: imgTexture});
                        // const sprite = new THREE.Sprite(material);
                        // sprite.scale.set(24, 24);
                        // obj.add(sprite);
                        // return obj;
                        let imgurl = require(`../../assets/img/marvel_svg/${id}.svg`);
                        let spriteMap = new THREE.TextureLoader().load(imgurl);
                        let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
                        let sprite = new THREE.Sprite(spriteMaterial);
                        sprite.scale.set(32, 32)
                        return sprite;
                    })
                    .onNodeClick(node => {
                        this.$bus.$emit('clickItem', node.is_alter ? node.origin_id : node.id)
                        const distance = 40;//自己设的，可以改
                        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
                        Graph.cameraPosition(
                            {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
                            node, // lookAt ({ x, y, z })
                            3000  // 动画过渡时间（毫秒）
                        );
                    })
                    .graphData(gData)
                let scene = Graph.scene();
                // let axesHelper = new THREE.AxesHelper(100);
                // scene.add( axesHelper );
                let camera = Graph.camera();
                let renderer = Graph.renderer()
                let controls = Graph.controls()
                controls.maxDistance = 1000;
                let materialArray = [];
                let texture_ft = new THREE.TextureLoader().load(require('../../assets/img/skybox/space1/ft.png'));
                let texture_bk = new THREE.TextureLoader().load(require('../../assets/img/skybox/space1/bk.png'));
                let texture_up = new THREE.TextureLoader().load(require('../../assets/img/skybox/space1/up.png'));
                let texture_dn = new THREE.TextureLoader().load(require('../../assets/img/skybox/space1/dn.png'));
                let texture_rt = new THREE.TextureLoader().load(require('../../assets/img/skybox/space1/rt.png'));
                let texture_lf = new THREE.TextureLoader().load(require('../../assets/img/skybox/space1/lf.png'));

                materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
                materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
                materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
                materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
                materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
                materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

                for (let i = 0; i < 6; i++)
                    materialArray[i].side = THREE.BackSide;
                let skyboxGeo = new THREE.BoxGeometry(2000, 2000, 2000);
                let skybox = new THREE.Mesh(skyboxGeo, materialArray);
                scene.add(skybox);
                animate()

                function animate() {
                    renderer.render(scene, camera);
                    requestAnimationFrame(animate);
                }

                let ctx = document.getElementById('legend').getContext("2d");
                // 设置字体
                ctx.font = "20px bold 黑体";
                // 设置颜色
                ctx.fillStyle = "#fff";
                // 设置垂直对齐方式
                ctx.textBaseline = "middle";
                for (let i = 0; i < 4; i++) {
                    let currentType = this.relationMap[i.toString()]
                    ctx.fillText(currentType['typeName'], 10 + i * 90, 10);
                    ctx.beginPath()
                    ctx.moveTo(10 + i * 90, 23)
                    ctx.strokeStyle = currentType['color']
                    ctx.lineTo(90 * (i + 1), 23)
                    ctx.closePath()
                    ctx.stroke();
                }
                for (let i = 0; i < 3; i++) {
                    let currentType = this.relationMap[(i + 4).toString()]
                    ctx.fillText(currentType['typeName'], 10 + i * 90, 40);
                    ctx.beginPath()
                    ctx.moveTo(10 + i * 90, 53)
                    ctx.strokeStyle = currentType['color']
                    ctx.lineTo(90 * (i + 1), 53)
                    ctx.closePath()
                    ctx.stroke();
                }
                this.gData = gData;
                this.Graph = Graph;
            },
            handleSelect(item) {
                this.$bus.$emit('clickItem', item.id)
                let nodes=this.Graph.graphData()['nodes']
                for (let node of nodes) {
                    if(node.id===item.id){
                        let distance = 40;//自己设的，可以改
                        let distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
                        this.Graph.cameraPosition(
                            {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
                            node, // lookAt ({ x, y, z })
                            3000  // 动画过渡时间（毫秒）
                        );
                        break;
                    }
                }
            },
            querySearch(queryString, cb) {
                let idList = this.idList;
                let results = queryString ? idList.filter(this.createFilter(queryString)) : idList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (item) => {
                    return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadData() {
                request({
                    url: '/marvelId'
                }).then(res => {
                    this.idList = res.id
                    // console.log(res);
                })
            },
            filterGraphData(arr) {
                if (arr.length === 0) {
                    this.selectAll = true
                    this.initGraph1Again(true)
                }
                this.selectAll = false
                arr = arr.map(function (value, index, array) {
                    return value.toLowerCase()
                })
                let nodes = this.gData.nodes.filter(function (node) {
                    if (arr.includes(node.type)) return true;
                    else {
                        let aff = Object.keys(node.affiliation);
                        for (let item of aff) {
                            return arr.includes(item)
                        }
                    }
                })
                let links = this.gData.links.filter(function (link) {
                    return nodes.includes(link.source) && nodes.includes(link.target)
                })
                this.Graph.graphData({
                    nodes: nodes,
                    links: links
                })
            },
            initGraph1Again(value) {
                if (value) {
                    this.Graph.graphData(this.gData);
                    this.checkedList = []
                }
            }
        }
    }
</script>
<style scoped>
    #3d-graph {
        width: 100%;
        height: 100%;
    }

    .query {
        position: fixed;
        left: 60px;
        top: 80px;
        z-index: 5;
    }

    .legend {
        position: fixed;
        left: 50px;
        bottom: 40px;
        z-index: 5;
        border-color: white;
    }

    /deep/ .el-input__inner {
        background-color: rgba(0, 0, 0, 0.1);
        border: rgba(255, 255, 255, 0.3) 1px solid;
        color: white;
    }
</style>