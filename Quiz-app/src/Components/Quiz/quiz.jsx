import React from 'react'
import './Quiz.css'
const quiz = () => {
  return (
    <div className='container'>
        <h1> Quiz App</h1>
        <hr/>
        <h2>What the Name of your country?</h2>
        <ul>
            <li>Ghana</li>
            <li>Togo</li>
            <li>China</li>
            <li>Canada</li>
            <button>Next</button>

            <div className='index'> 1 0f 20 questions</div>

        </ul>

</div>
  )
}

export default quiz