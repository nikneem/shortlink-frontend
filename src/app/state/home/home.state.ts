export interface HomeState {
  latestShortLinkUrk: string;

  isLoading: boolean;
  errorMessage: string;
}

export const INITIAL_HOME_STATE: HomeState = {
  latestShortLinkUrk: null,

  errorMessage: null,
  isLoading: false,
};
