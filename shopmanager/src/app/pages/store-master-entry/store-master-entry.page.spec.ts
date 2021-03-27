import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreMasterEntryPage } from './store-master-entry.page';

describe('StoreMasterEntryPage', () => {
  let component: StoreMasterEntryPage;
  let fixture: ComponentFixture<StoreMasterEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMasterEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreMasterEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
