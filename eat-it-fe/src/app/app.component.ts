import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Eat-It';

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.enforceMinWindowSize();
  // }

  // enforceMinWindowSize() {
  //   const minWidth = 800;
  //   const minHeight = 600;

  //   if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
  //     document.body.style.minWidth = `${minWidth}px`;
  //     document.body.style.minHeight = `${minHeight}px`;
  //     console.log("Enforcing min window size");
  //   }
  // }
}
