class Animal {
  constructor(sound) {
    this.sound = sound;
  }

  speak(message) {
    const animalSound = ` ${this.sound} `;
    return `${message.replace(/ /g, animalSound)}${animalSound} `;
  }
}

class Lion extends Animal{
  constructor(){
    super('roar');
  }
}

class Tiger extends Animal{
  constructor(){
    super('grrr');
  }
}

const lion = new Lion();
const tiger = new Tiger();

const lionMessage = lion.speak("I'm a lion");
const tigerMessage = tiger.speak("Lions suck");

console.log(lionMessage);
console.log(tigerMessage);