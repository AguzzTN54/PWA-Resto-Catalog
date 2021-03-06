const SearchForm = {
  onClick(element, event) {
    const isSearchSubmit = event.target.classList.contains('search-submit');
    const form = event.target.parentElement;
    return isSearchSubmit
      ? this.buttonClicked({ element, form, event })
      : null;
  },

  buttonClicked({ element, form, event }) {
    event.preventDefault();
    const query = new FormData(form).get('q');
    const input = element.parentElement.querySelector('input');
    const isInputEmpty = (query.replace(/ /g, '').length === 0);
    return isInputEmpty
      ? this.fillSearchInput(form, input)
      : this._submitForm(query, input);
  },

  async _submitForm(query, input) {
    this.close(null, input);

    if (window.location.hash !== '#/') {
      await (window.location.hash = '#/');
      const setQuery = setTimeout(() => {
        clearTimeout(setQuery);
        const resultContainer = document.querySelector('resto-list');
        resultContainer.query = query.toLowerCase();
      }, 1000);
    } else {
      const resultContainer = document.querySelector('resto-list');
      resultContainer.query = query.toLowerCase();
    }
  },

  fillSearchInput(form, input) {
    form.classList.add('active');
    input.focus();
    const isMobile = (document.documentElement.clientWidth <= 425);
    return isMobile ? this.showMask(form, input) : null;
  },

  showMask(form, input) {
    document.body.classList.add('open');
    const closeButton = form.querySelector('.close');
    closeButton.addEventListener('click', (event) => this.close(event, input));
  },

  close(event = null, input) {
    if (event) event.preventDefault();
    const searchInput = input;
    document.body.classList.remove('open');
    searchInput.parentElement.classList.remove('active');
    searchInput.value = '';
  },
};

export default SearchForm;
