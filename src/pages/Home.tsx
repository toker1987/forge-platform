import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroSection from "@/sections/HeroSection"
import AgentSwarmSection from "@/sections/AgentSwarmSection"
import PipelineSection from "@/sections/PipelineSection"
import PricingSection from "@/sections/PricingSection"
import SocialProofSection from "@/sections/SocialProofSection"
import CTAFooterSection from "@/sections/CTAFooterSection"

export default function Home() {
  return (
    <div className="min-h-screen bg-forge-base">
      <Navbar />
      <main>
        <HeroSection />
        <AgentSwarmSection />
        <PipelineSection />
        <PricingSection />
        <SocialProofSection />
        <CTAFooterSection />
      </main>
      <Footer />
    </div>
  )
}