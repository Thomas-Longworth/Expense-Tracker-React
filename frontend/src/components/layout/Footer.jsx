import React from 'react'
import { FaGithubSquare  } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <div class="d-flex flex-column ">

  <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50 fixed-bottom">
    <div class="container text-center">
    <h6 className='text-light'><a className ="text-white" style={{textDecoration:"none"}} href ="https://github.com/Thomas-Longworth">Thomas Longworth <FaGithubSquare/></a> </h6>
    </div>
  </footer>
</div> 


    </>
  )
}

export default Footer