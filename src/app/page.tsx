//@refresh

import HomeMain from "@/components/home/HomeMain";
import Wrapper from "@/layout/DefaultWrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Project-base App Dev Course",
};

const Home = () => {
  return (
    <>
      <Wrapper>
        <main className="main-area">
          <HomeMain />
        </main>
      </Wrapper>
    </>
  );
};

export default Home;
