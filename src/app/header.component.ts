import { Component,Output,EventEmitter } from '@angular/core';

@Component({
    selector:'app-header',
    template:`
    <header>
        <div class="row">
            <div (click)="startNewSearch.emit()" class="col s4 offset-4 search-btn center-align">
                <span class="material-icons">close</span>
            </div>
        </div>
    </header>
    `
})

export class HeaderComponent{
    @Output() startNewSearch = new EventEmitter();
}