
import Home from "./pages/Home";
import Navbar from "./layout/Navbar";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import React, { useState } from "react";
import PageNotFound from "./pages/PageNotFound";


function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path ="/" element={<Navbar/>}>
				<Route index element={<Home/>} />
		
				<Route path="*" element={<PageNotFound />} />
			</Route>
		)
	)

	return (
		
		
			<RouterProvider router={router} />

		

	);
}

export default App;


