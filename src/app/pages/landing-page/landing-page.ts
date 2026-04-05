import { Component, inject } from "@angular/core";
import { APP_VERSION } from "../../consts/app-version";
import { BaseBtn } from "../../components/ui/base-btn/base-btn";
import { IconBtn } from "../../components/ui/icon-btn/icon-btn";
import { Theme } from "../../services/theme";
import { Dialog } from "@angular/cdk/dialog";
import { AuthDialog } from "../../components/dialogs/auth-dialog/auth-dialog";
import { DIALOGS_CONFIG } from "../../consts/dialogsConfig";

@Component({
  selector: "app-landing-page",
  imports: [BaseBtn, IconBtn],
  templateUrl: "./landing-page.html",
  styleUrl: "./landing-page.scss",
})
export class LandingPage {
  public appVersion = APP_VERSION;
  public themeService = inject(Theme);

  constructor(private dialog: Dialog) {}

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthDialog, {
      ...DIALOGS_CONFIG
    });

    dialogRef.closed.subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }
}
