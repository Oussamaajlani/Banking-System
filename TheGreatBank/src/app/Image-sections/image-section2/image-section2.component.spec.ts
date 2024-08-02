import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSection2Component } from './image-section2.component';

describe('ImageSection2Component', () => {
  let component: ImageSection2Component;
  let fixture: ComponentFixture<ImageSection2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSection2Component]
    });
    fixture = TestBed.createComponent(ImageSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
