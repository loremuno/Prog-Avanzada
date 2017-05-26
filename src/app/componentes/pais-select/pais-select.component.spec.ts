import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisSelectComponent } from './pais-select.component';

describe('PaisSelectComponent', () => {
  let component: PaisSelectComponent;
  let fixture: ComponentFixture<PaisSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
