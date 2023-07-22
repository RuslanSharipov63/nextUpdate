import { initialStateType } from "@/types/type";

export const foBuilderRedux = (
  stateParam: initialStateType,
  statusLoader: string
): string => {
  return (stateParam.loading = "statusLoader");
};
