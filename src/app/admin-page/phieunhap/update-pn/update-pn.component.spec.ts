import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePNComponent } from './update-pn.component';

describe('UpdatePNComponent', () => {
  let component: UpdatePNComponent;
  let fixture: ComponentFixture<UpdatePNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
