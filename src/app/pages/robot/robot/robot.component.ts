import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { textPosition } from '../../../helper/util';
import { ChatMessage } from '../robot.interface';
import { RobotService } from '../robot.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.less']
})
export class RobotComponent implements AfterViewInit {
  @ViewChild('msgListEle') msgListEle!: ElementRef;
  @ViewChild('promptInput') promptInput!: ElementRef;
  prompt = '';
  messages: ChatMessage[] = [];

  private inputFlag = false;

  constructor(
    private robotService: RobotService,
    private message: NzMessageService
  ) {
  }

  ngAfterViewInit() {
    this.promptInput.nativeElement.addEventListener('compositionstart', () => {
      this.inputFlag = true;
    }, false);
    this.promptInput.nativeElement.addEventListener('compositionend', () => {
      this.inputFlag = false;
    }, false);
  }

  sendPrompt() {
    const prompt = this.prompt.trim();
    if (!prompt) {
      this.message.warning('请输入内容。');
      this.prompt = '';
      return;
    }

    this.messages.push({
      isRobot: false,
      content: prompt
    });
    this.prompt = '';
    this.scrollBottom();

    this.robotService.sendMessage(prompt).subscribe((res) => {
      res.choices.forEach((msg) => {
        this.messages.push({
          isRobot: true,
          content: msg.message.content
        });
      });
      this.scrollBottom();
    });
  }

  onKeyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    const isCtrlPressed = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    const isShiftPressed = e.shiftKey;
    if (key === 'enter') {
      if (!isCtrlPressed) {
        e.preventDefault();
        if (!this.inputFlag) {
          this.sendPrompt();
        }
      } else {
        if (!isShiftPressed) {
          textPosition(<HTMLInputElement>e.target, '\n', false);
        }
      }
    }
  }

  protected scrollBottom() {
    const msgBoxEle = this.msgListEle.nativeElement;
    const { offsetHeight } = msgBoxEle;

    setTimeout(() => {
      msgBoxEle.scrollTop = msgBoxEle.scrollHeight - offsetHeight;
    }, 0);
  }
}
