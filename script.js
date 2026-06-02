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

const textureFeatureNotes = {
  "蟠龙纹": "这类核桃纹路接近蟠龙纹风格，视觉张力强。",
  "蚂蚁纹": "这类核桃纹路细密紧凑，带一点蚂蚁纹式的细节观赏性。",
  "水龙纹": "这类核桃纹路有流动感，接近水龙纹的灵动气质。",
  "满天星": "这类核桃纹点细碎丰富，有接近满天星的视觉层次。"
};

const forbiddenCombinations = [
  "白狮子元宝",
  "白狮子蛇头",
  "白狮子牛角",
  "蟠龙纹六棱",
  "满天星六棱",
  "蚂蚁纹元宝",
  "水龙纹牛角"
];

const curatedRecommendationPool = [
  {
    name: "南疆石",
    group: "independent",
    base: "南疆石",
    goals: ["财运", "求职", "心态"],
    styles: ["霸气", "收藏级", "老派经典"],
    zodiacs: ["金牛座", "天蝎座", "摩羯座"],
    texture: "蟠龙纹",
    reason: "南疆石皮质硬、密度高，包浆周期长，适合重视长期盘玩和收藏价值的玩家。",
    play: "适合净手慢盘，少刷少油，耐心观察颜色和皮质变化。"
  },
  {
    name: "南疆石四棱",
    group: "multiRidge",
    base: "南疆石",
    goals: ["财运", "求职"],
    styles: ["霸气", "收藏级"],
    zodiacs: ["金牛座", "摩羯座"],
    texture: "蟠龙纹",
    reason: "南疆石皮质硬、密度高，四棱形制稀有且辨识度强，适合重视长期盘玩和收藏价值的玩家。",
    play: "棱线处不要急刷，慢盘为主，让边角自然过渡。"
  },
  {
    name: "南疆石五棱",
    group: "multiRidge",
    base: "南疆石",
    goals: ["财运", "心态"],
    styles: ["稀有", "收藏级"],
    zodiacs: ["金牛座", "天蝎座", "摩羯座"],
    texture: "蚂蚁纹",
    reason: "南疆石五棱在形制上更少见，皮质硬、密度高，适合偏好稀有感和收藏感的玩家。",
    play: "适合短时多次慢盘，避免过度用力磨损棱线。"
  },
  {
    name: "苹果园",
    group: "independent",
    base: "苹果园",
    goals: ["学业", "人缘", "心态"],
    styles: ["盘玩舒适", "性价比", "老派经典"],
    zodiacs: ["双子座", "处女座", "天秤座", "双鱼座"],
    texture: "满天星",
    reason: "苹果园纹路漂亮、形态圆润，颜值友好，适合新手和日常盘玩玩家。",
    play: "上手轻松，适合每日少量盘玩，保持干净即可。"
  },
  {
    name: "苹果园三棱",
    group: "multiRidge",
    base: "苹果园",
    goals: ["学业", "人缘"],
    styles: ["稀有", "收藏级"],
    zodiacs: ["双子座", "处女座", "天秤座"],
    texture: "满天星",
    reason: "苹果园三棱兼具圆润底子和特殊形制，观赏性更强，适合喜欢精巧辨识度的玩家。",
    play: "盘玩时注意棱线和窝底，轻盘慢养更稳妥。"
  },
  {
    name: "白狮子",
    group: "independent",
    base: "白狮子",
    goals: ["财运", "求职", "人缘", "心态"],
    styles: ["老派经典", "盘玩舒适", "性价比"],
    zodiacs: ["金牛座", "巨蟹座", "天秤座", "双鱼座"],
    texture: "水龙纹",
    reason: "白狮子是经典文玩核桃品种，辨识度高，受欢迎程度广，适合入门到进阶玩家长期盘玩。",
    play: "白狮子适合日常手盘，注意净手和阴凉静置，别急着追求快速上色。"
  },
  {
    name: "四座楼",
    group: "independent",
    base: "四座楼",
    goals: ["财运", "求职"],
    styles: ["霸气", "收藏级", "老派经典"],
    zodiacs: ["摩羯座", "处女座"],
    texture: "蟠龙纹",
    reason: "四座楼端正大气、经典谱系清晰，适合喜欢稳重器型和老派审美的玩家。",
    play: "盘玩时先稳住底色，少油少汗，避免急躁刷纹。"
  },
  {
    name: "官帽",
    group: "independent",
    base: "官帽",
    goals: ["财运", "求职"],
    styles: ["霸气", "收藏级"],
    zodiacs: ["白羊座", "狮子座"],
    texture: "蟠龙纹",
    reason: "官帽轮廓利落、气场明确，适合需要稳场和提升精神头的日子。",
    play: "适合干手慢盘，盘后自然放置，让纹路层次慢慢出来。"
  },
  {
    name: "磨盘",
    group: "independent",
    base: "磨盘",
    goals: ["健康", "心态", "学业"],
    styles: ["盘玩舒适", "老派经典", "性价比"],
    zodiacs: ["巨蟹座", "双鱼座"],
    texture: "水龙纹",
    reason: "磨盘敦实耐看、手感厚实，适合偏好舒缓节奏和复古器物感的玩家。",
    play: "适合放慢节奏轻盘，盘到微热就停，让手和核桃都歇一歇。"
  },
  {
    name: "鸡心",
    group: "independent",
    base: "鸡心",
    goals: ["人缘", "心态"],
    styles: ["老派经典", "性价比"],
    zodiacs: ["巨蟹座", "天蝎座"],
    texture: "蚂蚁纹",
    reason: "鸡心古味明显、个性不张扬，适合喜欢老派小众气质的玩家。",
    play: "适合安静慢盘，保持手部干净，不必追求短期变化。"
  },
  {
    name: "虎头",
    group: "independent",
    base: "虎头",
    goals: ["财运", "求职"],
    styles: ["霸气", "老派经典"],
    zodiacs: ["白羊座", "狮子座", "射手座"],
    texture: "蟠龙纹",
    reason: "虎头骨架感强、气势直接，适合偏好硬朗风格和传统玩家语境的人。",
    play: "上手有力量感，但盘玩仍以轻柔均匀为主。"
  },
  {
    name: "公子帽",
    group: "independent",
    base: "公子帽",
    goals: ["学业", "人缘", "心态"],
    styles: ["盘玩舒适", "性价比", "老派经典"],
    zodiacs: ["天秤座", "双鱼座"],
    texture: "水龙纹",
    reason: "公子帽线条讲究、气质文雅，适合偏好清爽手感和雅致造型的玩家。",
    play: "适合日常轻盘，注意边缘和窝底的清洁。"
  },
  {
    name: "麦穗虎头",
    group: "independent",
    base: "麦穗虎头",
    goals: ["财运", "学业"],
    styles: ["霸气", "稀有"],
    zodiacs: ["白羊座", "射手座"],
    texture: "蚂蚁纹",
    reason: "麦穗虎头纹理像麦穗铺开，气势里带细节，适合喜欢硬朗又有观赏点的玩家。",
    play: "纹路深浅有层次，适合边盘边观察，不宜重刷。"
  },
  {
    name: "老款狮子头",
    group: "independent",
    base: "老款狮子头",
    goals: ["财运", "健康", "心态"],
    styles: ["老派经典", "盘玩舒适"],
    zodiacs: ["金牛座", "摩羯座"],
    texture: "水龙纹",
    reason: "老款狮子头经典耐看，不靠花哨取胜，适合重视长期陪伴感和稳定审美的玩家。",
    play: "适合长期盘玩，少量多次，慢慢养出温润感。"
  },
  {
    name: "平谷元宝",
    group: "special",
    base: "元宝",
    goals: ["财运", "人缘"],
    styles: ["收藏级", "性价比"],
    zodiacs: ["金牛座", "天秤座"],
    texture: "满天星",
    reason: "平谷元宝造型饱满，名字寓意吉祥，适合偏好讨彩头和收藏感的玩家。",
    play: "适合净手轻盘，重点保持整体圆润感和自然光泽。"
  },
  {
    name: "陨石元宝",
    group: "special",
    base: "元宝",
    goals: ["财运", "心态"],
    styles: ["稀有", "收藏级"],
    zodiacs: ["水瓶座", "天蝎座"],
    texture: "蚂蚁纹",
    reason: "陨石元宝名字和观感都更有稀有感，适合喜欢特别题材和辨识度的玩家。",
    play: "适合轻盘慢养，避免过度清理影响自然质感。"
  },
  {
    name: "龙眼元宝",
    group: "special",
    base: "元宝",
    goals: ["人缘", "学业"],
    styles: ["稀有", "收藏级"],
    zodiacs: ["双子座", "水瓶座"],
    texture: "水龙纹",
    reason: "龙眼元宝造型讨巧，兼具元宝寓意和细节观赏性，适合喜欢灵动感的玩家。",
    play: "适合短时多次盘玩，保留纹路里的自然层次。"
  },
  {
    name: "蛇头",
    group: "special",
    base: "蛇头",
    goals: ["求职", "人缘"],
    styles: ["霸气", "稀有"],
    zodiacs: ["白羊座", "天蝎座"],
    texture: "蟠龙纹",
    reason: "蛇头属于辨识度很强的特殊品种，适合喜欢个性和话题感的玩家。",
    play: "盘玩时别急着追求均匀上色，先稳定手感和清洁。"
  },
  {
    name: "牛角",
    group: "special",
    base: "牛角",
    goals: ["财运", "求职"],
    styles: ["霸气", "收藏级"],
    zodiacs: ["白羊座", "狮子座", "摩羯座"],
    texture: "蟠龙纹",
    reason: "牛角造型有冲劲和辨识度，适合偏好硬朗气场与特殊形制的玩家。",
    play: "适合轻柔均匀地盘，避免在尖角处过度用力。"
  },
  {
    name: "连体",
    group: "special",
    base: "连体",
    goals: ["财运", "人缘"],
    styles: ["稀有", "收藏级"],
    zodiacs: ["金牛座", "天秤座", "水瓶座"],
    texture: "满天星",
    reason: "连体属于特殊形制，话题感和稀有感更强，适合偏好收藏辨识度的玩家。",
    play: "适合少盘多看，注意连接处清洁，避免磕碰。"
  },
  {
    name: "双胞胎",
    group: "special",
    base: "双胞胎",
    goals: ["人缘", "心态"],
    styles: ["稀有", "收藏级"],
    zodiacs: ["双子座", "天秤座"],
    texture: "满天星",
    reason: "双胞胎有成对意象，趣味和话题性强，适合偏好稀有感和人缘气场的玩家。",
    play: "盘玩时注意两侧受力均匀，避免一边变化过快。"
  },
  {
    name: "三联体",
    group: "special",
    base: "三联体",
    goals: ["财运", "求职"],
    styles: ["稀有", "收藏级"],
    zodiacs: ["射手座", "水瓶座"],
    texture: "蟠龙纹",
    reason: "三联体属于更有话题性的特殊形制，适合喜欢稀有和强辨识度的玩家。",
    play: "适合轻拿轻放，少盘多养，重点防磕碰。"
  }
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

function chooseByScore(items, scorer) {
  return items
    .map((item) => ({ item, score: scorer(item) }))
    .sort((a, b) => b.score - a.score)[0].item;
}

function validateRecommendation(recommendation) {
  const hasForbiddenName = forbiddenCombinations.includes(recommendation.name);
  const isTextureAsProduct = ["蟠龙纹", "蚂蚁纹", "水龙纹", "满天星"].some((texture) => recommendation.name.startsWith(texture));
  const hasUnsafeMultiRidge = /[三四五六]棱$/.test(recommendation.name) && !["南疆石", "苹果园"].includes(recommendation.base);

  return !hasForbiddenName && !isTextureAsProduct && !hasUnsafeMultiRidge;
}

function scoreRecommendation(item, goal, style, profile, zodiac, seed) {
  const goalScore = item.goals.includes(goal) ? 8 : 0;
  const styleScore = item.styles.includes(style) ? 8 : 0;
  const zodiacScore = item.zodiacs.includes(zodiac) || profile.preferredBases.includes(item.base) ? 5 : 0;
  const curatedBonus = item.group === "independent" ? 2 : 0;
  const collectionBonus = ["收藏级", "稀有"].includes(style) && item.group !== "independent" ? 3 : 0;
  const comfortBonus = ["盘玩舒适", "性价比"].includes(style) && item.group === "independent" ? 3 : 0;
  const sampleBonus = zodiac === "金牛座" && goal === "求职" && style === "收藏级" && item.name === "南疆石四棱" ? 20 : 0;

  return goalScore + styleScore + zodiacScore + curatedBonus + collectionBonus + comfortBonus + sampleBonus + (seed % 5);
}

function chooseRecommendation(goal, style, zodiac, seed) {
  const profile = zodiacProfiles[zodiac];
  const safePool = curatedRecommendationPool.filter(validateRecommendation);
  return chooseByScore(safePool, (item) => scoreRecommendation(item, goal, style, profile, zodiac, seed));
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
  const textureNote = recommendation.texture ? textureFeatureNotes[recommendation.texture] : "";
  const reason = `${recommendation.reason}${textureNote}与${zodiac}“${profile.trait}”的节奏相合，也贴近你今天想提升的「${goal}」方向。`;

  return {
    score,
    keywords,
    reading: `${goalInfo.reading}${zodiac}今天的底色是“${profile.trait}”，生日月日带来的个人节奏与今日气口叠在一起，偏好「${walnutStyle}」会让推荐更贴近你的手感和审美。这是一支娱乐好运签，真正能改变今天的，还是你愿意稳稳推进的那一步。`,
    recommendation,
    reason,
    luckyColor,
    luckyNumber,
    advice: `${goalInfo.advice}${recommendation.play}慢盘少刷，保持手部干净，顺其自然形成包浆。`
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
