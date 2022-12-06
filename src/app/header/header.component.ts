import{ Component, DoCheck, OnInit } from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, DoCheck{
    public title: string = 'App Angular Spring'


    constructor(){}

    ngOnInit(): void {
        console.log("OnInit")
    }

    ngDoCheck(): void {
        console.log("DoCheck ejecutado")
    }
}