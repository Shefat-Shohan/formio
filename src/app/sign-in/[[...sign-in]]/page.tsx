import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-black">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
            </a>

            <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Formio 🦑
            </h1>

            <p className="mt-2 mb-8 leading-relaxed text-gray-400">
              Build your own custom ai generated form just in a minute.
            </p>

            <div>
              <h2 className="text-md mb-2 font-semibold text-white md:text-lg">
                Demo Account Details
              </h2>
              <p className="leading-relaxed text-gray-400">
                Email: <b>demo@gmail.com</b>
              </p>
              <p className="leading-relaxed text-gray-400">
                Pass: <b>12345</b>
              </p>
              <p className="mb-8 leading-relaxed text-gray-400">
                Note: Use these credentials to explore the application.
              </p>
            </div>

            <SignIn fallbackRedirectUrl={"/dashboard"} />
          </div>
        </main>
      </div>
    </section>
  );
}
