import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoSelectComponent } from './departamento-select.component';

describe('DepartamentoSelectComponent', () => {
  let component: DepartamentoSelectComponent;
  let fixture: ComponentFixture<DepartamentoSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentoSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
