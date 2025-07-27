export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">利用規約</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          この利用規約（以下、「本規約」といいます。）は、[あなたのサービス名]（以下、「本サービス」といいます。）の利用条件を定めるものです。ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">第1条（適用）</h2>
        <p>
          本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">第2条（利用登録）</h2>
        <p>
          本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
        </p>

        {/* 必要に応じて、規約の条文を追加してください */}

        <p className="mt-8">以上</p>
      </div>
    </main>
  );
}
