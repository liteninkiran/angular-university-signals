import {
    Component,
    computed,
    effect,
    inject,
    Injector,
    signal,
} from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { EditCourseDialogData } from '../edit-course-dialog/edit-course-dialog.data.model';
import { MessagesService } from '../messages/messages.service';
import {
    toObservable,
    ToObservableOptions,
    toSignal,
} from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

const filterBeginner = (course: Course) => course.category === 'BEGINNER';
const filterAdvanced = (course: Course) => course.category === 'ADVANCED';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [MatTabGroup, MatTab, MatTooltip, CoursesCardListComponent],
})
export class HomeComponent {
    // Signals
    #courses = signal<Course[]>([]);

    // Compted Signals
    #begComputedFn = () => this.#courses().filter(filterBeginner);
    #advComputedFn = () => this.#courses().filter(filterAdvanced);
    public beginnerCourses = computed(this.#begComputedFn);
    public advancedCourses = computed(this.#advComputedFn);

    // Services
    private coursesService = inject(CoursesService);
    private messagesService = inject(MessagesService);

    // Other Services
    private dialog = inject(MatDialog);
    private injector = inject(Injector);
    private options: ToObservableOptions = {
        injector: this.injector,
    };

    // Observables
    private courses$ = from(this.coursesService.loadAllCourses());

    constructor() {
        this.loadCourses();
    }

    public async loadCourses(): Promise<void> {
        try {
            const courses = await this.coursesService.loadAllCourses();
            this.#courses.set(courses.sort(sortCoursesBySeqNo));
        } catch (err) {
            this.messagesService.showMessage('Error loading courses', 'error');
        }
    }

    public onCourseUpdated(updatedCourse: Course): void {
        const courses = this.#courses();
        const mapFn = (course: Course) =>
            course.id === updatedCourse.id ? updatedCourse : course;
        const newCourses = courses.map(mapFn);
        this.#courses.set(newCourses);
    }

    public async onCourseDeleted(id: string) {
        try {
            await this.coursesService.deleteCourse(id);
            const filterFn = (course: Course) => course.id !== id;
            const courses = this.#courses();
            const newCourses = courses.filter(filterFn);
            this.#courses.set(newCourses);
        } catch (err) {
            alert('Error deleting course');
        }
    }

    public async onAddCourse() {
        (document.activeElement as HTMLElement)?.blur();
        const data: EditCourseDialogData = {
            mode: 'create',
            title: 'Create New Course',
        };
        const newCourse = await openEditCourseDialog(this.dialog, data);
        if (newCourse === undefined) return;
        const newCourses = [...this.#courses(), newCourse];
        this.#courses.set(newCourses);
    }

    public onToObservableExample1(): void {
        const courses$ = toObservable(this.#courses, this.options);
        courses$.subscribe(console.log);
    }

    public onToObservableExample2(): void {
        const numbers = signal(0);
        numbers.set(1);
        numbers.set(2);
        numbers.set(3);
        const numbers$ = toObservable(numbers, this.options);
        numbers.set(4);
        const fn = (val: number) => console.log(`Number: ${val}`);
        numbers$.subscribe(fn);
        numbers.set(5);
    }

    public onToSignalExample(): void {
        const courses = toSignal(this.courses$, this.options);
        effect(() => console.log(courses()), this.options);
    }
}
