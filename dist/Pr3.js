"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// масиви даних
let professors = [];
let classrooms = [];
let courses = [];
let schedule = [];
function addProfessor(professor) {
    professors.push(professor);
    console.log(`Професор ${professor.name} доданий.`);
}
function validateLesson(lesson) {
    // чи професор вже має заняття в цей час
    const professorConflict = schedule.find(l => l.professorId === lesson.professorId &&
        l.dayOfWeek === lesson.dayOfWeek &&
        l.timeSlot === lesson.timeSlot);
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }
    // чи аудиторія вже зайнята в цей час
    const classroomConflict = schedule.find(l => l.classroomNumber === lesson.classroomNumber &&
        l.dayOfWeek === lesson.dayOfWeek &&
        l.timeSlot === lesson.timeSlot);
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }
    return null;
}
function addLesson(lesson) {
    // валідуємо спочатку
    const conflict = validateLesson(lesson);
    if (conflict) {
        console.log(`Помилка: ${conflict.type}. Заняття не додано.`);
        return false;
    }
    schedule.push(lesson);
    console.log(`Заняття з курсу ${lesson.courseId} успішно додано.`);
    return true;
}
// Функції пошуку та фільтрації
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    // беремо аудиторії які зайняті
    const occupiedClassrooms = schedule
        .filter(l => l.timeSlot === timeSlot && l.dayOfWeek === dayOfWeek)
        .map(l => l.classroomNumber);
    // фільтруємо вільні
    return classrooms
        .filter(c => !occupiedClassrooms.includes(c.number))
        .map(c => c.number);
}
function getProfessorSchedule(professorId) {
    return schedule.filter(l => l.professorId === professorId);
}
function getClassroomUtilization(classroomNumber) {
    const lessonsInClassroom = schedule.filter(l => l.classroomNumber === classroomNumber).length;
    // 5 днів і 5 пар
    const totalSlotsPerWeek = 5 * 5;
    if (totalSlotsPerWeek === 0)
        return 0;
    return (lessonsInClassroom / totalSlotsPerWeek) * 100;
}
function getMostPopularCourseType() {
    // створюємо лічильник 
    let counts = { "Lecture": 0, "Seminar": 0, "Lab": 0, "Practice": 0 };
    // рахємо кожен тип
    schedule.forEach(lesson => {
        const course = courses.find(c => c.id === lesson.courseId);
        if (course)
            counts[course.type]++;
    });
    // знаходимо макс
    let maxCount = 0;
    let popularType = "Lecture";
    const types = ["Lecture", "Seminar", "Lab", "Practice"];
    types.forEach(type => {
        if (counts[type] > maxCount) {
            maxCount = counts[type];
            popularType = type;
        }
    });
    return popularType;
}
function reassignClassroom(lessonId, newClassroomNumber) {
    //  шукаємо об'єкт напряму
    const lesson = schedule.find(l => l.id === lessonId);
    if (!lesson) {
        console.log("Заняття не знайдено");
        return false;
    }
    //  TypeScript знає що lesson існує
    const conflict = schedule.find(l => l.id !== lessonId &&
        l.classroomNumber === newClassroomNumber &&
        l.dayOfWeek === lesson.dayOfWeek &&
        l.timeSlot === lesson.timeSlot);
    if (conflict) {
        console.log("Нова аудиторія зайнята в цей час.");
        return false;
    }
    // змінюємо аудиторію
    lesson.classroomNumber = newClassroomNumber;
    console.log(`Аудиторію змінено на ${newClassroomNumber}`);
    return true;
}
function cancelLesson(lessonId) {
    const initialLength = schedule.length;
    schedule = schedule.filter(l => l.id !== lessonId);
    if (schedule.length < initialLength) {
        console.log(`Заняття ${lessonId} скасовано.`);
    }
    else {
        console.log(`Заняття ${lessonId} не знайдено.`);
    }
}
// тести
classrooms.push({ number: "101", capacity: 30, hasProjector: true }, { number: "102", capacity: 20, hasProjector: false });
courses.push({ id: 1, name: "Math Analysis", type: "Lecture" }, { id: 2, name: "Programming", type: "Lab" });
addProfessor({ id: 1, name: "Ivan Petrenko", department: "CS" });
addProfessor({ id: 2, name: "Oksana Melnyk", department: "Math" });
const lesson1 = { id: 1, courseId: 1, professorId: 2, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" };
const lesson2 = { id: 2, courseId: 2, professorId: 1, classroomNumber: "102", dayOfWeek: "Monday", timeSlot: "8:30-10:00" };
const lesson3 = { id: 3, courseId: 1, professorId: 2, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" };
console.log("--- START TEST ---");
addLesson(lesson1);
addLesson(lesson2);
addLesson(lesson3);
console.log("Available classrooms:", findAvailableClassrooms("8:30-10:00", "Monday"));
console.log("Utilization 101:", getClassroomUtilization("101") + "%");
reassignClassroom(2, "101"); // error
cancelLesson(1);
reassignClassroom(2, "101"); // success
//# sourceMappingURL=Pr3.js.map