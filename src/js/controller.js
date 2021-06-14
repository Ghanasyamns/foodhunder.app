import * as modal from './modal.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeview from './views/recipeView.js';
import SearchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import AddRecipeView from './views/addRecipeView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeview.renderSpinner();
    //update result view to mark selected search results
    resultView.update(modal.getSearchResultPage());
    //updating bookmark view
    // bookmarkView.update(modal.state.bookmarks);
    //1 loading reciepe
    await modal.loadRecipe(id);
    //2rendering reciepe

    recipeview.render(modal.state.recipe);
    // const recipeView = new recipeview(modal.state.recipe)
    //TEST
    // controlServings();
  } catch (err) {
    // alert(err);
    recipeview.renderError();
    // console.error(err)
  }
};
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    //load search
    await modal.loadSearchResults(query);
    //render result
    resultView.render(modal.getSearchResultPage());

    // render initial pagination buutons

    paginationView.render(modal.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = function (goToPage) {
  //render NEW result
  resultView.render(modal.getSearchResultPage(goToPage));

  // render NEW pagination buutons

  paginationView.render(modal.state.search);
};
const controlServings = function (NewServings) {
  //updating recipe servings(state)
  modal.updateServings(NewServings);
  //update the recipe view
  // recipeview.render(modal.state.recipe);
  recipeview.update(modal.state.recipe); //update onlt text content
};
const controlAddBookmark = function () {
  //Add or remove bookmarks
  if (!modal.state.recipe.bookmarked) modal.addBookmark(modal.state.recipe);
  else modal.deleteBookmark(modal.state.recipe.id);
  //update bookmarks view
  recipeview.update(modal.state.recipe);
  //render bookmarks
  bookmarkView.render(modal.state.bookmarks);
};
const controlBookmark = function () {
  bookmarkView.render(modal.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();
    //uploading new recipe
    await modal.uploadRecipe(newRecipe);
    console.log(modal.state.recipe);
    //render recipe
    recipeview.render(modal.state.recipe);
    //success message
    addRecipeView.renderMessage();
    //render bookmark view
    bookmarkView.render(modal.state.bookmarks);
    //change ID in URL
    window.history.pushState(null, '', `#${modal.state.recipe.id}`);
    //close form
    setTimeout(function () {
      // addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  recipeview.addHandlerRender(controlRecipes);
  recipeview.addHandlerUpdateServings(controlServings);
  recipeview.addHandlerBookmark(controlAddBookmark);

  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlerClicks(controlPagination);
  bookmarkView.addBookmarkHandler(controlBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
