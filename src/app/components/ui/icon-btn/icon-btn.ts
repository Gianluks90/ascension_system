import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-icon-btn",
  imports: [],
  templateUrl: "./icon-btn.html",
  styleUrl: "./icon-btn.scss",
})
export class IconBtn {
  public icon = input<string>("question_mark");
  public disabled = input<boolean>(false);
  public clicked = output<void>();

  public handleClick() {
    if (this.disabled()) return;
    this.clicked.emit();
  }
}
