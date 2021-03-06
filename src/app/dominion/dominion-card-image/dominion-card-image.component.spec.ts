import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DominionCardImageComponent } from './dominion-card-image.component';

describe('CardImageComponent', () => {
  let component: DominionCardImageComponent;
  let fixture: ComponentFixture<DominionCardImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DominionCardImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DominionCardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
