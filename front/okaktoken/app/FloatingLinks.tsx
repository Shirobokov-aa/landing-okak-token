import { Twitter, MessageCircle, TrendingUp, Rocket, Shield } from "lucide-react";

const links = [
  {
    href: "https://x.com/1k_airdroptoken",
    label: "Twitter | X",
    icon: <Twitter className="w-5 h-5" />,
    color: "hover:bg-blue-500/20 text-blue-400 border-blue-400",
  },
  {
    href: "https://t.me/airdroptoken_1k",
    label: "Telegram",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "hover:bg-blue-400/20 text-blue-300 border-blue-300",
  },
  {
    href: "https://birdeye.so/token/FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm?chain=solana",
    label: "Birdeye",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "hover:bg-orange-400/20 text-orange-300 border-orange-300",
  },
  {
    href: "https://www.orca.so/pools/HVbPdCnHGpXVAXGCR8WXtPdoaCT1AA3p6ts1PBTN7UbX",
    label: "Orca",
    icon: <Rocket className="w-5 h-5" />,
    color: "hover:bg-pink-400/20 text-pink-300 border-pink-300",
  },
  {
    href: "https://solscan.io/token/FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm",
    label: "Solscan",
    icon: <Shield className="w-5 h-5" />,
    color: "hover:bg-green-400/20 text-green-300 border-green-300",
  },
];

export default function FloatingLinks() {
  return (
    <div className="fixed top-1/3 right-6 z-50 flex flex-col gap-3 p-3 bg-gray-900/90 border border-gray-700 rounded-2xl shadow-xl backdrop-blur-md hidden md:flex">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-105 ${link.color}`}
        >
          {link.icon}
          <span className="hidden md:inline text-sm font-medium">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
