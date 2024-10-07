import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="flex justify-center flex-1 h-full py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center">
          <h1 className="flex items-center font-bold text-gray-900 mb-26">
            <img src="/logo.png" className="w-auto h-72" alt="yton ui" />
            <span className="ml-2 h-full text-[320px] inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              UI
            </span>
          </h1>
          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」
          </p>
          <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/components"
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                开始使用
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-blue-600 bg-white border border-transparent rounded-md hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                github
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
