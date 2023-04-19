import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapcontentComponent } from './wrapcontent.component';

describe('WrapcontentComponent', () => {
  let component: WrapcontentComponent;
  let fixture: ComponentFixture<WrapcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapcontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
