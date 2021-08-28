import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProductDetailComponent } from './insert-product-detail.component';

describe('InsertProductDetailComponent', () => {
  let component: InsertProductDetailComponent;
  let fixture: ComponentFixture<InsertProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
