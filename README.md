# Museum Portals: An Interactive Multi-Gallery Narrative Experience

An immersive, choice-based interactive museum experience featuring three themed museums with artifact exploration and 360° viewing modes.

## Features

### Three Themed Museums

1. **History Museum (Ancient Civilization Hall)**
   - Egyptian Gold Death Mask
   - Royal Crown of Medieval Empire
   - Ceremonial War Scepter

2. **Natural History Museum (Prehistoric Wonders)**
   - Tyrannosaurus Rex Skull Fossil
   - Pteranodon Skeleton
   - Woolly Mammoth Skull

3. **Fine Arts Museum (Masters Collection)**
   - Mona Lisa
   - Venus de Milo
   - The Last Supper

### Interactive Features

- **Cinematic Entrance**: Animated museum facade with opening doors
- **Portal Selection**: Three glowing museum portals with unique themes
- **360° Artifact Viewer**: Drag to rotate, scroll to zoom on any artifact
- **Detailed Descriptions**: Rich historical and cultural information
- **Seamless Navigation**: Return buttons to navigate between scenes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Visual Feedback**: Hover effects, animations, and particle effects
- **Audio System**: Ambient sounds and sound effects (simulated via Web Audio API)

## How to Use

1. **Open the Experience**: Open `index.html` in a modern web browser
2. **Enter the Museum**: Click the glowing entrance door
3. **Choose Your Journey**: Select one of three museum portals
4. **Explore Artifacts**: Click any artifact to enter 360° viewing mode
5. **Interact**: Drag to rotate, scroll to zoom
6. **Navigate Back**: Use "Return to Lobby" button to explore other museums

## Technical Details

### Technologies Used

- Pure HTML5, CSS3, and JavaScript (no frameworks required)
- CSS Grid and Flexbox for responsive layouts
- CSS animations and transitions
- CSS 3D transforms for artifact rotation
- Web Audio API for sound effects
- Touch events for mobile support

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### File Structure

```
Museum/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
└── README.md           # Documentation
```

## Interaction Controls

### Desktop
- **Click**: Select doors, portals, and artifacts
- **Drag**: Rotate artifacts in 3D viewer
- **Scroll**: Zoom in/out on artifacts
- **Hover**: See interactive feedback
- **ESC**: Close artifact viewer

### Mobile
- **Tap**: Select doors, portals, and artifacts
- **Swipe**: Rotate artifacts in 3D viewer
- **Pinch**: Zoom in/out on artifacts (simulated with single touch drag)

## Design Philosophy

### Affordance
- Glowing elements indicate interactivity
- Hover states provide immediate feedback
- Tooltips guide user actions

### Feedback
- Sound cues for interactions
- Smooth animations and transitions
- Visual particle effects on clicks
- Light pulses and glowing effects

### Outcome
- Educational artifact descriptions
- Immersive historical journey
- Discovery through exploration
- Understanding human legacy across time

## Customization

### Adding Audio Files

To add real audio files, modify the `playAmbientSound()` function in `script.js`:

```javascript
function playAmbientSound(type) {
    const ambientAudio = document.getElementById('ambient-sound');
    const audioFiles = {
        entrance: 'audio/entrance.mp3',
        lobby: 'audio/lobby.mp3',
        history: 'audio/history.mp3',
        nature: 'audio/nature.mp3',
        art: 'audio/art.mp3'
    };

    ambientAudio.src = audioFiles[type];
    ambientAudio.play();
}
```

### Modifying Artifacts

Edit the `artifactData` object in `script.js` to change descriptions or add new artifacts.

### Styling Customization

All visual styles are in `styles.css`. Key sections:
- Scene backgrounds
- Portal designs
- Artifact appearances
- Animation timing and effects

## Performance Considerations

- Animations pause when tab is not visible
- Efficient CSS transforms for smooth 60fps animations
- Minimal DOM manipulation
- Optimized for mobile performance

## Accessibility Features

- Keyboard navigation (ESC to close viewer)
- High contrast visual elements
- Clear interactive affordances
- Responsive text sizing
- Touch-friendly hit targets (minimum 44x44px)

## Future Enhancements

Potential additions:
- Real audio files for ambient sounds
- More museums and artifacts
- Multilingual support
- Virtual reality mode
- Sharing and bookmarking features
- Progressive unlocking of museums
- Achievement system

## Credits

Created as an immersive educational experience exploring human history, nature, and art through interactive storytelling.

## License

This project is open source and available for educational purposes.

---

**Enjoy your journey through the Museum Portals!**
