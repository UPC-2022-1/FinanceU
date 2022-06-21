import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            company: ['FinanceU'],
            agreements: ['', Validators.requiredTrue]
        }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            if (this.signUpForm.controls.agreements.invalid) {
                this.alert = {
                    type: 'error',
                    message: 'Please accept the terms and conditions.'
                };
                this.showAlert = true;
            }
            return;
        }


        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {

                    const dialogRef = this.dialog.open(DialogSuccessComponent, {
                        width: '250px',
                        data: { name: this.signUpForm.get('name').value, email: this.signUpForm.get('email').value },
                    });

                    dialogRef.afterClosed().subscribe((result) => {
                        if (result) {
                            this._router.navigateByUrl('/sign-in');
                        }
                    });
                },
                (response) => {
                    console.log(response);

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    // this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: response.error
                    };

                    // Show the alert
                    this.showAlert = true;

                }
            );
    }
}

export interface DialogData {
    name: string;
    email: string;
}

@Component({
    selector: 'dialog-success',
    templateUrl: 'dialog-success.html',
})
export class DialogSuccessComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogSuccessComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    accept(): void {
        this.dialogRef.close(true);
    }
}
