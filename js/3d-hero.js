
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hero-3d-container');
    if (!container) return;
    
    // Disable 3D hero on mobile to save performance, bandwidth, and parsing time
    if (window.matchMedia('(max-width: 767px)').matches) {
        container.style.display = 'none';
        return;
    }

    // Dynamically load Three.js only for desktop devices, deferred until browser is idle
    const loadThreeJS = () => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = init3DHero;
        document.head.appendChild(script);
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadThreeJS);
    } else {
        setTimeout(loadThreeJS, 1000);
    }

    function init3DHero() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    // Transparent background
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Initial Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x3B82F6, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Main Geometry - Tech Sphere
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x3B82F6, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner Core
    const coreGeometry = new THREE.IcosahedronGeometry(0.8, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        emissive: 0x3B82F6,
        emissiveIntensity: 0.5,
        roughness: 0.2
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 8; // Spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.002;
        
        core.rotation.x -= 0.005;
        core.rotation.y -= 0.005;

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x -= 0.001;

        // Gentle float effect
        sphere.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        core.position.y = Math.sin(Date.now() * 0.001) * 0.1;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    }
});
