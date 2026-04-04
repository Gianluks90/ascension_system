import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Theme {
  private _currentTheme: "light" | "dark" = "light";

  public toggleTheme(): void {
    this.currentTheme = this._currentTheme === "light" ? "dark" : "light";
  }

  get currentTheme() {
    return this._currentTheme;
  }

  set currentTheme(value: "light" | "dark") {
    this._currentTheme = value;
    this.applyTheme();
  }

  get themeIcon() {
    return this.currentTheme === 'light' ? 'dark_mode' : 'light_mode';
  }

  private applyTheme(): void {
    const body = document.body;
    if (this.currentTheme === "light") {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }
  }
}
