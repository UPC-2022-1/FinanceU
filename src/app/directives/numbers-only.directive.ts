import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumbersOnly]',
})
export class NumbersOnlyDirective {
    //private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
    private regex: RegExp = new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{0,2})?\s*$/g);
    private specialKeys: Array<string> = ['Backspace', 'Tab'];

    constructor(private el: ElementRef) {}
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        const current: string = this.el.nativeElement.value;
        const next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}
