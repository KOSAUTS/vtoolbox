export function FAQSection() {
  return (
    <section className="px-6 py-12 ml-64">
      <h3 className="text-2xl font-semibold mb-6">よくある質問</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold">Q. 無料トライアルはありますか？</h4>
          <p className="text-sm text-gray-600">
            はい、すべての機能を1週間ご利用いただけます。
          </p>
        </div>
        <div>
          <h4 className="font-bold">Q. Twitter以外に対応予定は？</h4>
          <p className="text-sm text-gray-600">
            今後、InstagramやYouTube連携を予定しています。
          </p>
        </div>
      </div>
    </section>
  );
}
