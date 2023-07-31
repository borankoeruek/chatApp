import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  hideTabs() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    tabs[0].style.display = 'none';
  }

  showTabs() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    tabs[0].style.display = 'inherit';
  }
}
