import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container notfound">
      <p className="notfound__code">404</p>
      <h1>Nothing here.</h1>
      <p>
        <Link className="btn btn--dark" href="/">
          Go back home
        </Link>
      </p>
    </section>
  );
}
