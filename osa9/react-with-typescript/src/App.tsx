import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName}></Header>
      {courseParts.map(course => <Content key={course.name} {...course}/>)}
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;
