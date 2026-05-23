# 🎵 Sound Files — Cheers Magazine

Place your MP3 files in the sub-folders below, then test them at `/dev/sound-lab.html`.

## Folder Structure

```
sounds/
  page-flip/
    page-flip-soft.mp3       ← light paper turn
    page-flip-hard.mp3       ← crisp glossy paper
    page-flip-quick.mp3      ← fast swipe sound
  hover/
    luxury-hover.mp3
    nav-hover.mp3
  click/
    premium-click.mp3
    nav-click.mp3
  transitions/
    cinematic-transition.mp3
    smooth-transition.mp3
  notifications/
    success-notification.mp3
    error-notification.mp3
  immersive/
    magazine-open.mp3
    reader-ambient.mp3
```

## Free Sound Resources

- https://freesound.org — search "page flip", "paper turn", "book page"
- https://zapsplat.com
- https://mixkit.co/free-sound-effects/

## How to Connect Sounds to the Reader

The reader uses the Web Audio API to synthesise sounds by default.
To use real MP3 files, add this to `js/reader.js` inside `playFlipSound()`:

```js
const audio = new Audio('sounds/page-flip/page-flip-soft.mp3');
audio.volume = 0.7;
audio.play().catch(() => {}); // catch autoplay block
return; // skip synthesis
```
