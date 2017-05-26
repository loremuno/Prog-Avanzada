import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadSelectComponent } from './localidad-select.component';

describe('LocalidadSelectComponent', () => {
  let component: LocalidadSelectComponent;
  let fixture: ComponentFixture<LocalidadSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalidadSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
