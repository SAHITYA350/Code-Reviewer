// import { useState, useEffect } from 'react'
// import "prismjs/themes/prism-tomorrow.css"
// import Editor from "react-simple-code-editor"
// import prism from "prismjs"
// import Markdown from "react-markdown"
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios'
// import './App.css'
// import {Button} from 'button.jsx';

// function App() {
//   const [code, setCode] = useState(`function sum() {
//   return 1 + 1
// }`)

//   const [review, setReview] = useState(``)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     prism.highlightAll()
//   }, [])

//   async function reviewCode() {
//     if (!code.trim()) {
//       setError('Please enter some code to review')
//       return
//     }

//     setLoading(true)
//     setError('')
    
//     try {
//       const response = await axios.post('http://localhost:3000/ai/get-review', 
//         { code },
//         {
//           timeout: 30000, // 30 second timeout
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       )
      
//       setReview(response.data.review || response.data)
//     } catch (err) {
//       console.error('Review error:', err)
//       if (err.code === 'ERR_NETWORK') {
//         setError('Network error: Cannot connect to server. Make sure backend is running on port 3000.')
//       } else if (err.response?.data?.error) {
//         setError(`Server error: ${err.response.data.error}`)
//       } else {
//         setError('Failed to get code review. Please try again.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <main>
//         <div className="left">
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={code => {
//                 setCode(code)
//                 setError('') // Clear error when user types
//               }}
//               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 height: "100%",
//                 width: "100%"
//               }}
//             />
//           </div>
          
//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}
          
//           <div
//             onClick={reviewCode}
//             disabled={loading}
//             className={`review ${loading ? 'loading' : ''}`}
//           >
//             {loading ? 'Reviewing...' : 'Review Code'}
//           </div>
//         </div>
        
//         <div className="right">
//           {loading ? (
//             <div className="loading-spinner">Analyzing your code...</div>
//           ) : (
//             <Markdown
//               rehypePlugins={[rehypeHighlight]}
//             >
//               {review}
//             </Markdown>
//           )}
//         </div>
//       </main>
//     </>
//   )
// }

// export default App



import { useState, useEffect } from "react"
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from "axios"
import "./App.css"

function App() {
  const defaultCode = `function sum() {
  return 1 + 1
}`

  const [code, setCode] = useState(defaultCode)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (!code.trim()) {
      setError("Please enter some code to review")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post('https://code-reviewer-n7xc.onrender.com/ai/get-review',
        { code },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      setReview(response.data.review || response.data)
    } catch (err) {
      console.error("Review error:", err)
      if (err.code === "ERR_NETWORK") {
        setError(
          "Network error: Cannot connect to server. Make sure backend is running on port 3000."
        )
      } else if (err.response?.data?.error) {
        setError(`Server error: ${err.response.data.error}`)
      } else {
        setError("Failed to get code review. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(code)
  }

  function resetCode() {
    setCode(defaultCode)
    setError("")
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => {
                setCode(code)
                setError("")
              }}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="controls">
            <button className="action-btn" onClick={copyCode}>
              Copy Code
            </button>

            <button className="action-btn reset-btn" onClick={resetCode}>
              Reset Code
            </button>
          </div>

          <div
            onClick={reviewCode}
            disabled={loading}
            className={`review ${loading ? "loading" : ""}`}
          >
            {loading ? "Reviewing..." : "Review Code"}
          </div>
        </div>

        <div className="right">
          {loading ? (
            <div className="loading-spinner">Analyzing your code...</div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          )}
        </div>
      </main>
    </>
  )
}

export default App
