import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiUrl } from '../../config/api-url';
import { ApiService } from '../../core/api.service';
import { ChatGPTResponse } from './robot.interface';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  constructor(private apiService: ApiService) {}

  getMessage(prompt: string): Observable<ChatGPTResponse> {
    return this.apiService
      .httpGet(this.apiService.getApiUrl(ApiUrl.GET_MESSAGE), {
        prompt
      })
      .pipe(map((res) => res?.data || {}));
  }
}
