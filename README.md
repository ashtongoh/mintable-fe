## Architecture Diagram

![mintable-fe drawio](https://github.com/hahaashton1/mintable-fe/assets/54927531/ceea53c0-19bd-455a-8f26-8830fbbf0f0e)


## Technologies Used

**Frontend:** NextJS, TailwindCSS, DaisyUI

**Backend:** Alchemy, Supabase

**Others:** WAGMI, 

**Not-in-use:** Tanstack-query, Recoil - They are coded as part of the providers, but never used


## Improvements

  1) CSS styling and alignments could be further improved upon
  
  2) Currently lacking a log out button for Supabase Auth on the navigation bar
  
  3) Could have used Ethers.js to get the NFT contract information, but it was far too time consuming. Hence I used Alchemy API instead.

  4) An external state management tool, like Recoil, could have been used. However, the extra complexity to add that in wasn't really needed. Supabase and WAGMI both provided their own useContext hooks, so I could simply call them wherever I wanted
  
    
## Instructions

  Note: You will not be able to run this project locally as the redirect URL is pointing to Vercel, not localhost
  
  1) Make sure you have **some NFTs** in Sepolia
  2) You will also need a Metamask wallet and a Twitter account
  3) Head over to the Vercel app: https://mintable-fe-ashy.vercel.app/
  4) After OAuth redirect, you'll be taken to the dashboard where you should be able to view your NFTs. Clicking on the NFT itself will bring you to the NFT details page
  5) Subsequently, you can head to the Create Brand page. This is to simulate a brand creating their own sub-domain. You will choose a name, description and a selection of NFTs to sell.
  6) Lastly, check the brand page that you have just created @ https://mintable-fe-ashy.vercel.app/brand/<brandName>

## Signing off

Always happy to build, always learning from my mistakes

Cheers,
Ashton
