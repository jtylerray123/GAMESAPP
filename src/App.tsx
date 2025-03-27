import { Button } from './components/Button'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Party Game App</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Welcome to Party Game App!</h2>
            <p className="text-gray-600 mb-6">
              Get ready to have fun with friends. Browse our collection of party games
              and start playing in minutes.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <Button fullWidth>
                Browse Games
              </Button>
              <Button variant="secondary" fullWidth>
                How to Play
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
