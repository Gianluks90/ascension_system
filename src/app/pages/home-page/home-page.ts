import { Component } from "@angular/core";
import { Header } from "../../components/shared/header/header";
import { IconBtn } from "../../components/ui/icon-btn/icon-btn";

@Component({
  selector: "app-home-page",
  imports: [Header],
  templateUrl: "./home-page.html",
  styleUrl: "./home-page.scss",
})
export class HomePage {}
