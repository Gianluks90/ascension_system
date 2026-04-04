import { Component, inject } from "@angular/core";
import { APP_VERSION } from "../../consts/app-version";
import { BaseBtn } from "../../components/ui/base-btn/base-btn";
import { IconBtn } from "../../components/ui/icon-btn/icon-btn";
import { Theme } from "../../services/theme";

@Component({
  selector: "app-landing-page",
  imports: [BaseBtn, IconBtn],
  templateUrl: "./landing-page.html",
  styleUrl: "./landing-page.scss",
})
export class LandingPage {
  public appVersion = APP_VERSION;
  public themeService = inject(Theme);

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
