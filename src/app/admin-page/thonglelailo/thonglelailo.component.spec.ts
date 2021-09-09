import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThonglelailoComponent } from './thonglelailo.component';

describe('ThonglelailoComponent', () => {
  let component: ThonglelailoComponent;
  let fixture: ComponentFixture<ThonglelailoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThonglelailoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThonglelailoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
