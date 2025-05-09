import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoesSalvosComponent } from './cartoes-salvos.component';

describe('CartoesSalvosComponent', () => {
  let component: CartoesSalvosComponent;
  let fixture: ComponentFixture<CartoesSalvosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartoesSalvosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartoesSalvosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
