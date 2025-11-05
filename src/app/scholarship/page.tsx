import React from "react";
import ScholarBanner from "./components/ScholarBanner";
import ScholarContent from "./components/ScholarContent";
import ScholarForm from "./components/ScholarForm";

const page = () => {
  return (
    <div>
      <ScholarBanner />
      <ScholarContent />
      <ScholarForm />
    </div>
  );
};

export default page;
