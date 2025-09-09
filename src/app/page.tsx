//@refresh

import HomeMain from "@/components/home/HomeMain";
import Wrapper from "@/layout/DefaultWrapper";
import { Metadata } from "next";
import Script from "next/script";
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
<<<<<<< HEAD
        <script type='text/javascript' src='//pl26850584.profitableratecpm.com/8f/88/2b/8f882b070aa288aa986892f6ee6b951d.js'></script>
    </>
=======

        
        {/* Adsterra Social Bar script */}
        <Script
        id="adsterra-social-bar"
        strategy="afterInteractive"
        src="//pl26850584.profitableratecpm.com/8f/88/2b/8f882b070aa288aa986892f6ee6b951d.js"
      />
            </>
>>>>>>> 8432736a2bfa2ae6b3cffd8c5790503a6e7a47e3
  );
}

export default Home