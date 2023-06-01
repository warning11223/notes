import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
