import React from "react";


function App() {

  return (
    <div className='bg-background'>
      <header className="flex justify-center p-8 flex-col items-center">
        <img alt="Logo Img" src="Logo.png" className="w-32 h-32"/>
        <h1 className="font-bold text-4xl text-neutral-900 font-sans">Quiz App</h1> 
      </header>
      <section className="flex justify-center items-center flex-col p-20 gap-3">
        <h1 className="font-bold text-3xl text-neutral-900 font-sans text-center">What do you want to be Quizzed on?</h1>
        <div>
          <input type="text" className="bg-input p-4 rounded-2xl w-3xl border-2 border-amber-700 text-xl font-bold" />
        </div> 
        <div>
          <select className="bg-dropdown border-2 border-dropdown-border p-4 rounded-2xl w-3xl text-xl font-bold cursor-pointer ">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Adaptive</option>
          </select>
        </div>
        <button className="cursor-pointer bg-primary text-white w-3xl rounded-full p-4 text-xl font-bold">Generate Quiz</button>
      </section>
    </div>
  )
}

export default App
