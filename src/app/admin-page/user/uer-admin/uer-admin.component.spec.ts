import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UerAdminComponent } from './uer-admin.component';

describe('UerAdminComponent', () => {
  let component: UerAdminComponent;
  let fixture: ComponentFixture<UerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UerAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
