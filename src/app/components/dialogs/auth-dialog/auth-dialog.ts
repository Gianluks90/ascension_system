import { Component } from "@angular/core";
import { DialogWrapper } from "../../ui/dialog-wrapper/dialog-wrapper";
import { BaseBtn } from "../../ui/base-btn/base-btn";
import { DialogRef } from "@angular/cdk/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

interface AuthDialogResult {
  success: boolean;
  credentials?: any;
}

@Component({
  selector: "app-auth-dialog",
  imports: [DialogWrapper, BaseBtn, ReactiveFormsModule],
  templateUrl: "./auth-dialog.html",
  styleUrl: "./auth-dialog.scss",
})
export class AuthDialog {
  public authForm: FormGroup;
  constructor(private dialogRef: DialogRef<AuthDialogResult>, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public submit(): void {
    if (this.authForm.invalid) return;
    const result = this.authForm.value;
    this.dialogRef.close({
      success: true,
      credentials: result
    })
  }

  public close(): void {
    this.dialogRef.close({
      success: false
    });
  }
}
