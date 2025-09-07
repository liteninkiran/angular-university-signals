import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';

@Injectable({
    providedIn: 'root',
})
export class CoursesServiceWithFetch {
    private env = environment;

    public loadAllCourses = async (): Promise<Course[]> => {
        const response = await fetch(`${this.env.apiRoot}/courses`);
        const payload = await response.json();
        return payload.courses;
    };

    public createCourse = async (course: Partial<Course>): Promise<Course> => {
        const url = `${this.env.apiRoot}/courses`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        };
        const response = await fetch(url, options);
        return response.json();
    };

    public saveCourse = async (
        courseId: string,
        changes: Partial<Course>,
    ): Promise<Course> => {
        const url = `${this.env.apiRoot}/courses/${courseId}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changes),
        };
        const response = await fetch(url, options);
        return response.json();
    };

    public deleteCourse = async (courseId: string): Promise<void> => {
        const url = `${this.env.apiRoot}/courses/${courseId}`;
        const options = { method: 'DELETE' };
        await fetch(url, options);
    };
}
