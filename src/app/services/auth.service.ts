import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

const USER_STORAGE_KEY = 'user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    #userSignal = signal<User | null>(null);
    private user = this.#userSignal.asReadonly();
    public isLoggedIn = computed(() => !!this.user());

    constructor() {
        this.loadUserFromStorage();
        effect(() => {
            const user = this.user();
            if (user) {
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            }
        });
    }

    private loadUserFromStorage() {
        const json = localStorage.getItem(USER_STORAGE_KEY);
        if (json) {
            const user = JSON.parse(json);
            this.#userSignal.set(user);
        }
    }

    public async login(email: string, password: string): Promise<User> {
        const url = `${environment.apiRoot}/login`;
        const payload = { email, password };
        const login$ = this.http.post<User>(url, payload);
        const user = await firstValueFrom(login$);
        this.#userSignal.set(user);
        return user;
    }

    public async logout(): Promise<void> {
        localStorage.removeItem(USER_STORAGE_KEY);
        this.#userSignal.set(null);
        await this.router.navigateByUrl('/login');
    }
}
