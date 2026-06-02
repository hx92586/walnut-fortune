const form = document.querySelector("#fortuneForm");
const resultCard = document.querySelector("#resultCard");
const birthMonthInput = document.querySelector("#birthMonth");
const birthDayInput = document.querySelector("#birthDay");
const visionForm = document.querySelector("#visionForm");
const imageInput = document.querySelector("#walnutImage");
const imagePreview = document.querySelector("#imagePreview");
const previewWrap = document.querySelector("#previewWrap");
const uploadTitle = document.querySelector("#uploadTitle");
const uploadHint = document.querySelector("#uploadHint");
const aiResultCard = document.querySelector("#aiResultCard");
const analyzeButton = document.querySelector("#analyzeButton");
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

const zodiacProfiles = {
  "白羊座": { trait: "行动果断、适合开局", boost: 5, preferredBases: ["虎头", "蟠龙纹", "官帽"], tones: ["果断", "推进", "开局"] },
  "金牛座": { trait: "稳定、收藏、长期主义", boost: 8, preferredBases: ["南疆石", "白狮子", "老款狮子头"], tones: ["稳健", "积累", "耐心"] },
  "双子座": { trait: "灵活、表达、信息感强", boost: 4, preferredBases: ["满天星", "苹果园", "水龙纹"], tones: ["灵感", "沟通", "转机"] },
  "巨蟹座": { trait: "细腻、顾家、重安全感", boost: 5, preferredBases: ["磨盘", "灯笼", "白狮子"], tones: ["安定", "修复", "温和"] },
  "狮子座": { trait: "气场足、适合站到台前", boost: 7, preferredBases: ["官帽", "虎头", "蟠龙纹"], tones: ["贵人", "声量", "自信"] },
  "处女座": { trait: "讲究细节、越盘越稳", boost: 6, preferredBases: ["苹果园", "蚂蚁纹", "四座楼"], tones: ["细节", "学习", "校准"] },
  "天秤座": { trait: "审美在线、善于协调", boost: 5, preferredBases: ["苹果园", "白狮子", "公子帽"], tones: ["人缘", "平衡", "顺势"] },
  "天蝎座": { trait: "专注、深沉、适合暗中发力", boost: 8, preferredBases: ["南疆石", "蟠龙纹", "蚂蚁纹"], tones: ["专注", "蓄力", "突破"] },
  "射手座": { trait: "乐观、喜欢打开新局面", boost: 4, preferredBases: ["水龙纹", "满天星", "虎头"], tones: ["开阔", "行动", "轻盈"] },
  "摩羯座": { trait: "稳扎稳打、耐得住周期", boost: 8, preferredBases: ["南疆石", "四座楼", "老款狮子头"], tones: ["坚持", "积累", "长期"] },
  "水瓶座": { trait: "不走寻常路、重辨识度", boost: 5, preferredBases: ["满天星", "水龙纹", "蚂蚁纹"], tones: ["新意", "辨识度", "灵感"] },
  "双鱼座": { trait: "感受力强、适合柔和转运", boost: 6, preferredBases: ["灯笼", "苹果园", "白狮子"], tones: ["松弛", "感受", "回稳"] }
};

const goalCopy = {
  "财运": {
    keywords: ["沉稳", "积累", "见好就收", "稳进"],
    reading: "今天适合稳扎稳打推进计划，不建议冲动消费。把账目、资源和机会重新捋一遍，反而容易发现一个靠谱入口。好运更像慢慢上色的包浆，急不得，但你每多做一步准备，后面就少一点慌。",
    advice: "少油慢盘，盘到微热就停，像理财一样先观察变化。"
  },
  "求职": {
    keywords: ["稳健", "贵人", "临门一脚", "表达"],
    reading: "今天适合把简历、作品或面试话术再磨一遍。不要急着把自己说得很满，清楚讲出优势和下一步，比夸张包装更有气场。若遇到临时机会，保持礼貌和稳定输出，会更容易被看见。",
    advice: "面试前净手慢盘十分钟，提醒自己说重点、稳语速。"
  },
  "学业": {
    keywords: ["学习", "开窍", "坚持", "温故知新"],
    reading: "今日适合处理一个拖延很久的小难点。先把目标拆小，再把注意力放回桌面和笔记上，效率会比想象中更顺。玄学一点说，是脑子里的浮尘该擦了；现实一点说，是复盘真的有效。",
    advice: "读书前轻盘一会儿，手里有节奏，脑子更容易入定。"
  },
  "人缘": {
    keywords: ["贵人", "和气", "会心一笑", "顺口顺心"],
    reading: "今天适合主动释放一点善意，比如补一句感谢、回一条消息、把话说得柔和些。你不必刻意讨好，只要把分寸拿稳，人缘就会像核桃光泽一样慢慢透出来，小互动也可能带来新连接。",
    advice: "盘玩时少刷手机，多留心身边人的情绪和回应。"
  },
  "健康": {
    keywords: ["调息", "舒展", "节制", "养气"],
    reading: "今天的重点是把节奏降下来。少一点熬夜式硬扛，多一点喝水、走路和伸展，身体会给你一个温和反馈。好运签不替代健康建议，但它可以提醒你：真正的好状态，常常从早点休息开始。",
    advice: "轻拿轻放，短时多次，别久盘到手腕疲劳。"
  },
  "心态": {
    keywords: ["松弛", "回稳", "不较劲", "定心"],
    reading: "今天别急着证明什么，也别跟自己反复拉扯。把注意力收回到手边能完成的小事上，心里那团乱线会慢慢松开。娱乐归娱乐，但慢下来这件事，确实有一点转运的味道。",
    advice: "用干净手慢盘，配一杯热茶，让节奏先稳住。"
  }
};

const walnutBases = [
  {
    name: "南疆石",
    intro: "硬派经典品种，骨感强，气质沉稳。",
    collection: "皮质硬、密度高、包浆慢，收藏价值高。",
    play: "上色周期长，适合耐心型玩家。",
    goals: ["财运", "求职", "心态"],
    styles: ["霸气", "收藏级", "老派经典"]
  },
  {
    name: "苹果园",
    intro: "纹路漂亮，形态圆润，颜值友好。",
    collection: "审美接受度高，适合入门收藏。",
    play: "上手轻松，适合新手日常盘玩。",
    goals: ["学业", "人缘", "心态"],
    styles: ["盘玩舒适", "性价比", "老派经典"]
  },
  {
    name: "白狮子",
    intro: "经典名品，受欢迎程度高。",
    collection: "收藏群体广，辨识度稳定。",
    play: "盘感亲和，容易建立日常陪伴感。",
    goals: ["人缘", "求职", "财运"],
    styles: ["老派经典", "盘玩舒适", "性价比"]
  },
  {
    name: "四座楼",
    intro: "端正大气，老玩家认可度高。",
    collection: "经典谱系清晰，适合稳重收藏。",
    play: "纹路规整，越盘越显沉着。",
    goals: ["财运", "求职"],
    styles: ["霸气", "收藏级", "老派经典"]
  },
  {
    name: "磨盘",
    intro: "敦实低调，有复古器物感。",
    collection: "造型耐看，适合偏爱老味道的玩家。",
    play: "手感厚实，适合慢盘养心。",
    goals: ["心态", "健康", "学业"],
    styles: ["盘玩舒适", "老派经典", "性价比"]
  },
  {
    name: "官帽",
    intro: "轮廓利落，有向上气势。",
    collection: "形制辨识度强，适合气场型收藏。",
    play: "手感明确，适合需要提神稳场的日子。",
    goals: ["求职", "财运"],
    styles: ["霸气", "收藏级"]
  },
  {
    name: "鸡心",
    intro: "古味明显，个性不张扬。",
    collection: "老派审美浓，适合小众收藏。",
    play: "盘感灵巧，适合安静蓄力。",
    goals: ["心态", "人缘"],
    styles: ["老派经典", "性价比"]
  },
  {
    name: "满天星",
    intro: "纹理细密，视觉灵动。",
    collection: "细节观赏性强，适合追求辨识度。",
    play: "纹路丰富，盘玩过程有观察乐趣。",
    goals: ["学业", "人缘"],
    styles: ["稀有", "收藏级"]
  },
  {
    name: "蟠龙纹",
    intro: "纹路起伏强，存在感足。",
    collection: "观赏张力强，适合主题收藏。",
    play: "盘玩时触感变化明显。",
    goals: ["财运", "求职"],
    styles: ["霸气", "稀有", "收藏级"]
  },
  {
    name: "老款狮子头",
    intro: "经典耐看，不靠花哨取胜。",
    collection: "老味道足，收藏认知稳定。",
    play: "适合长期盘玩，越盘越显温润。",
    goals: ["财运", "心态", "健康"],
    styles: ["老派经典", "盘玩舒适"]
  },
  {
    name: "麦穗虎头",
    intro: "纹理像麦穗铺开，气势里带细节。",
    collection: "题材特别，适合进阶玩家关注。",
    play: "纹路深浅有层次，盘玩反馈清晰。",
    goals: ["财运", "学业"],
    styles: ["霸气", "稀有"]
  },
  {
    name: "蚂蚁纹",
    intro: "纹理密集细碎，玩味很足。",
    collection: "小众辨识度高，适合细节控。",
    play: "适合边盘边观察纹理走向。",
    goals: ["学业", "心态"],
    styles: ["稀有", "收藏级"]
  },
  {
    name: "水龙纹",
    intro: "纹路流动感强，气质灵活。",
    collection: "观赏性突出，适合个性化收藏。",
    play: "手感有变化，适合轻松盘玩。",
    goals: ["人缘", "学业", "求职"],
    styles: ["稀有", "盘玩舒适"]
  },
  {
    name: "灯笼",
    intro: "形态饱满，视觉喜庆。",
    collection: "寓意讨喜，适合轻收藏和送礼。",
    play: "握感圆润，适合舒缓心情。",
    goals: ["健康", "人缘", "心态"],
    styles: ["盘玩舒适", "性价比"]
  },
  {
    name: "虎头",
    intro: "气势直接，骨架感强。",
    collection: "传统玩家认可度高，适合硬朗审美。",
    play: "上手有力量感，适合提气。",
    goals: ["求职", "财运"],
    styles: ["霸气", "老派经典"]
  },
  {
    name: "公子帽",
    intro: "线条讲究，气质文雅。",
    collection: "造型有辨识度，适合雅致收藏。",
    play: "盘感不笨重，适合日常把玩。",
    goals: ["人缘", "学业", "心态"],
    styles: ["盘玩舒适", "性价比", "老派经典"]
  }
];

const shapeTypes = [
  { name: "三棱", group: "多棱类", styles: ["稀有", "收藏级"], goals: ["学业", "人缘"], rarity: 3 },
  { name: "四棱", group: "多棱类", styles: ["收藏级", "霸气"], goals: ["财运", "求职"], rarity: 5 },
  { name: "五棱", group: "多棱类", styles: ["稀有", "收藏级"], goals: ["财运", "心态"], rarity: 6 },
  { name: "六棱", group: "多棱类", styles: ["稀有", "收藏级"], goals: ["求职", "财运"], rarity: 7 },
  { name: "蛇头", group: "奇形类", styles: ["稀有", "霸气"], goals: ["求职", "人缘"], rarity: 4 },
  { name: "牛角", group: "奇形类", styles: ["霸气", "收藏级"], goals: ["求职", "财运"], rarity: 4 },
  { name: "连体", group: "奇形类", styles: ["稀有", "收藏级"], goals: ["财运", "人缘"], rarity: 6 },
  { name: "元宝", group: "奇形类", styles: ["收藏级", "性价比"], goals: ["财运", "健康"], rarity: 3 },
  { name: "双胞胎", group: "奇形类", styles: ["稀有", "收藏级"], goals: ["人缘", "心态"], rarity: 5 },
  { name: "三联体", group: "奇形类", styles: ["稀有", "收藏级"], goals: ["财运", "求职"], rarity: 7 }
];

const luckyColors = ["朱砂红", "鎏金色", "沉香棕", "松石绿", "蜜蜡黄", "月白", "青瓷蓝", "乌木黑", "宣纸白", "檀木褐"];
const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function padNumber(number) {
  return String(number).padStart(2, "0");
}

function getBirthdayInfo(monthValue, dayValue) {
  const month = Number(monthValue);
  const day = Number(dayValue);

  return {
    key: `${padNumber(month)}-${padNumber(day)}`,
    label: `${month}月${day}日`,
    month,
    day
  };
}

function getZodiacByBirthday(month, day) {
  const boundary = month * 100 + day;

  if (boundary >= 321 && boundary <= 419) return "白羊座";
  if (boundary >= 420 && boundary <= 520) return "金牛座";
  if (boundary >= 521 && boundary <= 621) return "双子座";
  if (boundary >= 622 && boundary <= 722) return "巨蟹座";
  if (boundary >= 723 && boundary <= 822) return "狮子座";
  if (boundary >= 823 && boundary <= 922) return "处女座";
  if (boundary >= 923 && boundary <= 1023) return "天秤座";
  if (boundary >= 1024 && boundary <= 1122) return "天蝎座";
  if (boundary >= 1123 && boundary <= 1221) return "射手座";
  if (boundary >= 1222 || boundary <= 119) return "摩羯座";
  if (boundary >= 120 && boundary <= 218) return "水瓶座";
  return "双鱼座";
}

function fillSelect(select, values, labelFactory) {
  const currentValue = select.value;
  select.innerHTML = `<option value="">${select.id === "birthMonth" ? "月份" : "日期"}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = labelFactory(value);
    select.appendChild(option);
  });

  if (values.includes(Number(currentValue))) {
    select.value = currentValue;
  }
}

function updateBirthDayOptions() {
  const month = Number(birthMonthInput.value) || 1;
  const days = Array.from({ length: monthDays[month - 1] }, (_, index) => index + 1);
  fillSelect(birthDayInput, days, (day) => `${day}日`);
}

function initBirthdaySelects() {
  fillSelect(birthMonthInput, Array.from({ length: 12 }, (_, index) => index + 1), (month) => `${month}月`);
  updateBirthDayOptions();
}

function getTodayInfo() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const weekday = today.getDay();

  return {
    key: `${today.getFullYear()}-${padNumber(month)}-${padNumber(day)}-${weekday}`,
    label: `${today.getFullYear()}年${padNumber(month)}月${padNumber(day)}日`,
    month,
    day,
    weekday
  };
}

function stableHash(text) {
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 9973;
  }
  return hash;
}

function pick(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function getSelected(name) {
  return new FormData(form).get(name);
}

function scoreBase(base, goal, style, profile, seed) {
  const goalScore = base.goals.includes(goal) ? 6 : 0;
  const styleScore = base.styles.includes(style) ? 6 : 0;
  const zodiacScore = profile.preferredBases.includes(base.name) ? 5 : 0;
  return goalScore + styleScore + zodiacScore + (seed % 4);
}

function scoreShape(shape, goal, style, seed) {
  const styleScore = shape.styles.includes(style) ? 8 : 0;
  const goalScore = shape.goals.includes(goal) ? 4 : 0;
  const collectionBonus = ["收藏级", "稀有"].includes(style) ? shape.rarity : 0;
  const steadyCareerBonus = goal === "求职" && style === "收藏级" && shape.name === "四棱" ? 5 : 0;
  const comfortPenalty = ["盘玩舒适", "性价比"].includes(style) && shape.rarity > 5 ? -3 : 0;
  return styleScore + goalScore + collectionBonus + steadyCareerBonus + comfortPenalty + (seed % 3);
}

function chooseByScore(items, scorer) {
  return items
    .map((item) => ({ item, score: scorer(item) }))
    .sort((a, b) => b.score - a.score)[0].item;
}

function chooseRecommendation(goal, style, zodiac, seed) {
  const profile = zodiacProfiles[zodiac];
  const base = chooseByScore(walnutBases, (item) => scoreBase(item, goal, style, profile, seed));
  const shape = chooseByScore(shapeTypes, (item) => scoreShape(item, goal, style, seed + base.name.length));
  const shouldAttachShape = ["收藏级", "稀有", "霸气"].includes(style) || shape.goals.includes(goal);
  const name = shouldAttachShape ? `${base.name}${shape.name}` : base.name;

  return {
    name,
    base,
    shape: shouldAttachShape ? shape : null
  };
}

function buildResult({ zodiac, birthday, today, goal, walnutStyle }) {
  const profile = zodiacProfiles[zodiac];
  const goalInfo = goalCopy[goal];
  const seed = stableHash(`${zodiac}-${birthday.key}-${goal}-${walnutStyle}-${today.key}`);
  const todayScore = today.month * 7 + today.day + today.weekday * 3;
  const birthdayScore = birthday.month * 5 + birthday.day;
  const score = 60 + ((seed + profile.boost + todayScore + birthdayScore) % 40);
  const zodiacKeyword = pick(profile.tones, seed + 3);
  const goalKeyword = pick(goalInfo.keywords, seed + score);
  const keywordSet = new Set([goalKeyword, zodiacKeyword, pick(goalInfo.keywords, seed + 9)]);
  ["沉稳", "积累", "坚持", "贵人"].forEach((word) => {
    if (keywordSet.size < 3) {
      keywordSet.add(word);
    }
  });
  const keywords = Array.from(keywordSet).slice(0, 3).join("、");
  const recommendation = chooseRecommendation(goal, walnutStyle, zodiac, seed);
  const luckyColor = pick(luckyColors, seed + score);
  const luckyNumber = ((seed + score) % 99) + 1;
  const shapeText = recommendation.shape ? `${recommendation.shape.name}造型${recommendation.shape.group === "多棱类" ? "棱线清楚" : "辨识度强"}，` : "";
  const reason = `${recommendation.base.name}${recommendation.base.intro}${recommendation.base.collection}${shapeText}与${zodiac}“${profile.trait}”的节奏相合，也贴近你今天想提升的「${goal}」方向。`;

  return {
    score,
    keywords,
    reading: `${goalInfo.reading}${zodiac}今天的底色是“${profile.trait}”，生日月日带来的个人节奏与今日气口叠在一起，偏好「${walnutStyle}」会让推荐更贴近你的手感和审美。这是一支娱乐好运签，真正能改变今天的，还是你愿意稳稳推进的那一步。`,
    recommendation,
    reason,
    luckyColor,
    luckyNumber,
    advice: `${goalInfo.advice}${recommendation.base.play}慢盘少刷，保持手部干净，顺其自然形成包浆。`
  };
}

function renderResult(result, formData) {
  resultCard.classList.remove("is-empty");
  resultCard.style.setProperty("--score-angle", `${result.score * 3.6}deg`);
  resultCard.innerHTML = `
    <div class="result-content">
      <div class="result-title">
        <div>
          <p class="eyebrow result-eyebrow">好运签已开</p>
          <h2>${formData.zodiac} · ${formData.goal}签</h2>
        </div>
        <span class="tag">今日好运签</span>
      </div>

      <div class="lucky-row">
        <div class="lucky-token"><span>生日</span><strong>${formData.birthday.label}</strong></div>
        <div class="lucky-token"><span>星座</span><strong>${formData.zodiac}</strong></div>
        <div class="lucky-token"><span>今日日期</span><strong>${formData.today.label}</strong></div>
      </div>

      <div class="score-panel">
        <div class="score-ring"><span>${result.score}</span></div>
        <div>
          <div class="keyword">今日关键词：${result.keywords}</div>
          <p class="reading">${result.reading}</p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-box">
          <div class="label">推荐文玩核桃</div>
          <p class="value walnut-name">${result.recommendation.name}</p>
        </div>
        <div class="info-box">
          <div class="label">偏好命中</div>
          <p class="value">${formData.walnutStyle} · ${formData.goal}</p>
        </div>
        <div class="info-box full">
          <div class="label">推荐理由</div>
          <p class="value">${result.reason}</p>
        </div>
        <div class="info-box full">
          <div class="label">今日盘玩建议</div>
          <p class="value">${result.advice}</p>
        </div>
      </div>

      <div class="lucky-row">
        <div class="lucky-token"><span>幸运颜色</span><strong>${result.luckyColor}</strong></div>
        <div class="lucky-token"><span>幸运数字</span><strong>${result.luckyNumber}</strong></div>
      </div>

      <button class="reset-button" type="button" id="resetButton">重新测算</button>
    </div>
  `;

  document.querySelector("#resetButton").addEventListener("click", () => {
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
    form.requestSubmit();
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const today = getTodayInfo();
  const birthday = getBirthdayInfo(birthMonthInput.value, birthDayInput.value);
  const zodiac = getZodiacByBirthday(birthday.month, birthday.day);

  const formData = {
    zodiac,
    birthday,
    today,
    goal: getSelected("goal"),
    walnutStyle: getSelected("walnutStyle")
  };

  const result = buildResult(formData);
  renderResult(result, formData);
  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

initBirthdaySelects();
birthMonthInput.addEventListener("change", updateBirthDayOptions);

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(new Error("图片读取失败，请重新选择。")));
    reader.readAsDataURL(file);
  });
}

function renderAiLoading() {
  aiResultCard.classList.remove("is-empty");
  aiResultCard.innerHTML = `
    <div class="ai-result-content">
      <div class="result-title">
        <div>
          <p class="eyebrow result-eyebrow">AI识图中</p>
          <h2>正在观察纹路</h2>
        </div>
        <span class="tag">请稍候</span>
      </div>
      <p class="status-note">AI 正在根据图片做娱乐化初步分析，结果不能替代专业鉴定。</p>
    </div>
  `;
}

function renderAiError(message) {
  aiResultCard.classList.remove("is-empty");
  aiResultCard.innerHTML = `
    <div class="ai-result-content">
      <div class="result-title">
        <div>
          <p class="eyebrow result-eyebrow">识别失败</p>
          <h2>换张清晰照片试试</h2>
        </div>
      </div>
      <div class="error-box">${message}</div>
      <p class="status-note">建议上传自然光下、主体完整、纹路清楚的核桃照片。</p>
    </div>
  `;
}

function renderAiResult(result) {
  aiResultCard.classList.remove("is-empty");
  aiResultCard.innerHTML = `
    <div class="ai-result-content">
      <div class="ai-result-header">
        <div>
          <p class="eyebrow result-eyebrow">识别结果</p>
          <h3>${result.possibleType}</h3>
        </div>
        <span class="tag">${result.pairScore}分</span>
      </div>
      <div class="ai-grid">
        <div class="info-box">
          <div class="label">形制特征</div>
          <p class="value">${result.shapeFeature}</p>
        </div>
        <div class="info-box">
          <div class="label">纹路特点</div>
          <p class="value">${result.textureFeature}</p>
        </div>
        <div class="info-box full">
          <div class="label">盘玩建议</div>
          <p class="value">${result.playAdvice}</p>
        </div>
        <div class="info-box full">
          <div class="label">收藏建议</div>
          <p class="value">${result.collectionAdvice}</p>
        </div>
        <div class="info-box full">
          <div class="label">风险提示</div>
          <p class="value">${result.riskNote}</p>
        </div>
      </div>
    </div>
  `;
}

imageInput.addEventListener("change", async () => {
  const file = imageInput.files?.[0];
  if (!file) {
    return;
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    renderAiError("图片格式不支持，请上传 JPG、PNG 或 WebP。");
    imageInput.value = "";
    return;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    renderAiError("图片文件偏大，请压缩到 4MB 以内再上传。");
    imageInput.value = "";
    return;
  }

  const dataUrl = await fileToDataUrl(file);
  imagePreview.src = dataUrl;
  previewWrap.classList.remove("is-hidden");
  uploadTitle.textContent = file.name;
  uploadHint.textContent = "图片已就位，可以开始识别。";
});

visionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const file = imageInput.files?.[0];
  if (!file) {
    renderAiError("请先上传一张文玩核桃图片。");
    return;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    renderAiError("图片文件偏大，请压缩到 4MB 以内再上传。");
    return;
  }

  analyzeButton.disabled = true;
  analyzeButton.textContent = "识别中...";
  renderAiLoading();

  try {
    const dataUrl = await fileToDataUrl(file);
    const [, imageBase64] = dataUrl.split(",");
    const response = await fetch("/api/analyze-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageBase64,
        mimeType: file.type
      })
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "AI 识别服务暂时不可用。");
    }

    renderAiResult(payload.result);
  } catch (error) {
    renderAiError(error.message || "识别失败，请稍后重试。");
  } finally {
    analyzeButton.disabled = false;
    analyzeButton.textContent = "开始识别";
  }
});
