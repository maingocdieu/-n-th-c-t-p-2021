import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListphieunhapComponent } from './listphieunhap.component';

describe('ListphieunhapComponent', () => {
  let component: ListphieunhapComponent;
  let fixture: ComponentFixture<ListphieunhapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListphieunhapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListphieunhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
