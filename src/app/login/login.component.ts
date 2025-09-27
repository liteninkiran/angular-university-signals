import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../services/auth.service';

const formDef = {
    email: ['test@angular-university.io'],
    password: [''],
};

@Component({
    selector: 'login',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    public fb = inject(FormBuilder);
    public messagesService = inject(MessagesService);
    public authService = inject(AuthService);
    public router = inject(Router);

    public form = this.fb.group(formDef);

    public async onLogin() {
        try {
            const { email, password } = this.form.value;
            if (!email || !password) {
                this.messagesService.showMessage(
                    'Enter email and password',
                    'error',
                );
                return;
            }

            await this.authService.login(email, password);
            await this.router.navigate(['/home']);
        } catch (err) {
            console.error(err);
            this.messagesService.showMessage(
                'Login failed. Please try again.',
                'error',
            );
        }
    }
}
