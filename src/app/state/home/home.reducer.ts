import * as _ from 'lodash';
import { homeActions, HomePostUrlCompletedAction } from './home.actions';
import { HomeState } from './home.state';

export function HomeReducer(state: HomeState, action: any) {
  {
    switch (action.type) {
      case homeActions.homeSetLoginState:
        return { ...state, isLoggedOn: action.isLoggedOn };
      case homeActions.homePostUrl:
        return { ...state, isLoading: true };
      case homeActions.homePostUrlCompleted:
        return homePostUrlCompletedHandler(state, action);
      default:
        return state;
    }
  }
}

function homePostUrlCompletedHandler(
  state: HomeState,
  action: HomePostUrlCompletedAction
): HomeState {
  const targetState: HomeState = Object.assign({}, state);

  //   const catalogsList = _.cloneDeep(targetState.listItems) as Array<
  //     CatalogListItemDto
  //   >;
  //   if (catalogsList) {
  //     const catalog = _.find(catalogsList, {
  //       id: action.itemId,
  //     });
  //     if (catalog) {
  //       const itemIndex = catalogsList.indexOf(catalog);
  //       if (itemIndex >= 0) {
  //         catalogsList.splice(itemIndex, 1);
  //       }
  //     }
  //   }
  //   targetState.listItems = catalogsList;
  targetState.latestShortLinkUrl = action.dto.shortCode;
  targetState.isLoading = false;
  return targetState;
}

// function deleteCompleteHandler(
//   state: CatalogState,
//   action: CatalogDeleteComplete
// ): CatalogState {
//   const targetState: CatalogState = Object.assign({}, state);

//   const catalogsList = _.cloneDeep(targetState.listItems) as Array<
//     CatalogListItemDto
//   >;
//   if (catalogsList) {
//     const catalog = _.find(catalogsList, {
//       id: action.itemId,
//     });
//     if (catalog) {
//       const itemIndex = catalogsList.indexOf(catalog);
//       if (itemIndex >= 0) {
//         catalogsList.splice(itemIndex, 1);
//       }
//     }
//   }
//   targetState.listItems = catalogsList;
//   targetState.isLoading = false;
//   return targetState;
// }
