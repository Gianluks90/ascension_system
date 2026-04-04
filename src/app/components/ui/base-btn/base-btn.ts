import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-base-btn",
  imports: [],
  templateUrl: "./base-btn.html",
  styleUrl: "./base-btn.scss",
})
export class BaseBtn {
  public label = input<string>("missing-label");
  public icon = input<string | null>(null);
  public fullWidth = input<boolean>(false);
  public disabled = input<boolean>(false);
  public clicked = output<void>();

  public handleClick() {
    if (this.disabled()) return;
    this.clicked.emit();
  }

}
