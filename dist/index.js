"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// enums 
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var Grade;
(function (Grade) {
    Grade[Grade["Excellent"] = 5] = "Excellent";
    Grade[Grade["Good"] = 4] = "Good";
    Grade[Grade["Satisfactory"] = 3] = "Satisfactory";
    Grade[Grade["Unsatisfactory"] = 2] = "Unsatisfactory";
})(Grade || (Grade = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
// 3 class
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        // для реєстрації 
        this.registrations = [];
        this.currentIdCounter = 1;
    }
    // доданий метод щоб додавати курси
    addCourse(course) {
        this.courses.push(course);
    }
    //методи: 
    // зарахування студента
    enrollStudent(studentData) {
        const newStudent = Object.assign(Object.assign({}, studentData), { id: this.currentIdCounter++ });
        this.students.push(newStudent);
        console.log(`студент ${newStudent.fullName} зарахований з ID: ${newStudent.id}`);
        return newStudent;
    }
    //реєстрація студента   
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        // перевірка чи існують студент і курс
        if (!student || !course) {
            console.log("помилка - студента або курс не знайдено.");
            return;
        }
        // перевіряемо на відповідність факультуту 
        if (student.faculty !== course.faculty) {
            console.log(`помилка-студент з факультету ${student.faculty} не може записатись на курс факультету ${course.faculty}.`);
            return;
        }
        // перевіряємо чи вже зареєстрований
        const isAlreadyRegistered = this.registrations.some(r => r.studentId === studentId && r.courseId === courseId);
        if (isAlreadyRegistered) {
            console.log("помилка - студент вже зареєстрований .");
            return;
        }
        // загальна кількість місць тобто поточні реєстрації
        const currentRegistrationsCount = this.registrations.filter(r => r.courseId === courseId).length;
        if (currentRegistrationsCount >= course.maxStudents) {
            console.log("помилка- немає вільних місць.");
            return;
        }
        this.registrations.push({ studentId, courseId });
        console.log(`студент ${student.fullName} успішно зареєстрований на курс ${course.name}.`);
    }
    //виставлення оцінки
    setGrade(studentId, courseId, grade) {
        // перевіряемо чи зареєстрований студент якщо ні - нема оцінки
        const isRegistered = this.registrations.some(r => r.studentId === studentId && r.courseId === courseId);
        if (!isRegistered) {
            console.log(`помилка - студент ${studentId} не зареєстрований на курс ${courseId} оцінку поставити неможливо.`);
            return;
        }
        // беремо інформацію про курс 
        const course = this.courses.find(c => c.id === courseId);
        if (!course)
            return;
        // формуємо запис про оцінку
        const newGrade = {
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester
        };
        this.grades.push(newGrade);
        console.log(`оцінка ${grade} виставлена студенту ${studentId} курс ${courseId}.`);
    }
    // оновлення статусу 
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            console.log("студента не знайдено.");
            return;
        }
        // додатково валідуємо 
        if (student.status === StudentStatus.Expelled && newStatus === StudentStatus.Active) {
            console.log("помилка - не можна активувати відрахованого студента.");
            return;
        }
        student.status = newStatus;
        console.log(`статус студента ${student.fullName} змінено на ${newStatus}.`);
    }
    // отримання студентів за факультетом
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    // отримання оцінки студента
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    // вільні курси
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    // рахуємо середній бал
    calculateAverageGrade(studentId) {
        const studentGrades = this.getStudentGrades(studentId);
        // якщо оцінок немає то 0
        if (studentGrades.length === 0)
            return 0;
        const sum = studentGrades.reduce((acc, curr) => acc + curr.grade, 0);
        return sum / studentGrades.length;
    }
    // отримання відмінників за факультетом(оцінка 4.5 і вище)
    getTopStudentsByFaculty(faculty) {
        const facultyStudents = this.getStudentsByFaculty(faculty);
        return facultyStudents.filter(student => {
            const avg = this.calculateAverageGrade(student.id);
            // мінімальна оцінка для відмінника
            return avg >= 4.5;
        });
    }
}
// тести
const system = new UniversityManagementSystem();
// додаємо курси(2 різних факультетм)
system.addCourse({
    id: 101,
    name: "Introduction to Programming",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
});
system.addCourse({
    id: 102,
    name: "Microeconomics",
    type: CourseType.Mandatory,
    credits: 4,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 50
});
// зараховуємо студентів
const student1 = system.enrollStudent({
    fullName: "Katty Parry",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-101"
});
const student2 = system.enrollStudent({
    fullName: "will Smith",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-101"
});
// реєструемо студентів
console.log("\nРеєстрація");
system.registerForCourse(student1.id, 101); // тут все добре
system.registerForCourse(student1.id, 102); // а тут не вірний факультет
// висталяемо оцінки
console.log("\ Оцінювання");
system.setGrade(student1.id, 101, Grade.Excellent); // 5 все ок
system.setGrade(student1.id, 102, Grade.Good); // тут не зареєстрований
// перевіряемо статуси та оцінку
console.log("\n інше");
system.updateStudentStatus(student1.id, StudentStatus.Academic_Leave);
console.log("середній бал Student 1:", system.calculateAverageGrade(student1.id));
// тестимо з відмінником
system.registerForCourse(student2.id, 101);
system.setGrade(student2.id, 101, Grade.Excellent);
const topStudents = system.getTopStudentsByFaculty(Faculty.Computer_Science);
console.log("відмінники CS:", topStudents.map(s => s.fullName));
//# sourceMappingURL=index.js.map