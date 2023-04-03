import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlatformDetectorService } from './../../core/plataform-detector/platform-detector.service';
import { SignUpService } from './signup.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { userNamePassword } from './username-password.validators';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {

  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]],
      userName: ['', [
        Validators.required,
        lowerCaseValidator,
        Validators.minLength(2),
        Validators.maxLength(30)
      ], [
          this.userNotTakenValidatorService.checkUserNameTaken()
        ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(18)
      ]]
    }, {
      validator: userNamePassword
    });
    this.platformDetectorService.isPlatformBrowser() && this.emailInput.nativeElement.focus();
  }

  signup() {
    if (this.signupForm.valid && !this.signupForm.pending) {

      const newUser: NewUser = this.signupForm.getRawValue();
      console.log(newUser);
      this.signUpService.signup(newUser).subscribe(
        () => this.router.navigate(['']),
        err => console.log(err)
      )
    }

  }
}
