import { Routes, Route } from "react-router-dom"
import Layout from "@/components/Layout"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Projects from "@/pages/Projects"
import ProjectCase from "@/pages/ProjectCase"
import ProjectBuild from "@/pages/ProjectBuild"
import SettingsPage from "@/pages/SettingsPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/case" element={<ProjectCase />} />
        <Route path="/projects/:id/build" element={<ProjectBuild />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}