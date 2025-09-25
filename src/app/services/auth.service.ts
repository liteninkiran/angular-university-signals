import { computed, inject, Injectable, signal } from '@angular/core';
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
    http = inject(HttpClient);
    router = inject(Router);

    #userSignal = signal<User | null>(null);
    public user = this.#userSignal.asReadonly();
    isLoggedIn = computed(() => !!this.user());

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
