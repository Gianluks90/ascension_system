import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firebase } from './services/firebase';
import { Theme } from './services/theme';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FullScreenWarning } from "./components/shared/full-screen-warning/full-screen-warning";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FullScreenWarning],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ascension-system');
  public isMobile: WritableSignal<boolean> = signal(false);

  constructor(
    private firebaseService: Firebase,
    private themeService: Theme,
    private bo: BreakpointObserver) {
    if (localStorage.getItem('theme')) {
      this.themeService.currentTheme = localStorage.getItem('theme') as 'light' | 'dark';
    } else {
      this.themeService.currentTheme = 'light';
    }

    this.bo.observe('(max-width: 768px)').subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }
}
