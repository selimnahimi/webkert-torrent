import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  /* router: Router;
  constructor(router: Router) {
    this.router = router;
  } */

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    // parameter adattagok
  }

  ngOnInit() {
    // fat-arrow
    this.routes = this.router.config.map(conf => conf.path) as string[];

    // rxjs - reaktív programozás
    // subscribe
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log("LOGGED IN");
      console.log(user);

      /*if (localStorage.getItem('user-details') !== "null" ) {
        this.userService.getById((user as firebase.default.User).uid).subscribe(data => {
          console.log(data);
          localStorage.setItem('user-details', JSON.stringify(data));
        }, error => {
          console.error(error);
        });
      }*/

      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
      localStorage.setItem('user-details', JSON.stringify('null'));
    });
  }

  changePage(selectedPage: string) {
    // this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
}
