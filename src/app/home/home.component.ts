import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';

const filterBeginner = (course: Course) => course.category === 'BEGINNER';
const filterAdvanced = (course: Course) => course.category === 'ADVANCED';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [MatTabGroup, MatTab, CoursesCardListComponent],
})
export class HomeComponent {
    #courses = signal<Course[]>([]);
    #begComputedFn = () => this.#courses().filter(filterBeginner);
    #advComputedFn = () => this.#courses().filter(filterAdvanced);
    public coursesService = inject(CoursesService);
    public beginnerCourses = computed(this.#begComputedFn);
    public advancedCourses = computed(this.#advComputedFn);

    constructor() {
        effect(() => {
            console.log('Beginner Courses', this.beginnerCourses());
            console.log('Advanced Courses', this.advancedCourses());
        });
        this.loadCourses().then(() =>
            console.log('*** All courses loaded ***', this.#courses()),
        );
    }

    public async loadCourses(): Promise<void> {
        try {
            const courses = await this.coursesService.loadAllCourses();
            this.#courses.set(courses.sort(sortCoursesBySeqNo));
        } catch (err) {
            alert('Error loading courses');
            console.log(err);
        }
    }

    public onCourseUpdated(updatedCourse: Course): void {
        const courses = this.#courses();
        const mapFn = (course: Course) =>
            course.id === updatedCourse.id ? updatedCourse : course;
        const newCourses = courses.map(mapFn);
        this.#courses.set(newCourses);
    }
}
