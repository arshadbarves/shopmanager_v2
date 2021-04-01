import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditItemQtyModalPage } from './edit-item-qty-modal.page';

describe('EditItemQtyModalPage', () => {
  let component: EditItemQtyModalPage;
  let fixture: ComponentFixture<EditItemQtyModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItemQtyModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditItemQtyModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
