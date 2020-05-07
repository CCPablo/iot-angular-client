import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;
  private controls :OrbitControls;
  private loader = new GLTFLoader();

  private cube: THREE.Mesh;

  private frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.controls = new OrbitControls(this.camera,this.renderer.domElement);

    // soft white light
    this.light = new THREE.AmbientLight( 0x777777 );
    this.light.position.z = 2;
    this.scene.add(this.light);

    const geometry = new THREE.BoxGeometry(1,2, 1);
    const material =   new THREE.MeshLambertMaterial(
      {
        color: 0xCC0000
      });
    this.cube = new THREE.Mesh( geometry, material );
    //this.scene.add(this.cube);

    this.loader.load("assets/lamp.gltf", gltf => {
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.scale.set(1, 1, 1); // scale here
      this.scene.add(gltf.scene);
    });
  }

  public updateCubeSize(newSize): void {
    this.cube.geometry = new THREE.BoxGeometry(newSize.x, newSize.y, newSize.z);
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }
}
