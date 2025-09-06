import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Course } from '../models/course.model';

@Injectable({
    providedIn: 'root',
})
export class CoursesServiceWithFetch {
    env = environment;

    public loadAllCourses = async (): Promise<Course[]> => {
        const response = await fetch(`${this.env.apiRoot}/api/courses`);
        const payload = await response.json();
        return payload.courses;
    };
}
