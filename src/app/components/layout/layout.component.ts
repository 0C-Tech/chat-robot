import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  standalone: true,
  imports: [RouterOutlet]
})
export class LayoutComponent {
}
