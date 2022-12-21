import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  // @Input () Authenticated:boolean=false;
  // @Output () isAuthenticated = new EventEmitter();

  constructor(private router: Router){}
  ngOnInit(): void {
    this.logout();
  }

  logout(){
    sessionStorage.clear();
    // this.Authenticated=false;
    // this.isAuthenticated.emit(this.Authenticated);
    this.router.navigate(['/']);
  }

}
