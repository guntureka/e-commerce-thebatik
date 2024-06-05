import { Error } from "../components/Error";
import ErrorPath from "../components/ErrorPath";

export default function ErrorPage() {
  return (
    <main className=" bg-white">
      <ErrorPath />
      <Error />
    </main>
  );
}
