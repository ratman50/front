import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfectionComponent } from './confection.component';

describe('ConfectionComponent', () => {
  let component: ConfectionComponent;
  let fixture: ComponentFixture<ConfectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfectionComponent]
    });
    fixture = TestBed.createComponent(ConfectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
