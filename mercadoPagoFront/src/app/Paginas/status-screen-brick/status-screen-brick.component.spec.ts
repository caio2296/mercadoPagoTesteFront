import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusScreenBrickComponent } from './status-screen-brick.component';

describe('StatusScreenBrickComponent', () => {
  let component: StatusScreenBrickComponent;
  let fixture: ComponentFixture<StatusScreenBrickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusScreenBrickComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusScreenBrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
