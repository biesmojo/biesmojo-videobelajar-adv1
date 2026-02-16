import React from "react";
import CourseList from "./features/courses/CourseList";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <MainLayout>

    <div>
      <CourseList />
    </div>
    </MainLayout>   
  );
}

export default App;
