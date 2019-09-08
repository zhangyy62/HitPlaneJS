import * as THREE from './lib/three.module.js'; 
import { ConvexObjectBreaker } from './lib/ConvexObjectBreaker.js';
var convexBreaker = new ConvexObjectBreaker();

// Colors
var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
};
  
  // AirPlane
export function AirPlane() {

    // parent node
    this.mesh = new THREE.Object3D();

    // cabin
    var cockpit = new THREE.Mesh(
        new THREE.BoxGeometry(60,50,50), 
        new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading})
    );

    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
    convexBreaker.prepareBreakableObject(cockpit, 100, new THREE.Vector3(), new THREE.Vector3(), true );

    // engine
    var engine = new THREE.Mesh(
        new THREE.BoxGeometry(20,50,50), 
        new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading})
    );

    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);
    convexBreaker.prepareBreakableObject( engine, 100, new THREE.Vector3(), new THREE.Vector3(), true );

    // tail
    var tail = new THREE.Mesh(
        new THREE.BoxGeometry(15,20,5), 
        new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading})
    );

    tail.position.set(-35,25,0);
    tail.castShadow = true;
    tail.receiveShadow = true;
    this.mesh.add(tail);
    convexBreaker.prepareBreakableObject( tail, 100, new THREE.Vector3(), new THREE.Vector3(), true );

    // wing
    var wing = new THREE.Mesh(
        new THREE.BoxGeometry(40,8,150), 
        new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading})
    );

    wing.castShadow = true;
    wing.receiveShadow = true;
    this.mesh.add(wing);
    convexBreaker.prepareBreakableObject( wing, 100, new THREE.Vector3(), new THREE.Vector3(), true );

    // propeller
    // 注意：這裡有建立新的座標系統（為了讓它旋轉）
    this.propeller = new THREE.Mesh(
        new THREE.BoxGeometry(20,10,10), 
        new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading})
    );

    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;
    convexBreaker.prepareBreakableObject(this.propeller, 100, new THREE.Vector3(), new THREE.Vector3(), true );


    // blades
    var blade = new THREE.Mesh(
        new THREE.BoxGeometry(1,100,20), 
        new THREE.MeshPhongMaterial({
        color:Colors.brownDark, shading:THREE.FlatShading
        })
    );

    // 將 blade 放到 propeller 的座標系
    blade.position.set(8,0,0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    convexBreaker.prepareBreakableObject(blade, 100, new THREE.Vector3(), new THREE.Vector3(), true );

    // 將 propeller 放到整架飛機的座標系
    this.propeller.position.set(50,0,0);
    this.mesh.add(this.propeller);
}
  
AirPlane.prototype.propell = function(theta){
    theta = theta || 0.02;
    this.propeller.rotation.x += theta;
};
