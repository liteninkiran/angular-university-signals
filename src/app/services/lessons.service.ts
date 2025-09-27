import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { firstValueFrom } from 'rxjs';
import { Lesson } from '../models/lesson.model';

type Config = {
    courseId?: string;
    query?: string;
};

@Injectable({
    providedIn: 'root',
})
export class LessonsService {
    private env = environment;
    private http = inject(HttpClient);

    public loadLessons = async (config: Config): Promise<Lesson[]> => {
        const params = this.setParams(config);
        const url = `${this.env.apiRoot}/search-lessons`;
        const lessons$ = this.http.get<GetLessonsResponse>(url, { params });
        const response = await firstValueFrom(lessons$);
        return response.lessons;
    };

    public saveLesson = async (
        lessonId: string,
        changes: Partial<Lesson>,
    ): Promise<Lesson> => {
        const url = `${this.env.apiRoot}/lessons/${lessonId}`;
        const saveLesson$ = this.http.put<Lesson>(url, changes);
        return firstValueFrom(saveLesson$);
    };

    private setParams(config: Config): HttpParams {
        const { courseId, query } = config;
        let params = new HttpParams();

        if (courseId) {
            params = params.set('courseId', courseId);
        }
        if (query) {
            params = params.set('query', query);
        }
        return params;
    }
}
