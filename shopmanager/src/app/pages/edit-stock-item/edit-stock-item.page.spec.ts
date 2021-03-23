import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditStockItemPage } from './edit-stock-item.page';

describe('EditStockItemPage', () => {
  let component: EditStockItemPage;
  let fixture: ComponentFixture<EditStockItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStockItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditStockItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
