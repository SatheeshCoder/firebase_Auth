import Loading from "./Loading";
import { Suspense } from "react";

const MatxSuspense = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default MatxSuspense;
