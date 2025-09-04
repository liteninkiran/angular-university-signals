import { Component, signal } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [MatTabGroup, MatTab],
})
export class HomeComponent {
    public counter = signal(0);

    public increment(): void {
        this.counter.set(this.counter() + 1);
    }
}
