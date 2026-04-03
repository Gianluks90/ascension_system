import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firebase } from './services/firebase';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ascension-system');
  
  constructor(private firebaseService: Firebase) {}
}
