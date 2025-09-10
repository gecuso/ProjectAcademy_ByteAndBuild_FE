import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentiComponent } from './componenti.component';

describe('ComponentiComponent', () => {
  let component: ComponentiComponent;
  let fixture: ComponentFixture<ComponentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
