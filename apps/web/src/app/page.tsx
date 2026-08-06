import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to BaziGB</h1>
        <p className="mt-4">The ultimate online board game platform.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold">Tic Tac Toe</h2>
          <p className="text-gray-600">Play the classic game of strategy.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Play Now</button>
        </div>
      </div>
    </main>
  );
}
