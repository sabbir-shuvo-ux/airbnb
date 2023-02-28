import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PLaceFormPage from "./components/PLaceFormPage";
import BookingLIst from "./pages/BookingLIst";
import ProtecedRoute from "./components/ProtecedRoute";
import PlacePage from "./pages/PlacePage";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/account"
          element={
            <ProtecedRoute>
              <ProfilePage />
            </ProtecedRoute>
          }
        />
        <Route
          path="/account/places"
          element={
            <ProtecedRoute>
              <PlacesPage />
            </ProtecedRoute>
          }
        />
        <Route
          path="/account/places/new"
          element={
            <ProtecedRoute>
              <PLaceFormPage />
            </ProtecedRoute>
          }
        />
        <Route
          path="/account/places/:id"
          element={
            <ProtecedRoute>
              <PLaceFormPage />
            </ProtecedRoute>
          }
        />
        <Route
          path="/account/bookings"
          element={
            <ProtecedRoute>
              <BookingLIst />
            </ProtecedRoute>
          }
        />

        <Route path="/place/:id" element={<PlacePage />} />
      </Route>
    </Routes>
  );
};

export default App;
