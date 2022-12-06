import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductoComponent } from './search-producto.component';

describe('SearchProductoComponent', () => {
  let component: SearchProductoComponent;
  let fixture: ComponentFixture<SearchProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
