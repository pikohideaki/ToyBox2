import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoshiroDataTableComponent } from './noshiro-data-table.component';

describe('NoshiroDataTableComponent', () => {
  let component: NoshiroDataTableComponent;
  let fixture: ComponentFixture<NoshiroDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoshiroDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoshiroDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
