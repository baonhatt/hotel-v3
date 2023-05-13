import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualpageComponent } from './mutualpage.component';

describe('MutualpageComponent', () => {
  let component: MutualpageComponent;
  let fixture: ComponentFixture<MutualpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutualpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
