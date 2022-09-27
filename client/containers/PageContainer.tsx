import React from "react";
import { Header } from "../components/Header";
import CodeContainer from "./CodeContainer";
import ButtonContainer from "./ButtonContainer";
import Footer from "../components/Footer";

export const PageContainer = () => {
  return(
    <div id='page-body'>
      <Header />
      <CodeContainer />
      <ButtonContainer />
    </div>
  )
}