import Sound from 'react-native-sound';

const GLOBAL_PLAYBACK_VOLUME = 0.2;

// Declare it in main index.js file later
Sound.setCategory('Playback');
export const SPOKE_SOUND = new Sound('spoke.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log(
    'Duration in seconds: ' +
    SPOKE_SOUND.getDuration() +
    'number of channels: ' +
    SPOKE_SOUND.getNumberOfChannels(),
  );

  // TODO: Equalize volume for same sound effect
  SPOKE_SOUND.setVolume(GLOBAL_PLAYBACK_VOLUME);
});
