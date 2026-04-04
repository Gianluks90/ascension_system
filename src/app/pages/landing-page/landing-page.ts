import { Component } from "@angular/core";
import { APP_VERSION } from "../../consts/app-version";
import { BaseBtn } from "../../components/ui/base-btn/base-btn";
import { IconBtn } from "../../components/ui/icon-btn/icon-btn";

@Component({
  selector: "app-landing-page",
  imports: [BaseBtn, IconBtn],
  templateUrl: "./landing-page.html",
  styleUrl: "./landing-page.scss",
})
export class LandingPage {
  public appVersion = APP_VERSION;
}
