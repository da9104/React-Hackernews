import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('next.js')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const searchQueryRef = useRef()

  useEffect(() => {
    getResults()
    // .then(res => {
    //   console.log(res)
    //   setResults(res.data.hits)
    // })
    // .catch(err => console.log(err))
  }, []) // will go to infinite loop. 
        // we only want to run once when the component mounted, 

 const getResults = async () => {
  setLoading(true)
  try {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
      )
     // console.log(response.data.hits)
     setResults(response.data.hits)
  } catch (err) {
    console.log(err)
    setError(err)
  }
    setLoading(false)
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  getResults()
  setQuery('')
  // event.target.value
 }

 const handleClear = () => {
  setQuery("")
  searchQueryRef.current.focus()
 }

  return (
    <>
     <h1 className='text-lg font-bold uppercase underline'>Vite + React Hacker news</h1>
     <form onSubmit={handleSubmit}>
     <input
      type="text" 
      value={query} 
      ref={searchQueryRef}
      onChange={event => setQuery(event.target.value)} />
     <button type='submit'>Search</button>
     <button type='button' onClick={handleClear}>Clear</button>
     </form>

  {error && <div className='text-red-700 font-extrabold'> {error.message} </div>}
   
  {loading ? (<div className='text-blue-700 font-extrabold'> Loading... </div>) : (
  <div className='flex flex-col items-center justify-center min-h-screen'>  
  {results.map((result) => (
 <div key={result.objectID} className="rounded-xl border p-5 shadow-md w-9/12 bg-white mb-3">
    <div  className="flex w-full items-center justify-between border-b pb-3">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
        <div className="text-lg font-bold text-slate-700">{result.author}</div>
      </div>
      <div className="flex items-center space-x-8">
        <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">{result._tags[0]}</button>
        <div className="text-xs text-neutral-500"> {result.created_at}</div>
      </div>
    </div>

    <div className="mt-4 mb-6">
      <div className="mb-3 text-xl font-bold text-left">
      <a className='text-left text-black' href={result.url}>{result.title} </a>
      </div>
      <div className="text-sm text-neutral-600"></div>
    </div>

    <div>
      <div className="flex items-center justify-between text-slate-500">
        <div className="flex space-x-4 md:space-x-8">
          <div className="flex cursor-pointer items-center transition hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>{result.num_comments}</span>
          </div>
          <div className="flex cursor-pointer items-center transition hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>{result.points}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    ))}
</div>
)}
    </>
  )
}

export default App
