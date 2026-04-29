// Three.js 3D Scene Setup
let scene, camera, renderer;
let geometries = [];
let particles = [];

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;
    
    // Renderer
    const container = document.getElementById('canvas-container');
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xff3333, 0.6);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xff6666, 1, 200);
    pointLight1.position.set(50, 50, 50);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff0000, 0.8, 200);
    pointLight2.position.set(-50, -50, 30);
    scene.add(pointLight2);
    
    // Create PS2 RSOD style geometry
    createGeometries();
    createParticles();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('click', redirectToLink);
    
    // Start animation
    animate();
}

function createGeometries() {
    // Create pixelated/blocky geometric shapes in red tones
    const materials = [
        new THREE.MeshStandardMaterial({ 
            color: 0xff3333, 
            metalness: 0.8, 
            roughness: 0.2 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0xff6666, 
            metalness: 0.7, 
            roughness: 0.3 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0xcc0000, 
            metalness: 0.9, 
            roughness: 0.1 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0xff0000, 
            metalness: 0.6, 
            roughness: 0.4 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0x990000, 
            metalness: 0.8, 
            roughness: 0.2 
        }),
    ];
    
    // Create scattered boxes
    for (let i = 0; i < 15; i++) {
        const size = Math.random() * 15 + 5;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 200;
        mesh.position.y = (Math.random() - 0.5) * 200;
        mesh.position.z = (Math.random() - 0.5) * 300 - 100;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;
        
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            positionOffset: {
                x: Math.random() * 0.05,
                y: Math.random() * 0.05
            }
        };
        
        scene.add(mesh);
        geometries.push(mesh);
    }
    
    // Create some tetrahedrons for variety
    for (let i = 0; i < 8; i++) {
        const size = Math.random() * 10 + 3;
        const geometry = new THREE.TetrahedronGeometry(size);
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 200;
        mesh.position.y = (Math.random() - 0.5) * 200;
        mesh.position.z = (Math.random() - 0.5) * 300 - 100;
        
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.015,
                y: (Math.random() - 0.5) * 0.015,
                z: (Math.random() - 0.5) * 0.015
            },
            positionOffset: {
                x: Math.random() * 0.03,
                y: Math.random() * 0.03
            }
        };
        
        scene.add(mesh);
        geometries.push(mesh);
    }
    
    // Create octahedrons
    for (let i = 0; i < 6; i++) {
        const size = Math.random() * 8 + 2;
        const geometry = new THREE.OctahedronGeometry(size);
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 200;
        mesh.position.y = (Math.random() - 0.5) * 200;
        mesh.position.z = (Math.random() - 0.5) * 300 - 100;
        
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.012,
                y: (Math.random() - 0.5) * 0.012,
                z: (Math.random() - 0.5) * 0.012
            },
            positionOffset: {
                x: Math.random() * 0.04,
                y: Math.random() * 0.04
            }
        };
        
        scene.add(mesh);
        geometries.push(mesh);
    }
}

function createParticles() {
    // Create particle system for PS2 effect
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 400;
        positions[i + 1] = (Math.random() - 0.5) * 400;
        positions[i + 2] = (Math.random() - 0.5) * 400;
        
        velocities[i] = (Math.random() - 0.5) * 0.5;
        velocities[i + 1] = (Math.random() - 0.5) * 0.5;
        velocities[i + 2] = (Math.random() - 0.5) * 0.5;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xff3333,
        size: 2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    particles = {
        system: particleSystem,
        velocities: velocities,
        positions: positions
    };
}

function animate() {
    requestAnimationFrame(animate);
    
    // Animate geometries
    geometries.forEach((mesh, index) => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;
        
        mesh.position.x += Math.sin(Date.now() * 0.0002 + index) * mesh.userData.positionOffset.x;
        mesh.position.y += Math.cos(Date.now() * 0.0002 + index) * mesh.userData.positionOffset.y;
    });
    
    // Animate particles
    if (particles.system) {
        const posAttr = particles.system.geometry.attributes.position;
        const positions = posAttr.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += particles.velocities[i];
            positions[i + 1] += particles.velocities[i + 1];
            positions[i + 2] += particles.velocities[i + 2];
            
            // Wrap around
            if (Math.abs(positions[i]) > 200) particles.velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 200) particles.velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 200) particles.velocities[i + 2] *= -1;
        }
        
        posAttr.needsUpdate = true;
        particles.system.rotation.x += 0.0001;
        particles.system.rotation.y += 0.0002;
    }
    
    // Add slight camera movement
    camera.position.x = Math.sin(Date.now() * 0.0001) * 5;
    camera.position.y = Math.cos(Date.now() * 0.00008) * 5;
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function redirectToLink() {
    window.location.href = 'https://exor4ik.github.io/website';
}

// Initialize when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}
