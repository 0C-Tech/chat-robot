import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from '../../modules/antd/ng-zorro-antd.module';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: [],
  standalone: true,
  imports: [RouterModule, NgZorroAntdModule]
})
export class NotFoundComponent {}
