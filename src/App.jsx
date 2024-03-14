import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setLength] = useState("6")
  const [numbers, setNumbers] = useState(1)
  const [char, setChar] = useState(null)
  const [password, setPassword] = useState("")

  const copy = useRef(null)

  const generatePassword = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numbers) str+="0123456789"
    if(char) str+="!@#$%^&*()_+"

    for (let i = 0; i <length; i++) {
      const ch = Math.floor(Math.random()* str.length+1);
      pass+=str.charAt(ch)
    }

    setPassword(pass)

  },[numbers, char, length])

  useEffect(() => {
    generatePassword()
  },[length, numbers, char])

  function copyPassword() {
    window.navigator.clipboard.writeText(password)
    copy.current.select()
  }


  return (
    <div className='container'>
      
        <h1>Password Generator</h1>
    
        <input
          className='pass'
          value={password}
          placeholder='password' 
          readOnly
          ref={copy}/>
        <button className='btn'
         onClick={copyPassword}>Copy</button>
      
      
      <div className='box'>
        <input type='range'
          className='len'
          onChange={(e) => setLength(e.target.value)}
          min={5}
          max={40}
        />
        <label className='label'>length:{length}</label>
        
        <div>
        <input
          className='number'
          type='checkbox'
          defaultChecked={numbers}
          onChange={() => {
            setNumbers((prev) => !prev)
          }} />
        <label>Numbers</label>
        </div>
        
        <div>
        <input
          className='char'
          type='checkbox'
          defaultChecked={char}
          onChange={() => {
            setChar((prev) => !prev)
          }} />
        <label>Char</label>
        </div>

      </div>

    </div>
  )
}

export default App
