// Визначення базових типів a, b, c; 
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

// Створення основних структур
type Professor = {
    id: number;
    name: string;
    department: string;
};

type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

type Course = {
    id: number;
    name: string;
    type: CourseType;
};

type Lesson = {
    id: number;
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

// масиви даних
let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];

function addProfessor(professor: Professor): void {
    professors.push(professor);
    console.log(`Професор ${professor.name} доданий.`);
}
// Обробка конфліктів та валідація
type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

function validateLesson(lesson: Lesson): ScheduleConflict | null {
    // чи професор вже має заняття в цей час
    const professorConflict = schedule.find(l => 
        l.professorId === lesson.professorId && 
        l.dayOfWeek === lesson.dayOfWeek && 
        l.timeSlot === lesson.timeSlot
    );

    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }
    // чи аудиторія вже зайнята в цей час
    const classroomConflict = schedule.find(l => 
        l.classroomNumber === lesson.classroomNumber && 
        l.dayOfWeek === lesson.dayOfWeek && 
        l.timeSlot === lesson.timeSlot
    );

    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }

    return null;
}

function addLesson(lesson: Lesson): boolean {
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
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    // беремо аудиторії які зайняті
    const occupiedClassrooms = schedule
        .filter(l => l.timeSlot === timeSlot && l.dayOfWeek === dayOfWeek)
        .map(l => l.classroomNumber);
    // фільтруємо вільні
    return classrooms
        .filter(c => !occupiedClassrooms.includes(c.number))
        .map(c => c.number);
}

function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(l => l.professorId === professorId);
}

function getClassroomUtilization(classroomNumber: string): number {
    const lessonsInClassroom = schedule.filter(l => l.classroomNumber === classroomNumber).length;
    // 5 днів і 5 пар
    const totalSlotsPerWeek = 5 * 5;
    if (totalSlotsPerWeek === 0) return 0;
    return (lessonsInClassroom / totalSlotsPerWeek) * 100;
}

function getMostPopularCourseType(): CourseType {
    // створюємо лічильник 
    let counts = { "Lecture": 0, "Seminar": 0, "Lab": 0, "Practice": 0 };
    // рахємо кожен тип
    schedule.forEach(lesson => {
        const course = courses.find(c => c.id === lesson.courseId);
        if (course) counts[course.type]++;
    });
    // знаходимо макс
    let maxCount = 0;
    let popularType: CourseType = "Lecture";
    const types: CourseType[] = ["Lecture", "Seminar", "Lab", "Practice"];
    types.forEach(type => {
        if (counts[type] > maxCount) {
            maxCount = counts[type];
            popularType = type;
        }
    });
    return popularType;
}

function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    //  шукаємо об'єкт напряму
    const lesson = schedule.find(l => l.id === lessonId);
    
    if (!lesson) {
        console.log("Заняття не знайдено");
        return false;
    }

    //  TypeScript знає що lesson існує
    const conflict = schedule.find(l => 
        l.id !== lessonId && 
        l.classroomNumber === newClassroomNumber && 
        l.dayOfWeek === lesson.dayOfWeek && 
        l.timeSlot === lesson.timeSlot
    );

    if (conflict) {
        console.log("Нова аудиторія зайнята в цей час.");
        return false;
    }
    // змінюємо аудиторію
    lesson.classroomNumber = newClassroomNumber;
    console.log(`Аудиторію змінено на ${newClassroomNumber}`);
    return true;
}

function cancelLesson(lessonId: number): void {
    const initialLength = schedule.length;
    schedule = schedule.filter(l => l.id !== lessonId);
    if (schedule.length < initialLength) {
        console.log(`Заняття ${lessonId} скасовано.`);
    } else {
        console.log(`Заняття ${lessonId} не знайдено.`);
    }
}

// тести
classrooms.push(
    { number: "101", capacity: 30, hasProjector: true },
    { number: "102", capacity: 20, hasProjector: false }
);
courses.push(
    { id: 1, name: "Math Analysis", type: "Lecture" },
    { id: 2, name: "Programming", type: "Lab" }
);
addProfessor({ id: 1, name: "Ivan Petrenko", department: "CS" });
addProfessor({ id: 2, name: "Oksana Melnyk", department: "Math" });

const lesson1: Lesson = { id: 1, courseId: 1, professorId: 2, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" };
const lesson2: Lesson = { id: 2, courseId: 2, professorId: 1, classroomNumber: "102", dayOfWeek: "Monday", timeSlot: "8:30-10:00" };
const lesson3: Lesson = { id: 3, courseId: 1, professorId: 2, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" };

console.log("--- START TEST ---");
addLesson(lesson1);
addLesson(lesson2);
addLesson(lesson3);
console.log("Available classrooms:", findAvailableClassrooms("8:30-10:00", "Monday"));
console.log("Utilization 101:", getClassroomUtilization("101") + "%");
reassignClassroom(2, "101"); // error
cancelLesson(1); 
reassignClassroom(2, "101"); // success