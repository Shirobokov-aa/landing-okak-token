"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, ExternalLink, Twitter, MessageCircle, Github, TrendingUp, Coins, Shield, Rocket } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OkakCatLanding() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const tokenAddress = "FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm";

  // Ссылки на агрегаторы и соцсети
  const raydiumUrl = `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${tokenAddress}`;
  const birdeyeUrl = `https://birdeye.so/token/FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm?chain=solana`;
  const solscanUrl = `https://solscan.io/token/FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm`;
  const geckoTerminalUrl = `https://www.geckoterminal.com/solana/pools/HVbPdCnHGpXVAXGCR8WXtPdoaCT1AA3p6ts1PBTN7UbX`;
  const orcaUrl = `https://www.orca.so/pools/HVbPdCnHGpXVAXGCR8WXtPdoaCT1AA3p6ts1PBTN7UbX`;
  const jupiterUrl = `https://jup.ag/swap/SOL-FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm`;
  const twitterUrl = "https://x.com/1k_airdroptoken"; // заменить на реальный
  const telegramUrl = "https://t.me/airdroptoken_1k"; // заменить на реальный
  const githubUrl = "https://github.com/ваш-репозиторий"; // заменить на реальный

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-14 h-14 border-[1px] border-white rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                <Image src="/images/logo.png" alt="OkakCat" width={54} height={54} className="rounded-full" />
              </span>
            </div>
            <span className="font-bold text-xl text-white">OKAK | Token Solana</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#about"
              className="text-gray-300 hover:text-orange-400 transition-colors uppercase font-semibold"
            >
              About
            </Link>
            <Link
              href="#tokenomics"
              className="text-gray-300 hover:text-orange-400 transition-colors uppercase font-semibold"
            >
              Tokenomics
            </Link>
            <Link
              href="#roadmap"
              className="text-gray-300 hover:text-orange-400 transition-colors uppercase font-semibold"
            >
              Roadmap
            </Link>
            <Link
              href="#community"
              className="text-gray-300 hover:text-orange-400 transition-colors uppercase font-semibold"
            >
              Community
            </Link>
          </nav>
          <div className="flex gap-2">
            <Button
              asChild
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
            >
              <a href={orcaUrl} target="_blank" rel="noopener noreferrer">
                <Rocket className="mr-2 h-5 w-5" />
                Buy on Orca
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
            >
              <a href={birdeyeUrl} target="_blank" rel="noopener noreferrer">
                <TrendingUp className="mr-2 h-5 w-5" />
                Graph
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <span className="text-6xl">
                <Image src="/images/logo.png" alt="OkakCat" width={150} height={150} className="rounded-full" />
              </span>
            </motion.div>
            <Badge className="mb-4 bg-gray-800 text-orange-300 border border-orange-500">Solana Meme Token</Badge>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"
          >
            OKAK | OkakCat | Solana
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl md:text-2xl text-gray-200 mb-2"
          >
            $OKAK
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            The purrfect meme coin that's taking Solana by storm! Join the cutest revolution in DeFi with OkakCat -
            where memes meet moonshots! 🚀
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href={orcaUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Buy on Orca
              </Button>
            </motion.a>
            <motion.a
              href={birdeyeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Graph (Birdeye)
              </Button>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-gray-900/50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">About OKAK</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              OKAK isn't just another meme token - it's a community-driven movement celebrating the internet's favorite
              feline friends while building real utility on Solana.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                To create the most beloved cat-themed cryptocurrency that combines the power of memes with serious DeFi
                innovation. We're building a ecosystem where holders can earn, play, and contribute to cat welfare
                worldwide.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-gray-800 text-orange-300 border border-orange-500">Network</Badge>
                  <span className="text-gray-200">Solana</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-gray-800 text-pink-300 border border-pink-500">Ticker</Badge>
                  <span className="text-gray-200">$OKAK</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-gray-800 text-purple-300 border border-purple-500">Contract</Badge>
                  <span className="text-gray-300 font-mono text-sm">
                    {tokenAddress.slice(0, 8)}...{tokenAddress.slice(-8)}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(tokenAddress)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700">
                <div className="text-8xl mb-4 flex items-center justify-center">
                  <Image src="/images/logo.png" alt="OkakCat" width={150} height={150} className="rounded-full" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Join the Cat Pack!</h4>
                <p className="text-gray-300">
                  We need 10,000 holders to make this project successful. Let's do it together!
                </p>
                <p className="text-gray-300">Let's help each cat find a home!</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Tokenomics</h2>
            <p className="text-xl text-gray-300">Fair and transparent distribution for maximum community benefit</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-orange-500 bg-gray-900 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Coins className="h-6 w-6 text-orange-500" />
                    <span>Token Supply</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-500 mb-2">100,000,000</div>
                  <p className="text-gray-300">Total OKAK tokens</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <span className="font-medium text-gray-200">Liquidity Pool</span>
                    <Badge className="bg-orange-500 text-white">80%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <span className="font-medium text-gray-200">Community Rewards</span>
                    <Badge className="bg-pink-500 text-white">10%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <span className="font-medium text-gray-200">Development</span>
                    <Badge className="bg-purple-500 text-white">5%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <span className="font-medium text-gray-200">Marketing</span>
                    <Badge className="bg-blue-500 text-white">5%</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <motion.section
        id="roadmap"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-gray-900/50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Roadmap</h2>
            <p className="text-xl text-gray-300">Our journey to the moon, one paw at a time</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Phase 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-l-4 border-l-green-500 bg-gray-900 text-white border border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-400">Phase 1: Launch 🚀</CardTitle>
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Token deployment on Solana</li>
                      <li>• Initial liquidity provision</li>
                      <li>• Community building</li>
                      <li>• Social media presence</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Phase 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-l-4 border-l-orange-500 bg-gray-900 text-white border border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-orange-400">Phase 2: Growth 📈</CardTitle>
                      <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500">In Progress</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300">
                      <li>• DEX listings (Raydium, Orca)</li>
                      <li>• CoinGecko & CoinMarketCap</li>
                      <li>• Influencer partnerships</li>
                      <li>• Meme contests & rewards</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Phase 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="border-l-4 border-l-blue-500 bg-gray-900 text-white border border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-400">Phase 3: Utility 🛠️</CardTitle>
                      <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500">Upcoming</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300">
                      <li>• NFT collection launch</li>
                      <li>• Staking rewards program</li>
                      <li>• Mobile app development</li>
                      <li>• Cat charity partnerships</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Phase 4 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="border-l-4 border-l-purple-500 bg-gray-900 text-white border border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-400">Phase 4: Ecosystem 🌟</CardTitle>
                      <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500">Future</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300">
                      <li>• DeFi integrations</li>
                      <li>• Cross-chain expansion</li>
                      <li>• Gaming platform</li>
                      <li>• Global cat welfare fund</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section
        id="community"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join Our Community</h2>
            <p className="text-xl text-gray-300">Connect with fellow cat lovers and OKAK holders</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer bg-gray-900 text-white border border-gray-700 hover:border-blue-500">
                <CardHeader>
                  <Twitter className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle>Twitter</CardTitle>
                  <CardDescription className="text-gray-400">Latest updates and memes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    Follow Us
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
            <Link href={telegramUrl} target="_blank" rel="noopener noreferrer">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer bg-gray-900 text-white border border-gray-700 hover:border-blue-500">
                <CardHeader>
                  <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle>Telegram</CardTitle>
                  <CardDescription className="text-gray-400">Chat with the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    Join Chat
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
            {/* <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer bg-gray-900 text-white border border-gray-700 hover:border-gray-500">
                <CardHeader>
                  <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <CardTitle>GitHub</CardTitle>
                  <CardDescription className="text-gray-400">Open source development</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-gray-500 text-gray-400 hover:bg-gray-500/10"
                  >
                    View Code
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link> */}
          </div>
        </div>
      </motion.section>

      {/* Contract & Transparency */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-gray-900/50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contract & Transparency</h2>
            <p className="text-xl text-gray-300">Fully verified and transparent for your security</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8 bg-gray-900 text-white border border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-green-500" />
                  <span>Token Contract Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <code className="text-sm font-mono text-gray-300">{tokenAddress}</code>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(tokenAddress)}
                    className="ml-4 bg-gray-700 hover:bg-gray-600"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 text-white border border-gray-700">
                <CardHeader>
                  <CardTitle>Blockchain Explorers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-between bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <a href={solscanUrl} target="_blank" rel="noopener noreferrer">
                      Solscan
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-between bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <a href={birdeyeUrl} target="_blank" rel="noopener noreferrer">
                      Birdeye
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-between bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <a href={geckoTerminalUrl} target="_blank" rel="noopener noreferrer">
                      GeckoTerminal
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 text-white border border-gray-700">
                <CardHeader>
                  <CardTitle>Trading Platforms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* <Button
                    asChild
                    variant="outline"
                    className="w-full justify-between bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <a href={raydiumUrl} target="_blank" rel="noopener noreferrer">
                      Raydium
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button> */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-between bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <a href={orcaUrl} target="_blank" rel="noopener noreferrer">
                      Orca
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-between bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <a href={jupiterUrl} target="_blank" rel="noopener noreferrer">
                      Jupiter
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🐱</span>
              </div>
              <span className="font-bold text-xl">OkakCat</span>
            </div>
            <div className="flex space-x-6">
              <Link
                href={twitterUrl}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href={telegramUrl}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
              {/* <Link
                href={githubUrl}
                className="text-gray-400 hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </Link> */}
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 OkakCat. All rights reserved. This is a meme token for entertainment purposes.</p>
            <p className="mt-2 text-sm">Always DYOR (Do Your Own Research) before investing in any cryptocurrency.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
