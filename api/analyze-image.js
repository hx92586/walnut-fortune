const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-2.0-flash";

const FALLBACK_RESULT = {
  possibleType: "识别结果不稳定",
  shapeFeature: "图片信息不足，暂无法稳定判断形制。",
  textureFeature: "纹路细节不够清晰，建议补充自然光近距离照片。",
  pairScore: 0,
  playAdvice: "仅供娱乐和初步参考。请保持手部干净，少油慢盘，避免暴晒和潮湿。",
  collectionAdvice: "仅供娱乐和初步参考，不能替代专业鉴定。高价值交易建议找专业机构或资深玩家复核。",
  riskNote: "图片识别可能受角度、光线、滤镜、清晰度影响，不能作为真伪和价值判断依据。"
};

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

function normalizeBase64(imageBase64 = "") {
  return imageBase64.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, "").trim();
}

function extractJson(text = "") {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Gemini response did not include JSON.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

function normalizeResult(result) {
  return {
    possibleType: String(result.possibleType || FALLBACK_RESULT.possibleType),
    shapeFeature: String(result.shapeFeature || FALLBACK_RESULT.shapeFeature),
    textureFeature: String(result.textureFeature || FALLBACK_RESULT.textureFeature),
    pairScore: Number.isFinite(Number(result.pairScore)) ? Math.max(0, Math.min(100, Number(result.pairScore))) : 0,
    playAdvice: String(result.playAdvice || FALLBACK_RESULT.playAdvice),
    collectionAdvice: String(result.collectionAdvice || FALLBACK_RESULT.collectionAdvice),
    riskNote: String(result.riskNote || FALLBACK_RESULT.riskNote)
  };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return sendJson(response, 405, { error: "只支持 POST 请求。" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return sendJson(response, 503, { error: "AI识图功能开发中，基础好运签功能可以正常使用。" });
  }

  const { imageBase64, mimeType } = request.body || {};
  const imageData = normalizeBase64(imageBase64);
  const imageMimeType = mimeType || "image/jpeg";

  if (!imageData) {
    return sendJson(response, 400, { error: "请上传一张文玩核桃图片。" });
  }

  if (!/^image\/(jpeg|jpg|png|webp)$/i.test(imageMimeType)) {
    return sendJson(response, 400, { error: "仅支持 JPG、PNG 或 WebP 图片。" });
  }

  const prompt = `
请用中文分析这张文玩核桃图片，但必须说明“仅供娱乐和初步参考，不能替代专业鉴定”。

你是一个文玩核桃图片分析助手，请尽量根据图片观察疑似品种、形制、纹路、配对度和盘玩收藏建议。
不要宣称能做最终真伪鉴定、价格鉴定或医疗/投资建议。

请只返回 JSON，不要返回 Markdown，不要添加额外解释。字段必须完全如下：
{
  "possibleType": "疑似品种",
  "shapeFeature": "形制特征",
  "textureFeature": "纹路特点",
  "pairScore": "配对度评分，0-100",
  "playAdvice": "盘玩建议",
  "collectionAdvice": "收藏建议",
  "riskNote": "风险提示"
}
`;

  try {
    const geminiResponse = await fetch(`${GEMINI_ENDPOINT}/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                inline_data: {
                  mime_type: imageMimeType,
                  data: imageData
                }
              },
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });

    const geminiPayload = await geminiResponse.json();

    if (!geminiResponse.ok) {
      const message = geminiPayload?.error?.message || "Gemini API 调用失败。";
      return sendJson(response, geminiResponse.status, { error: message });
    }

    const text = geminiPayload?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!text) {
      return sendJson(response, 502, { error: "Gemini 没有返回可解析的识别内容。", result: FALLBACK_RESULT });
    }

    const result = normalizeResult(extractJson(text));
    return sendJson(response, 200, { result });
  } catch (error) {
    return sendJson(response, 500, {
      error: "识别失败，请稍后重试或换一张更清晰的图片。",
      detail: error.message
    });
  }
}
