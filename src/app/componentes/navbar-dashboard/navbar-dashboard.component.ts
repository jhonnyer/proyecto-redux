import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.component.html',
  styleUrls: ['./navbar-dashboard.component.css'],
})
export class NavbarDashboardComponent {
  menu:Menu[];

  public title: string = 'App Angular Spring';

  @Input() Authenticated: boolean;
  @Output() isAuthenticated = new EventEmitter();

  constructor(private router: Router, private menuService: MenuService) {
    this.Authenticated = false;
    this.menu=[];
  }

  ngOnInit() {
    console.log('OnInit');
    this.getMenu();
  }

  logout() {
    sessionStorage.clear();
    this.isAuthenticated.emit(this.Authenticated);
    this.router.navigate(['/login']);
  }

  ngDoCheck(): void {
    // console.log("DoCheck ejecutado")
  }


  getMenu(){
    this.menuService.getMenu().subscribe(
      response=>{ 
        this.menu=response;
        console.log(this.menu);
      }
    )
  }
}
