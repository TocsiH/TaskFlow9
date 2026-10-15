import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface HealthResponse {
  status: string;
  application: string;
  backend: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly health = signal<HealthResponse | null>(null);
  readonly error = signal<string | null>(null);

  private readonly http = inject(HttpClient);

  constructor() {
    this.http.get<HealthResponse>('/api/health').subscribe({
      next: (response) => this.health.set(response),
      error: () => this.error.set('Impossible de joindre l’API Symfony.'),
    });
  }
}