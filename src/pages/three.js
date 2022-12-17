import { AmbientLight, Color, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { useRef, useEffect } from "@wordpress/element";

export default () => {
  const canvas = useRef(null)
  let wpt_resizeObserver
  let requestRef

  useEffect(() => {
    if (!canvas.current) return

    // scene
    const scene = new Scene()

    //create our sphere
    const geometry = new SphereGeometry(3,128,128)
    const material = new MeshStandardMaterial({
      color: '#00ff83'
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    // sizes
    const sizes = {
      with  : canvas.current.clientWidth,
      height: canvas.current.clientHeight
    }

    // light
    const light = new PointLight("#fff", 1, 100)
    light.position.set(0,10,10)

    const ambientLight = new AmbientLight("#d2d2d2", 0.1);
    scene.add(light)
    scene.add(ambientLight)

    // camera
    const camera = new PerspectiveCamera(45, sizes.with / sizes.height, 0.1, 100)
    camera.position.z = 20
    scene.add(camera)

    // renderer
    const renderer = new WebGLRenderer({
      canvas: canvas.current,
      // antialias: true
    })
    renderer.setSize(sizes.with, sizes.height)
    // renderer.setPixelRatio(2)
    renderer.render(scene, camera)

    // controls
    const controls = new OrbitControls(camera, canvas.current)
    controls.enableDamping   = true
    controls.enablePan       = false
    controls.enableZoom      = false
    controls.autoRotate      = true
    controls.autoRotateSpeed = 5

    // loop
    const animate = () => {
      // console.log('loop')
      controls.update()
      renderer.render(scene, camera)
      requestRef = requestAnimationFrame(animate)
    }
    animate()

    // timeline magic
    const tl = gsap.timeline({defaults: {duration: 1}})
    tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })

    // function betterRandom () {
    //   let newColor = new Color(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
    //   gsap.to(mesh.material.color, { 
    //     duration: 2,
    //     r: newColor.r,
    //     b: newColor.b,
    //     g: newColor.g,
    //     // '--randomColor': "rgb(random(0,155,100), random(1,255,0), random(155,0,1))", 
    //     onComplete: betterRandom
    //   })
    // }
    // betterRandom()

    // event window
    const eventResizeWindow = (width, height) => {
      sizes.with = width ?? window.innerWidth
      sizes.height = height ?? window.innerHeight

      // console.log(width, height)

      // update camera
      camera.aspect = sizes.with / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.with, sizes.height)
    }
    // window.addEventListener('resize', eventResizeWindow)

    wpt_resizeObserver = new ResizeObserver((entries) => {
      let temp_with = 0
      let temp_height = 0
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          // Firefox implements `contentBoxSize` as a single content rect, rather than an array
          const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

          temp_with = contentBoxSize.inlineSize
          temp_height = contentBoxSize.blockSize
        } else {
          temp_with = entry.contentRect.width
          temp_height = entry.contentRect.height
        }
      }

      eventResizeWindow(temp_with, temp_height)
    })
    wpt_resizeObserver.observe(canvas.current)

    return () => {
      if (canvas.current) {
        wpt_resizeObserver.unobserve(canvas.current)
      }
      cancelAnimationFrame(requestRef)
    }
  }, [])

  return(
    <canvas ref={canvas} class="w-full h-full"></canvas>
  )
}