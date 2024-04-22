import React, {useState} from 'react'
import { data } from '../../assets/data';

import './Quiz.css'
const quiz = () => {


    let [index,setIndex] = useState(1);
    let [question,setQuestion] = useState(data[index]);


  return (
    <div className='container'>
        <h1> Quiz App</h1>
        <hr/>
        <h2>{index+1}. {question.question}</h2>
        <ul>
            <li>{question.option1}</li>
            <li>{question.option2}</li>
            <li>{question.option3}</li>
            <li>{question.option4}</li>

          
            <button>Next</button>

            <div className='index'> 1 0f 20 questions</div>

        </ul>

</div>
  )
}

export default quiz