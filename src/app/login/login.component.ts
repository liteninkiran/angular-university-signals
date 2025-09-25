import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../services/auth.service';

const formDef = {
    email: [''],
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
    authService = inject(AuthService);

    public form = this.fb.group(formDef);

    public onLogin(): void {
        try {
            const { email, password } = this.form.value;
            if (!email || !password) {
                this.messagesService.showMessage(
                    'Enter email and password',
                    'error',
                );
            }
        } catch (err) {
            console.error(err);
            this.messagesService.showMessage(
                'Login failed. Please try again.',
                'error',
            );
        }
    }
}
