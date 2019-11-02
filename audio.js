function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  let myMusic;
  let mySound;

  mySound = new sound("/audio/zapsplat_foley_whistle_two_tone_blow_ref_final_soccer_close_up_002_39343.mp3");
