export interface HomeState {
  latestShortLinkUrl: string;
  isLoggedOn: boolean;

  isLoading: boolean;
  errorMessage: string;
}

export const INITIAL_HOME_STATE: HomeState = {
  latestShortLinkUrl: null,
  isLoggedOn: false,

  errorMessage: null,
  isLoading: false,
};
