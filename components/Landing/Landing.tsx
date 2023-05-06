import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

import Link from 'next/link';

const LandingPage = () => {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Promptify</h1>
        <nav className="flex space-x-4">
          {!isLoading && !session && (
            <>
              <Link href="#" passHref onClick={() => signIn()}>
                <span className="text-white cursor-pointer">Log in</span>
              </Link>
              <Link href="/signup" passHref>
                <span className="bg-white text-blue-600 px-4 py-2 rounded-md cursor-pointer">
                  Sign up
                </span>
              </Link>
            </>
          )}
          {!isLoading && session && (
            <>
              <Link href="/dashboard" passHref>
                <span className="text-white cursor-pointer">Dashboard</span>
              </Link>
              <span
                className="bg-white text-blue-600 px-4 py-2 rounded-md cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </span>
            </>
          )}
        </nav>
      </header>

      <main className="flex-grow p-4">
        <section className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold">
            Unleash Your Creativity with Promptify
          </h2>
          <p className="text-lg">
            Promptify helps content creators, businesses, and educators generate
            unique ideas and content effortlessly.
          </p>
          <Link href="/signup">
            <span className="bg-blue-600 text-white px-6 py-3 rounded-md">
              Get Started for Free
            </span>
          </Link>
        </section>

        <section className="mt-16 space-y-8">
          <h3 className="text-2xl font-semibold text-center">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Idea Generation</h4>
              <p>
                Generate ideas for blog posts, articles, marketing materials,
                and more with our AI-powered chatbot.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Custom Prompts</h4>
              <p>
                Create custom prompts for unique teaching materials or to
                inspire your next great story.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Collaboration</h4>
              <p>
                Collaborate with others and share your ideas or projects with
                ease.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-8">
          <h3 className="text-2xl font-semibold text-center">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p>
                "Promptify has revolutionized the way I come up with ideas for
                my blog. It's a game changer!"
              </p>
              <p className="font-bold">- Jane Doe, Blogger</p>
            </div>
            <div className="space-y-4">
              <p>
                "As a marketing manager, Promptify has helped me create engaging
                content for our campaigns faster than ever before."
              </p>
              <p className="font-bold">- John Smith, Marketing Manager</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-4 bg-blue-600 text-white text-center">
        <p>&copy; {new Date().getFullYear()} Promptify</p>
      </footer>
    </div>
  );
};

export default LandingPage;
