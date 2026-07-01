import { Link } from "react-router-dom";

function Landing() {
  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* Background */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-slate-100 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col px-6 py-20 lg:px-8">

        {/* Hero */}

        <section className="mx-auto max-w-3xl text-center">

          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            AI Interview Platform
          </p>

          <h1 className="text-5xl font-semibold tracking-tight text-slate-900 md:text-6xl">
            Practice technical interviews with AI.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Generate role-specific interviews, answer questions in a structured
            environment, and receive detailed AI feedback to improve your
            interview performance.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/signup"
              className="rounded-xl bg-slate-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Sign In
            </Link>

          </div>

        </section>

        {/* Product Preview */}

        <section className="mx-auto mt-24 w-full max-w-6xl">

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50">

            {/* Window Bar */}

            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div className="h-3 w-3 rounded-full bg-slate-300" />
              <div className="h-3 w-3 rounded-full bg-slate-300" />
              <div className="h-3 w-3 rounded-full bg-slate-300" />
            </div>

            <div className="grid lg:grid-cols-[240px_1fr]">

              {/* Sidebar */}

              <aside className="border-r border-slate-200 bg-slate-50 p-6">

                <h3 className="text-lg font-semibold text-slate-900">
                  AI Interview
                </h3>

                <div className="mt-8 space-y-3">

                  <div className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white">
                    Dashboard
                  </div>

                  <div className="rounded-lg px-4 py-3 text-sm text-slate-500">
                    Interview History
                  </div>

                  <div className="rounded-lg px-4 py-3 text-sm text-slate-500">
                    Settings
                  </div>

                </div>

              </aside>

              {/* Content */}

              <div className="p-8">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Welcome back
                    </h2>

                    <p className="mt-1 text-slate-500">
                      Create a new interview or continue a previous one.
                    </p>
                  </div>

                  <button className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white">
                    New Interview
                  </button>

                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">

                  <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">
                      Total Interviews
                    </p>

                    <p className="mt-3 text-3xl font-semibold text-slate-900">
                      12
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">
                      Average Score
                    </p>

                    <p className="mt-3 text-3xl font-semibold text-slate-900">
                      82%
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-5">
                    <p className="text-sm text-slate-500">
                      Completed
                    </p>

                    <p className="mt-3 text-3xl font-semibold text-slate-900">
                      9
                    </p>
                  </div>

                </div>

                <div className="mt-10 rounded-xl border border-slate-200">

                  <div className="border-b border-slate-200 px-6 py-4 font-medium text-slate-900">
                    Recent Interviews
                  </div>

                  <div className="divide-y divide-slate-200">

                    <div className="flex items-center justify-between px-6 py-5">
                      <div>
                        <p className="font-medium text-slate-900">
                          Frontend Developer
                        </p>

                        <p className="text-sm text-slate-500">
                          Medium • 10 Questions
                        </p>
                      </div>

                      <span className="text-sm font-medium text-slate-600">
                        84%
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-6 py-5">
                      <div>
                        <p className="font-medium text-slate-900">
                          Backend Developer
                        </p>

                        <p className="text-sm text-slate-500">
                          Hard • 8 Questions
                        </p>
                      </div>

                      <span className="text-sm font-medium text-slate-600">
                        79%
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-6 py-5">
                      <div>
                        <p className="font-medium text-slate-900">
                          Software Engineer
                        </p>

                        <p className="text-sm text-slate-500">
                          Easy • 5 Questions
                        </p>
                      </div>

                      <span className="text-sm font-medium text-slate-600">
                        91%
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

export default Landing;