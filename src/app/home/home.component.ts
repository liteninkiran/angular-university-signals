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
    public values = signal<number[]>([0]);

    public append(): void {
        // const values = this.values();
        // const last = values[values.length - 1];
        // this.values.set([...values, last + 1]);
        this.values.update((values) => [
            ...values,
            values[values.length - 1] + 1,
        ]);
    }
}
