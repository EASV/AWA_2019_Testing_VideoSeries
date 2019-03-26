import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  singleText(tagName: string): string {
    const h2Ele = this.fixture.debugElement.query(By.css(tagName));
    if (h2Ele) {
      return h2Ele.nativeElement.textContent;
    }
  }

  count(tagName: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.length;
  }

  countText(tagName: string, text: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.filter(element => element.nativeElement.textContent === text).length;
  }
}
