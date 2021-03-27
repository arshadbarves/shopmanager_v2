import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreMasterPage } from './store-master.page';

describe('StoreMasterPage', () => {
  let component: StoreMasterPage;
  let fixture: ComponentFixture<StoreMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMasterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
