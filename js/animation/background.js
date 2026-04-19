export function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 100 },
      size: { value: 3 },
      move: { speed: 2 },
      line_linked: { enable: true },
    },
  });
}
