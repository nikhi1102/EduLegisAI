import React, { useEffect, useRef } from 'react';
import './DarkVeilBackground.css';

const DarkVeilBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particles representing the "veil" or soft glow
        const particles = [];
        const particleCount = 15;

        // Color configuration - Primary Orange
        const hue = 9; // Based on --primary-h: 9
        const saturation = 96; // --primary-s: 96%
        const lightness = 56; // --primary-l: 56%

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 100 + 150; // Large, soft radius
                this.vx = (Math.random() - 0.5) * 0.5; // Slow movement X
                this.vy = (Math.random() - 0.5) * 0.5; // Slow movement Y
                this.opacity = Math.random() * 0.3 + 0.1; // Low opacity
                this.growth = (Math.random() - 0.5) * 0.2; // Pulse effect
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.radius += this.growth;

                // Bounce off edges with damping
                if (this.x < -this.radius || this.x > canvas.width + this.radius) this.vx *= -1;
                if (this.y < -this.radius || this.y > canvas.height + this.radius) this.vy *= -1;

                // Pulse radius limits
                if (this.radius > 300 || this.radius < 100) this.growth *= -1;
            }

            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                // Core color
                gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.opacity})`);
                // Fade out
                gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw a base dark background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Composite mode for blending "veil" feel
            ctx.globalCompositeOperation = 'screen';

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="dark-veil-container">
            <canvas ref={canvasRef} className="dark-veil-canvas" />
        </div>
    );
};

export default DarkVeilBackground;
