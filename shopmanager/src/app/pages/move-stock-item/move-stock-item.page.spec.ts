import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoveStockItemPage } from './move-stock-item.page';

describe('MoveStockItemPage', () => {
  let component: MoveStockItemPage;
  let fixture: ComponentFixture<MoveStockItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveStockItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoveStockItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
