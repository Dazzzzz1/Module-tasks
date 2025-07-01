'use strict'

class University{
    constructor(name){
        this.name = name;
        this.faculties = [];
    }
    addFaculty(facultyName) {
        if (!this.faculties.includes(facultyName)) {
            this.faculties.push(facultyName);
        } else {
            console.log(`Факультет "${facultyName}" уже существует в универе ${this.name}.`);
        }
    }
    removeFaculty(facultyName) {
        const index = this.faculties.indexOf(facultyName);
        if (index !== -1) {
            this.faculties.splice(index, 1);
            console.log(`Факультет "${facultyName}" удалён из универа ${this.name}.`);
        } else {
            console.log(`Факультета "${facultyName}" нет в универе ${this.name}.`);
        }
    }
    displayFaculties() {
        if (this.faculties.length === 0) {
            console.log(`В универе ${this.name} нет факультетов!`);
        } else {
            console.log(`Факультеты: ${this.name}:`);
            this.faculties.forEach((faculty, index) => {
                console.log(`${index + 1}. ${faculty}`);
            });
        }
    }
}

let myUniversity = new University("БГУИР");

myUniversity.addFaculty("ИЭФ");
myUniversity.addFaculty("ФКСИС");
myUniversity.addFaculty("ФКП");
myUniversity.addFaculty("ИЭФ");

myUniversity.displayFaculties();
myUniversity.removeFaculty("ФКСИС");
myUniversity.removeFaculty("ФИТУ");
myUniversity.displayFaculties();