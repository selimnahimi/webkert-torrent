import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FakeLoadingService} from "../../shared/services/fake-loading.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  firstname = new FormControl('');
  lastname = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  password_again = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async signup() {

  }
}