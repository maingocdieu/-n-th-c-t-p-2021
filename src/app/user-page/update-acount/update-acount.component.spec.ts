import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAcountComponent } from './update-acount.component';

describe('UpdateAcountComponent', () => {
  let component: UpdateAcountComponent;
  let fixture: ComponentFixture<UpdateAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAcountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
