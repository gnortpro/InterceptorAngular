import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoadingResults: BehaviorSubject<boolean> = this.spinnerService.isLoading;
  public users: any;
  constructor(
    private service: UserService,
    private authServices: AuthenticationService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    console.log("isLoadingResults",this.isLoadingResults);
    
    this.getUser();
  }

  getUser() {
    this.service.getAll().subscribe(users => {
          this.users = users[0];
      });
  }
  
  checkUser() {
    return localStorage.getItem('users');
  }

  logout() {
    this.authServices.logout();
  }

}
