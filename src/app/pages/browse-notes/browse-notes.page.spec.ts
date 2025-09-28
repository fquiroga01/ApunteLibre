import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseNotesPage } from './browse-notes.page';

describe('BrowseNotesPage', () => {
  let component: BrowseNotesPage;
  let fixture: ComponentFixture<BrowseNotesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
