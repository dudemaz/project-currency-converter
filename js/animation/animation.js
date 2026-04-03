import { CustomCursor,Spotlight,Parallax } from './mouse-animations.js';

new CustomCursor({
  innerSize: 9,
  outerSize: 30,
  innerColor: '#4c19e6',
  outerColor: 'rgba(167, 139, 250, 0.15)',
  smoothness: 0.2,
})
new Spotlight({
  selector: '.spotlight-target',
  color: 'rgba(61,92,214,0.12)',
  size: 150,
})
new Parallax({
  selector: '.parallax-target',
  depth: 80,
  ease: 0.4,
})