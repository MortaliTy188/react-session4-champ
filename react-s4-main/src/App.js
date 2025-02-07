import React, { useState } from "react";
import Header from "./components/Header";
import Employees from "./components/Employees";
import Content from "./components/Content";
import GlobalStyles from "./components/GlobalStyles";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <GlobalStyles />
      <Header onSearchChange={setSearchQuery} />
      <Employees searchQuery={searchQuery} />
      <Content searchQuery={searchQuery} />
    </div>
  );
}

export default App;
