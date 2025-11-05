"use client";
import React, { Suspense } from "react";
import Header from './components/Header'
import Table from './components/Table';
import CourseList from './components/CourseList';

const page = () => {
  return (
    <div>
      <Header />
      <Table />
      <Suspense fallback={<div>Loading courses...</div>}>
        <CourseList />
      </Suspense>
    </div>
  )
}

export default page