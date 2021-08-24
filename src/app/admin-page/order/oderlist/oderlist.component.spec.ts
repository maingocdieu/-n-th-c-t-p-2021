import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OderlistComponent } from './oderlist.component';

describe('OderlistComponent', () => {
  let component: OderlistComponent;
  let fixture: ComponentFixture<OderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OderlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
