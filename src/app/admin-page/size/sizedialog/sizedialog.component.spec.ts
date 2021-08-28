import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizedialogComponent } from './sizedialog.component';

describe('SizedialogComponent', () => {
  let component: SizedialogComponent;
  let fixture: ComponentFixture<SizedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
