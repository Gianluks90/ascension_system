import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firebase } from './services/firebase';
import { Theme } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ascension-system');
  
  constructor(private firebaseService: Firebase, private themeService: Theme) {
    if (localStorage.getItem('theme')) {
      this.themeService.currentTheme = localStorage.getItem('theme') as 'light' | 'dark';
    } else {
      this.themeService.currentTheme = 'light';
    }
  }
}
