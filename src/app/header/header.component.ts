import{ Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, DoCheck{
    public title: string = 'App Angular Spring'

    @Input () Authenticated:boolean;
    @Output () isAuthenticated = new EventEmitter();

    constructor(private router: Router){
        this.Authenticated=false;
    }

    ngOnInit() {
        console.log("OnInit")
    }

    logout(){
        sessionStorage.clear();
        this.isAuthenticated.emit(this.Authenticated);
        this.router.navigate(['/login']);
      }

    ngDoCheck(): void {
        // console.log("DoCheck ejecutado")
    }
}