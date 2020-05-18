import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceViewerComponent } from './device-viewer.component';

describe('DeviceViewerComponent', () => {
  let component: DeviceViewerComponent;
  let fixture: ComponentFixture<DeviceViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
