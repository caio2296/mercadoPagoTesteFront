import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadopagoFormComponent } from './mercadopago-form.component';

describe('MercadopagoFormComponent', () => {
  let component: MercadopagoFormComponent;
  let fixture: ComponentFixture<MercadopagoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercadopagoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MercadopagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
