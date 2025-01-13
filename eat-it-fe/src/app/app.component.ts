import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Eat-It';
}
