import { inject, Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetCoursesResponse } from '../models/get-courses.response';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private env = environment;
    private http = inject(HttpClient);

    public loadAllCourses = async (): Promise<Course[]> => {
        const url = `${this.env.apiRoot}/courses`;
        const courses$ = this.http.get<GetCoursesResponse>(url);
        const response = await firstValueFrom(courses$);
        return response.courses;
    };

    public createCourse = async (course: Partial<Course>): Promise<Course> => {
        const url = `${this.env.apiRoot}/courses`;
        const course$ = this.http.post<Course>(url, course);
        return firstValueFrom(course$);
    };

    public saveCourse = async (
        courseId: string,
        changes: Partial<Course>,
    ): Promise<Course> => {
        const url = `${this.env.apiRoot}/courses/${courseId}`;
        const course$ = this.http.put<Course>(url, changes);
        return firstValueFrom(course$);
    };

    public deleteCourse = async (courseId: string): Promise<Course> => {
        const url = `${this.env.apiRoot}/courses/${courseId}`;
        const delete$ = this.http.delete<Course>(url);
        return firstValueFrom(delete$);
    };
}
