import View from './view.js';
import icons from 'url:../../img/icons.svg'; //parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClicks(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    //page 1 and there are other pages
    const curPage = this._data.page;

    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      <center class= "pagination"><font size="2" color="#f38e82">Page${curPage} </font></center>`;
      // return [
      //   this._generateNextMarkup(curPage),
      //   this._generateCurPage(curPage),
      // ];
    }

    //last page

    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <center class= "pagination"><font size="2" color="#f38e82">Page${curPage} </font></center>`;
      // return [
      //   this._generatePrevMarkup(curPage),
      //   this._generateCurPage(curPage),
      // ];
    }
    //other page
    if (curPage < numPages) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <center class= "pagination"><font size="2" color="#f38e82">Page${curPage} </font></center>`;
      // return [
      //   this._generateNextMarkup(curPage),
      //   this._generatePrevMarkup(curPage),
      //   this._generateCurPage(curPage),
      // ];
    }
    //page 1 and there are no other page
    return '';
  }
  // _generateNextMarkup(curPage = 1) {
  //   return `<button data-goto="${
  //     curPage + 1
  //   }" class="btn--inline pagination__btn--next">
  //   <span>Page ${curPage + 1}</span>
  //   <svg class="search__icon">
  //     <use href="${icons}#icon-arrow-right"></use>
  //   </svg>
  // </button>
  // <center class= "pagination"><font size="2" color="#f38e82">Page${curPage} </font></center>
  // `;
  // }
  // _generatePrevMarkup(curPage = 1) {
  //   return `<button data-goto="${
  //     curPage - 1
  //   }" class="btn--inline pagination__btn--prev">
  //   <svg class="search__icon">
  //     <use href="${icons}#icon-arrow-left"></use>
  //   </svg>
  //   <span>Page ${curPage - 1}</span>
  // </button>
  // `;
  // }
  _generateCurPage(curPage = 1) {
    // return `
    // <center class= "pagination"><font size="2" color="#f38e82">Page${curPage} </font></center>
    // `;
  }
}
export default new PaginationView();
