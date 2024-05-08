class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Привет, меня зовут ${this.name} и мне ${this.age} лет.`);
  }

  get occupation() {
    return 'Неизвестно';
  }
}

export default class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  sayHello() {
    console.log(`Привет, меня зовут ${this.name}, мне ${this.age} лет и я учусь в ${this.grade} классе.`);
  }

  get hobbies() {
    return ['Чтение', 'Спорт', 'Готовка'];
  }
}


