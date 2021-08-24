import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietphieunhapComponent } from './chitietphieunhap.component';

describe('ChitietphieunhapComponent', () => {
  let component: ChitietphieunhapComponent;
  let fixture: ComponentFixture<ChitietphieunhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitietphieunhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietphieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
