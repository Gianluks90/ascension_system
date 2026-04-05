import { Component } from "@angular/core";
import { DialogWrapper } from "../../ui/dialog-wrapper/dialog-wrapper";
import { BaseBtn } from "../../ui/base-btn/base-btn";
import { DialogRef } from "@angular/cdk/dialog";

interface AuthDialogResult {
    success: boolean;
}

@Component({
  selector: "app-auth-dialog",
  imports: [DialogWrapper, BaseBtn],
  templateUrl: "./auth-dialog.html",
  styleUrl: "./auth-dialog.scss",
})
export class AuthDialog {
  constructor(private dialogRef: DialogRef<AuthDialogResult>) {}

  close(): void {
    this.dialogRef.close({
        success: false
    });
  }
}
