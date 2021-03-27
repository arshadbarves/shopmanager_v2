import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditStoreMasterPage } from './edit-store-master.page';

describe('EditStoreMasterPage', () => {
  let component: EditStoreMasterPage;
  let fixture: ComponentFixture<EditStoreMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStoreMasterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditStoreMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
