function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}
let mySound;
let mySound2;
let mySound3;
let mySoundGoal1;
let mySoundGoal2;

mySound = new sound(
  "/audio/zapsplat_foley_whistle_two_tone_blow_ref_final_soccer_close_up_002_39343.mp3"
);
mySound2 = new sound(
  "/audio/zapsplat_sport_afl_australia_football_bounce_ground_003.mp3"
);
mySound3 = new sound(
  "/audio/zapsplat_sport_afl_australia_football_bounce_ground_002.mp3"
);
mySoundGoal1 = new sound(
  "/audio/human_audience_comedy_club_komedia_comic_boom_person_cheer_clap_audience_tone_background.mp3"
);
mySoundGoal2 = new sound(
  "/audio/human_crowd_approx_150_people_cheer_indoors.mp3"
);
