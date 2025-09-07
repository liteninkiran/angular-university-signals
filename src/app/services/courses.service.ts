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
        console.log(url);
        const courses$ = this.http.get<GetCoursesResponse>(url);
        const response = await firstValueFrom(courses$);
        return response.courses;
    };
}
