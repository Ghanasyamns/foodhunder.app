import View from './view.js';
import icons from 'url:../../img/icons.svg'; //parcel 2
import PreviewView from './previewView.js';
import previewView from './previewView.js';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = 'No bookmarks yet.Find anice recipe and bookmark it :)';
  _message;
  addBookmarkHandler(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(' ');
  }
}
export default new BookmarksView();
