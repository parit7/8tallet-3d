import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import GUI, { ColorController } from 'lil-gui';
import { MathUtils, Vector3 } from 'three'

var mouse: THREE.Vector2, raycaster: THREE.Raycaster, INTERSECTED: THREE.Object3D;

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
let selection = document.getElementById("selection");
let locked = false;

const scene = new THREE.Scene()
const modelContainer1 = new THREE.Group();
const modelContainer2 = new THREE.Group();
const modelContainer3 = new THREE.Group();
const modelContainer4 = new THREE.Group();
const modelContainer8 = new THREE.Group();
const modelContainer7 = new THREE.Group();
const modelContainer61 = new THREE.Group();
const modelContainer6 = new THREE.Group();
const modelContainer5 = new THREE.Group();
scene.add(modelContainer1);
scene.add(modelContainer2);
scene.add(modelContainer3);
scene.add(modelContainer4);
scene.add(modelContainer8);
scene.add(modelContainer7);
scene.add(modelContainer61);
scene.add(modelContainer6);
scene.add(modelContainer5);
//scene.add(new THREE.AxesHelper(5))

/* const light = new THREE.SpotLight()
light.position.set(5, 5, 5)
scene.add(light)

const light2 = new THREE.SpotLight()
light2.position.set(5, 5, -5)
scene.add(light2)
 */

const hemiLight = new THREE.HemisphereLight()
hemiLight.color.setHSL( 1, 1, 1 );
hemiLight.groundColor.setHSL( 0.4, 0.4, 0.4 );
hemiLight.position.set( 0, 10, 0 );
scene.add(hemiLight) 


/* const light3 = new THREE.SpotLight()
light3.position.set(10, 0, -5)
scene.add(light3)

const light4 = new THREE.SpotLight()
light4.position.set(-5, 5, 5)
scene.add(light4)

const light5 = new THREE.SpotLight()
light5.position.set(15, 5, 5)
scene.add(light5) */

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.x = 0
camera.position.y = 5
camera.position.z = 10

const renderer = new THREE.WebGLRenderer()
// renderer.physicallyCorrectLights = true
// renderer.shadowMap.enabled = true
// renderer.outputEncoding = THREE.sRGBEncoding
renderer.setClearColor( 0x000000, 0 )
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//const controls = new OrbitControls(camera, renderer.domElement)
const controls = new TrackballControls(camera, renderer.domElement)
//controls.enableDamping = true

var showOtherHomesLink;

const params = {
    entrance60: true,
    entrance62: true,
    entrance63: true,
    entrance64: true,
    entrance65: true,
    entrance66: true,
    entrance67: true,
    entrance68: true,
    entrance69: true,
    entrance70: true,
    entrance71: true,
    entrance72: true,
    entrance73: true,
    entrance74: true,
    entrance75: true,
    entrance76: true,
    entrance77: true,
    entrance78: true,
    entrance79: true,
    entrance80: true,
    entrance81: true,
    entrance82: true,
    entrance83: true,
    entrance84: true,
    entrance86: true,
    entrance88: true,

    level0: true,
    level1: true,
    level2: true,
    level3: true,
    level4: true,
    level5: true,
    level6: true,
    level7: true,
    level8: true,
    level9: true,
    
    rooms2: true,
    rooms3: true,
    rooms4: true,
    rooms5: true,
    rooms6: true,
    rooms7: true,

    hometypeTownhouse: true,
    hometypeApartment: true,
    hometypePenthouse: true,
};

const gui = new GUI( {title: 'Filters'} );

const resetButton = {
    resetFilters: function() {
        params.entrance60 = true
        params.entrance62 = true
        params.entrance63 = true
        params.entrance64 = true
        params.entrance65 = true
        params.entrance66 = true
        params.entrance67 = true
        params.entrance68 = true
        params.entrance69 = true
        params.entrance70 = true
        params.entrance71 = true
        params.entrance72 = true
        params.entrance73 = true
        params.entrance74 = true
        params.entrance75 = true
        params.entrance76 = true
        params.entrance77 = true
        params.entrance78 = true
        params.entrance79 = true
        params.entrance80 = true
        params.entrance81 = true
        params.entrance82 = true
        params.entrance84 = true
        params.entrance86 = true
        params.entrance88 = true
       
        params.level0 = true
        params.level1 = true
        params.level2 = true
        params.level3 = true
        params.level4 = true
        params.level5 = true
        params.level6 = true
        params.level7 = true
        params.level8 = true
        params.level9 = true
        
        params.rooms2 = true
        params.rooms3 = true
        params.rooms4 = true
        params.rooms5 = true
        params.rooms6 = true
        params.rooms7 = true

        params.hometypeApartment = true
        params.hometypePenthouse = true
        params.hometypeTownhouse = true
    
        let tempobjarr: THREE.Object3D[] = [];
        var filtertype = "objtype"
        var filtervalue = "home"
        const objects = getObjectsByProperty(scene, filtertype, filtervalue, tempobjarr);
        
        for (let i = 0; i < objects.length; i++)
        {
            (objects as THREE.Object3D[])[i].visible = true;
            (objects as THREE.Object3D[])[i].layers.set(0);
            (objects as THREE.Object3D[])[i].userData['levelvis'] = 1;
            (objects as THREE.Object3D[])[i].userData['roomsvis'] = 1;
            (objects as THREE.Object3D[])[i].userData['entrancevis'] = 1;
            (objects as THREE.Object3D[])[i].userData['hometypevis'] = 1;
        }
        gui.load(initGUIValues)
    
    }
    ,
    resetView: function() {
        camera.position.set(0, 5, 10)
        controls.reset()
        //camera.updateProjectionMatrix
        controls.update()
    }
}
gui.add(resetButton, 'resetFilters').name('Reset filters');
gui.add(resetButton, 'resetView').name('Reset view');
const folderHometype = gui.addFolder('Type');
folderHometype.open(false);
folderHometype.add( params, 'hometypePenthouse').name('Penthouse').onChange( (value: boolean) => {
    filterObj('hometype', 'Penthouse', value)
});
folderHometype.add( params, 'hometypeApartment').name('Apartment').onChange( (value: boolean) => {
    filterObj('hometype', 'Apartment', value)
});
folderHometype.add( params, 'hometypeTownhouse').name('Townhouse').onChange( (value: boolean) => {
    filterObj('hometype', 'Townhouse', value)
});
const folderEntrance = gui.addFolder('Entrance');
folderEntrance.open(false);
folderEntrance.add( params, 'entrance60').name('60').onChange( (value: boolean) => {
    filterObj('entrance', '60', value);
});
folderEntrance.add( params, 'entrance62').name('62').onChange( (value: boolean) => {
    filterObj('entrance', '62', value);
});
folderEntrance.add( params, 'entrance63').name('63').onChange( (value: boolean) => {
    filterObj('entrance', '63', value);
});
folderEntrance.add( params, 'entrance64').name('64').onChange( (value: boolean) => {
    filterObj('entrance', '64', value);
});
folderEntrance.add( params, 'entrance65').name('65').onChange( (value: boolean) => {
    filterObj('entrance', '65', value);
});
folderEntrance.add( params, 'entrance66').name('66').onChange( (value: boolean) => {
    filterObj('entrance', '66', value);
});
folderEntrance.add( params, 'entrance67').name('67').onChange( (value: boolean) => {
    filterObj('entrance', '67', value);
});
folderEntrance.add( params, 'entrance68').name('68').onChange( (value: boolean) => {
    filterObj('entrance', '68', value);
});
folderEntrance.add( params, 'entrance69').name('69').onChange( (value: boolean) => {
    filterObj('entrance', '69', value);
});
folderEntrance.add( params, 'entrance70').name('70').onChange( (value: boolean) => {
    filterObj('entrance', '70', value);
});
folderEntrance.add( params, 'entrance71').name('71').onChange( (value: boolean) => {
    filterObj('entrance', '71', value);
});
folderEntrance.add( params, 'entrance72').name('72').onChange( (value: boolean) => {
    filterObj('entrance', '72', value);
});
folderEntrance.add( params, 'entrance73').name('73').onChange( (value: boolean) => {
    filterObj('entrance', '73', value);
});
folderEntrance.add( params, 'entrance74').name('74').onChange( (value: boolean) => {
    filterObj('entrance', '74', value);
});
folderEntrance.add( params, 'entrance75').name('75').onChange( (value: boolean) => {
    filterObj('entrance', '75', value);
});
folderEntrance.add( params, 'entrance76').name('76').onChange( (value: boolean) => {
    filterObj('entrance', '76', value);
});
folderEntrance.add( params, 'entrance77').name('77').onChange( (value: boolean) => {
    filterObj('entrance', '77', value);
});
folderEntrance.add( params, 'entrance78').name('78').onChange( (value: boolean) => {
    filterObj('entrance', '78', value);
});
folderEntrance.add( params, 'entrance79').name('79').onChange( (value: boolean) => {
    filterObj('entrance', '79', value);
});
folderEntrance.add( params, 'entrance80').name('80').onChange( (value: boolean) => {
    filterObj('entrance', '80', value);
});
folderEntrance.add( params, 'entrance81').name('81').onChange( (value: boolean) => {
    filterObj('entrance', '81', value);
});
folderEntrance.add( params, 'entrance82').name('82').onChange( (value: boolean) => {
    filterObj('entrance', '82', value);
});
folderEntrance.add( params, 'entrance84').name('84').onChange( (value: boolean) => {
    filterObj('entrance', '84', value);
});
folderEntrance.add( params, 'entrance86').name('86').onChange( (value: boolean) => {
    filterObj('entrance', '86', value);
});
folderEntrance.add( params, 'entrance88').name('88').onChange( (value: boolean) => {
    filterObj('entrance', '88', value);
});


const folderLevel = gui.addFolder('Level');
folderLevel.open(false);
folderLevel.add( params, 'level0').name('0').onChange( (value: boolean) => {
    filterObj('level', '0', value);
});
folderLevel.add( params, 'level1').name('1').onChange( (value: boolean) => {
    filterObj('level', '1', value);
});
folderLevel.add( params, 'level2').name('2').onChange( (value: boolean) => {
    filterObj('level', '2', value);
});
folderLevel.add( params, 'level3').name('3').onChange( (value: boolean) => {
    filterObj('level', '3', value);
});
folderLevel.add( params, 'level4').name('4').onChange( (value: boolean) => {
    filterObj('level', '4', value);
});
folderLevel.add( params, 'level5').name('5').onChange( (value: boolean) => {
    filterObj('level', '5', value);
});
folderLevel.add( params, 'level6').name('6').onChange( (value: boolean) => {
    filterObj('level', '6', value);
});
folderLevel.add( params, 'level7').name('7').onChange( (value: boolean) => {
    filterObj('level', '7', value);
});
folderLevel.add( params, 'level8').name('8').onChange( (value: boolean) => {
    filterObj('level', '8', value);
});
folderLevel.add( params, 'level9').name('9').onChange( (value: boolean) => {
    filterObj('level', '9', value);
});
const folderRooms = gui.addFolder('Rooms');
folderRooms.open(false);
folderRooms.add( params, 'rooms2').name('2').onChange( (value: boolean) => {
    filterObj('rooms', '2', value);
});
folderRooms.add( params, 'rooms3').name('3').onChange( (value: boolean) => {
    filterObj('rooms', '3', value);
});
folderRooms.add( params, 'rooms4').name('4').onChange( (value: boolean) => {
    filterObj('rooms', '4', value);
});
folderRooms.add( params, 'rooms5').name('5').onChange( (value: boolean) => {
    filterObj('rooms', '5', value);
});
folderRooms.add( params, 'rooms6').name('6').onChange( (value: boolean) => {
    filterObj('rooms', '6', value);
});
folderRooms.add( params, 'rooms7').name('7').onChange( (value: boolean) => {
    filterObj('rooms', '7', value);
});


const initGUIValues = gui.save()
gui.open( true );

function getObjectsByProperty( object: THREE.Object3D, property: string | number, value: any, result : THREE.Object3D[] ) {

    if ( (object as THREE.Object3D).userData[ property ] === value ) result.push( object as THREE.Object3D );
  
    for ( let i = 0, l = object.children.length; i < l; i ++ ) {

        const child = object.children[ i ];

        getObjectsByProperty( child, property, value, result );

    }
   
  return result;
}

const models1 = [
{apname: "63, 2. 1", gltf: "models/63, 2. 1.glb", position: [0.03919, 0.469152, 0], scale: 0.001, entrance: "63", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/63-2-1.jpg", pdf: "floorplans/63-2-1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L54"},
{apname: "63, 2. 2", gltf: "models/63, 2. 2.glb", position: [0.95339, 0.526493, 0], scale: 0.001, entrance: "63", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/63-2-2.jpg", pdf: "floorplans/63-2-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L55"},
{apname: "63, 3. 1", gltf: "models/63, 3. 1.glb", position: [0.03919, 0.6203232, 0], scale: 0.001, entrance: "63", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/63-3-1.jpg", pdf: "floorplans/63-3-1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L54"},
{apname: "63, 3. 2", gltf: "models/63, 3. 2.glb", position: [0.95339, 0.677664, 0], scale: 0.001, entrance: "63", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/63-3-2.jpg", pdf: "floorplans/63-3-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L55"},
{apname: "63, 4. 1", gltf: "models/63, 4. 1.glb", position: [0.03919, 0.771494, 0], scale: 0.001, entrance: "63", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/63-4-1.jpg", pdf: "floorplans/63-4-1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L54"},
{apname: "63, 4. 2", gltf: "models/63, 4. 2.glb", position: [0.95339, 0.828835, 0], scale: 0.001, entrance: "63", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/63-4-2.jpg", pdf: "floorplans/63-4-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L55"},
{apname: "63, 5. P3", gltf: "models/63, 5. P3.glb", position: [-0.23139, 0.990432, -0.24074], scale: 0.001, entrance: "63", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/63-5-P3.jpg", pdf: "floorplans/63-5-P3.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P54"},
{apname: "63, 5. P4", gltf: "models/63, 5. P4.glb", position: [0.70959, 1.0112832, -0.24074], scale: 0.001, entrance: "63", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/63-5-P4.jpg", pdf: "floorplans/63-5-P4.pdf", rooms: "7", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P53"},
{apname: "63, 5. P5", gltf: "models/63, 5. P5.glb", position: [0.95339, 1.0269216, -0.24074], scale: 0.001, entrance: "63", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/63-5-P5.jpg", pdf: "floorplans/63-5-P5.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P01"},
{apname: "63, st. T1", gltf: "models/63, st. T1.glb", position: [0, 0.16681, -0.07801], scale: 0.001, entrance: "63", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/63-ST-T1.jpg", pdf: "floorplans/63-ST-T1.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T53"},
{apname: "63, st. T2", gltf: "models/63, st. T2.glb", position: [0.72998, 0.1980864, -0.07801], scale: 0.001, entrance: "63", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/63-ST-T2.jpg", pdf: "floorplans/63-ST-T2.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T02-C"},
{apname: "63, st. T3", gltf: "models/63, st. T3.glb", position: [0.96137, 0.208512, -0.07801], scale: 0.001, entrance: "63", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/63-ST-T3.jpg", pdf: "floorplans/63-ST-T3.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T01"},
{apname: "65, 2. 1", gltf: "models/65, 2. 1.glb", position: [1.42415, 0.5577696, 0], scale: 0.001, entrance: "65", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-2-1.jpg", pdf: "floorplans/65-2-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L07"},
{apname: "65, 2. 2", gltf: "models/65, 2. 2.glb", position: [1.19276, 0.526493, 0], scale: 0.001, entrance: "65", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-2-2.jpg", pdf: "floorplans/65-2-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L09-A"},
{apname: "65, 2. 3", gltf: "models/65, 2. 3.glb", position: [1.94281, 0.5838336, -0.35426], scale: 0.001, entrance: "65", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-2-3.jpg", pdf: "floorplans/65-2-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L06"},
{apname: "65, 2. 4", gltf: "models/65, 2. 4.glb", position: [1.87336, 0.5838336, 0], scale: 0.001, entrance: "65", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-2-4.jpg", pdf: "floorplans/65-2-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L05"},
{apname: "65, 3. 1", gltf: "models/65, 3. 1.glb", position: [1.42415, 0.7089408, 0], scale: 0.001, entrance: "65", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-3-1.jpg", pdf: "floorplans/65-3-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L07"},
{apname: "65, 3. 2", gltf: "models/65, 3. 2.glb", position: [1.19276, 0.677664, 0], scale: 0.001, entrance: "65", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-3-2.jpg", pdf: "floorplans/65-3-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L09-A"},
{apname: "65, 3. 3", gltf: "models/65, 3. 3.glb", position: [1.87336, 0.7350048, 0], scale: 0.001, entrance: "65", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-3-3.jpg", pdf: "floorplans/65-3-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L05"},
{apname: "65, 3. 4", gltf: "models/65, 3. 4.glb", position: [1.94281, 0.7350048, -0.35426], scale: 0.001, entrance: "65", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-3-4.jpg", pdf: "floorplans/65-3-4.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L06"},
{apname: "65, 4. 1", gltf: "models/65, 4. 1.glb", position: [1.42415, 0.860112, 0], scale: 0.001, entrance: "65", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-4-1.jpg", pdf: "floorplans/65-4-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L07"},
{apname: "65, 4. 2", gltf: "models/65, 4. 2.glb", position: [1.19276, 0.8288352, 0], scale: 0.001, entrance: "65", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-4-2.jpg", pdf: "floorplans/65-4-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L09-A"},
{apname: "65, 4. 3", gltf: "models/65, 4. 3.glb", position: [1.94281, 0.886176, -0.35426], scale: 0.001, entrance: "65", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-4-3.jpg", pdf: "floorplans/65-4-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L06"},
{apname: "65, 4. 4", gltf: "models/65, 4. 4.glb", position: [1.87336, 0.886176, 0], scale: 0.001, entrance: "65", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/65-4-4.jpg", pdf: "floorplans/65-4-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L05"},
{apname: "65, 5. P1", gltf: "models/65, 5. P1.glb", position: [1.18478, 1.04256, -0.24074], scale: 0.001, entrance: "65", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/65-5-P1.jpg", pdf: "floorplans/65-5-P1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P04"},
{apname: "65, 5. P2", gltf: "models/65, 5. P2.glb", position: [1.41617, 1.0581984, -0.24074], scale: 0.001, entrance: "65", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/65-5-P2.jpg", pdf: "floorplans/65-5-P2.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P02-s"},
{apname: "65, 5. P3", gltf: "models/65, 5. P3.glb", position: [1.86645, 1.0842624, -0.24074], scale: 0.001, entrance: "65", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/65-5-P3.jpg", pdf: "floorplans/65-5-P3.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P03-s"},
{apname: "65, 5. P4", gltf: "models/65, 5. P4.glb", position: [2.09784, 1.1051136, -0.24074], scale: 0.001, entrance: "65", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/65-5-P4.jpg", pdf: "floorplans/65-5-P4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
{apname: "65, 5. P5", gltf: "models/65, 5. P5.glb", position: [2.32923, 1.1155392, -0.24074], scale: 0.001, entrance: "65", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/65-5-P5.jpg", pdf: "floorplans/65-5-P5.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P04"},
{apname: "65, 6. P6", gltf: "models/65, 6. P6.glb", position: [2.56062, 1.1311776, -0.24074], scale: 0.001, entrance: "65", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/65-6-P6.jpg", pdf: "floorplans/65-6-P6.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P08"},
{apname: "65, st. T1", gltf: "models/65, st. T1.glb", position: [1.19276, 0.22415, -0.07801], scale: 0.001, entrance: "65", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/65-ST-T1.jpg", pdf: "floorplans/65-ST-T1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "65, st. T2", gltf: "models/65, st. T2.glb", position: [1.42415, 0.2397888, -0.07801], scale: 0.001, entrance: "65", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/65-ST-T2.jpg", pdf: "floorplans/65-ST-T2.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T02-As"},
{apname: "65, st. T3", gltf: "models/65, st. T3.glb", position: [1.87477, 0.2710656, -0.07801], scale: 0.001, entrance: "65", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/65-ST-T3.jpg", pdf: "floorplans/65-ST-T3.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T03-As"},
{apname: "65, st. T4", gltf: "models/65, st. T4.glb", position: [2.10616, 0.2814912, -0.07801], scale: 0.001, entrance: "65", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/65-ST-T4.jpg", pdf: "floorplans/65-ST-T4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "67, 1. T1", gltf: "models/67, 1. T1.glb", position: [2.33755, 0.2971296, -0.07801], scale: 0.001, entrance: "67", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/67-1-T1.jpg", pdf: "floorplans/67-1-T1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "67, 1. T2", gltf: "models/67, 1. T2.glb", position: [2.56894, 0.312768, -0.07801], scale: 0.001, entrance: "67", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/67-1-T2.jpg", pdf: "floorplans/67-1-T2.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T03"},
{apname: "67, 1. T3", gltf: "models/67, 1. T3.glb", position: [3.01907, 0.3440448, -0.07801], scale: 0.001, entrance: "67", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/67-1-T3.jpg", pdf: "floorplans/67-1-T3.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T02"},
{apname: "67, 1. T4", gltf: "models/67, 1. T4.glb", position: [3.25046, 0.3544704, -0.07801], scale: 0.001, entrance: "67", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/67-1-T4.jpg", pdf: "floorplans/67-1-T4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "67, 3. 1", gltf: "models/67, 3. 1.glb", position: [2.33755, 0.6151104, 0], scale: 0.001, entrance: "67", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-3-1.jpg", pdf: "floorplans/67-3-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L01"},
{apname: "67, 3. 2", gltf: "models/67, 3. 2.glb", position: [2.56894, 0.6151104, -0.23395], scale: 0.001, entrance: "67", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-3-2.jpg", pdf: "floorplans/67-3-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L03"},
{apname: "67, 3. 3", gltf: "models/67, 3. 3.glb", position: [3.25677, 0.6724512, 0], scale: 0.001, entrance: "67", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-3-3.jpg", pdf: "floorplans/67-3-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L09-Bs"},
{apname: "67, 4. 1", gltf: "models/67, 4. 1.glb", position: [2.33755, 0.7662816, 0], scale: 0.001, entrance: "67", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-4-1.jpg", pdf: "floorplans/67-4-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L01"},
{apname: "67, 4. 2", gltf: "models/67, 4. 2.glb", position: [2.56894, 0.7662816, -0.23395], scale: 0.001, entrance: "67", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-4-2.jpg", pdf: "floorplans/67-4-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L03"},
{apname: "67, 4. 3", gltf: "models/67, 4. 3.glb", position: [3.25677, 0.8236224, 0], scale: 0.001, entrance: "67", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-4-3.jpg", pdf: "floorplans/67-4-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L09-Cs"},
{apname: "67, 4. 4", gltf: "models/67, 4. 4.glb", position: [2.78716, 0.6463872, 0], scale: 0.001, entrance: "67", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-4-4.jpg", pdf: "floorplans/67-4-4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L02-E"},
{apname: "67, 5. 1", gltf: "models/67, 5. 1.glb", position: [2.33755, 0.9174528, 0], scale: 0.001, entrance: "67", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-5-1.jpg", pdf: "floorplans/67-5-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L01"},
{apname: "67, 5. 2", gltf: "models/67, 5. 2.glb", position: [2.56894, 0.9174528, -0.23395], scale: 0.001, entrance: "67", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-5-2.jpg", pdf: "floorplans/67-5-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L03"},
{apname: "67, 5. 3", gltf: "models/67, 5. 3.glb", position: [3.25677, 0.9747936, 0], scale: 0.001, entrance: "67", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-5-3.jpg", pdf: "floorplans/67-5-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L09-Bs"},
{apname: "67, 5. 4", gltf: "models/67, 5. 4.glb", position: [2.78716, 0.9487296, 0], scale: 0.001, entrance: "67", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/67-5-4.jpg", pdf: "floorplans/67-5-4.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L02"},
{apname: "69, 1. T1", gltf: "models/69, 1. T1.glb", position: [3.48185, 0.3701088, -0.07801], scale: 0.001, entrance: "69", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/69-1-T1.jpg", pdf: "floorplans/69-1-T1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "69, 1. T2", gltf: "models/69, 1. T2.glb", position: [3.71324, 0.3857472, -0.07801], scale: 0.001, entrance: "69", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/69-1-T2.jpg", pdf: "floorplans/69-1-T2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Townhouse", apcode: "T52"},
{apname: "69, 3. 1", gltf: "models/69, 3. 1.glb", position: [3.71324, 0.703728, 0], scale: 0.001, entrance: "69", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-3-1.jpg", pdf: "floorplans/69-3-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L52"},
{apname: "69, 3. 2", gltf: "models/69, 3. 2.glb", position: [3.48185, 0.6724512, 0], scale: 0.001, entrance: "69", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-3-2.jpg", pdf: "floorplans/69-3-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L53"},
{apname: "69, 4. 1", gltf: "models/69, 4. 1.glb", position: [3.71324, 0.8548992, 0], scale: 0.001, entrance: "69", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-4-1.jpg", pdf: "floorplans/69-4-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L52"},
{apname: "69, 4. 2", gltf: "models/69, 4. 2.glb", position: [3.48185, 0.8236224, 0], scale: 0.001, entrance: "69", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-4-2.jpg", pdf: "floorplans/69-4-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L53"},
{apname: "69, 5. 1", gltf: "models/69, 5. 1.glb", position: [3.71324, 1.0060704, 0], scale: 0.001, entrance: "69", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-5-1.jpg", pdf: "floorplans/69-5-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L52"},
{apname: "69, 5. 2", gltf: "models/69, 5. 2.glb", position: [3.48185, 0.9747936, 0], scale: 0.001, entrance: "69", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-5-2.jpg", pdf: "floorplans/69-5-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Apartment", apcode: "L53"},
{apname: "69, 6. P1", gltf: "models/69, 6. P1.glb", position: [2.79201, 1.1416032, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P1.jpg", pdf: "floorplans/69-6-P1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P09-B"},
{apname: "69, 6. P2", gltf: "models/69, 6. P2.glb", position: [3.0234, 1.1572416, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P2.jpg", pdf: "floorplans/69-6-P2.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P05-s"},
{apname: "69, 6. P3", gltf: "models/69, 6. P3.glb", position: [3.25479, 1.17288, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P3.jpg", pdf: "floorplans/69-6-P3.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
{apname: "69, 6. P4", gltf: "models/69, 6. P4.glb", position: [3.48618, 1.1885184, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P4.jpg", pdf: "floorplans/69-6-P4.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 1, objtype: "home", hometype:"Penthouse", apcode: "P51"},
]



const models2 = [
{apname: "69, 1. T3", gltf: "models/69, 1. T3.glb", position: [0, 0.4013856, -0.07801], scale: 0.001, entrance: "69", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/69-1-T3.jpg", pdf: "floorplans/69-1-T3.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T51"},
{apname: "69, 1. T4", gltf: "models/69, 1. T4.glb", position: [0.42805, 0.443088, -0.07801], scale: 0.001, entrance: "69", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/69-1-T4.jpg", pdf: "floorplans/69-1-T4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T50"},
{apname: "69, 3. 3", gltf: "models/69, 3. 3.glb", position: [0.52381, 0.7610688, -0.24838], scale: 0.001, entrance: "69", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-3-3.jpg", pdf: "floorplans/69-3-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L51"},
{apname: "69, 3. 4", gltf: "models/69, 3. 4.glb", position: [0.44122, 0.7610688, 0], scale: 0.001, entrance: "69", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-3-4.jpg", pdf: "floorplans/69-3-4.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L50"},
{apname: "69, 4. 3", gltf: "models/69, 4. 3.glb", position: [0.52381, 0.91224, -0.24838], scale: 0.001, entrance: "69", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-4-3.jpg", pdf: "floorplans/69-4-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L51"},
{apname: "69, 4. 4", gltf: "models/69, 4. 4.glb", position: [0.44122, 0.91224, 0], scale: 0.001, entrance: "69", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-4-4.jpg", pdf: "floorplans/69-4-4.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L50"},
{apname: "69, 5. 3", gltf: "models/69, 5. 3.glb", position: [0.52381, 1.0634112, -0.24838], scale: 0.001, entrance: "69", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-5-3.jpg", pdf: "floorplans/69-5-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L51"},
{apname: "69, 5. 4", gltf: "models/69, 5. 4.glb", position: [0.44122, 1.0634112, 0], scale: 0.001, entrance: "69", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/69-5-4.jpg", pdf: "floorplans/69-5-4.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L50"},
{apname: "69, 6. P10", gltf: "models/69, 6. P10.glb", position: [1.585, 1.3188384, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P10.jpg", pdf: "floorplans/69-6-P10.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P01"},
{apname: "69, 6. P5", gltf: "models/69, 6. P5.glb", position: [0.42805, 1.2458592, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P5.jpg", pdf: "floorplans/69-6-P5.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P50"},
{apname: "69, 6. P6", gltf: "models/69, 6. P6.glb", position: [0.65944, 1.2614976, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P6.jpg", pdf: "floorplans/69-6-P6.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
{apname: "69, 6. P7", gltf: "models/69, 6. P7.glb", position: [0.89083, 1.277136, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P7.jpg", pdf: "floorplans/69-6-P7.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P04"},
{apname: "69, 6. P8", gltf: "models/69, 6. P8.glb", position: [1.12222, 1.2875616, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P8.jpg", pdf: "floorplans/69-6-P8.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P08"},
{apname: "69, 6. P9", gltf: "models/69, 6. P9.glb", position: [1.35361, 1.3032, -0.24074], scale: 0.001, entrance: "69", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/69-6-P9.jpg", pdf: "floorplans/69-6-P9.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P09-B"},
{apname: "71, 1. T1", gltf: "models/71, 1. T1.glb", position: [0.65944, 0.4587264, -0.07801], scale: 0.001, entrance: "71", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/71-1-T1.jpg", pdf: "floorplans/71-1-T1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "71, 1. T2", gltf: "models/71, 1. T2.glb", position: [0.89083, 0.4743648, -0.07801], scale: 0.001, entrance: "71", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/71-1-T2.jpg", pdf: "floorplans/71-1-T2.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "71, 1. T3", gltf: "models/71, 1. T3.glb", position: [1.12222, 0.4900032, -0.07801], scale: 0.001, entrance: "71", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/71-1-T3.jpg", pdf: "floorplans/71-1-T3.pdf", rooms: "7", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T03-D"},
{apname: "71, 3. 1", gltf: "models/71, 3. 1.glb", position: [0.89083, 0.7923456, 0], scale: 0.001, entrance: "71", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-3-1.jpg", pdf: "floorplans/71-3-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L01"},
{apname: "72, 4. 4", gltf: "models/72, 4. 4.glb", position: [1.65582, 0.8496864, -0.38809], scale: 0.001, entrance: "72", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-4-4.jpg", pdf: "floorplans/72-4-4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L35"},
{apname: "71, 3. 2", gltf: "models/71, 3. 2.glb", position: [1.35361, 0.8184096, 0], scale: 0.001, entrance: "71", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-3-2.jpg", pdf: "floorplans/71-3-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L34"},
{apname: "71, 4. 1", gltf: "models/71, 4. 1.glb", position: [0.89083, 0.9435168, 0], scale: 0.001, entrance: "71", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-4-1.jpg", pdf: "floorplans/71-4-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L04"},
{apname: "71, 4. 2", gltf: "models/71, 4. 2.glb", position: [1.12222, 0.7923456, -0.2499], scale: 0.001, entrance: "71", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-4-2.jpg", pdf: "floorplans/71-4-2.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L03-A"},
{apname: "71, 4. 3", gltf: "models/71, 4. 3.glb", position: [1.65582, 1.0008576, -0.38809], scale: 0.001, entrance: "71", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-4-3.jpg", pdf: "floorplans/71-4-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L35-A"},
{apname: "71, 4. 4", gltf: "models/71, 4. 4.glb", position: [1.35361, 0.9695808, 0], scale: 0.001, entrance: "71", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-4-4.jpg", pdf: "floorplans/71-4-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L34-A"},
{apname: "71, 5. 1", gltf: "models/71, 5. 1.glb", position: [0.89083, 1.094688, 0], scale: 0.001, entrance: "71", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-5-1.jpg", pdf: "floorplans/71-5-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L01"},
{apname: "71, 5. 2", gltf: "models/71, 5. 2.glb", position: [1.12222, 1.094688, -0.2499], scale: 0.001, entrance: "71", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-5-2.jpg", pdf: "floorplans/71-5-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L03"},
{apname: "72, 6. 4", gltf: "models/72, 6. 4.glb", position: [1.65582, 1.1520288, -0.38809], scale: 0.001, entrance: "72", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-6-4.jpg", pdf: "floorplans/72-6-4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L35-B"},
{apname: "71, 5. 3", gltf: "models/71, 5. 3.glb", position: [1.35361, 1.120752, 0], scale: 0.001, entrance: "71", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/71-5-3.jpg", pdf: "floorplans/71-5-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L34-B"},
{apname: "72, 4. 2", gltf: "models/72, 4. 2.glb", position: [2.77449, 0.834048, -0.50483], scale: 0.001, entrance: "72", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-4-2.jpg", pdf: "floorplans/72-4-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L36"},
{apname: "72, 4. 3", gltf: "models/72, 4. 3.glb", position: [2.77449, 0.8027712, 0], scale: 0.001, entrance: "72", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-4-3.jpg", pdf: "floorplans/72-4-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L32"},
{apname: "72, 5. 2", gltf: "models/72, 5. 2.glb", position: [2.77449, 0.9852192, -0.50483], scale: 0.001, entrance: "72", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-5-2.jpg", pdf: "floorplans/72-5-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L36"},
{apname: "72, 5. 3", gltf: "models/72, 5. 3.glb", position: [2.77449, 0.9539424, 0], scale: 0.001, entrance: "72", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-5-3.jpg", pdf: "floorplans/72-5-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L32"},
{apname: "72, 6. 2", gltf: "models/72, 6. 2.glb", position: [2.77449, 1.1363904, -0.50483], scale: 0.001, entrance: "72", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-6-2.jpg", pdf: "floorplans/72-6-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L36"},
{apname: "72, 6. 3", gltf: "models/72, 6. 3.glb", position: [2.77449, 1.1051136, 0], scale: 0.001, entrance: "72", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-6-3.jpg", pdf: "floorplans/72-6-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L32"},
{apname: "74, 1. T1", gltf: "models/74, 1. T1.glb", position: [2.76317, 0.5004288, -0.07801], scale: 0.001, entrance: "74", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/74-1-T1.jpg", pdf: "floorplans/74-1-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T01"},
{apname: "74, 1. T2", gltf: "models/74, 1. T2.glb", position: [2.99456, 0.4900032, -0.07801], scale: 0.001, entrance: "74", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/74-1-T2.jpg", pdf: "floorplans/74-1-T2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "74, 1. T3", gltf: "models/74, 1. T3.glb", position: [3.22595, 0.4743648, -0.07801], scale: 0.001, entrance: "74", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/74-1-T3.jpg", pdf: "floorplans/74-1-T3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "74, 1. T4", gltf: "models/74, 1. T4.glb", position: [3.45734, 0.4587264, -0.07801], scale: 0.001, entrance: "74", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/74-1-T4.jpg", pdf: "floorplans/74-1-T4.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T04-As"},
{apname: "74, 3. 1", gltf: "models/74, 3. 1.glb", position: [3.22595, 0.7767072, 0], scale: 0.001, entrance: "74", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-3-1.jpg", pdf: "floorplans/74-3-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L05-Cs"},
{apname: "74, 3. 2", gltf: "models/74, 3. 2.glb", position: [3.45734, 0.7714944, -0.51952], scale: 0.001, entrance: "74", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-3-2.jpg", pdf: "floorplans/74-3-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L31"},
{apname: "74, 4. 1", gltf: "models/74, 4. 1.glb", position: [3.22595, 0.9278784, 0], scale: 0.001, entrance: "74", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-4-1.jpg", pdf: "floorplans/74-4-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L05-Cs"},
{apname: "74, 4. 2", gltf: "models/74, 4. 2.glb", position: [3.45734, 0.9278784, -0.51952], scale: 0.001, entrance: "74", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-4-2.jpg", pdf: "floorplans/74-4-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L31"},
{apname: "74, 5. 1", gltf: "models/74, 5. 1.glb", position: [3.22595, 1.0790496, 0], scale: 0.001, entrance: "74", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-5-1.jpg", pdf: "floorplans/74-5-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L05-Cs"},
{apname: "74, 5. 2", gltf: "models/74, 5. 2.glb", position: [3.45734, 1.0790496, -0.51952], scale: 0.001, entrance: "74", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-5-2.jpg", pdf: "floorplans/74-5-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L31"},
{apname: "74, 6. 1", gltf: "models/74, 6. 1.glb", position: [3.45734, 1.2302208, -0.50674], scale: 0.001, entrance: "74", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-6-1.jpg", pdf: "floorplans/74-6-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Apartment", apcode: "L31-A"},
{apname: "74, 6. P1", gltf: "models/74, 6. P1.glb", position: [2.76317, 1.3657536, -0.24074], scale: 0.001, entrance: "74", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-6-P1.jpg", pdf: "floorplans/74-6-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P01"},
{apname: "74, 6. P2", gltf: "models/74, 6. P2.glb", position: [2.99456, 1.3761792, -0.24074], scale: 0.001, entrance: "74", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-6-P2.jpg", pdf: "floorplans/74-6-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
{apname: "74, 6. P3", gltf: "models/74, 6. P3.glb", position: [3.22595, 1.3918176, -0.24074], scale: 0.001, entrance: "74", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-6-P3.jpg", pdf: "floorplans/74-6-P3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P04"},
{apname: "74, 6. P4", gltf: "models/74, 6. P4.glb", position: [3.45734, 1.407456, -0.24074], scale: 0.001, entrance: "74", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-6-P4.jpg", pdf: "floorplans/74-6-P4.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Penthouse", apcode: "P04-A"},
{apname: "72, 2. T4", gltf: "models/72, 2. T4.glb", position: [2.51198, 0.6516, -0.07801], scale: 0.001, entrance: "72", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/72-2-T4.jpg", pdf: "floorplans/72-2-T4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T32"},
{apname: "72, 2. T5", gltf: "models/72, 2. T5.glb", position: [2.62656, 0.5004288, -0.07801], scale: 0.001, entrance: "72", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/72-2-T5.jpg", pdf: "floorplans/72-2-T5.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 2, objtype: "home", hometype:"Townhouse", apcode: "T33"},
]

const models3 = [
{apname: "74, 1. T5", gltf: "models/74, 1. T5.glb", position: [0, 0.4587264, -0.07801], scale: 0.001, entrance: "74", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/74-1-T5.jpg", pdf: "floorplans/74-1-T5.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T30"},
{apname: "74, 1. T6", gltf: "models/74, 1. T6.glb", position: [0.009872, 0.4587264, -0.07801], scale: 0.001, entrance: "74", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/74-1-T6.jpg", pdf: "floorplans/74-1-T6.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "74, 3. 3", gltf: "models/74, 3. 3.glb", position: [-0.033948, 0.7767072, 0], scale: 0.001, entrance: "74", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-3-3.jpg", pdf: "floorplans/74-3-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L30"},
{apname: "74, 4. 3", gltf: "models/74, 4. 3.glb", position: [-0.033948, 0.9278784, 0], scale: 0.001, entrance: "74", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-4-3.jpg", pdf: "floorplans/74-4-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L30"},
{apname: "74, 5. 3", gltf: "models/74, 5. 3.glb", position: [-0.033948, 1.0790496, 0], scale: 0.001, entrance: "74", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-5-3.jpg", pdf: "floorplans/74-5-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L30"},
{apname: "74, 6. 2", gltf: "models/74, 6. 2.glb", position: [-0.033948, 1.2302208, 0], scale: 0.001, entrance: "74", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/74-6-2.jpg", pdf: "floorplans/74-6-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L30"},
{apname: "74, 7. P10", gltf: "models/74, 7. P10.glb", position: [0.704042, 1.4387328, -0.24074], scale: 0.001, entrance: "74", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-7-P10.jpg", pdf: "floorplans/74-7-P10.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P09-C"},
{apname: "74, 7. P5", gltf: "models/74, 7. P5.glb", position: [-0.176808, 1.4126688, -0.24074], scale: 0.001, entrance: "74", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-7-P5.jpg", pdf: "floorplans/74-7-P5.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P30"},
{apname: "74, 7. P6", gltf: "models/74, 7. P6.glb", position: [0.00987199999999999, 1.4126688, -0.24074], scale: 0.001, entrance: "74", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-7-P6.jpg", pdf: "floorplans/74-7-P6.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P31"},
{apname: "74, 7. P7", gltf: "models/74, 7. P7.glb", position: [0.00987199999999999, 1.4230944, -0.24074], scale: 0.001, entrance: "74", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-7-P7.jpg", pdf: "floorplans/74-7-P7.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
{apname: "74, 7. P8", gltf: "models/74, 7. P8.glb", position: [0.241262, 1.4283072, -0.24074], scale: 0.001, entrance: "74", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-7-P8.jpg", pdf: "floorplans/74-7-P8.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P04"},
{apname: "74, 7. P9", gltf: "models/74, 7. P9.glb", position: [0.472652, 1.4387328, -0.24074], scale: 0.001, entrance: "74", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/74-7-P9.jpg", pdf: "floorplans/74-7-P9.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P08-B"},
{apname: "76, 1. T1", gltf: "models/76, 1. T1.glb", position: [0.241262, 0.443088, -0.07801], scale: 0.001, entrance: "76", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/76-1-T1.jpg", pdf: "floorplans/76-1-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "76, 1. T2", gltf: "models/76, 1. T2.glb", position: [0.472652, 0.4274496, -0.07801], scale: 0.001, entrance: "76", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/76-1-T2.jpg", pdf: "floorplans/76-1-T2.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T03-A"},
{apname: "76, 1. T3", gltf: "models/76, 1. T3.glb", position: [0.923992, 0.4013856, -0.07801], scale: 0.001, entrance: "76", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/76-1-T3.jpg", pdf: "floorplans/76-1-T3.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T02-A"},
{apname: "76, 1. T4", gltf: "models/76, 1. T4.glb", position: [1.155382, 0.3857472, -0.07801], scale: 0.001, entrance: "76", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/76-1-T4.jpg", pdf: "floorplans/76-1-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "76, 3. 1", gltf: "models/76, 3. 1.glb", position: [0.241262, 0.7454304, 0], scale: 0.001, entrance: "76", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-3-1.jpg", pdf: "floorplans/76-3-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "76, 3. 2", gltf: "models/76, 3. 2.glb", position: [0.472652, 0.7454304, -0.35501], scale: 0.001, entrance: "76", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-3-2.jpg", pdf: "floorplans/76-3-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "76, 3. 3", gltf: "models/76, 3. 3.glb", position: [1.155382, 0.6880896, 0], scale: 0.001, entrance: "76", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-3-3.jpg", pdf: "floorplans/76-3-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "76, 3. 4", gltf: "models/76, 3. 4.glb", position: [0.704042, 0.7193664, 0], scale: 0.001, entrance: "76", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-3-4.jpg", pdf: "floorplans/76-3-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "76, 4. 1", gltf: "models/76, 4. 1.glb", position: [0.241262, 0.8966016, 0], scale: 0.001, entrance: "76", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-4-1.jpg", pdf: "floorplans/76-4-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "76, 4. 2", gltf: "models/76, 4. 2.glb", position: [0.472652, 0.8966016, -0.35501], scale: 0.001, entrance: "76", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-4-2.jpg", pdf: "floorplans/76-4-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "76, 4. 3", gltf: "models/76, 4. 3.glb", position: [1.155382, 0.8392608, 0], scale: 0.001, entrance: "76", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-4-3.jpg", pdf: "floorplans/76-4-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "76, 4. 4", gltf: "models/76, 4. 4.glb", position: [0.704042, 0.8705376, 0], scale: 0.001, entrance: "76", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-4-4.jpg", pdf: "floorplans/76-4-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "76, 5. 1", gltf: "models/76, 5. 1.glb", position: [0.241262, 1.0477728, 0], scale: 0.001, entrance: "76", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-5-1.jpg", pdf: "floorplans/76-5-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "76, 5. 2", gltf: "models/76, 5. 2.glb", position: [0.472652, 1.0477728, -0.35501], scale: 0.001, entrance: "76", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-5-2.jpg", pdf: "floorplans/76-5-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "76, 5. 3", gltf: "models/76, 5. 3.glb", position: [1.155382, 0.990432, 0], scale: 0.001, entrance: "76", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-5-3.jpg", pdf: "floorplans/76-5-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "76, 5. 4", gltf: "models/76, 5. 4.glb", position: [0.704042, 1.0217088, 0], scale: 0.001, entrance: "76", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-5-4.jpg", pdf: "floorplans/76-5-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "76, 6. 1", gltf: "models/76, 6. 1.glb", position: [0.241262, 1.198944, 0], scale: 0.001, entrance: "76", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-6-1.jpg", pdf: "floorplans/76-6-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "76, 6. 2", gltf: "models/76, 6. 2.glb", position: [0.472652, 1.198944, -0.35501], scale: 0.001, entrance: "76", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-6-2.jpg", pdf: "floorplans/76-6-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "76, 6. 3", gltf: "models/76, 6. 3.glb", position: [1.155382, 1.1416032, 0], scale: 0.001, entrance: "76", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-6-3.jpg", pdf: "floorplans/76-6-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "76, 6. 4", gltf: "models/76, 6. 4.glb", position: [0.704042, 1.17288, 0], scale: 0.001, entrance: "76", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/76-6-4.jpg", pdf: "floorplans/76-6-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "78, 1. T1", gltf: "models/78, 1. T1.glb", position: [1.386772, 0.3701088, -0.07801], scale: 0.001, entrance: "78", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/78-1-T1.jpg", pdf: "floorplans/78-1-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "78, 1. T2", gltf: "models/78, 1. T2.glb", position: [1.618162, 0.3544704, -0.07801], scale: 0.001, entrance: "78", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/78-1-T2.jpg", pdf: "floorplans/78-1-T2.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T02-Is"},
{apname: "78, 1. T3", gltf: "models/78, 1. T3.glb", position: [2.068042, 0.3284064, -0.07801], scale: 0.001, entrance: "78", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/78-1-T3.jpg", pdf: "floorplans/78-1-T3.pdf", rooms: "7", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T03-Hs"},
{apname: "78, 1. T4", gltf: "models/78, 1. T4.glb", position: [2.299432, 0.312768, -0.07801], scale: 0.001, entrance: "78", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/78-1-T4.jpg", pdf: "floorplans/78-1-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "78, 3. 1", gltf: "models/78, 3. 1.glb", position: [1.386772, 0.6880896, 0], scale: 0.001, entrance: "78", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-3-1.jpg", pdf: "floorplans/78-3-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-B"},
{apname: "78, 3. 2", gltf: "models/78, 3. 2.glb", position: [2.068042, 0.6307488, 0], scale: 0.001, entrance: "78", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-3-2.jpg", pdf: "floorplans/78-3-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L01-s"},
{apname: "78, 4. 1", gltf: "models/78, 4. 1.glb", position: [1.618162, 0.6568128, 0], scale: 0.001, entrance: "78", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-4-1.jpg", pdf: "floorplans/78-4-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L02-Es"},
{apname: "78, 4. 2", gltf: "models/78, 4. 2.glb", position: [1.386772, 0.8392608, 0], scale: 0.001, entrance: "78", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-4-2.jpg", pdf: "floorplans/78-4-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-C"},
{apname: "78, 4. 3", gltf: "models/78, 4. 3.glb", position: [2.150832, 0.6307488, -0.23806], scale: 0.001, entrance: "78", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-4-3.jpg", pdf: "floorplans/78-4-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L03-As"},
{apname: "78, 4. 4", gltf: "models/78, 4. 4.glb", position: [2.068042, 0.78192, 0], scale: 0.001, entrance: "78", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-4-4.jpg", pdf: "floorplans/78-4-4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L04-s"},
{apname: "78, 5. 1", gltf: "models/78, 5. 1.glb", position: [1.386772, 0.990432, 0], scale: 0.001, entrance: "78", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-5-1.jpg", pdf: "floorplans/78-5-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-B"},
{apname: "78, 5. 2", gltf: "models/78, 5. 2.glb", position: [2.068042, 0.9330912, 0], scale: 0.001, entrance: "78", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-5-2.jpg", pdf: "floorplans/78-5-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L01-s"},
{apname: "78, 6. 1", gltf: "models/78, 6. 1.glb", position: [1.618162, 0.9591552, 0], scale: 0.001, entrance: "78", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-6-1.jpg", pdf: "floorplans/78-6-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L02-Es"},
{apname: "78, 6. 2", gltf: "models/78, 6. 2.glb", position: [1.386772, 1.1416032, 0], scale: 0.001, entrance: "78", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-6-2.jpg", pdf: "floorplans/78-6-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-C"},
{apname: "78, 6. 3", gltf: "models/78, 6. 3.glb", position: [2.150832, 0.9330912, -0.23806], scale: 0.001, entrance: "78", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-6-3.jpg", pdf: "floorplans/78-6-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L03-As"},
{apname: "78, 6. 4", gltf: "models/78, 6. 4.glb", position: [2.068042, 1.0842624, 0], scale: 0.001, entrance: "78", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-6-4.jpg", pdf: "floorplans/78-6-4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L04-s"},
{apname: "78, 7. 1", gltf: "models/78, 7. 1.glb", position: [1.618162, 1.2614976, 0], scale: 0.001, entrance: "78", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-7-1.jpg", pdf: "floorplans/78-7-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L02-s"},
{apname: "78, 7. 2", gltf: "models/78, 7. 2.glb", position: [1.385352, 1.2927744, -0.23746], scale: 0.001, entrance: "78", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-7-2.jpg", pdf: "floorplans/78-7-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L105"},
{apname: "78, 7. 3", gltf: "models/78, 7. 3.glb", position: [2.150832, 1.2354336, -0.23806], scale: 0.001, entrance: "78", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-7-3.jpg", pdf: "floorplans/78-7-3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L03-s"},
{apname: "78, 7. 4", gltf: "models/78, 7. 4.glb", position: [2.068042, 1.2354336, 0], scale: 0.001, entrance: "78", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/78-7-4.jpg", pdf: "floorplans/78-7-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L01-s"},
{apname: "78, 7. P1", gltf: "models/78, 7. P1.glb", position: [0.935432, 1.4491584, -0.24074], scale: 0.001, entrance: "78", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/78-7-P1.jpg", pdf: "floorplans/78-7-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P05-s"},
{apname: "78, 7. P2", gltf: "models/78, 7. P2.glb", position: [1.166822, 1.459584, -0.24074], scale: 0.001, entrance: "78", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/78-7-P2.jpg", pdf: "floorplans/78-7-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
{apname: "78, 8. P3", gltf: "models/78, 8. P3.glb", position: [1.398212, 1.4647968, -0.24074], scale: 0.001, entrance: "78", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/78-8-P3.jpg", pdf: "floorplans/78-8-P3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P04"},
{apname: "78, 8. P4", gltf: "models/78, 8. P4.glb", position: [1.629602, 1.4752224, -0.24074], scale: 0.001, entrance: "78", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/78-8-P4.jpg", pdf: "floorplans/78-8-P4.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P02-Bs"},
{apname: "78, 8. P5", gltf: "models/78, 8. P5.glb", position: [2.079252, 1.485648, -0.24074], scale: 0.001, entrance: "78", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/78-8-P5.jpg", pdf: "floorplans/78-8-P5.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P03-As"},
{apname: "78, 8. P6", gltf: "models/78, 8. P6.glb", position: [2.310642, 1.4960736, -0.24074], scale: 0.001, entrance: "78", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/78-8-P6.jpg", pdf: "floorplans/78-8-P6.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
{apname: "78, 8. P7", gltf: "models/78, 8. P7.glb", position: [2.542032, 1.5012864, -0.24074], scale: 0.001, entrance: "78", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/78-8-P7.jpg", pdf: "floorplans/78-8-P7.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P04"},
{apname: "78, 9. P8", gltf: "models/78, 9. P8.glb", position: [2.773422, 1.511712, -0.24074], scale: 0.001, entrance: "78", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/78-9-P8.jpg", pdf: "floorplans/78-9-P8.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P08-B"},
{apname: "80, 2. 1", gltf: "models/80, 2. 1.glb", position: [2.530822, 0.599472, 0], scale: 0.001, entrance: "80", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-2-1.jpg", pdf: "floorplans/80-2-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "80, 2. 2", gltf: "models/80, 2. 2.glb", position: [2.762212, 0.599472, -0.3409], scale: 0.001, entrance: "80", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-2-2.jpg", pdf: "floorplans/80-2-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "80, 2. 3", gltf: "models/80, 2. 3.glb", position: [3.444942, 0.5421312, 0], scale: 0.001, entrance: "80", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-2-3.jpg", pdf: "floorplans/80-2-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "80, 2. 4", gltf: "models/80, 2. 4.glb", position: [2.993602, 0.573408, 0], scale: 0.001, entrance: "80", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-2-4.jpg", pdf: "floorplans/80-2-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "80, 3. 1", gltf: "models/80, 3. 1.glb", position: [2.530822, 0.7506432, 0], scale: 0.001, entrance: "80", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-3-1.jpg", pdf: "floorplans/80-3-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "80, 3. 2", gltf: "models/80, 3. 2.glb", position: [2.762212, 0.7506432, -0.3409], scale: 0.001, entrance: "80", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-3-2.jpg", pdf: "floorplans/80-3-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "80, 3. 3", gltf: "models/80, 3. 3.glb", position: [3.444942, 0.6933024, 0], scale: 0.001, entrance: "80", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-3-3.jpg", pdf: "floorplans/80-3-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "80, 3. 4", gltf: "models/80, 3. 4.glb", position: [2.993602, 0.7193664, 0], scale: 0.001, entrance: "80", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-3-4.jpg", pdf: "floorplans/80-3-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "80, 4. 1", gltf: "models/80, 4. 1.glb", position: [2.530822, 0.9018144, 0], scale: 0.001, entrance: "80", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-4-1.jpg", pdf: "floorplans/80-4-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "80, 4. 2", gltf: "models/80, 4. 2.glb", position: [2.762212, 0.9018144, -0.3409], scale: 0.001, entrance: "80", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-4-2.jpg", pdf: "floorplans/80-4-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "80, 4. 3", gltf: "models/80, 4. 3.glb", position: [3.444942, 0.8444736, 0], scale: 0.001, entrance: "80", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-4-3.jpg", pdf: "floorplans/80-4-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "80, 4. 4", gltf: "models/80, 4. 4.glb", position: [2.993602, 0.8757504, 0], scale: 0.001, entrance: "80", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-4-4.jpg", pdf: "floorplans/80-4-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "80, 5. 1", gltf: "models/80, 5. 1.glb", position: [2.530822, 1.0529856, 0], scale: 0.001, entrance: "80", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-5-1.jpg", pdf: "floorplans/80-5-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "80, 5. 2", gltf: "models/80, 5. 2.glb", position: [2.762212, 1.0529856, -0.3409], scale: 0.001, entrance: "80", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-5-2.jpg", pdf: "floorplans/80-5-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "80, 5. 3", gltf: "models/80, 5. 3.glb", position: [3.444942, 0.9956448, 0], scale: 0.001, entrance: "80", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-5-3.jpg", pdf: "floorplans/80-5-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "80, 5. 4", gltf: "models/80, 5. 4.glb", position: [2.993602, 1.0269216, 0], scale: 0.001, entrance: "80", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-5-4.jpg", pdf: "floorplans/80-5-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "80, 6. 1", gltf: "models/80, 6. 1.glb", position: [2.530822, 1.2041568, 0], scale: 0.001, entrance: "80", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-6-1.jpg", pdf: "floorplans/80-6-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
{apname: "80, 6. 2", gltf: "models/80, 6. 2.glb", position: [2.762212, 1.2041568, -0.3409], scale: 0.001, entrance: "80", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-6-2.jpg", pdf: "floorplans/80-6-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
{apname: "80, 6. 3", gltf: "models/80, 6. 3.glb", position: [3.444942, 1.146816, 0], scale: 0.001, entrance: "80", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-6-3.jpg", pdf: "floorplans/80-6-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "80, 6. 4", gltf: "models/80, 6. 4.glb", position: [2.993602, 1.1780928, 0], scale: 0.001, entrance: "80", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-6-4.jpg", pdf: "floorplans/80-6-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "80, 7. 1", gltf: "models/80, 7. 1.glb", position: [2.762212, 1.355328, -0.3409], scale: 0.001, entrance: "80", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-7-1.jpg", pdf: "floorplans/80-7-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L06-Fs"},
{apname: "80, 7. 2", gltf: "models/80, 7. 2.glb", position: [3.444942, 1.2979872, 0], scale: 0.001, entrance: "80", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-7-2.jpg", pdf: "floorplans/80-7-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
{apname: "80, 7. 3", gltf: "models/80, 7. 3.glb", position: [2.993602, 1.329264, 0], scale: 0.001, entrance: "80", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/80-7-3.jpg", pdf: "floorplans/80-7-3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
{apname: "80, st. T1", gltf: "models/80, st. T1.glb", position: [2.530822, 0.2971296, -0.07801], scale: 0.001, entrance: "80", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/80-ST-T1.jpg", pdf: "floorplans/80-ST-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "80, st. T2", gltf: "models/80, st. T2.glb", position: [2.762212, 0.2814912, -0.07801], scale: 0.001, entrance: "80", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/80-ST-T2.jpg", pdf: "floorplans/80-ST-T2.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T03-A"},
{apname: "80, st. T3", gltf: "models/80, st. T3.glb", position: [3.213552, 0.2554272, -0.07801], scale: 0.001, entrance: "80", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/80-ST-T3.jpg", pdf: "floorplans/80-ST-T3.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T02-A"},
{apname: "80, st. T4", gltf: "models/80, st. T4.glb", position: [3.444942, 0.2397888, -0.07801], scale: 0.001, entrance: "80", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/80-ST-T4.jpg", pdf: "floorplans/80-ST-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "82, 2. 1", gltf: "models/82, 2. 1.glb", position: [3.907722, 0.5108544, 0], scale: 0.001, entrance: "82", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-2-1.jpg", pdf: "floorplans/82-2-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L15"},
{apname: "82, 2. 2", gltf: "models/82, 2. 2.glb", position: [3.676332, 0.5421312, 0], scale: 0.001, entrance: "82", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-2-2.jpg", pdf: "floorplans/82-2-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09"},
{apname: "82, 3. 1", gltf: "models/82, 3. 1.glb", position: [3.907722, 0.6620256, 0], scale: 0.001, entrance: "82", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-3-1.jpg", pdf: "floorplans/82-3-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L15"},
{apname: "82, 3. 2", gltf: "models/82, 3. 2.glb", position: [3.676332, 0.6933024, 0], scale: 0.001, entrance: "82", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-3-2.jpg", pdf: "floorplans/82-3-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09"},
{apname: "82, 4. 1", gltf: "models/82, 4. 1.glb", position: [3.907722, 0.8131968, 0], scale: 0.001, entrance: "82", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-4-1.jpg", pdf: "floorplans/82-4-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L15"},
{apname: "82, 4. 2", gltf: "models/82, 4. 2.glb", position: [3.676332, 0.8444736, 0], scale: 0.001, entrance: "82", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-4-2.jpg", pdf: "floorplans/82-4-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09"},
{apname: "82, 5. 1", gltf: "models/82, 5. 1.glb", position: [3.907722, 0.964368, 0], scale: 0.001, entrance: "82", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-5-1.jpg", pdf: "floorplans/82-5-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L15"},
{apname: "82, 5. 2", gltf: "models/82, 5. 2.glb", position: [3.676332, 0.9956448, 0], scale: 0.001, entrance: "82", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-5-2.jpg", pdf: "floorplans/82-5-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09"},
{apname: "82, 6. 1", gltf: "models/82, 6. 1.glb", position: [3.907722, 1.1155392, 0], scale: 0.001, entrance: "82", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-6-1.jpg", pdf: "floorplans/82-6-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L15"},
{apname: "82, 6. 2", gltf: "models/82, 6. 2.glb", position: [3.676332, 1.146816, 0], scale: 0.001, entrance: "82", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-6-2.jpg", pdf: "floorplans/82-6-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09"},
{apname: "82, 7. 1", gltf: "models/82, 7. 1.glb", position: [3.907722, 1.2667104, 0], scale: 0.001, entrance: "82", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-7-1.jpg", pdf: "floorplans/82-7-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L15"},
{apname: "82, 7. 2", gltf: "models/82, 7. 2.glb", position: [3.676332, 1.2979872, 0], scale: 0.001, entrance: "82", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-7-2.jpg", pdf: "floorplans/82-7-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L09"},
{apname: "82, 9. P1", gltf: "models/82, 9. P1.glb", position: [3.004812, 1.5169248, -0.24074], scale: 0.001, entrance: "82", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/82-9-P1.jpg", pdf: "floorplans/82-9-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P09"},
{apname: "82, 9. P2", gltf: "models/82, 9. P2.glb", position: [3.236202, 1.5221376, -0.24074], scale: 0.001, entrance: "82", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/82-9-P2.jpg", pdf: "floorplans/82-9-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P05-s"},
{apname: "82, 9. P3", gltf: "models/82, 9. P3.glb", position: [3.467592, 1.5325632, -0.24074], scale: 0.001, entrance: "82", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/82-9-P3.jpg", pdf: "floorplans/82-9-P3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
{apname: "82, 9. P4", gltf: "models/82, 9. P4.glb", position: [3.698982, 1.537776, -0.24074], scale: 0.001, entrance: "82", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/82-9-P4.jpg", pdf: "floorplans/82-9-P4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P04"},
{apname: "82, 9. P5", gltf: "models/82, 9. P5.glb", position: [3.930372, 1.5429888, -0.24074], scale: 0.001, entrance: "82", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/82-9-P5.jpg", pdf: "floorplans/82-9-P5.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P19"},
{apname: "82, st. T1", gltf: "models/82, st. T1.glb", position: [3.676332, 0.2241504, -0.07801], scale: 0.001, entrance: "82", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/82-ST-T1.jpg", pdf: "floorplans/82-ST-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "82, st. T2", gltf: "models/82, st. T2.glb", position: [3.907722, 0.208512, -0.07801], scale: 0.001, entrance: "82", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/82-ST-T2.jpg", pdf: "floorplans/82-ST-T2.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T01-Bs"},
{apname: "82, 2. 3", gltf: "models/82, 2. 3.glb", position: [4.125942, 0.4535136, -0.50847], scale: 0.001, entrance: "82", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-2-3.jpg", pdf: "floorplans/82-2-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L14"},
{apname: "82, 3. 3", gltf: "models/82, 3. 3.glb", position: [4.125942, 0.6046848, -0.50847], scale: 0.001, entrance: "82", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-3-3.jpg", pdf: "floorplans/82-3-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L14"},
{apname: "82, 4. 3", gltf: "models/82, 4. 3.glb", position: [4.125942, 0.755856, -0.50847], scale: 0.001, entrance: "82", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-4-3.jpg", pdf: "floorplans/82-4-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L14"},
{apname: "82, 5. 3", gltf: "models/82, 5. 3.glb", position: [4.125942, 0.9070272, -0.50847], scale: 0.001, entrance: "82", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-5-3.jpg", pdf: "floorplans/82-5-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L14"},
{apname: "82, 6. 3", gltf: "models/82, 6. 3.glb", position: [4.125942, 1.0581984, -0.50847], scale: 0.001, entrance: "82", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-6-3.jpg", pdf: "floorplans/82-6-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L14"},
{apname: "82, 9. P7", gltf: "models/82, 9. P7.glb", position: [4.161762, 1.5534144, -0.48594], scale: 0.001, entrance: "82", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/82-9-P7.jpg", pdf: "floorplans/82-9-P7.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Penthouse", apcode: "P18"},
{apname: "82, st. T4", gltf: "models/82, st. T4.glb", position: [4.139112, 0.1511712, -0.50585], scale: 0.001, entrance: "82", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/82-ST-T4.jpg", pdf: "floorplans/82-ST-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Townhouse", apcode: "T13"},
{apname: "82, 7. 3", gltf: "models/82, 7. 3.glb", position: [4.125942, 1.2093696, -0.50847], scale: 0.001, entrance: "82", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-7-3.jpg", pdf: "floorplans/82-7-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 3, objtype: "home", hometype:"Apartment", apcode: "L14-A"},
]

const models4 = 
[
{apname: "82, 2. 4", gltf: "models/82, 2. 4.glb", position: [0, 0.4274496, -0.23004], scale: 0.001, entrance: "82", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-2-4.jpg", pdf: "floorplans/82-2-4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L16"},
{apname: "82, 3. 4", gltf: "models/82, 3. 4.glb", position: [0, 0.5786208, -0.23004], scale: 0.001, entrance: "82", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-3-4.jpg", pdf: "floorplans/82-3-4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L16"},
{apname: "82, 4. 4", gltf: "models/82, 4. 4.glb", position: [0, 0.729792, -0.23004], scale: 0.001, entrance: "82", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-4-4.jpg", pdf: "floorplans/82-4-4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L16"},
{apname: "82, 5. 4", gltf: "models/82, 5. 4.glb", position: [0, 0.8809632, -0.23004], scale: 0.001, entrance: "82", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-5-4.jpg", pdf: "floorplans/82-5-4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L16"},
{apname: "82, 6. 4", gltf: "models/82, 6. 4.glb", position: [0, 1.0321344, -0.23004], scale: 0.001, entrance: "82", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-6-4.jpg", pdf: "floorplans/82-6-4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L16"},
{apname: "82, 7. 4", gltf: "models/82, 7. 4.glb", position: [0, 1.1780928, -0.23004], scale: 0.001, entrance: "82", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-7-4.jpg", pdf: "floorplans/82-7-4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L16-B"},
{apname: "82, 8. 1", gltf: "models/82, 8. 1.glb", position: [0, 1.3344768, -0.23004], scale: 0.001, entrance: "82", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/82-8-1.jpg", pdf: "floorplans/82-8-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L16-A"},
{apname: "82, 9. P6", gltf: "models/82, 9. P6.glb", position: [0.08843, 1.5534144, 0.13], scale: 0.001, entrance: "82", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/82-9-P6.jpg", pdf: "floorplans/82-9-P6.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P17"},
{apname: "82, 9. P8", gltf: "models/82, 9. P8.glb", position: [0.31137, 1.5534144, 0.13], scale: 0.001, entrance: "82", level: "9",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/82-9-P8.jpg", pdf: "floorplans/82-9-P8.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P16"},
{apname: "82, st. T3", gltf: "models/82, st. T3.glb", position: [0.10598, 0.1511712, -0.07801], scale: 0.001, entrance: "82", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/82-ST-T3.jpg", pdf: "floorplans/82-ST-T3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T14"},
{apname: "84, 2. 1", gltf: "models/84, 2. 1.glb", position: [0.54276, 0.4274496, 0], scale: 0.001, entrance: "84", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-2-1.jpg", pdf: "floorplans/84-2-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L09-Ds"},
{apname: "84, 2. 2", gltf: "models/84, 2. 2.glb", position: [0.77415, 0.3961728, -0.3411], scale: 0.001, entrance: "84", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-2-2.jpg", pdf: "floorplans/84-2-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L12"},
{apname: "84, 2. 3", gltf: "models/84, 2. 3.glb", position: [1.4434, 0.3961728, 0], scale: 0.001, entrance: "84", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-2-3.jpg", pdf: "floorplans/84-2-3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L01-A"},
{apname: "84, 2. 4", gltf: "models/84, 2. 4.glb", position: [0.99379, 0.3961728, 0], scale: 0.001, entrance: "84", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-2-4.jpg", pdf: "floorplans/84-2-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L03-B"},
{apname: "84, 3. 1", gltf: "models/84, 3. 1.glb", position: [0.54276, 0.5786208, 0], scale: 0.001, entrance: "84", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-3-1.jpg", pdf: "floorplans/84-3-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L09-Ds"},
{apname: "84, 3. 2", gltf: "models/84, 3. 2.glb", position: [0.77415, 0.547344, -0.3411], scale: 0.001, entrance: "84", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-3-2.jpg", pdf: "floorplans/84-3-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L12"},
{apname: "84, 3. 3", gltf: "models/84, 3. 3.glb", position: [1.4434, 0.547344, 0], scale: 0.001, entrance: "84", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-3-3.jpg", pdf: "floorplans/84-3-3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L01-A"},
{apname: "84, 3. 4", gltf: "models/84, 3. 4.glb", position: [0.99379, 0.547344, 0], scale: 0.001, entrance: "84", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-3-4.jpg", pdf: "floorplans/84-3-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L03-B"},
{apname: "84, 4. 1", gltf: "models/84, 4. 1.glb", position: [0.54276, 0.7245792, 0], scale: 0.001, entrance: "84", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-4-1.jpg", pdf: "floorplans/84-4-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L09-Ds"},
{apname: "84, 4. 2", gltf: "models/84, 4. 2.glb", position: [0.77415, 0.6985152, -0.3411], scale: 0.001, entrance: "84", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-4-2.jpg", pdf: "floorplans/84-4-2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L12-A"},
{apname: "84, 4. 3", gltf: "models/84, 4. 3.glb", position: [1.4434, 0.6985152, 0], scale: 0.001, entrance: "84", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-4-3.jpg", pdf: "floorplans/84-4-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L01-A"},
{apname: "84, 4. 4", gltf: "models/84, 4. 4.glb", position: [0.99379, 0.6985152, 0], scale: 0.001, entrance: "84", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-4-4.jpg", pdf: "floorplans/84-4-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L03-B"},
{apname: "84, 5. 1", gltf: "models/84, 5. 1.glb", position: [0.54276, 0.8809632, 0], scale: 0.001, entrance: "84", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-5-1.jpg", pdf: "floorplans/84-5-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L09-Ds"},
{apname: "84, 5. 2", gltf: "models/84, 5. 2.glb", position: [0.99379, 0.8496864, 0], scale: 0.001, entrance: "84", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-5-2.jpg", pdf: "floorplans/84-5-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L03-B"},
{apname: "84, 6. 1", gltf: "models/84, 6. 1.glb", position: [0.54276, 1.0321344, 0], scale: 0.001, entrance: "84", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-6-1.jpg", pdf: "floorplans/84-6-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L18"},
{apname: "84, 6. 2", gltf: "models/84, 6. 2.glb", position: [0.77415, 1.0008576, -0.3411], scale: 0.001, entrance: "84", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/84-6-2.jpg", pdf: "floorplans/84-6-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L17"},
{apname: "84, 6. P1", gltf: "models/84, 6. P1.glb", position: [1.4434, 1.0529856, 0.13], scale: 0.001, entrance: "84", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/84-6-P1.jpg", pdf: "floorplans/84-6-P1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P13"},
{apname: "84, 6. P2", gltf: "models/84, 6. P2.glb", position: [1.4434, 0.9330912, 0.13], scale: 0.001, entrance: "84", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/84-6-P2.jpg", pdf: "floorplans/84-6-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P14"},
{apname: "84, 7. P1", gltf: "models/84, 7. P1.glb", position: [1.21201, 1.2041568, 0.13], scale: 0.001, entrance: "84", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/84-7-P1.jpg", pdf: "floorplans/84-7-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P12"},
{apname: "84, 7. P2", gltf: "models/84, 7. P2.glb", position: [0.74923, 1.2823488, 0.13], scale: 0.001, entrance: "84", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/84-7-P2.jpg", pdf: "floorplans/84-7-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P11"},
{apname: "84, 7. P3", gltf: "models/84, 7. P3.glb", position: [0.54276, 1.2823488, 0.13], scale: 0.001, entrance: "84", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/84-7-P3.jpg", pdf: "floorplans/84-7-P3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P10"},
{apname: "84, st. T1", gltf: "models/84, st. T1.glb", position: [0.54276, 0.0938304, -0.07801], scale: 0.001, entrance: "84", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/84-ST-T1.jpg", pdf: "floorplans/84-ST-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "84, st. T2", gltf: "models/84, st. T2.glb", position: [0.77415, 0.0938304, -0.07801], scale: 0.001, entrance: "84", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/84-ST-T2.jpg", pdf: "floorplans/84-ST-T2.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T11-A"},
{apname: "84, st. T3", gltf: "models/84, st. T3.glb", position: [1.22453, 0.0938304, -0.07801], scale: 0.001, entrance: "84", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/84-ST-T3.jpg", pdf: "floorplans/84-ST-T3.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T02-E"},
{apname: "84, st. T4", gltf: "models/84, st. T4.glb", position: [1.45592, 0.0938304, -0.07801], scale: 0.001, entrance: "84", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/84-ST-T4.jpg", pdf: "floorplans/84-ST-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T01"},
{apname: "86, 2. 1", gltf: "models/86, 2. 1.glb", position: [1.90618, 0.3961728, 0], scale: 0.001, entrance: "86", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/86-2-1.jpg", pdf: "floorplans/86-2-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L06-C"},
{apname: "86, 2. 2", gltf: "models/86, 2. 2.glb", position: [1.67479, 0.3961728, 0], scale: 0.001, entrance: "86", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/86-2-2.jpg", pdf: "floorplans/86-2-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L11"},
{apname: "86, 2. P1", gltf: "models/86, 2. P1.glb", position: [2.60034, 0.469152, 0.13], scale: 0.001, entrance: "86", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/86-2-P1.jpg", pdf: "floorplans/86-2-P1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P13-A"},
{apname: "86, 2. P2", gltf: "models/86, 2. P2.glb", position: [2.60034, 0.3492576, 0.13], scale: 0.001, entrance: "86", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/86-2-P2.jpg", pdf: "floorplans/86-2-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P14-A"},
{apname: "86, 3. 1", gltf: "models/86, 3. 1.glb", position: [1.67479, 0.547344, 0], scale: 0.001, entrance: "86", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/86-3-1.jpg", pdf: "floorplans/86-3-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Apartment", apcode: "L13"},
{apname: "86, 4. P1", gltf: "models/86, 4. P1.glb", position: [1.90618, 0.703728, 0.13], scale: 0.001, entrance: "86", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/86-4-P1.jpg", pdf: "floorplans/86-4-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P105"},
{apname: "86, 4. P2", gltf: "models/86, 4. P2.glb", position: [1.67479, 0.703728, 0.13], scale: 0.001, entrance: "86", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/86-4-P2.jpg", pdf: "floorplans/86-4-P2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P15"},
{apname: "86, 4. P3", gltf: "models/86, 4. P3.glb", position: [2.36895, 0.6203232, 0.13], scale: 0.001, entrance: "86", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/86-4-P3.jpg", pdf: "floorplans/86-4-P3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P12"},
{apname: "86, st. T1", gltf: "models/86, st. T1.glb", position: [1.68731, 0.0938304, -0.07801], scale: 0.001, entrance: "86", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/86-ST-T1.jpg", pdf: "floorplans/86-ST-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T10"},
{apname: "86, st. T2", gltf: "models/86, st. T2.glb", position: [1.9187, 0.0938304, -0.07801], scale: 0.001, entrance: "86", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/86-ST-T2.jpg", pdf: "floorplans/86-ST-T2.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T11"},
{apname: "86, st. T3", gltf: "models/86, st. T3.glb", position: [2.36895, 0.0938304, -0.07801], scale: 0.001, entrance: "86", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/86-ST-T3.jpg", pdf: "floorplans/86-ST-T3.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T02-G"},
{apname: "86, st. T4", gltf: "models/86, st. T4.glb", position: [2.60034, 0.0938304, -0.07801], scale: 0.001, entrance: "86", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/86-ST-T4.jpg", pdf: "floorplans/86-ST-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Townhouse", apcode: "T12"},
{apname: "88, st. P1", gltf: "models/88, st. P1.glb", position: [2.83173, 0.1198944, 0.13], scale: 0.001, entrance: "88", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/88-ST-P1.jpg", pdf: "floorplans/88-ST-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P15-A"},
{apname: "88, st. P2", gltf: "models/88, st. P2.glb", position: [3.06312, 0.1198944, 0.13], scale: 0.001, entrance: "88", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/88-ST-P2.jpg", pdf: "floorplans/88-ST-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 4, objtype: "home", hometype:"Penthouse", apcode: "P11-A"},
    

]

const models8 = [
    {apname: "60, 3. T1", gltf: "models/60, 3. T1.glb", position: [-0.63716, 0.8653248, 0.14], scale: 0.001, entrance: "60", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/60-3-T1.jpg", pdf: "floorplans/60-3-T1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Townhouse", apcode: "T47"},
    {apname: "60, 3. T2", gltf: "models/60, 3. T2.glb", position: [-1.09994, 0.8392608, 0.16], scale: 0.001, entrance: "60", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/60-3-T2.jpg", pdf: "floorplans/60-3-T2.pdf", rooms: "7", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Townhouse", apcode: "T48"},
    {apname: "60, 3. T3", gltf: "models/60, 3. T3.glb", position: [-1.33133, 0.8236224, 0.05], scale: 0.001, entrance: "60", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/60-3-T3.jpg", pdf: "floorplans/60-3-T3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Townhouse", apcode: "T01-s"},
    {apname: "60, 3. T4", gltf: "models/60, 3. T4.glb", position: [-1.56272, 0.8236224, 0.05], scale: 0.001, entrance: "60", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/60-3-T4.jpg", pdf: "floorplans/60-3-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Townhouse", apcode: "T01-s"},
    {apname: "60, 5. 1", gltf: "models/60, 5. 1.glb", position: [-0.91342, 1.1311776, 0.24074], scale: 0.001, entrance: "60", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/60-5-1.jpg", pdf: "floorplans/60-5-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "P47"},
    {apname: "60, 6. 1", gltf: "models/60, 6. 1.glb", position: [-1.11942, 1.3344768, 0.24074], scale: 0.001, entrance: "60", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/60-6-1.jpg", pdf: "floorplans/60-6-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "P49"},
    {apname: "62, 3. 1", gltf: "models/62, 3. 1.glb", position: [-2.39172, 0.8236224, 0.05], scale: 0.001, entrance: "62", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/62-3-1.jpg", pdf: "floorplans/62-3-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Townhouse", apcode: "T46"},
    {apname: "62, 4. 1", gltf: "models/62, 4. 1.glb", position: [-2.39172, 0.9747936, 0.05], scale: 0.001, entrance: "62", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/62-4-1.jpg", pdf: "floorplans/62-4-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Townhouse", apcode: "T46"},
    {apname: "62, 5. 1", gltf: "models/62, 5. 1.glb", position: [-1.52545, 1.1416032, -0.19149], scale: 0.001, entrance: "62", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/62-5-1.jpg", pdf: "floorplans/62-5-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Apartment", apcode: "L06-A"},
    {apname: "62, 5. 2", gltf: "models/62, 5. 2.glb", position: [-1.6089, 1.1416032, 0.15], scale: 0.001, entrance: "62", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/62-5-2.jpg", pdf: "floorplans/62-5-2.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Apartment", apcode: "L45"},
    {apname: "62, 5. 3", gltf: "models/62, 5. 3.glb", position: [-2.54172, 1.1416032, 0.15], scale: 0.001, entrance: "62", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/62-5-3.jpg", pdf: "floorplans/62-5-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Apartment", apcode: "L41"},
    {apname: "62, 6. 1", gltf: "models/62, 6. 1.glb", position: [-1.52545, 1.2927744, -0.19149], scale: 0.001, entrance: "62", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/62-6-1.jpg", pdf: "floorplans/62-6-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Apartment", apcode: "L02-As"},
    {apname: "62, 6. 2", gltf: "models/62, 6. 2.glb", position: [-2.54172, 1.2927744, 0.15], scale: 0.001, entrance: "62", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/62-6-2.jpg", pdf: "floorplans/62-6-2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Apartment", apcode: "L42"},
    {apname: "62, 7. 1", gltf: "models/62, 7. 1.glb", position: [-1.35081, 1.4387328, 0.24074], scale: 0.001, entrance: "62", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-7-1.jpg", pdf: "floorplans/62-7-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "P48"},
    {apname: "62, 7. 2", gltf: "models/62, 7. 2.glb", position: [-1.80122, 1.537776, 0.24074], scale: 0.001, entrance: "62", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-7-2.jpg", pdf: "floorplans/62-7-2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "P45"},
    {apname: "62, 7. 3", gltf: "models/62, 7. 3.glb", position: [-2.6444, 1.537776, 0.24074], scale: 0.001, entrance: "62", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-7-3.jpg", pdf: "floorplans/62-7-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "P44"},
    {apname: "62, 8. 1", gltf: "models/62, 8. 1.glb", position: [-2.63246, 1.6889472, 0.24074], scale: 0.001, entrance: "62", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-8-1.jpg", pdf: "floorplans/62-8-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "P46"},
    {apname: "60, 5. 2", gltf: "models/60, 5. 2.glb", position: [-0.46278, 1.0269216, 0.24074], scale: 0.001, entrance: "60", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/60-5-2.jpg", pdf: "floorplans/60-5-2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "P48"},
    {apname: "63, 5. P1", gltf: "models/63, 5. P1.glb", position: [-0.23139, 0.9278784, 0.24074], scale: 0.001, entrance: "63", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/63-5-P1.jpg", pdf: "floorplans/63-5-P1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "p56"},
    {apname: "63, 5. P2", gltf: "models/63, 5. P2.glb", position: [0, 0.938304, 0.24074], scale: 0.001, entrance: "63", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/63-5-P2.jpg", pdf: "floorplans/63-5-P2.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 8, objtype: "home", hometype:"Penthouse", apcode: "P55"},
    ]

const models7 = [
    {apname: "62, 3. 2", gltf: "models/62, 3. 2.glb", position: [-0.08173, 0.8236224, -0.07801], scale: 0.001, entrance: "62", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/62-3-2.jpg", pdf: "floorplans/62-3-2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T45"},
    {apname: "62, 4. 2", gltf: "models/62, 4. 2.glb", position: [-0.08173, 0.9747936, -0.07801], scale: 0.001, entrance: "62", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/62-4-2.jpg", pdf: "floorplans/62-4-2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T45"},
    {apname: "62, 5. 4", gltf: "models/62, 5. 4.glb", position: [-0.06806, 1.1416032, -0.22515], scale: 0.001, entrance: "62", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/62-5-4.jpg", pdf: "floorplans/62-5-4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L40"},
    {apname: "62, 6. 3", gltf: "models/62, 6. 3.glb", position: [-0.06806, 1.2927744, -0.22515], scale: 0.001, entrance: "62", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/62-6-3.jpg", pdf: "floorplans/62-6-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L40"},
    {apname: "62, 7. 4", gltf: "models/62, 7. 4.glb", position: [-0.6175, 1.537776, -0.47553], scale: 0.001, entrance: "62", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-7-4.jpg", pdf: "floorplans/62-7-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P42"},
    {apname: "62, 7. P1", gltf: "models/62, 7. P1.glb", position: [-0.23139, 1.537776, -0.24074], scale: 0.001, entrance: "62", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-7-P1.jpg", pdf: "floorplans/62-7-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P01"},
    {apname: "62, 7. P2", gltf: "models/62, 7. P2.glb", position: [0, 1.537776, -0.24074], scale: 0.001, entrance: "62", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-7-P2.jpg", pdf: "floorplans/62-7-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P01-s"},
    {apname: "62, 7. P3", gltf: "models/62, 7. P3.glb", position: [0.23139, 1.537776, -0.24074], scale: 0.001, entrance: "62", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-7-P3.jpg", pdf: "floorplans/62-7-P3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P08-A"},
    {apname: "62, 7. P4", gltf: "models/62, 7. P4.glb", position: [0.46278, 1.537776, -0.24074], scale: 0.001, entrance: "62", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-7-P4.jpg", pdf: "floorplans/62-7-P4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P09-A"},
    {apname: "62, 8. 2", gltf: "models/62, 8. 2.glb", position: [-0.6175, 1.6889472, -0.47553], scale: 0.001, entrance: "62", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/62-8-2.jpg", pdf: "floorplans/62-8-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P42"},
    {apname: "64, 3. T1", gltf: "models/64, 3. T1.glb", position: [0, 0.8236224, -0.07801], scale: 0.001, entrance: "64", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/64-3-T1.jpg", pdf: "floorplans/64-3-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T01-s"},
    {apname: "64, 3. T2", gltf: "models/64, 3. T2.glb", position: [0.23139, 0.8236224, -0.07801], scale: 0.001, entrance: "64", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/64-3-T2.jpg", pdf: "floorplans/64-3-T2.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T02-Ds"},
    {apname: "64, 3. T3", gltf: "models/64, 3. T3.glb", position: [0.68136, 0.807984, -0.07801], scale: 0.001, entrance: "64", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/64-3-T3.jpg", pdf: "floorplans/64-3-T3.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T03-s"},
    {apname: "64, 3. T4", gltf: "models/64, 3. T4.glb", position: [0.91275, 0.8236224, -0.07801], scale: 0.001, entrance: "64", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/64-3-T4.jpg", pdf: "floorplans/64-3-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T04"},
    {apname: "64, 5. 1", gltf: "models/64, 5. 1.glb", position: [0.23139, 1.1416032, 0], scale: 0.001, entrance: "64", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/64-5-1.jpg", pdf: "floorplans/64-5-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "64, 5. 2", gltf: "models/64, 5. 2.glb", position: [0, 1.1416032, -0.22493], scale: 0.001, entrance: "64", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/64-5-2.jpg", pdf: "floorplans/64-5-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L43"},
    {apname: "64, 5. 3", gltf: "models/64, 5. 3.glb", position: [0.68136, 1.1103264, 0], scale: 0.001, entrance: "64", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/64-5-3.jpg", pdf: "floorplans/64-5-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L01-s"},
    {apname: "64, 6. 1", gltf: "models/64, 6. 1.glb", position: [0.23139, 1.2927744, 0], scale: 0.001, entrance: "64", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/64-6-1.jpg", pdf: "floorplans/64-6-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "64, 6. 2", gltf: "models/64, 6. 2.glb", position: [0, 1.2927744, -0.22493], scale: 0.001, entrance: "64", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/64-6-2.jpg", pdf: "floorplans/64-6-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L43"},
    {apname: "64, 6. 3", gltf: "models/64, 6. 3.glb", position: [0.75098, 1.1103264, -0.23806], scale: 0.001, entrance: "64", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/64-6-3.jpg", pdf: "floorplans/64-6-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L03-As"},
    {apname: "64, 6. 4", gltf: "models/64, 6. 4.glb", position: [0.68136, 1.2614976, 0], scale: 0.001, entrance: "64", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/64-6-4.jpg", pdf: "floorplans/64-6-4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L04-s"},
    {apname: "66, 3. T1", gltf: "models/66, 3. T1.glb", position: [1.14414, 0.78192, -0.07801], scale: 0.001, entrance: "66", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/66-3-T1.jpg", pdf: "floorplans/66-3-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
    {apname: "66, 3. T2", gltf: "models/66, 3. T2.glb", position: [1.37553, 0.7662816, -0.07801], scale: 0.001, entrance: "66", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/66-3-T2.jpg", pdf: "floorplans/66-3-T2.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T03-A"},
    {apname: "66, 3. T3", gltf: "models/66, 3. T3.glb", position: [1.82687, 0.7350048, -0.07801], scale: 0.001, entrance: "66", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/66-3-T3.jpg", pdf: "floorplans/66-3-T3.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T02-A"},
    {apname: "66, 3. T4", gltf: "models/66, 3. T4.glb", position: [2.05826, 0.7193664, -0.07801], scale: 0.001, entrance: "66", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/66-3-T4.jpg", pdf: "floorplans/66-3-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T04"},
    {apname: "66, 5. 1", gltf: "models/66, 5. 1.glb", position: [1.14414, 1.0842624, 0], scale: 0.001, entrance: "66", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-5-1.jpg", pdf: "floorplans/66-5-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
    {apname: "66, 5. 2", gltf: "models/66, 5. 2.glb", position: [1.37553, 1.0842624, -0.3409], scale: 0.001, entrance: "66", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-5-2.jpg", pdf: "floorplans/66-5-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
    {apname: "66, 5. 3", gltf: "models/66, 5. 3.glb", position: [2.05826, 1.0217088, 0], scale: 0.001, entrance: "66", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-5-3.jpg", pdf: "floorplans/66-5-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
    {apname: "66, 5. 4", gltf: "models/66, 5. 4.glb", position: [1.60692, 1.0529856, 0], scale: 0.001, entrance: "66", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-5-4.jpg", pdf: "floorplans/66-5-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
    {apname: "66, 6. 1", gltf: "models/66, 6. 1.glb", position: [1.14414, 1.2302208, 0], scale: 0.001, entrance: "66", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-6-1.jpg", pdf: "floorplans/66-6-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L05-s"},
    {apname: "66, 6. 2", gltf: "models/66, 6. 2.glb", position: [1.37553, 1.2302208, -0.3409], scale: 0.001, entrance: "66", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-6-2.jpg", pdf: "floorplans/66-6-2.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L06-s"},
    {apname: "66, 6. 3", gltf: "models/66, 6. 3.glb", position: [2.05826, 1.17288, 0], scale: 0.001, entrance: "66", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-6-3.jpg", pdf: "floorplans/66-6-3.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
    {apname: "66, 6. 4", gltf: "models/66, 6. 4.glb", position: [1.60692, 1.2041568, 0], scale: 0.001, entrance: "66", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-6-4.jpg", pdf: "floorplans/66-6-4.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
    {apname: "66, 7. 1", gltf: "models/66, 7. 1.glb", position: [1.37553, 1.3344768, -0.26893], scale: 0.001, entrance: "66", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-7-1.jpg", pdf: "floorplans/66-7-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L06-Fs"},
    {apname: "66, 7. 2", gltf: "models/66, 7. 2.glb", position: [2.05826, 1.3240512, 0], scale: 0.001, entrance: "66", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-7-2.jpg", pdf: "floorplans/66-7-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L09-As"},
    {apname: "66, 7. 3", gltf: "models/66, 7. 3.glb", position: [1.60692, 1.355328, 0], scale: 0.001, entrance: "66", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/66-7-3.jpg", pdf: "floorplans/66-7-3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L07-s"},
    {apname: "66, 8. P1", gltf: "models/66, 8. P1.glb", position: [0.69417, 1.537776, -0.24074], scale: 0.001, entrance: "66", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/66-8-P1.jpg", pdf: "floorplans/66-8-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
    {apname: "66, 8. P2", gltf: "models/66, 8. P2.glb", position: [0.92556, 1.537776, -0.24074], scale: 0.001, entrance: "66", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/66-8-P2.jpg", pdf: "floorplans/66-8-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
    {apname: "66, 8. P3", gltf: "models/66, 8. P3.glb", position: [1.15695, 1.537776, -0.24074], scale: 0.001, entrance: "66", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/66-8-P3.jpg", pdf: "floorplans/66-8-P3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P04"},
    {apname: "66, 8. P4", gltf: "models/66, 8. P4.glb", position: [1.38834, 1.537776, -0.24074], scale: 0.001, entrance: "66", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/66-8-P4.jpg", pdf: "floorplans/66-8-P4.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P03"},
    {apname: "66, 8. P5", gltf: "models/66, 8. P5.glb", position: [1.60703, 1.537776, -0.24074], scale: 0.001, entrance: "66", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/66-8-P5.jpg", pdf: "floorplans/66-8-P5.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P02-A"},
    {apname: "66, 8. P6", gltf: "models/66, 8. P6.glb", position: [1.83842, 1.537776, -0.24074], scale: 0.001, entrance: "66", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/66-8-P6.jpg", pdf: "floorplans/66-8-P6.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
    {apname: "66, 8. P7", gltf: "models/66, 8. P7.glb", position: [2.06981, 1.5221376, -0.24074], scale: 0.001, entrance: "66", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/66-8-P7.jpg", pdf: "floorplans/66-8-P7.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Penthouse", apcode: "P41"},
    {apname: "68, 2. T1", gltf: "models/68, 2. T1.glb", position: [2.28965, 0.7089408, -0.07801], scale: 0.001, entrance: "68", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/68-2-T1.jpg", pdf: "floorplans/68-2-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
    {apname: "68, 2. T2", gltf: "models/68, 2. T2.glb", position: [2.52104, 0.6933024, -0.07801], scale: 0.001, entrance: "68", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/68-2-T2.jpg", pdf: "floorplans/68-2-T2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Townhouse", apcode: "T01-s"},
    {apname: "68, 4. 1", gltf: "models/68, 4. 1.glb", position: [2.28965, 1.0217088, 0], scale: 0.001, entrance: "68", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/68-4-1.jpg", pdf: "floorplans/68-4-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L09-E"},
    {apname: "68, 5. 1", gltf: "models/68, 5. 1.glb", position: [2.52104, 0.9956448, 0], scale: 0.001, entrance: "68", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/68-5-1.jpg", pdf: "floorplans/68-5-1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L02-Bs"},
    {apname: "68, 5. 2", gltf: "models/68, 5. 2.glb", position: [2.28965, 1.17288, 0], scale: 0.001, entrance: "68", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/68-5-2.jpg", pdf: "floorplans/68-5-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L09-F"},
    {apname: "68, 6. 1", gltf: "models/68, 6. 1.glb", position: [2.52104, 1.2979872, 0], scale: 0.001, entrance: "68", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/68-6-1.jpg", pdf: "floorplans/68-6-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L02-Cs"},
    {apname: "68, 6. 2", gltf: "models/68, 6. 2.glb", position: [2.28965, 1.3240512, 0], scale: 0.001, entrance: "68", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/68-6-2.jpg", pdf: "floorplans/68-6-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 7, objtype: "home", hometype:"Apartment", apcode: "L09-E"},
                               
]

const models61 = [
    {apname: "66, 8. P8", gltf: "models/66, 8. P8.glb", position: [0.0400000000000001, 1.4960736, 0.28], scale: 0.001, entrance: "66", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/66-8-P8.jpg", pdf: "floorplans/66-8-P8.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Penthouse", apcode: "P40"},
{apname: "68, 2. T3", gltf: "models/68, 2. T3.glb", position: [0.61773, 0.677664, -0.07801], scale: 0.001, entrance: "68", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/68-2-T3.jpg", pdf: "floorplans/68-2-T3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Townhouse", apcode: "T42"},
{apname: "68, 2. T4", gltf: "models/68, 2. T4.glb", position: [0.61773, 0.677664, -0.07801], scale: 0.001, entrance: "68", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/68-2-T4.jpg", pdf: "floorplans/68-2-T4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Townhouse", apcode: "T40"},
{apname: "68, 4. 2", gltf: "models/68, 4. 2.glb", position: [0.61773, 0.9956448, 0], scale: 0.001, entrance: "68", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/68-4-2.jpg", pdf: "floorplans/68-4-2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L44"},
{apname: "68, 5. 3", gltf: "models/68, 5. 3.glb", position: [0.61773, 1.146816, 0], scale: 0.001, entrance: "68", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/68-5-3.jpg", pdf: "floorplans/68-5-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L44"},
{apname: "68, 6. 3", gltf: "models/68, 6. 3.glb", position: [0.61773, 1.2979872, 0], scale: 0.001, entrance: "68", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/68-6-3.jpg", pdf: "floorplans/68-6-3.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L44"},
{apname: "70, 2. T1", gltf: "models/70, 2. T1.glb", position: [0.84912, 0.6620256, -0.07801], scale: 0.001, entrance: "70", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/70-2-T1.jpg", pdf: "floorplans/70-2-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "70, 2. T2", gltf: "models/70, 2. T2.glb", position: [1.08051, 0.6463872, -0.07801], scale: 0.001, entrance: "70", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/70-2-T2.jpg", pdf: "floorplans/70-2-T2.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Townhouse", apcode: "T02-Fs"},
{apname: "70, 2. T3", gltf: "models/70, 2. T3.glb", position: [1.53044, 0.6203232, -0.07801], scale: 0.001, entrance: "70", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/70-2-T3.jpg", pdf: "floorplans/70-2-T3.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Townhouse", apcode: "T03-Fs"},
{apname: "70, 2. T4", gltf: "models/70, 2. T4.glb", position: [1.76183, 0.6046848, -0.07801], scale: 0.001, entrance: "70", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/70-2-T4.jpg", pdf: "floorplans/70-2-T4.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Townhouse", apcode: "T04"},
{apname: "70, 4. 1", gltf: "models/70, 4. 1.glb", position: [1.08051, 0.964368, 0], scale: 0.001, entrance: "70", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-4-1.jpg", pdf: "floorplans/70-4-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L03-Bs"},
{apname: "70, 4. 2", gltf: "models/70, 4. 2.glb", position: [0.84912, 0.964368, 0], scale: 0.001, entrance: "70", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-4-2.jpg", pdf: "floorplans/70-4-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L05-B"},
{apname: "70, 4. 3", gltf: "models/70, 4. 3.glb", position: [1.29873, 0.938304, -0.49621], scale: 0.001, entrance: "70", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-4-3.jpg", pdf: "floorplans/70-4-3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L07"},
{apname: "70, 4. 4", gltf: "models/70, 4. 4.glb", position: [1.53012, 0.9070272, 0], scale: 0.001, entrance: "70", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-4-4.jpg", pdf: "floorplans/70-4-4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L08"},
{apname: "70, 5. 1", gltf: "models/70, 5. 1.glb", position: [1.08051, 1.1155392, 0], scale: 0.001, entrance: "70", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-5-1.jpg", pdf: "floorplans/70-5-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L03-Bs"},
{apname: "70, 5. 2", gltf: "models/70, 5. 2.glb", position: [0.84912, 1.1155392, 0], scale: 0.001, entrance: "70", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-5-2.jpg", pdf: "floorplans/70-5-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L05-B"},
{apname: "70, 5. 3", gltf: "models/70, 5. 3.glb", position: [1.29873, 1.0894752, -0.49621], scale: 0.001, entrance: "70", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-5-3.jpg", pdf: "floorplans/70-5-3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L07"},
{apname: "70, 5. 4", gltf: "models/70, 5. 4.glb", position: [1.53012, 1.0581984, 0], scale: 0.001, entrance: "70", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-5-4.jpg", pdf: "floorplans/70-5-4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L08"},
{apname: "70, 6. 1", gltf: "models/70, 6. 1.glb", position: [1.08051, 1.2667104, 0], scale: 0.001, entrance: "70", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-6-1.jpg", pdf: "floorplans/70-6-1.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L03-Bs"},
{apname: "70, 6. 2", gltf: "models/70, 6. 2.glb", position: [0.84912, 1.2667104, 0], scale: 0.001, entrance: "70", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-6-2.jpg", pdf: "floorplans/70-6-2.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L05-B"},
{apname: "70, 6. 3", gltf: "models/70, 6. 3.glb", position: [1.29873, 1.2406464, -0.49621], scale: 0.001, entrance: "70", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-6-3.jpg", pdf: "floorplans/70-6-3.pdf", rooms: "2", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L07"},
{apname: "70, 6. 4", gltf: "models/70, 6. 4.glb", position: [1.53012, 1.2093696, 0], scale: 0.001, entrance: "70", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/70-6-4.jpg", pdf: "floorplans/70-6-4.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L08"},
{apname: "70, 7. P1", gltf: "models/70, 7. P1.glb", position: [0.42593, 1.4804352, 0.28], scale: 0.001, entrance: "70", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/70-7-P1.jpg", pdf: "floorplans/70-7-P1.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Penthouse", apcode: "P43"},
{apname: "70, 7. P2", gltf: "models/70, 7. P2.glb", position: [0.65732, 1.4647968, 0.28], scale: 0.001, entrance: "70", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/70-7-P2.jpg", pdf: "floorplans/70-7-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Penthouse", apcode: "P01"},
{apname: "70, 7. P3", gltf: "models/70, 7. P3.glb", position: [0.88871, 1.4491584, 0.28], scale: 0.001, entrance: "70", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/70-7-P3.jpg", pdf: "floorplans/70-7-P3.pdf", rooms: "5", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Penthouse", apcode: "P07-s"},
{apname: "70, 7. P4", gltf: "models/70, 7. P4.glb", position: [1.33905, 1.4230944, 0.28], scale: 0.001, entrance: "70", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/70-7-P4.jpg", pdf: "floorplans/70-7-P4.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Penthouse", apcode: "P02-s"},
{apname: "70, 7. P5", gltf: "models/70, 7. P5.glb", position: [1.57044, 1.407456, 0.28], scale: 0.001, entrance: "70", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/70-7-P5.jpg", pdf: "floorplans/70-7-P5.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Penthouse", apcode: "P01-s"},
{apname: "72, 2. T1", gltf: "models/72, 2. T1.glb", position: [1.99322, 0.5890464, -0.07801], scale: 0.001, entrance: "72", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/72-2-T1.jpg", pdf: "floorplans/72-2-T1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
{apname: "72, 2. T2", gltf: "models/72, 2. T2.glb", position: [2.22461, 0.573408, -0.07801], scale: 0.001, entrance: "72", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/72-2-T2.jpg", pdf: "floorplans/72-2-T2.pdf", rooms: "6", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Townhouse", apcode: "T03-E"},
{apname: "72, 4. 1", gltf: "models/72, 4. 1.glb", position: [1.99322, 0.9070272, 0], scale: 0.001, entrance: "72", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-4-1.jpg", pdf: "floorplans/72-4-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L01-B"},
{apname: "72, 5. 1", gltf: "models/72, 5. 1.glb", position: [1.99322, 1.0581984, 0], scale: 0.001, entrance: "72", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-5-1.jpg", pdf: "floorplans/72-5-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L01-B"},
{apname: "72, 6. 1", gltf: "models/72, 6. 1.glb", position: [1.99322, 1.2093696, 0], scale: 0.001, entrance: "72", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/72-6-1.jpg", pdf: "floorplans/72-6-1.pdf", rooms: "3", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Apartment", apcode: "L01-B"},
{apname: "72, 7. P1", gltf: "models/72, 7. P1.glb", position: [1.80183, 1.3918176, 0.28], scale: 0.001, entrance: "72", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/72-7-P1.jpg", pdf: "floorplans/72-7-P1.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Penthouse", apcode: "P01"},
{apname: "72, 7. P2", gltf: "models/72, 7. P2.glb", position: [2.03322, 1.3761792, 0.28], scale: 0.001, entrance: "72", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/72-7-P2.jpg", pdf: "floorplans/72-7-P2.pdf", rooms: "4", address: "Robert Jacobsens Vej", segment: 61, objtype: "home", hometype:"Penthouse", apcode: "P01"},

]

const models6 = [
    {apname: "73, 1. T1", gltf: "models/73, 1. T1.glb", position: [0, 0.5056416, -0.07801], scale: 0.001, entrance: "73", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/73-1-T1.jpg", pdf: "floorplans/73-1-T1.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T31"},
    {apname: "73, 1. T2", gltf: "models/73, 1. T2.glb", position: [0.4502, 0.4743648, -0.07801], scale: 0.001, entrance: "73", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/73-1-T2.jpg", pdf: "floorplans/73-1-T2.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T03-Bs"},
    {apname: "73, 1. T3", gltf: "models/73, 1. T3.glb", position: [0.68159, 0.4587264, -0.07801], scale: 0.001, entrance: "73", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/73-1-T3.jpg", pdf: "floorplans/73-1-T3.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T04"},
    {apname: "73, 3. 1", gltf: "models/73, 3. 1.glb", position: [0.24556, 0.8184096, 0], scale: 0.001, entrance: "73", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-3-1.jpg", pdf: "floorplans/73-3-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06"},
    {apname: "73, 3. 2", gltf: "models/73, 3. 2.glb", position: [0.01417, 0.8184096, 0], scale: 0.001, entrance: "73", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-3-2.jpg", pdf: "floorplans/73-3-2.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L33"},
    {apname: "73, 3. 3", gltf: "models/73, 3. 3.glb", position: [0.47763, 0.7923456, -0.49621], scale: 0.001, entrance: "73", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-3-3.jpg", pdf: "floorplans/73-3-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "73, 3. 4", gltf: "models/73, 3. 4.glb", position: [0.69476, 0.7610688, 0], scale: 0.001, entrance: "73", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-3-4.jpg", pdf: "floorplans/73-3-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L08"},
    {apname: "73, 4. 1", gltf: "models/73, 4. 1.glb", position: [0.24556, 0.9695808, 0], scale: 0.001, entrance: "73", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-4-1.jpg", pdf: "floorplans/73-4-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06"},
    {apname: "73, 4. 2", gltf: "models/73, 4. 2.glb", position: [0.01417, 0.9695808, 0], scale: 0.001, entrance: "73", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-4-2.jpg", pdf: "floorplans/73-4-2.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L33"},
    {apname: "73, 4. 3", gltf: "models/73, 4. 3.glb", position: [0.47763, 0.9435168, -0.49621], scale: 0.001, entrance: "73", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-4-3.jpg", pdf: "floorplans/73-4-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "73, 4. 4", gltf: "models/73, 4. 4.glb", position: [0.69476, 0.91224, 0], scale: 0.001, entrance: "73", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-4-4.jpg", pdf: "floorplans/73-4-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L08"},
    {apname: "73, 5. 1", gltf: "models/73, 5. 1.glb", position: [0.24556, 1.120752, 0], scale: 0.001, entrance: "73", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-5-1.jpg", pdf: "floorplans/73-5-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06"},
    {apname: "73, 5. 2", gltf: "models/73, 5. 2.glb", position: [0.01417, 1.120752, 0], scale: 0.001, entrance: "73", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-5-2.jpg", pdf: "floorplans/73-5-2.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L33-A"},
    {apname: "73, 5. 3", gltf: "models/73, 5. 3.glb", position: [0.47763, 1.094688, -0.49621], scale: 0.001, entrance: "73", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-5-3.jpg", pdf: "floorplans/73-5-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "73, 5. 4", gltf: "models/73, 5. 4.glb", position: [0.69476, 1.0634112, 0], scale: 0.001, entrance: "73", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-5-4.jpg", pdf: "floorplans/73-5-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L08"},
    {apname: "73, 6. 1", gltf: "models/73, 6. 1.glb", position: [0.69476, 1.2145824, 0], scale: 0.001, entrance: "73", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/73-6-1.jpg", pdf: "floorplans/73-6-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L08-B"},
    {apname: "73, 7. P1", gltf: "models/73, 7. P1.glb", position: [0.000280000000000225, 1.3657536, 0.1], scale: 0.001, entrance: "73", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/73-7-P1.jpg", pdf: "floorplans/73-7-P1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
    {apname: "73, 7. P2", gltf: "models/73, 7. P2.glb", position: [0.23167, 1.3761792, 0.1], scale: 0.001, entrance: "73", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/73-7-P2.jpg", pdf: "floorplans/73-7-P2.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P03-s"},
    {apname: "73, 7. P3", gltf: "models/73, 7. P3.glb", position: [0.68174, 1.407456, 0.1], scale: 0.001, entrance: "73", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/73-7-P3.jpg", pdf: "floorplans/73-7-P3.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P06-s"},
    {apname: "73, 7. P4", gltf: "models/73, 7. P4.glb", position: [0.91313, 1.4230944, 0.1], scale: 0.001, entrance: "73", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/73-7-P4.jpg", pdf: "floorplans/73-7-P4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P01-s"},
    {apname: "73, 7. P5", gltf: "models/73, 7. P5.glb", position: [1.14452, 1.4387328, 0.1], scale: 0.001, entrance: "73", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/73-7-P5.jpg", pdf: "floorplans/73-7-P5.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P01"},
    {apname: "73, 7. P6", gltf: "models/73, 7. P6.glb", position: [1.37591, 1.4491584, 0.1], scale: 0.001, entrance: "73", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/73-7-P6.jpg", pdf: "floorplans/73-7-P6.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P05-s"},
    {apname: "75, 1. T1", gltf: "models/75, 1. T1.glb", position: [0.91298, 0.443088, -0.07801], scale: 0.001, entrance: "75", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/75-1-T1.jpg", pdf: "floorplans/75-1-T1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
    {apname: "75, 1. T2", gltf: "models/75, 1. T2.glb", position: [1.14437, 0.4274496, -0.07801], scale: 0.001, entrance: "75", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/75-1-T2.jpg", pdf: "floorplans/75-1-T2.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T03-G"},
    {apname: "75, 1. T3", gltf: "models/75, 1. T3.glb", position: [1.5948, 0.4013856, -0.07801], scale: 0.001, entrance: "75", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/75-1-T3.jpg", pdf: "floorplans/75-1-T3.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T02-H"},
    {apname: "75, 1. T4", gltf: "models/75, 1. T4.glb", position: [1.82619, 0.3857472, -0.07801], scale: 0.001, entrance: "75", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/75-1-T4.jpg", pdf: "floorplans/75-1-T4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T01"},
    {apname: "75, 3. 1", gltf: "models/75, 3. 1.glb", position: [1.14437, 0.7610688, 0], scale: 0.001, entrance: "75", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-3-1.jpg", pdf: "floorplans/75-3-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L01-B"},
    {apname: "75, 3. 2", gltf: "models/75, 3. 2.glb", position: [2.05818, 0.703728, 0], scale: 0.001, entrance: "75", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-3-2.jpg", pdf: "floorplans/75-3-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L01"},
    {apname: "75, 4. 1", gltf: "models/75, 4. 1.glb", position: [1.14437, 0.91224, 0], scale: 0.001, entrance: "75", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-4-1.jpg", pdf: "floorplans/75-4-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L04-A"},
    {apname: "75, 4. 2", gltf: "models/75, 4. 2.glb", position: [1.37576, 0.729792, -0.22648], scale: 0.001, entrance: "75", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-4-2.jpg", pdf: "floorplans/75-4-2.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L02-E"},
    {apname: "75, 4. 3", gltf: "models/75, 4. 3.glb", position: [2.05818, 0.8548992, 0], scale: 0.001, entrance: "75", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-4-3.jpg", pdf: "floorplans/75-4-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L04"},
    {apname: "75, 4. 4", gltf: "models/75, 4. 4.glb", position: [1.6073, 0.703728, 0], scale: 0.001, entrance: "75", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-4-4.jpg", pdf: "floorplans/75-4-4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L03-A"},
    {apname: "75, 5. 1", gltf: "models/75, 5. 1.glb", position: [1.14437, 1.0634112, 0], scale: 0.001, entrance: "75", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-5-1.jpg", pdf: "floorplans/75-5-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L01-B"},
    {apname: "75, 5. 2", gltf: "models/75, 5. 2.glb", position: [2.05818, 1.0060704, 0], scale: 0.001, entrance: "75", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-5-2.jpg", pdf: "floorplans/75-5-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L01"},
    {apname: "75, 6. 1", gltf: "models/75, 6. 1.glb", position: [1.14437, 1.2145824, 0], scale: 0.001, entrance: "75", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-6-1.jpg", pdf: "floorplans/75-6-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L04-A"},
    {apname: "75, 6. 2", gltf: "models/75, 6. 2.glb", position: [1.37576, 1.0321344, -0.22648], scale: 0.001, entrance: "75", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-6-2.jpg", pdf: "floorplans/75-6-2.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L02-E"},
    {apname: "75, 6. 3", gltf: "models/75, 6. 3.glb", position: [2.05818, 1.146816, 0], scale: 0.001, entrance: "75", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-6-3.jpg", pdf: "floorplans/75-6-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L04"},
    {apname: "75, 6. 4", gltf: "models/75, 6. 4.glb", position: [1.6073, 1.0060704, 0], scale: 0.001, entrance: "75", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-6-4.jpg", pdf: "floorplans/75-6-4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L03-A"},
    {apname: "75, 7. 1", gltf: "models/75, 7. 1.glb", position: [2.05818, 1.3084128, 0], scale: 0.001, entrance: "75", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/75-7-1.jpg", pdf: "floorplans/75-7-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L24"},
    {apname: "77, 1. T1", gltf: "models/77, 1. T1.glb", position: [2.05758, 0.3701088, -0.07801], scale: 0.001, entrance: "77", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/77-1-T1.jpg", pdf: "floorplans/77-1-T1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T01-s"},
    {apname: "77, 1. T2", gltf: "models/77, 1. T2.glb", position: [2.28897, 0.3544704, -0.07801], scale: 0.001, entrance: "77", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/77-1-T2.jpg", pdf: "floorplans/77-1-T2.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T02-Bs"},
    {apname: "77, 1. T3", gltf: "models/77, 1. T3.glb", position: [2.73871, 0.3284064, -0.07801], scale: 0.001, entrance: "77", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/77-1-T3.jpg", pdf: "floorplans/77-1-T3.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T03-Bs"},
    {apname: "77, 1. T4", gltf: "models/77, 1. T4.glb", position: [2.9701, 0.312768, -0.07801], scale: 0.001, entrance: "77", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/77-1-T4.jpg", pdf: "floorplans/77-1-T4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T04"},
    {apname: "77, 3. 1", gltf: "models/77, 3. 1.glb", position: [2.52036, 0.6724512, 0], scale: 0.001, entrance: "77", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-3-1.jpg", pdf: "floorplans/77-3-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06"},
    {apname: "77, 3. 2", gltf: "models/77, 3. 2.glb", position: [2.28897, 0.6724512, 0], scale: 0.001, entrance: "77", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-3-2.jpg", pdf: "floorplans/77-3-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L05"},
    {apname: "77, 3. 3", gltf: "models/77, 3. 3.glb", position: [2.73858, 0.6463872, -0.49621], scale: 0.001, entrance: "77", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-3-3.jpg", pdf: "floorplans/77-3-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "77, 3. 4", gltf: "models/77, 3. 4.glb", position: [2.96956, 0.6151104, 0], scale: 0.001, entrance: "77", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-3-4.jpg", pdf: "floorplans/77-3-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L08-A"},
    {apname: "77, 4. 1", gltf: "models/77, 4. 1.glb", position: [2.52036, 0.8236224, 0], scale: 0.001, entrance: "77", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-4-1.jpg", pdf: "floorplans/77-4-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06"},
    {apname: "77, 4. 2", gltf: "models/77, 4. 2.glb", position: [2.28897, 0.8236224, 0], scale: 0.001, entrance: "77", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-4-2.jpg", pdf: "floorplans/77-4-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L05"},
    {apname: "77, 4. 3", gltf: "models/77, 4. 3.glb", position: [2.73858, 0.7975584, -0.49621], scale: 0.001, entrance: "77", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-4-3.jpg", pdf: "floorplans/77-4-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "77, 4. 4", gltf: "models/77, 4. 4.glb", position: [2.96956, 0.7662816, 0], scale: 0.001, entrance: "77", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-4-4.jpg", pdf: "floorplans/77-4-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L08-A"},
    {apname: "77, 5. 1", gltf: "models/77, 5. 1.glb", position: [2.52036, 0.9747936, 0], scale: 0.001, entrance: "77", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-5-1.jpg", pdf: "floorplans/77-5-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06"},
    {apname: "77, 5. 2", gltf: "models/77, 5. 2.glb", position: [2.28897, 0.9747936, 0], scale: 0.001, entrance: "77", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-5-2.jpg", pdf: "floorplans/77-5-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L05"},
    {apname: "77, 5. 3", gltf: "models/77, 5. 3.glb", position: [2.73858, 0.9487296, -0.49621], scale: 0.001, entrance: "77", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-5-3.jpg", pdf: "floorplans/77-5-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "77, 5. 4", gltf: "models/77, 5. 4.glb", position: [2.96956, 0.9174528, 0], scale: 0.001, entrance: "77", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-5-4.jpg", pdf: "floorplans/77-5-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L08-A"},
    {apname: "77, 6. 1", gltf: "models/77, 6. 1.glb", position: [2.52036, 1.1259648, 0], scale: 0.001, entrance: "77", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-6-1.jpg", pdf: "floorplans/77-6-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06"},
    {apname: "77, 6. 2", gltf: "models/77, 6. 2.glb", position: [2.28897, 1.1259648, 0], scale: 0.001, entrance: "77", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-6-2.jpg", pdf: "floorplans/77-6-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L05"},
    {apname: "77, 6. 3", gltf: "models/77, 6. 3.glb", position: [2.73858, 1.0999008, -0.49621], scale: 0.001, entrance: "77", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-6-3.jpg", pdf: "floorplans/77-6-3.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L07"},
    {apname: "77, 6. 4", gltf: "models/77, 6. 4.glb", position: [2.96956, 1.068624, 0], scale: 0.001, entrance: "77", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-6-4.jpg", pdf: "floorplans/77-6-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L08-A"},
    {apname: "77, 7. 1", gltf: "models/77, 7. 1.glb", position: [2.52036, 1.277136, 0], scale: 0.001, entrance: "77", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-7-1.jpg", pdf: "floorplans/77-7-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06"},
    {apname: "77, 7. 2", gltf: "models/77, 7. 2.glb", position: [2.28897, 1.277136, 0], scale: 0.001, entrance: "77", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-7-2.jpg", pdf: "floorplans/77-7-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L05"},
    {apname: "77, 7. 3", gltf: "models/77, 7. 3.glb", position: [3.04125, 1.2197952, -0.335], scale: 0.001, entrance: "77", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-7-3.jpg", pdf: "floorplans/77-7-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L26"},
    {apname: "77, 7. 4", gltf: "models/77, 7. 4.glb", position: [2.96956, 1.2197952, 0], scale: 0.001, entrance: "77", level: "7",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/77-7-4.jpg", pdf: "floorplans/77-7-4.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L25"},
    {apname: "77, 8. P1", gltf: "models/77, 8. P1.glb", position: [1.6073, 1.4647968, -0.22814], scale: 0.001, entrance: "77", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/77-8-P1.jpg", pdf: "floorplans/77-8-P1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P09-D"},
    {apname: "77, 8. P2", gltf: "models/77, 8. P2.glb", position: [1.83869, 1.4804352, 0.1], scale: 0.001, entrance: "77", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/77-8-P2.jpg", pdf: "floorplans/77-8-P2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P08-C"},
    {apname: "77, 8. P3", gltf: "models/77, 8. P3.glb", position: [2.07008, 1.4960736, 0.1], scale: 0.001, entrance: "77", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/77-8-P3.jpg", pdf: "floorplans/77-8-P3.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P04"},
    {apname: "77, 8. P4", gltf: "models/77, 8. P4.glb", position: [2.30147, 1.511712, 0.1], scale: 0.001, entrance: "77", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/77-8-P4.jpg", pdf: "floorplans/77-8-P4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P04-s"},
    {apname: "77, 8. P5", gltf: "models/77, 8. P5.glb", position: [2.53286, 1.5221376, 0.1], scale: 0.001, entrance: "77", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/77-8-P5.jpg", pdf: "floorplans/77-8-P5.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P03-s"},
    {apname: "77, 8. P6", gltf: "models/77, 8. P6.glb", position: [2.9704, 1.5534144, 0.1], scale: 0.001, entrance: "77", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/77-8-P6.jpg", pdf: "floorplans/77-8-P6.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P06-s"},
    {apname: "77, 8. P7", gltf: "models/77, 8. P7.glb", position: [3.20179, 1.5221376, 0.1], scale: 0.001, entrance: "77", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/77-8-P7.jpg", pdf: "floorplans/77-8-P7.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P29"},
    {apname: "79, 1. T1", gltf: "models/79, 1. T1.glb", position: [3.20149, 0.2971296, -0.07801], scale: 0.001, entrance: "79", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/79-1-T1.jpg", pdf: "floorplans/79-1-T1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T04-s"},
    {apname: "79, 1. T2", gltf: "models/79, 1. T2.glb", position: [3.43288, 0.2814912, -0.07801], scale: 0.001, entrance: "79", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/79-1-T2.jpg", pdf: "floorplans/79-1-T2.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T03-C"},
    {apname: "79, 1. T3", gltf: "models/79, 1. T3.glb", position: [3.88307, 0.2397888, -0.07801], scale: 0.001, entrance: "79", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/79-1-T3.jpg", pdf: "floorplans/79-1-T3.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Townhouse", apcode: "T20"},
    {apname: "79, 3. 1", gltf: "models/79, 3. 1.glb", position: [3.43288, 0.6151104, 0], scale: 0.001, entrance: "79", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-3-1.jpg", pdf: "floorplans/79-3-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L01-A"},
    {apname: "79, 3. 2", gltf: "models/79, 3. 2.glb", position: [3.66427, 0.5838336, -0.23735], scale: 0.001, entrance: "79", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-3-2.jpg", pdf: "floorplans/79-3-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L22"},
    {apname: "79, 4. 1", gltf: "models/79, 4. 1.glb", position: [3.43288, 0.7662816, 0], scale: 0.001, entrance: "79", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-4-1.jpg", pdf: "floorplans/79-4-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L01-A"},
    {apname: "79, 4. 2", gltf: "models/79, 4. 2.glb", position: [3.66427, 0.7350048, -0.23735], scale: 0.001, entrance: "79", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-4-2.jpg", pdf: "floorplans/79-4-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L22-A"},
    {apname: "79, 5. 1", gltf: "models/79, 5. 1.glb", position: [3.66427, 0.886176, 0], scale: 0.001, entrance: "79", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-5-1.jpg", pdf: "floorplans/79-5-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06-D"},
    {apname: "79, 5. 2", gltf: "models/79, 5. 2.glb", position: [3.43288, 0.886176, 0], scale: 0.001, entrance: "79", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-5-2.jpg", pdf: "floorplans/79-5-2.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L05-A"},
    {apname: "79, 5. 3", gltf: "models/79, 5. 3.glb", position: [3.88249, 0.9800064, 0], scale: 0.001, entrance: "79", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/79-5-3.jpg", pdf: "floorplans/79-5-3.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Penthouse", apcode: "P27"},
    {apname: "79, 6. 1", gltf: "models/79, 6. 1.glb", position: [3.43288, 1.068624, 0], scale: 0.001, entrance: "79", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-6-1.jpg", pdf: "floorplans/79-6-1.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L06-E"},
    {apname: "79, 6. 2", gltf: "models/79, 6. 2.glb", position: [3.43288, 1.0373472, -0.23752], scale: 0.001, entrance: "79", level: "6",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-6-2.jpg", pdf: "floorplans/79-6-2.pdf", rooms: "2", address: "Richard Mortensens Vej", segment: 6, objtype: "home", hometype:"Apartment", apcode: "L03-C"},
    
]

const models5 = [
    {apname: "77, 8. P8", gltf: "models/77, 8. P8.glb", position: [4.24, 1.3709664, -0.23727], scale: 0.001, entrance: "77", level: "8",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/77-8-P8.jpg", pdf: "floorplans/77-8-P8.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Penthouse", apcode: "P28"},
{apname: "79, 3. 3", gltf: "models/79, 3. 3.glb", position: [5, 0.5577696, 0], scale: 0.001, entrance: "79", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-3-3.jpg", pdf: "floorplans/79-3-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Apartment", apcode: "L06-Bs"},
{apname: "79, 3. 4", gltf: "models/79, 3. 4.glb", position: [5.2227, 0.5264928, 0], scale: 0.001, entrance: "79", level: "3",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-3-4.jpg", pdf: "floorplans/79-3-4.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Apartment", apcode: "L21"},
{apname: "79, 4. 3", gltf: "models/79, 4. 3.glb", position: [5, 0.7089408, 0], scale: 0.001, entrance: "79", level: "4",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"orange", url: "floorplans/79-4-3.jpg", pdf: "floorplans/79-4-3.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Apartment", apcode: "L23"},
{apname: "79, 5. 4", gltf: "models/79, 5. 4.glb", position: [5.2227, 0.8496864, 0], scale: 0.001, entrance: "79", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/79-5-4.jpg", pdf: "floorplans/79-5-4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Penthouse", apcode: "P25"},
{apname: "79, 5. 5", gltf: "models/79, 5. 5.glb", position: [5, 0.9800064, 0], scale: 0.001, entrance: "79", level: "5",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/79-5-5.jpg", pdf: "floorplans/79-5-5.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Penthouse", apcode: "P26"},
{apname: "81, 1. 1", gltf: "models/81, 1. 1.glb", position: [6.13566, 0.3231936, 0], scale: 0.001, entrance: "81", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/81-1-1.jpg", pdf: "floorplans/81-1-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Penthouse", apcode: "P21"},
{apname: "81, 1. 2", gltf: "models/81, 1. 2.glb", position: [6.36705, 0.1511712, 0], scale: 0.001, entrance: "81", level: "1",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/81-1-2.jpg", pdf: "floorplans/81-1-2.pdf", rooms: "5", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Penthouse", apcode: "P20"},
{apname: "81, 2. 1", gltf: "models/81, 2. 1.glb", position: [5.68548, 0.5838336, 0], scale: 0.001, entrance: "81", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/81-2-1.jpg", pdf: "floorplans/81-2-1.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Penthouse", apcode: "P23"},
{apname: "81, 2. 2", gltf: "models/81, 2. 2.glb", position: [5.45409, 0.5838336, 0], scale: 0.001, entrance: "81", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/81-2-2.jpg", pdf: "floorplans/81-2-2.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Penthouse", apcode: "P24"},
{apname: "81, 2. 3", gltf: "models/81, 2. 3.glb", position: [6.13566, 0.4535136, -0.23727], scale: 0.001, entrance: "81", level: "2",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"yellow", url: "floorplans/81-2-3.jpg", pdf: "floorplans/81-2-3.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Penthouse", apcode: "P22"},
{apname: "81, st. T1", gltf: "models/81, st. T1.glb", position: [5.2227, 0.2241504, -0.07801], scale: 0.001, entrance: "81", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/81-ST-T1.jpg", pdf: "floorplans/81-ST-T1.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Townhouse", apcode: "T01-A"},
{apname: "81, st. T2", gltf: "models/81, st. T2.glb", position: [5.45409, 0.208512, -0.07801], scale: 0.001, entrance: "81", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/81-ST-T2.jpg", pdf: "floorplans/81-ST-T2.pdf", rooms: "4", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Townhouse", apcode: "T01-As"},
{apname: "81, st. T3", gltf: "models/81, st. T3.glb", position: [5.68548, 0.1980864, -0.07801], scale: 0.001, entrance: "81", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/81-ST-T3.jpg", pdf: "floorplans/81-ST-T3.pdf", rooms: "6", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Townhouse", apcode: "T21"},
{apname: "81, st. T4", gltf: "models/81, st. T4.glb", position: [6.13566, 0.1668096, -0.07801], scale: 0.001, entrance: "81", level: "0",entrancevis: 1, levelvis: 1, roomsvis: 1, hometypevis: 1, apcodevis: 1, colour:"red", url: "floorplans/81-ST-T4.jpg", pdf: "floorplans/81-ST-T4.pdf", rooms: "3", address: "Richard Mortensens Vej", segment: 5, objtype: "home", hometype:"Townhouse", apcode: "T22"},

]

let loader1 = new GLTFLoader();
models1.forEach(modelDetails => {
  const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
  loader1.load(gltf, ({ scene }) => {
    modelContainer1.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                 roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
  });
});

let loader2 = new GLTFLoader();
models2.forEach(modelDetails => {
  const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
  loader2.load(gltf, ({ scene }) => {
    modelContainer2.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
  });
});

modelContainer2.position.set(4.19533 + 0.06, 0, 0)
const myAxis2 = new THREE.Vector3(0, 4.19533 + 0.06 , 0);
rotateAroundWorldAxis(modelContainer2, myAxis2, MathUtils.degToRad(65.72))

let loader3 = new GLTFLoader();
models3.forEach(modelDetails => {
const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
loader3.load(gltf, ({ scene }) => {
    modelContainer3.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
    });
});
    
modelContainer3.position.set(4.19533 + 0.06 + 3.45734 + 0.23139, 0, 0)
const myAxis3 = new THREE.Vector3(0, 1 , 0);
rotateAroundWorldAxis(modelContainer3, myAxis3, MathUtils.degToRad(65.72)) 
rotateAroundWorldAxis(modelContainer3, myAxis3, MathUtils.degToRad(-55.73))
modelContainer3.position.set(5.8,0,-3.35)


let loader4 = new GLTFLoader();
models4.forEach(modelDetails => {
const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
loader4.load(gltf, ({ scene }) => {
    modelContainer4.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
    });
});

modelContainer4.position.set(4.19533 + 0.06 + 3.45734 + 0.23139 + 4.161762, 0, 0)
const myAxis4 = new THREE.Vector3(0, 1 , 0);
rotateAroundWorldAxis(modelContainer4, myAxis4, MathUtils.degToRad(65.72)) 
rotateAroundWorldAxis(modelContainer4, myAxis4, MathUtils.degToRad(-55.73))
rotateAroundWorldAxis(modelContainer4, myAxis4, MathUtils.degToRad(-74.29))
modelContainer4.position.set(9.88,0,-4.25)
        

let loader8 = new GLTFLoader();
models8.forEach(modelDetails => {
const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
loader8.load(gltf, ({ scene }) => {
    modelContainer8.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
    });
});
        
//////// modelContainer8.position.set(4.19533 + 0.06 + 3.45734 + 0.23139 + 4.161762, 0, 0)
const myAxis8 = new THREE.Vector3(0, 1 , 0);
rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-66.45)) 
//////* rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-55.73))
//////rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-74.29)) */
modelContainer8.position.set(-0.175,0,-0.71)


let loader7 = new GLTFLoader();
models7.forEach(modelDetails => {
const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
loader7.load(gltf, ({ scene }) => {
    modelContainer7.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
    });
});
        
// modelContainer7.position.set(4.19533 + 0.06 + 3.45734 + 0.23139 + 4.161762, 0, 0)
const myAxis7 = new THREE.Vector3(0, 1 , 0);
rotateAroundWorldAxis(modelContainer7, myAxis7, MathUtils.degToRad(10)) 
/* rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-55.73))
rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-74.29)) */
modelContainer7.position.set(-0.25,0,-2.4)


let loader61 = new GLTFLoader();
models61.forEach(modelDetails => {
const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
loader61.load(gltf, ({ scene }) => {
    modelContainer61.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
    });
});
        
///// modelContainer61.position.set(4.19533 + 0.06 + 3.45734 + 0.23139 + 4.161762, 0, 0)
const myAxis61 = new THREE.Vector3(0, 1 , 0);
rotateAroundWorldAxis(modelContainer61, myAxis61, MathUtils.degToRad(-25)) 
/* rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-55.73))
rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-74.29)) */
modelContainer61.position.set(2.05,0,-3.17)


let loader6 = new GLTFLoader();
models6.forEach(modelDetails => {
const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
loader6.load(gltf, ({ scene }) => {
    modelContainer6.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
    });
});
        
///// modelContainer61.position.set(4.19533 + 0.06 + 3.45734 + 0.23139 + 4.161762, 0, 0)
const myAxis6 = new THREE.Vector3(0, 1 , 0);
rotateAroundWorldAxis(modelContainer6, myAxis6, MathUtils.degToRad(-25)) 
/* rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-55.73))
rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-74.29)) */
modelContainer6.position.set(5.145,0,-1.72)

let loader5 = new GLTFLoader();
models5.forEach(modelDetails => {
const { gltf, apname, scale, position, entrance, level, entrancevis, levelvis, roomsvis, hometypevis, apcodevis, colour, url, pdf, address, rooms, segment, objtype, hometype, apcode } = modelDetails;
loader5.load(gltf, ({ scene }) => {
    modelContainer5.add(scene);
    scene.scale.set(scale, scale, scale);
    scene.position.set(position[0],position[1],position[2]);
    scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
            ;const material = new THREE.MeshStandardMaterial( { color: colour } );
            ;(child as THREE.Mesh).material = material
            ,(child as THREE.Mesh).userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis,
                roomsvis: roomsvis, hometypevis: hometypevis, apcodevis: apcodevis, url: url, pdf: pdf, address: address, rooms: rooms, objtype: objtype, hometype: hometype, apcode: apcode}
            ;let geo = (child as THREE.Mesh).geometry
            ;const edges = new THREE.EdgesGeometry((child as THREE.Mesh).geometry);
            /* ;const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'black', linewidth: 10, linecap: 'round' } ) )
            ;line.userData = { name: apname , entrance: entrance, level: level, entrancevis: entrancevis, levelvis: levelvis, roomsvis: roomsvis, url: url, address: address, rooms: rooms, objtype: objtype}
            ;scene.add( line ); */
        }
    })
    });
});
        
///// modelContainer61.position.set(4.19533 + 0.06 + 3.45734 + 0.23139 + 4.161762, 0, 0)
//const myAxis5 = new THREE.Vector3(0, 1 , 0);
//rotateAroundWorldAxis(modelContainer5, myAxis5, MathUtils.degToRad(2)) 
/* rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-55.73))
rotateAroundWorldAxis(modelContainer8, myAxis8, MathUtils.degToRad(-74.29)) */
modelContainer5.position.set(4,0,0.065)



//console.log(scene.getWorldPosition)
//console.log(scene.position)
scene.position.x = -5
scene.position.y = -2.5
//scene.position.set(-10,0,-2.5)


const textMaterial = new THREE.MeshStandardMaterial( { color: 0xff5050 } );
const fontLoader = new FontLoader();
const font = fontLoader.load(
    'font/Klavika Web Basic Bold_Regular.json',
    font => {
            const textMesh = new THREE.Mesh();
            textMesh.geometry = new TextGeometry('8TALLET', {
            font: font,
            size: 1,
            height: 0.05,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 12
        });
        textMesh.position.set(2, 5, -2);
        textMesh.material = textMaterial;
        scene.add(textMesh);
    });



var rotObjectMatrix;
function rotateAroundObjectAxis(object: THREE.Object3D, axis: THREE.Vector3, radians: number) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotObjectMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);
}

var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space       
function rotateAroundWorldAxis(object: THREE.Object3D, axis: THREE.Vector3, radians: number) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    setTimeout( function() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }, 100
    )
}

function onMouseMove(event: MouseEvent) {
 
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

function onMouseDown(event: MouseEvent) {
    //console.log(event.target)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.layers.set(0);

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0)
        {
            if ((intersects[0].object as THREE.Object3D).userData.name)
            {
                if ((intersects[0].object as THREE.Object3D).visible)
                {
                    locked = true;
                    if (selection) selection.innerText = (intersects[0].object as THREE.Object3D).userData.address + "\n" + 
                        (intersects[0].object as THREE.Object3D).userData.name + "\n\n"
                    var a = document.createElement('a');
                    var linkText = document.createTextNode("Floorplan (jpg)");
                    a.appendChild(linkText);
                    a.title = "Floorplan (jpg)";
                    a.href = (intersects[0].object as THREE.Object3D).userData.url;
                    a.target = "_blank"
                    if (selection) selection.append(a);
                    if (selection) selection.append(document.createElement('br'));
                    var a2 = document.createElement('a');
                    var linkText = document.createTextNode("Floorplan (pdf)");
                    a2.appendChild(linkText);
                    a2.title = "Floorplan (pdf)";
                    a2.href = (intersects[0].object as THREE.Object3D).userData.pdf;
                    a2.target = "_blank"
                    if (selection) selection.append(a2);
                    if (selection) selection.append(document.createElement('br'));
                    if (selection) selection.append(document.createElement('br'));
                    var a3 = document.createElement('a')
                    a3.appendChild(document.createTextNode('Show other similar homes'))
                    a3.id = "otherHomes"
                    a3.dataset.apcode = (intersects[0].object as THREE.Object3D).userData.apcode
                    a3.title = "Show other similar homes"
                    a3.href = "#"
                    if (selection) selection.append(a3);
                    showOtherHomesLink = document.getElementById("otherHomes");
                    if (showOtherHomesLink) showOtherHomesLink.onclick = function() {
                        showSimilarHomes((a3.dataset.apcode as string))
                    }
                };
            }
        }
        else
        {
            locked = false;
            if (selection) selection.innerText = '-'
        }
}

function hover() {
    if ( locked == false )
    {
        raycaster.setFromCamera(mouse, camera);
        raycaster.layers.set(0);
        const intersects = raycaster.intersectObjects(scene.children);
        
        if (intersects.length > 0)
        {
            if ((intersects[0].object as THREE.Object3D).userData.name)
            {
                if ((intersects[0].object as THREE.Object3D).visible)
                {
                    if (selection) selection.innerText = (intersects[0].object as THREE.Object3D).userData.address + "\n" + 
                        (intersects[0].object as THREE.Object3D).userData.name
                };
            }
        }
        else
        {
            if (selection) selection.innerText = '-'
        }
    }
}


// Get the modal
var modal = document.getElementById("infoModal");

// Get the button that opens the modal
var btn = document.getElementById("infoLink");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0] as HTMLElement;

// When the user clicks on the button, open the modal
if (btn) btn.onclick = function() {
  if (modal) modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  if (modal) modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    if (modal) modal.style.display = "none";
  }
}

//window.addEventListener('mousemove', onMouseMove, false);
//window.addEventListener( 'mousedown', onMouseDown, false );
document.querySelector('canvas')?.addEventListener( 'mousemove', onMouseMove, false );
document.querySelector('canvas')?.addEventListener( 'mousedown', onMouseDown, false );


//const stats = Stats()
//document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()
    hover();

    //stats.update()
}

function filterReset() {
    params.entrance60 = true
    params.entrance62 = true
    params.entrance63 = true
    params.entrance64 = true
    params.entrance65 = true
    params.entrance66 = true
    params.entrance67 = true
    params.entrance68 = true
    params.entrance69 = true
    params.entrance70 = true
    params.entrance71 = true
    params.entrance72 = true
    params.entrance73 = true
    params.entrance74 = true
    params.entrance75 = true
    params.entrance76 = true
    params.entrance77 = true
    params.entrance78 = true
    params.entrance79 = true
    params.entrance80 = true
    params.entrance81 = true
    params.entrance82 = true
    params.entrance84 = true
    params.entrance86 = true
    params.entrance88 = true
   
    params.level0 = true
    params.level1 = true
    params.level2 = true
    params.level3 = true
    params.level4 = true
    params.level5 = true
    params.level6 = true
    params.level7 = true
    params.level8 = true
    params.level9 = true
    
    params.rooms2 = true
    params.rooms3 = true
    params.rooms4 = true
    params.rooms5 = true
    params.rooms6 = true
    params.rooms7 = true

    params.hometypeApartment = true
    params.hometypePenthouse = true
    params.hometypeTownhouse = true

    let tempobjarr: THREE.Object3D[] = [];
    var filtertype = "objtype"
    var filtervalue = "home"
    const objects = getObjectsByProperty(scene, filtertype, filtervalue, tempobjarr);
    
    for (let i = 0; i < objects.length; i++)
    {
        (objects as THREE.Object3D[])[i].visible = true;
        (objects as THREE.Object3D[])[i].layers.set(0);
        (objects as THREE.Object3D[])[i].userData['levelvis'] = 1;
        (objects as THREE.Object3D[])[i].userData['roomsvis'] = 1;
        (objects as THREE.Object3D[])[i].userData['entrancevis'] = 1;
        (objects as THREE.Object3D[])[i].userData['hometypevis'] = 1;
    }
}

function filterHideAll() {
    let tempobjarr: THREE.Object3D[] = [];
    var filtertype = "objtype"
    var filtervalue = "home"
    const objects = getObjectsByProperty(scene, filtertype, filtervalue, tempobjarr);
    
    for (let i = 0; i < objects.length; i++)
    {
        (objects as THREE.Object3D[])[i].visible = false;
        (objects as THREE.Object3D[])[i].layers.set(1);
        (objects as THREE.Object3D[])[i].userData['levelvis'] = 1;
        (objects as THREE.Object3D[])[i].userData['roomsvis'] = 1;
        (objects as THREE.Object3D[])[i].userData['entrancevis'] = 1;
        (objects as THREE.Object3D[])[i].userData['hometypevis'] = 1;
    }
}

function filterObj(filtertype: string, filtervalue: string, value: boolean) {
    var indexEnt = filtertype + filtervalue;
    //var indexoldEnt = "old" + filtertype + filtervalue;
    var state = filtertype + "vis"
    let tempobjarr: THREE.Object3D[] = [];
    const objects = getObjectsByProperty(scene, filtertype, filtervalue, tempobjarr);
    if (params[indexEnt as keyof typeof params] == false) {
        for (let i = 0; i < objects.length; i++) {
            (objects as THREE.Object3D[])[i].visible = false;
            (objects as THREE.Object3D[])[i].layers.set(1);
            (objects as THREE.Object3D[])[i].userData[state] = 0;
        }
    }
    if ( params[indexEnt as keyof typeof params] == true ) {
        for (let i = 0; i < objects.length; i++) {
            (objects as THREE.Object3D[])[i].userData[state] = 1;
            if ( (objects as THREE.Object3D[])[i].userData['levelvis'] == 1 &&
                (objects as THREE.Object3D[])[i].userData['roomsvis'] == 1 &&
                (objects as THREE.Object3D[])[i].userData['entrancevis'] == 1 &&
                (objects as THREE.Object3D[])[i].userData['hometypevis'] == 1
            )
            {
                (objects as THREE.Object3D[])[i].layers.set(0);
                (objects as THREE.Object3D[])[i].visible = true;
            }
            (objects as THREE.Object3D[])[i].userData[state] = 1;
        }
    }
}

function showSimilarHomes(apcode : string) {
    filterHideAll();
    let tempobjarr: THREE.Object3D[] = [];
    const objects = getObjectsByProperty(scene, 'apcode', apcode, tempobjarr);
    for (let i = 0; i < objects.length; i++) {
        (objects as THREE.Object3D[])[i].layers.set(0);
        (objects as THREE.Object3D[])[i].visible = true;
    }
}

function render() {
    renderer.render(scene, camera)
}



animate()