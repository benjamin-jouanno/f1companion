import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorDetailComponent } from './constructor-detail.component';

describe('ConstructorDetailComponent', () => {
  let component: ConstructorDetailComponent;
  let fixture: ComponentFixture<ConstructorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
