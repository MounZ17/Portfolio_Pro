import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container notfound">
      <p className="eyebrow">404</p>
      <h1>This page doesn&apos;t exist.</h1>
      <p>
        <Link className="btn btn--dark" href="/">
          Back to the portfolio
        </Link>
      </p>
    </section>
  );
}
