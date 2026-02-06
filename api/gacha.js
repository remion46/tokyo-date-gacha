// api/gacha.js
export default async function handler(request, response) {
  // 環境変数からAPIキーを取得（後でVercelで設定します）
  const apiKey = process.env.HOTPEPPER_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'APIキーがサーバーに設定されていません' });
  }

  // クエリパラメータ（エリアやジャンル）を受け取る
  const { middle_area, genre, budget } = request.query;

  // ホットペッパーAPIのURLを構築
  let url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&format=json&count=100`;

  if (middle_area) url += `&middle_area=${middle_area}`;
  if (genre) url += `&genre=${genre}`;
  if (budget) url += `&budget=${budget}`;

  try {
    const apiRes = await fetch(url);
    if (!apiRes.ok) {
      throw new Error(`API returned ${apiRes.status}`);
    }
    const data = await apiRes.json();
    
    // 成功したらデータを返す
    return response.status(200).json(data);

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
