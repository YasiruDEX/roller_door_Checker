"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react"

export default function GarageDoorOpener() {
  const [openLoading, setOpenLoading] = useState(false)
  const [closeLoading, setCloseLoading] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleOpenDoor = async () => {
    setOpenLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://192.168.1.168/trigger1");
  
      if (!response.ok) {
        throw new Error("Failed to open garage door");
      }
  
      setLastAction("Garage door opened successfully");
    } catch (err) {
      // setError("Failed to oen garage door. Please try again.");
      console.error(err);
    } finally {
      // Always show loading for at least 5 seconds
      setTimeout(() => {
        setOpenLoading(false);
      }, 5000);
    }
  };
  
  const handleCloseDoor = async () => {
    setCloseLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://192.168.1.168/trigger2");
  
      if (!response.ok) {
        throw new Error("Failed to close garage door");
      }
  
      setLastAction("Garage door closed successfully");
    } catch (err) {
      // setError("Failed to close garage door. Please try again.");
      console.error(err);
    } finally {
      // Always show loading for at least 5 seconds
      setTimeout(() => {
        setCloseLoading(false);
      }, 5000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="backdrop-blur-md bg-white/10 border-b border-white/10 text-white p-6 sticky top-0 z-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Garage Door Control
          </h1>
          <p className="mt-2 text-slate-300">Remotely open and close your garage door with ease</p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl border border-white/20 p-8">
            <h2 className="text-2xl font-semibold text-center mb-8 text-white">Garage Door Controls</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <button
                  className={`w-full h-32 text-xl rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openLoading
                      ? "bg-blue-500/50 backdrop-blur-md text-white cursor-not-allowed"
                      : "bg-gradient-to-br from-blue-500/80 to-cyan-500/80 hover:from-blue-400/90 hover:to-cyan-400/90 backdrop-blur-md text-white shadow-lg hover:shadow-blue-500/25 border border-white/20"
                  }`}
                  onClick={handleOpenDoor}
                  disabled={openLoading || closeLoading}
                >
                  {openLoading ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>
                      <ArrowUp className="mr-2 h-6 w-6" />
                      Open Door
                    </>
                  )}
                </button>
                <p className="mt-2 text-sm text-slate-300">Opens the garage door</p>
              </div>

              <div className="flex flex-col items-center">
                <button
                  className={`w-full h-32 text-xl rounded-xl flex items-center justify-center transition-all duration-300 ${
                    closeLoading
                      ? "bg-rose-500/50 backdrop-blur-md text-white cursor-not-allowed"
                      : "bg-gradient-to-br from-rose-500/80 to-pink-500/80 hover:from-rose-400/90 hover:to-pink-400/90 backdrop-blur-md text-white shadow-lg hover:shadow-rose-500/25 border border-white/20"
                  }`}
                  onClick={handleCloseDoor}
                  disabled={openLoading || closeLoading}
                >
                  {closeLoading ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Closing...
                    </>
                  ) : (
                    <>
                      <ArrowDown className="mr-2 h-6 w-6" />
                      Close Door
                    </>
                  )}
                </button>
                <p className="mt-2 text-sm text-slate-300">Closes the garage door</p>
              </div>
            </div>

            {lastAction && (
              <div className="mt-8 p-4 backdrop-blur-md bg-green-500/20 border border-green-500/30 text-green-200 rounded-xl">
                {lastAction}
              </div>
            )}

            {error && (
              <div className="mt-8 p-4 backdrop-blur-md bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl">
                {error}
              </div>
            )}

            <div className="mt-8 p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl">
              <h3 className="font-medium mb-2 text-white">Important Notes:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300">
                <li>Ensure your garage door path is clear before operating</li>
                <li>Do not operate the door if you cannot visually confirm its status</li>
                <li>For safety reasons, keep children away from the door while operating</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="backdrop-blur-md bg-white/5 border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-slate-400">
            <p className="mb-2">Garage Door Remote Control System</p>
            <p className="text-sm">© {new Date().getFullYear()} Smart Home Solutions</p>
            <p className="text-xs mt-2 text-slate-500">For support, contact: support@smarthome.example.com</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
