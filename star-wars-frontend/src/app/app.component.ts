import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OfflineService } from './services/offline.service';

interface StarWarsTypes {
  value: string;
  label: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatGridListModule, MatButtonModule, ReactiveFormsModule, MatCardModule, MatProgressBarModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  startLoading = false;
  result = {};
  title = 'Star Wars!';
  form!: FormGroup;
  types: StarWarsTypes[] = [
    { value: 'planets', label: 'Planets' },
    { value: 'starships', label: 'Starships' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'people', label: 'People' },
    { value: 'films', label: 'Films' },
    { value: 'species', label: 'Species' },
  ];
  offlineService = inject(OfflineService);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      name: ['']
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.startLoading = true;
      let query = `?type=${this.form.get("type")?.value}`;
      if (this.form.get("name")?.value) {
        query += `&name=${this.form.get("name")?.value}`
      }
      this.offlineService.get(query, this.form.get("type")?.value, this.form.get("name")?.value).subscribe({
        next: (result) => {
          this.result = result;
          this.startLoading = false;
        },
        error: (error) => {
          this.result = error?.error;
          this.startLoading = false;
        },
        complete: () => {}
      })
    }
  }

  changeAppMode() {
    this.offlineService.isAppOnline.next(this.offlineService.onlineMode)
  }
}
