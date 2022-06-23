import { Component } from '@angular/core';
import { Bono } from './models/bono';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor()
    {
        localStorage.setItem('bono', JSON.stringify(new Bono()));
    }
}
