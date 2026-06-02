const form = document.querySelector("#fortuneForm");
const resultCard = document.querySelector("#resultCard");
const birthMonthInput = document.querySelector("#birthMonth");
const birthDayInput = document.querySelector("#birthDay");

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

const walnutVarieties = [
  { name: "白狮子", category: "狮子头", description: "经典文玩核桃品种，辨识度高，受欢迎程度广。", collectValue: 5, playValue: 4, suitableStyle: ["老派经典", "盘玩舒适", "性价比"], suitableGoal: ["人缘", "求职", "心态"], zodiac: ["金牛座", "巨蟹座", "天秤座", "双鱼座"] },
  { name: "南疆石", category: "狮子头", description: "皮质硬、密度高，适合长期盘玩和收藏。", collectValue: 5, playValue: 4, suitableStyle: ["收藏级", "霸气", "老派经典"], suitableGoal: ["财运", "求职", "心态"], zodiac: ["金牛座", "天蝎座", "摩羯座"] },
  { name: "苹果园", category: "狮子头", description: "纹路漂亮、形态圆润，颜值高，适合新手和日常盘玩。", collectValue: 4, playValue: 5, suitableStyle: ["盘玩舒适", "性价比", "老派经典"], suitableGoal: ["学业", "人缘", "心态"], zodiac: ["双子座", "处女座", "天秤座", "双鱼座"] },
  { name: "四座楼", category: "狮子头", description: "端正大气，老玩家认可度高，整体气质稳。", collectValue: 5, playValue: 4, suitableStyle: ["霸气", "收藏级", "老派经典"], suitableGoal: ["财运", "求职"], zodiac: ["处女座", "摩羯座"] },
  { name: "官帽", category: "官帽", description: "轮廓利落，有向上气势，辨识度明确。", collectValue: 4, playValue: 4, suitableStyle: ["霸气", "收藏级"], suitableGoal: ["财运", "求职"], zodiac: ["白羊座", "狮子座", "摩羯座"] },
  { name: "磨盘", category: "狮子头", description: "敦实低调，有复古器物感，手感厚实。", collectValue: 4, playValue: 5, suitableStyle: ["盘玩舒适", "老派经典", "性价比"], suitableGoal: ["健康", "心态", "学业"], zodiac: ["巨蟹座", "双鱼座"] },
  { name: "鸡心", category: "鸡心", description: "古味明显，个性不张扬，适合老派小众审美。", collectValue: 3, playValue: 4, suitableStyle: ["老派经典", "性价比"], suitableGoal: ["人缘", "心态"], zodiac: ["巨蟹座", "天蝎座"] },
  { name: "虎头", category: "虎头", description: "骨架感强，气势直接，是传统玩家熟悉的硬朗品种。", collectValue: 4, playValue: 4, suitableStyle: ["霸气", "老派经典"], suitableGoal: ["财运", "求职"], zodiac: ["白羊座", "狮子座", "射手座"] },
  { name: "公子帽", category: "公子帽", description: "线条讲究，气质文雅，适合清爽手感和雅致审美。", collectValue: 4, playValue: 4, suitableStyle: ["盘玩舒适", "性价比", "老派经典"], suitableGoal: ["学业", "人缘", "心态"], zodiac: ["天秤座", "双鱼座"] },
  { name: "麦穗虎头", category: "虎头", description: "纹理像麦穗铺开，气势里带细节。", collectValue: 4, playValue: 4, suitableStyle: ["霸气", "稀有"], suitableGoal: ["财运", "学业"], zodiac: ["白羊座", "射手座"] },
  { name: "老款狮子头", category: "狮子头", description: "经典耐看，不靠花哨取胜，适合长期陪伴型盘玩。", collectValue: 5, playValue: 5, suitableStyle: ["老派经典", "盘玩舒适"], suitableGoal: ["财运", "健康", "心态"], zodiac: ["金牛座", "摩羯座"] },
  { name: "平谷元宝", category: "元宝", description: "造型饱满，名字寓意吉祥，适合偏好讨彩头和收藏感的玩家。", collectValue: 4, playValue: 4, suitableStyle: ["收藏级", "性价比"], suitableGoal: ["财运", "人缘"], zodiac: ["金牛座", "天秤座"] },
  { name: "陨石元宝", category: "元宝", description: "题材感强，观感更特别，适合喜欢稀有和辨识度的玩家。", collectValue: 5, playValue: 3, suitableStyle: ["稀有", "收藏级"], suitableGoal: ["财运", "心态"], zodiac: ["水瓶座", "天蝎座"] },
  { name: "龙眼元宝", category: "元宝", description: "造型讨巧，兼具元宝寓意和细节观赏性。", collectValue: 4, playValue: 4, suitableStyle: ["稀有", "收藏级"], suitableGoal: ["人缘", "学业"], zodiac: ["双子座", "水瓶座"] },
  { name: "满天星", category: "纹路类", description: "纹点细碎丰富，视觉层次强，适合喜欢细节观赏性的玩家。", collectValue: 4, playValue: 3, suitableStyle: ["稀有", "收藏级"], suitableGoal: ["学业", "人缘"], zodiac: ["双子座", "水瓶座"] },
  { name: "蟠龙纹", category: "纹路类", description: "纹路起伏强，视觉张力足，整体存在感更强。", collectValue: 5, playValue: 3, suitableStyle: ["霸气", "稀有", "收藏级"], suitableGoal: ["财运", "求职"], zodiac: ["白羊座", "狮子座", "天蝎座"] },
  { name: "蚂蚁纹", category: "纹路类", description: "纹理密集细碎，玩味很足，适合细节控。", collectValue: 4, playValue: 3, suitableStyle: ["稀有", "收藏级"], suitableGoal: ["学业", "心态"], zodiac: ["处女座", "水瓶座"] },
  { name: "水龙纹", category: "纹路类", description: "纹路有流动感，视觉灵动，适合个性化审美。", collectValue: 4, playValue: 4, suitableStyle: ["稀有", "盘玩舒适"], suitableGoal: ["人缘", "学业", "求职"], zodiac: ["双子座", "射手座", "水瓶座"] },
  { name: "灯笼", category: "灯笼", description: "形态饱满，视觉喜庆，握感圆润。", collectValue: 3, playValue: 5, suitableStyle: ["盘玩舒适", "性价比"], suitableGoal: ["健康", "人缘", "心态"], zodiac: ["巨蟹座", "双鱼座"] },
  { name: "盘龙纹", category: "纹路类", description: "纹路盘绕感明显，视觉张力强，适合偏好霸气风格的玩家。", collectValue: 5, playValue: 3, suitableStyle: ["霸气", "稀有", "收藏级"], suitableGoal: ["财运", "求职"], zodiac: ["白羊座", "天蝎座"] },
  { name: "狮虎兽", category: "异兽类", description: "名字和造型都带话题感，适合喜欢个性化收藏的玩家。", collectValue: 5, playValue: 3, suitableStyle: ["霸气", "稀有", "收藏级"], suitableGoal: ["求职", "财运"], zodiac: ["狮子座", "水瓶座"] },
  { name: "门墩", category: "器型类", description: "造型敦实稳重，有老物件气质。", collectValue: 4, playValue: 4, suitableStyle: ["老派经典", "盘玩舒适"], suitableGoal: ["心态", "财运"], zodiac: ["金牛座", "摩羯座"] },
  { name: "马蹄", category: "器型类", description: "造型有辨识度，适合喜欢传统奇趣器型的玩家。", collectValue: 4, playValue: 4, suitableStyle: ["稀有", "性价比"], suitableGoal: ["人缘", "求职"], zodiac: ["射手座", "水瓶座"] },
  { name: "麒麟纹", category: "纹路类", description: "纹路有瑞兽意象，寓意感强，适合收藏和讨彩头。", collectValue: 5, playValue: 3, suitableStyle: ["收藏级", "霸气"], suitableGoal: ["财运", "求职"], zodiac: ["狮子座", "摩羯座"] },
  { name: "蛤蟆头", category: "器型类", description: "造型有趣，小众辨识度高，适合喜欢玩味的玩家。", collectValue: 4, playValue: 4, suitableStyle: ["稀有", "性价比"], suitableGoal: ["人缘", "心态"], zodiac: ["双子座", "水瓶座"] },
  { name: "盘山公子帽", category: "公子帽", description: "公子帽体系里更有地域和细分味道，气质文雅。", collectValue: 4, playValue: 4, suitableStyle: ["老派经典", "收藏级"], suitableGoal: ["学业", "人缘"], zodiac: ["天秤座", "处女座"] },
  { name: "宫灯", category: "灯笼", description: "造型端正喜庆，适合偏好圆润器型和好寓意的玩家。", collectValue: 4, playValue: 4, suitableStyle: ["盘玩舒适", "老派经典"], suitableGoal: ["人缘", "健康"], zodiac: ["巨蟹座", "双鱼座"] },
  { name: "大粗筋", category: "粗筋类", description: "纹路筋脉粗壮，手感明确，视觉力量感强。", collectValue: 4, playValue: 4, suitableStyle: ["霸气", "盘玩舒适"], suitableGoal: ["求职", "财运"], zodiac: ["白羊座", "狮子座"] },
  { name: "千佛山小粗筋", category: "粗筋类", description: "细分味道更足，纹路筋脉清楚，适合进阶玩家关注。", collectValue: 5, playValue: 4, suitableStyle: ["稀有", "收藏级"], suitableGoal: ["学业", "心态"], zodiac: ["处女座", "摩羯座"] },
  { name: "血麒麟", category: "纹路类", description: "名字气势强，寓意和观赏性都更突出。", collectValue: 5, playValue: 3, suitableStyle: ["霸气", "稀有", "收藏级"], suitableGoal: ["财运", "求职"], zodiac: ["天蝎座", "狮子座"] },
  { name: "南瓜墩", category: "器型类", description: "造型敦实圆润，盘玩亲和，视觉讨喜。", collectValue: 4, playValue: 5, suitableStyle: ["盘玩舒适", "性价比"], suitableGoal: ["健康", "心态", "人缘"], zodiac: ["巨蟹座", "金牛座"] }
];

const specialShapes = [
  { name: "三棱", type: "多棱类", rarity: 4, description: "多棱异型，造型特别，辨识度高。" },
  { name: "四棱", type: "多棱类", rarity: 5, description: "多棱异型，棱线更清楚，收藏辨识度强。" },
  { name: "五棱", type: "多棱类", rarity: 6, description: "多棱异型，稀有度更高，适合偏收藏的玩家。" },
  { name: "六棱", type: "多棱类", rarity: 7, description: "多棱异型，少见且话题性强，更偏收藏展示。" },
  { name: "连体", type: "连体类", rarity: 5, description: "连体类异型，整体感特殊，收藏话题性高。" },
  { name: "牛角", type: "连体类", rarity: 5, description: "连体类异型，造型张力强，收藏话题性高。" },
  { name: "半壁", type: "半壁类", rarity: 4, description: "半壁类异型，形制有趣，辨识度高。" },
  { name: "蛇头", type: "蛇头类", rarity: 5, description: "蛇头类异型，个性强，适合喜欢特殊造型的玩家。" }
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

function shouldUseSpecialShape(style, seed) {
  let chance = 30;

  if (["稀有", "收藏级", "霸气"].includes(style)) {
    chance += 25;
  }

  if (["盘玩舒适", "性价比", "老派经典"].includes(style)) {
    chance -= 20;
  }

  return seed % 100 < chance;
}

function scoreVariety(variety, goal, style, profile, zodiac, seed) {
  const styleScore = variety.suitableStyle.includes(style) ? 10 : 0;
  const goalScore = variety.suitableGoal.includes(goal) ? 8 : 0;
  const zodiacScore = variety.zodiac.includes(zodiac) || profile.preferredBases.includes(variety.name) ? 5 : 0;
  const collectScore = ["稀有", "收藏级", "霸气"].includes(style) ? variety.collectValue : 0;
  const playScore = ["盘玩舒适", "性价比", "老派经典"].includes(style) ? variety.playValue : 0;
  const goalToneScore = goal === "财运" || goal === "求职" ? variety.collectValue : variety.playValue;

  return styleScore + goalScore + zodiacScore + collectScore + playScore + goalToneScore + (seed % 5);
}

function scoreSpecialShape(shape, goal, style, seed) {
  const shapeSeed = stableHash(`${shape.name}-${seed}`) % 7;
  const styleScore = ["稀有", "收藏级", "霸气"].includes(style) ? shape.rarity : Math.ceil(shape.rarity / 2);
  const comfortPenalty = ["盘玩舒适", "性价比", "老派经典"].includes(style) ? -shape.rarity : 0;
  const goalBonus = ["财运", "求职"].includes(goal) && ["多棱类", "连体类"].includes(shape.type) ? 3 : 0;
  const moodBonus = ["心态", "健康"].includes(goal) && shape.name === "半壁" ? 2 : 0;
  const styleShapeBonus =
    (style === "霸气" && ["牛角", "蛇头", "六棱"].includes(shape.name) ? 5 : 0) +
    (style === "收藏级" && ["四棱", "五棱", "连体"].includes(shape.name) ? 5 : 0) +
    (style === "稀有" && ["蛇头", "连体", "五棱", "六棱"].includes(shape.name) ? 4 : 0);

  return styleScore + comfortPenalty + goalBonus + moodBonus + styleShapeBonus + shapeSeed;
}

function buildRecommendationReason(variety, shape, goal, keywords) {
  if (!shape) {
    return `${variety.name}是${variety.category}里的常见推荐方向，${variety.description}今天你的关键词偏向“${keywords}”，因此推荐更贴近日常盘玩和稳定气场的${variety.name}。`;
  }

  return `${variety.name}是${variety.category}里的代表方向，${variety.description}${shape.name}属于${shape.type}异型，${shape.description}今天你的关键词偏向“${keywords}”，因此推荐更有辨识度的${variety.name}${shape.name}。`;
}

function chooseRecommendation(goal, style, zodiac, seed, keywords) {
  const profile = zodiacProfiles[zodiac];
  const variety = chooseByScore(walnutVarieties, (item) => scoreVariety(item, goal, style, profile, zodiac, seed));
  const shape = shouldUseSpecialShape(style, seed + variety.name.length)
    ? chooseByScore(specialShapes, (item) => scoreSpecialShape(item, goal, style, seed + variety.name.length))
    : null;

  return {
    name: shape ? `${variety.name}${shape.name}` : variety.name,
    variety,
    shape,
    reason: buildRecommendationReason(variety, shape, goal, keywords),
    play: shape
      ? `${variety.name}叠加${shape.name}异型后，盘玩时要照顾边角和特殊结构，轻盘慢养更稳。`
      : `${variety.name}适合日常净手慢盘，先把底色盘稳，再观察包浆变化。`
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
  const recommendation = chooseRecommendation(goal, walnutStyle, zodiac, seed, keywords);
  const luckyColor = pick(luckyColors, seed + score);
  const luckyNumber = ((seed + score) % 99) + 1;
  const reason = `${recommendation.reason}这也与${zodiac}“${profile.trait}”的节奏相合，贴近你今天想提升的「${goal}」方向。`;

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
