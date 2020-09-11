export interface HomeState {
  isLoading: boolean;
  errorMessage: string;
}

export const INITIAL_HOME_STATE: HomeState = {
  errorMessage: null,
  isLoading: false,
};
