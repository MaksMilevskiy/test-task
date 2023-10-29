
export type TUserData = {
  [key: string]: any;
}
export type TInputData = {
  value: string;
  validationRegex: RegExp;
  errorMessage: string;
  isError: boolean;
};
export type TFetchedUser = {
  username: string;
  phone: string;
  [key: string]: string | { [key: string]: string };
};
export type TTodoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export type TStatusFilterOptions =
  | 'all'
  | 'completed'
  | 'uncompleted'
  | 'favourites';
