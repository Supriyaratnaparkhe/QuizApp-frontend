import React  from 'react'
import './App.module.css'
import { HashRouter, Route, Switch } from "react-router-dom";
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard';
import Analytics from './Pages/Analytics/Analytics';
import QnAnalysis from './Pages/QnAnalysis/QnAnalysis';
import Quiz from './Pages/LiveQuiz/Quiz';
import SubmitQuiz from './Pages/Submit Quiz/SubmitQuiz';
import SubmitPoll from './Pages/Submit Poll/SubmitPoll';

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/:userId' element={<Dashboard />}/>
          <Route path='/analytics/:userId' element={<Analytics />}/>
          <Route path='/analytics/:userId/:quizId' element={<QnAnalysis />}/>
          <Route path='/liveQuiz/:quizId' element={<Quiz />}/>
          <Route path='/finalScore' element={<SubmitQuiz />}/>
          <Route path='/finalPoll' element={<SubmitPoll />}/>
        </Switch>
      </HashRouter>
      
    </>
  );
}

export default App;
