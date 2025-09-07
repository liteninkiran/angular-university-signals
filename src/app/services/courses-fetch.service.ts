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
}
