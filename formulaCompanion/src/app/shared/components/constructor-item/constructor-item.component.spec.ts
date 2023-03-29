import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorItemComponent } from './constructor-item.component';

describe('ConstructorItemComponent', () => {
  let component: ConstructorItemComponent;
  let fixture: ComponentFixture<ConstructorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
