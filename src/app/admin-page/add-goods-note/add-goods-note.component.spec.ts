import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodsNoteComponent } from './add-goods-note.component';

describe('AddGoodsNoteComponent', () => {
  let component: AddGoodsNoteComponent;
  let fixture: ComponentFixture<AddGoodsNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGoodsNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoodsNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
