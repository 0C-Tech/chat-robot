import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { textPosition } from '../../../helper/util';
import { ChatGPTResponse, ChatMessage } from '../robot.interface';
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
  loading = false;

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

  sendMessage(withHistory = true) {
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
    this.loading = true;

    const resHandler = (res: ChatGPTResponse) => {
      this.loading = false;
      (res.choices || []).forEach((msg) => {
        this.messages.push({
          isRobot: true,
          content: msg.message.content.replace(/\r\n|\r|\n/gi, '<br/>')
        });
      });
      this.scrollBottom();
    };

    if (!withHistory) {
      this.robotService.sendMessage(prompt).subscribe(resHandler);
    } else {
      const messages: ChatMessage[] = this.messages.slice(-10).map((item) => ({
        content: item.content,
        role: item.isRobot ? 'assistant' : 'user'
      }));
      this.robotService.sendMessageWithHistory({
        messages,
        model: 'gpt-3.5-turbo'
      }).subscribe(resHandler);
    }
  }

  onKeyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    const isCtrlPressed = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    const isShiftPressed = e.shiftKey;
    if (key === 'enter') {
      if (!isCtrlPressed) {
        e.preventDefault();
        if (!this.inputFlag) {
          this.sendMessage();
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
