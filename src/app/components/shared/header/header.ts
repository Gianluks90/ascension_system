import { Component, inject, signal } from "@angular/core";
import { IconBtn } from "../../ui/icon-btn/icon-btn";
import { Auth } from "../../../services/auth";
import { Theme } from "../../../services/theme";

@Component({
  selector: "app-header",
  imports: [IconBtn],
  templateUrl: "./header.html",
  styleUrl: "./header.scss",
})
export class Header {
  constructor(private authService: Auth) {}

  public themeService = inject(Theme);
  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public logout() {
    console.log('Logging out...');
    this.authService.logout();
  } 
}
