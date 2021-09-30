/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LyricsComponent } from './Lyrics.component';

describe('LyricsComponent', () => {
  let component: LyricsComponent;
  let fixture: ComponentFixture<LyricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
