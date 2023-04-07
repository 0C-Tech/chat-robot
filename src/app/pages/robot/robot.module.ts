import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../../modules/antd/ng-zorro-antd.module';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { RobotRoutingModule } from './robot-routing.module';
import { RobotComponent } from './robot/robot.component';

@NgModule({
  declarations: [
    RobotComponent
  ],
  imports: [
    CommonModule,
    RobotRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    SafeHtmlPipe
  ]
})
export class RobotModule {}
