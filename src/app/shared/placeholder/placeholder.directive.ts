import {
  Directive,
  ViewContainerRef
 } from "@angular/core";




@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  // Placeholder directive logic here
  constructor(public viewContainerRef: ViewContainerRef) {
    // Constructor logic here
  }
}
