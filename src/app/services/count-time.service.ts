import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountTimeService {
  add(log: string) {
    console.log(log);
  }
}
