import View from './view';
import icons from 'url:../../img/icons.svg';
import { RESULTS_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      const gotoPage = +button.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);
    if (this._data.page === 1 && numPages > 1) {
      return this._generateForwardMarkupButton();
    }
    if (this._data.page === numPages && numPages > 1) {
      return this._generateBackwardMarkupButton();
    }
    if (this._data.page < numPages) {
      return [
        this._generateBackwardMarkupButton(),
        this._generateForwardMarkupButton(),
      ].join('');
    }
    return '';
  }

  _generateForwardMarkupButton() {
    return `
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
  }

  _generateBackwardMarkupButton() {
    return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>`;
  }
}

export default new PaginationView();
