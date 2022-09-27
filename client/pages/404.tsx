import Head from "next/head";
import Link from "next/link";

// pages/404.tsx
export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Page Not Found</title>
      </Head>
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn&apos;t find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400">
              But don&apos;t worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link href="/">
              <div className="btn-primary">Back to homepage</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
