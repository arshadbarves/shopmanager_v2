import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemEntryPage } from './item-entry.page';

describe('ItemEntryPage', () => {
  let component: ItemEntryPage;
  let fixture: ComponentFixture<ItemEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
