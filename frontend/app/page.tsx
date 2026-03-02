import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 导航栏 */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌐</span>
          <span className="text-xl font-bold text-primary-600">PolyTalk</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-primary-600">
            登录
          </Link>
          <Link href="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            免费注册
          </Link>
        </div>
      </nav>

      {/* Hero 区域 */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          多语言启蒙与学习的智能代理
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          通过 AI 语伴实时对话，轻松掌握英语、日语、韩语等多种语言。
          零成本、零压力，让语言学习变成日常对话。
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/chat" className="px-8 py-3 bg-primary-600 text-white rounded-lg text-lg hover:bg-primary-700">
            开始对话
          </Link>
          <Link href="/courses" className="px-8 py-3 border border-primary-600 text-primary-600 rounded-lg text-lg hover:bg-primary-50">
            浏览课程
          </Link>
        </div>
      </div>

      {/* 特性展示 */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold mb-2">语音对话</h3>
            <p className="text-gray-600">
              真实语音交互，AI 语伴实时纠正发音，让口语练习更自然。
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">智能 AI</h3>
            <p className="text-gray-600">
              GLM-4 驱动，支持 99 种语言，自适应你的学习水平。
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">零成本</h3>
            <p className="text-gray-600">
              全栈开源方案，无需付费订阅，学习无门槛。
            </p>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2026 PolyTalk. 多语言启蒙与学习的智能代理</p>
        </div>
      </footer>
    </main>
  )
}
