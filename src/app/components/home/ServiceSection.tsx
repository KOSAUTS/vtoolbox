export function ServiceSection() {
  return (
    <section className="px-6 py-12 ml-64">
      <h3 className="text-2xl font-semibold mb-6">提供サービス</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <li className="p-4 bg-white rounded-xl shadow">
          <h4 className="font-bold">YouTube宣伝機能</h4>
          <p className="text-sm text-gray-600">
            投稿文のテンプレ保存や自動投稿に対応。
          </p>
        </li>
        <li className="p-4 bg-white rounded-xl shadow">
          <h4 className="font-bold">サブスクリプション管理</h4>
          <p className="text-sm text-gray-600">
            簡単に支払い・解約が可能なUI。
          </p>
        </li>
        {/* 追加サービスをここに増やせます */}
      </ul>
    </section>
  );
}
