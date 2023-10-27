

import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import React, { useState } from "react";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage"

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path ="/expense-full-stack" element={<Navbar/>}>
				<Route index element={<Home/>} />
				<Route path= "/expense-full-stack/profile" element={<ProfilePage/>} />
				<Route path="*" element={<PageNotFound />} />
			</Route>
		)
	)

	return (
		
		
			<RouterProvider router={router} />

		

	);
}

export default App;


