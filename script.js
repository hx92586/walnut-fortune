const form = document.querySelector("#fortuneForm");
const resultCard = document.querySelector("#resultCard");
const birthMonthInput = document.querySelector("#birthMonth");
const birthDayInput = document.querySelector("#birthDay");

const zodiacProfiles = {
  "白羊座": {
    trait: "行动直接、敢先开局",
    boost: 5,
    personalityTags: ["行动力", "冒险精神", "冲劲", "突破"],
    preferredBases: ["虎头", "血麒麟", "麦穗虎头", "南瓜墩"],
    keywordAffinity: ["行动", "突破", "锋芒", "主动"]
  },
  "金牛座": {
    trait: "稳定、耐心、长期主义",
    boost: 8,
    personalityTags: ["稳定", "耐心", "长期主义", "质感"],
    preferredBases: ["南疆石", "白狮子", "老款狮子头", "官帽"],
    keywordAffinity: ["稳定", "积累", "稳健", "守成"]
  },
  "双子座": {
    trait: "好奇、灵活、擅长沟通",
    boost: 4,
    personalityTags: ["好奇心", "社交", "灵活", "表达"],
    preferredBases: ["苹果园", "四座楼", "公子帽", "满天星"],
    keywordAffinity: ["沟通", "灵活", "信息", "转机"]
  },
  "巨蟹座": {
    trait: "细腻、重安全感、擅长照顾节奏",
    boost: 5,
    personalityTags: ["共情", "安全感", "照顾", "修复"],
    preferredBases: ["磨盘", "灯笼", "白狮子", "南瓜墩"],
    keywordAffinity: ["安定", "修复", "温和", "守护"]
  },
  "狮子座": {
    trait: "气场足、重表达、适合站到台前",
    boost: 7,
    personalityTags: ["自信", "领导力", "表现力", "影响力"],
    preferredBases: ["官帽", "虎头", "蟠龙纹", "血麒麟"],
    keywordAffinity: ["贵人", "声量", "自信", "掌控"]
  },
  "处女座": {
    trait: "重细节、讲效率、越整理越稳",
    boost: 6,
    personalityTags: ["细节", "秩序", "分析", "效率"],
    preferredBases: ["苹果园", "蚂蚁纹", "四座楼", "千佛山小粗筋"],
    keywordAffinity: ["校准", "专注", "整理", "精进"]
  },
  "天秤座": {
    trait: "审美在线、善于协调关系",
    boost: 5,
    personalityTags: ["审美", "协调", "平衡", "人缘"],
    preferredBases: ["苹果园", "白狮子", "公子帽", "平谷元宝"],
    keywordAffinity: ["人缘", "平衡", "合作", "顺势"]
  },
  "天蝎座": {
    trait: "专注、敏锐、适合深度蓄力",
    boost: 8,
    personalityTags: ["洞察", "专注", "韧性", "转化"],
    preferredBases: ["南疆石", "蟠龙纹", "血麒麟", "蚂蚁纹"],
    keywordAffinity: ["专注", "蓄力", "敏锐", "突破"]
  },
  "射手座": {
    trait: "乐观、开阔、喜欢打开新局面",
    boost: 4,
    personalityTags: ["探索", "乐观", "自由", "行动"],
    preferredBases: ["水龙纹", "满天星", "虎头", "马蹄"],
    keywordAffinity: ["开阔", "行动", "机会", "轻盈"]
  },
  "摩羯座": {
    trait: "稳扎稳打、耐得住周期",
    boost: 8,
    personalityTags: ["责任感", "规划", "长期主义", "执行"],
    preferredBases: ["南疆石", "四座楼", "老款狮子头", "门墩"],
    keywordAffinity: ["坚持", "积累", "规划", "长期"]
  },
  "水瓶座": {
    trait: "不走寻常路、重辨识度和新意",
    boost: 5,
    personalityTags: ["创新", "独立", "辨识度", "灵感"],
    preferredBases: ["满天星", "水龙纹", "蚂蚁纹", "狮虎兽"],
    keywordAffinity: ["新意", "灵感", "转机", "突破"]
  },
  "双鱼座": {
    trait: "感受力强、适合柔和转运",
    boost: 6,
    personalityTags: ["感受力", "想象", "温柔", "松弛"],
    preferredBases: ["灯笼", "苹果园", "白狮子", "宫灯"],
    keywordAffinity: ["松弛", "感受", "回稳", "温和"]
  }
};

const walnutVarieties = [
  { name: "白狮子", category: "狮子头", description: "经典文玩核桃品种，辨识度高，受欢迎程度广。", fortuneMeaning: "稳中求进、守住基本盘", collectValue: 5, playValue: 4, suitableStyle: ["老派经典", "盘玩舒适", "性价比"], suitableGoals: ["财运", "求职", "心态", "人缘"], suitableKeywords: ["稳定", "积累", "贵人", "稳健"], zodiac: ["金牛座", "巨蟹座", "天秤座", "双鱼座"] },
  { name: "南疆石", category: "狮子头", description: "皮质硬、密度高，适合长期盘玩和收藏。", fortuneMeaning: "长期积累、耐心见成色", collectValue: 5, playValue: 4, suitableStyle: ["收藏级", "霸气", "老派经典"], suitableGoals: ["财运", "求职", "心态"], suitableKeywords: ["稳定", "积累", "长期", "守成"], zodiac: ["金牛座", "天蝎座", "摩羯座"] },
  { name: "苹果园", category: "狮子头", description: "纹路漂亮、形态圆润，颜值高，适合新手和日常盘玩。", fortuneMeaning: "圆融表达、轻松打开局面", collectValue: 4, playValue: 5, suitableStyle: ["盘玩舒适", "性价比", "老派经典"], suitableGoals: ["学业", "人缘", "心态"], suitableKeywords: ["沟通", "灵活", "顺势", "温和"], zodiac: ["双子座", "处女座", "天秤座", "双鱼座"] },
  { name: "四座楼", category: "狮子头", description: "端正大气，老玩家认可度高，整体气质稳。", fortuneMeaning: "结构清晰、稳住阵脚", collectValue: 5, playValue: 4, suitableStyle: ["霸气", "收藏级", "老派经典"], suitableGoals: ["财运", "求职"], suitableKeywords: ["秩序", "规划", "稳定", "掌控"], zodiac: ["处女座", "摩羯座", "双子座"] },
  { name: "官帽", category: "官帽", description: "轮廓利落，有向上气势，辨识度明确。", fortuneMeaning: "稳场提气、向上争取", collectValue: 4, playValue: 4, suitableStyle: ["霸气", "收藏级"], suitableGoals: ["财运", "求职"], suitableKeywords: ["掌控", "贵人", "推进", "机会"], zodiac: ["白羊座", "狮子座", "摩羯座", "金牛座"] },
  { name: "磨盘", category: "狮子头", description: "敦实低调，有复古器物感，手感厚实。", fortuneMeaning: "慢下来、稳住心气", collectValue: 4, playValue: 5, suitableStyle: ["盘玩舒适", "老派经典", "性价比"], suitableGoals: ["健康", "心态", "学业"], suitableKeywords: ["回稳", "定心", "修复", "节制"], zodiac: ["巨蟹座", "双鱼座"] },
  { name: "鸡心", category: "鸡心", description: "古味明显，个性不张扬，适合老派小众审美。", fortuneMeaning: "低调蓄力、守住分寸", collectValue: 3, playValue: 4, suitableStyle: ["老派经典", "性价比"], suitableGoals: ["人缘", "心态"], suitableKeywords: ["克制", "边界", "温和", "观察"], zodiac: ["巨蟹座", "天蝎座"] },
  { name: "虎头", category: "虎头", description: "骨架感强，气势直接，是传统玩家熟悉的硬朗品种。", fortuneMeaning: "行动开路、气势先行", collectValue: 4, playValue: 4, suitableStyle: ["霸气", "老派经典"], suitableGoals: ["财运", "求职"], suitableKeywords: ["行动", "突破", "锋芒", "主动"], zodiac: ["白羊座", "狮子座", "射手座"] },
  { name: "公子帽", category: "公子帽", description: "线条讲究，气质文雅，适合清爽手感和雅致审美。", fortuneMeaning: "分寸得体、表达顺畅", collectValue: 4, playValue: 4, suitableStyle: ["盘玩舒适", "性价比", "老派经典"], suitableGoals: ["学业", "人缘", "心态"], suitableKeywords: ["沟通", "平衡", "整理", "表达"], zodiac: ["天秤座", "双鱼座", "处女座"] },
  { name: "麦穗虎头", category: "虎头", description: "纹理像麦穗铺开，气势里带细节。", fortuneMeaning: "冲劲里带收获感", collectValue: 4, playValue: 4, suitableStyle: ["霸气", "稀有"], suitableGoals: ["财运", "学业", "求职"], suitableKeywords: ["行动", "收获", "突破", "机会"], zodiac: ["白羊座", "射手座"] },
  { name: "老款狮子头", category: "狮子头", description: "经典耐看，不靠花哨取胜，适合长期陪伴型盘玩。", fortuneMeaning: "经典守成、越久越稳", collectValue: 5, playValue: 5, suitableStyle: ["老派经典", "盘玩舒适"], suitableGoals: ["财运", "健康", "心态"], suitableKeywords: ["长期", "积累", "稳定", "守成"], zodiac: ["金牛座", "摩羯座"] },
  { name: "平谷元宝", category: "元宝", description: "造型饱满，名字寓意吉祥，适合偏好讨彩头和收藏感的玩家。", fortuneMeaning: "聚财纳福、资源归位", collectValue: 4, playValue: 4, suitableStyle: ["收藏级", "性价比"], suitableGoals: ["财运", "人缘"], suitableKeywords: ["聚财", "资源", "机会", "顺势"], zodiac: ["金牛座", "天秤座"] },
  { name: "陨石元宝", category: "元宝", description: "题材感强，观感更特别，适合喜欢稀有和辨识度的玩家。", fortuneMeaning: "意外机会、特别转机", collectValue: 5, playValue: 3, suitableStyle: ["稀有", "收藏级"], suitableGoals: ["财运", "心态"], suitableKeywords: ["转机", "机会", "新意", "突破"], zodiac: ["水瓶座", "天蝎座"] },
  { name: "龙眼元宝", category: "元宝", description: "造型讨巧，兼具元宝寓意和细节观赏性。", fortuneMeaning: "看见机会、灵活取财", collectValue: 4, playValue: 4, suitableStyle: ["稀有", "收藏级"], suitableGoals: ["人缘", "学业", "财运"], suitableKeywords: ["灵感", "机会", "沟通", "顺势"], zodiac: ["双子座", "水瓶座"] },
  { name: "满天星", category: "纹路类", description: "纹点细碎丰富，视觉层次强，适合喜欢细节观赏性的玩家。", fortuneMeaning: "灵感闪现、细节成局", collectValue: 4, playValue: 3, suitableStyle: ["稀有", "收藏级"], suitableGoals: ["学业", "人缘"], suitableKeywords: ["灵感", "细节", "沟通", "新意"], zodiac: ["双子座", "水瓶座"] },
  { name: "蟠龙纹", category: "纹路类", description: "纹路起伏强，视觉张力足，整体存在感更强。", fortuneMeaning: "盘旋蓄势、突破向上", collectValue: 5, playValue: 3, suitableStyle: ["霸气", "稀有", "收藏级"], suitableGoals: ["财运", "求职"], suitableKeywords: ["突破", "掌控", "蓄力", "锋芒"], zodiac: ["白羊座", "狮子座", "天蝎座"] },
  { name: "蚂蚁纹", category: "纹路类", description: "纹理密集细碎，玩味很足，适合细节控。", fortuneMeaning: "细节积累、小步成势", collectValue: 4, playValue: 3, suitableStyle: ["稀有", "收藏级"], suitableGoals: ["学业", "心态"], suitableKeywords: ["细节", "积累", "专注", "复盘"], zodiac: ["处女座", "水瓶座"] },
  { name: "水龙纹", category: "纹路类", description: "纹路有流动感，视觉灵动，适合个性化审美。", fortuneMeaning: "顺势而动、灵活转场", collectValue: 4, playValue: 4, suitableStyle: ["稀有", "盘玩舒适"], suitableGoals: ["人缘", "学业", "求职"], suitableKeywords: ["灵活", "转机", "沟通", "顺势"], zodiac: ["双子座", "射手座", "水瓶座"] },
  { name: "灯笼", category: "灯笼", description: "形态饱满，视觉喜庆，握感圆润。", fortuneMeaning: "暖场聚气、和顺安定", collectValue: 3, playValue: 5, suitableStyle: ["盘玩舒适", "性价比"], suitableGoals: ["健康", "人缘", "心态"], suitableKeywords: ["温和", "安定", "修复", "人缘"], zodiac: ["巨蟹座", "双鱼座"] },
  { name: "盘龙纹", category: "纹路类", description: "纹路盘绕感明显，视觉张力强，适合偏好霸气风格的玩家。", fortuneMeaning: "蓄势待发、掌控节奏", collectValue: 5, playValue: 3, suitableStyle: ["霸气", "稀有", "收藏级"], suitableGoals: ["财运", "求职"], suitableKeywords: ["掌控", "蓄力", "突破", "机会"], zodiac: ["白羊座", "天蝎座"] },
  { name: "狮虎兽", category: "异兽类", description: "名字和造型都带话题感，适合喜欢个性化收藏的玩家。", fortuneMeaning: "气场外放、强势破局", collectValue: 5, playValue: 3, suitableStyle: ["霸气", "稀有", "收藏级"], suitableGoals: ["求职", "财运"], suitableKeywords: ["突破", "锋芒", "掌控", "行动"], zodiac: ["狮子座", "水瓶座"] },
  { name: "门墩", category: "器型类", description: "造型敦实稳重，有老物件气质。", fortuneMeaning: "守门稳局、厚积薄发", collectValue: 4, playValue: 4, suitableStyle: ["老派经典", "盘玩舒适"], suitableGoals: ["心态", "财运"], suitableKeywords: ["稳定", "守成", "积累", "定心"], zodiac: ["金牛座", "摩羯座"] },
  { name: "马蹄", category: "器型类", description: "造型有辨识度，适合喜欢传统奇趣器型的玩家。", fortuneMeaning: "轻快转场、机会在路上", collectValue: 4, playValue: 4, suitableStyle: ["稀有", "性价比"], suitableGoals: ["人缘", "求职"], suitableKeywords: ["转机", "机会", "行动", "沟通"], zodiac: ["射手座", "水瓶座"] },
  { name: "麒麟纹", category: "纹路类", description: "纹路有瑞兽意象，寓意感强，适合收藏和讨彩头。", fortuneMeaning: "贵人扶持、吉意临门", collectValue: 5, playValue: 3, suitableStyle: ["收藏级", "霸气"], suitableGoals: ["财运", "求职", "人缘"], suitableKeywords: ["贵人", "机会", "聚财", "顺势"], zodiac: ["狮子座", "摩羯座"] },
  { name: "蛤蟆头", category: "器型类", description: "造型有趣，小众辨识度高，适合喜欢玩味的玩家。", fortuneMeaning: "小处见趣、低调转运", collectValue: 4, playValue: 4, suitableStyle: ["稀有", "性价比"], suitableGoals: ["人缘", "心态"], suitableKeywords: ["转机", "松弛", "灵活", "人缘"], zodiac: ["双子座", "水瓶座"] },
  { name: "盘山公子帽", category: "公子帽", description: "公子帽体系里更有地域和细分味道，气质文雅。", fortuneMeaning: "雅正表达、稳步抬头", collectValue: 4, playValue: 4, suitableStyle: ["老派经典", "收藏级"], suitableGoals: ["学业", "人缘"], suitableKeywords: ["表达", "整理", "平衡", "稳健"], zodiac: ["天秤座", "处女座"] },
  { name: "宫灯", category: "灯笼", description: "造型端正喜庆，适合偏好圆润器型和好寓意的玩家。", fortuneMeaning: "明亮聚气、关系和顺", collectValue: 4, playValue: 4, suitableStyle: ["盘玩舒适", "老派经典"], suitableGoals: ["人缘", "健康"], suitableKeywords: ["温和", "人缘", "修复", "规律"], zodiac: ["巨蟹座", "双鱼座"] },
  { name: "大粗筋", category: "粗筋类", description: "纹路筋脉粗壮，手感明确，视觉力量感强。", fortuneMeaning: "筋骨分明、执行有力", collectValue: 4, playValue: 4, suitableStyle: ["霸气", "盘玩舒适"], suitableGoals: ["求职", "财运"], suitableKeywords: ["行动", "执行", "掌控", "推进"], zodiac: ["白羊座", "狮子座"] },
  { name: "千佛山小粗筋", category: "粗筋类", description: "细分味道更足，纹路筋脉清楚，适合进阶玩家关注。", fortuneMeaning: "细节修炼、稳中精进", collectValue: 5, playValue: 4, suitableStyle: ["稀有", "收藏级"], suitableGoals: ["学业", "心态"], suitableKeywords: ["细节", "专注", "积累", "复盘"], zodiac: ["处女座", "摩羯座"] },
  { name: "血麒麟", category: "纹路类", description: "名字气势强，寓意和观赏性都更突出。", fortuneMeaning: "强势贵人、破局见红", collectValue: 5, playValue: 3, suitableStyle: ["霸气", "稀有", "收藏级"], suitableGoals: ["财运", "求职"], suitableKeywords: ["突破", "贵人", "锋芒", "机会"], zodiac: ["天蝎座", "狮子座", "白羊座"] },
  { name: "南瓜墩", category: "器型类", description: "造型敦实圆润，盘玩亲和，视觉讨喜。", fortuneMeaning: "圆融落地、稳稳接福", collectValue: 4, playValue: 5, suitableStyle: ["盘玩舒适", "性价比"], suitableGoals: ["健康", "心态", "人缘", "求职"], suitableKeywords: ["温和", "稳定", "行动", "修复"], zodiac: ["巨蟹座", "金牛座", "白羊座"] }
];

const specialShapes = [
  { name: "三棱", type: "多棱类", rarity: 4, description: "多棱异型，造型特别，辨识度高。", fortuneMeaning: "灵感、变化、沟通" },
  { name: "四棱", type: "多棱类", rarity: 5, description: "多棱异型，棱线更清楚，收藏辨识度强。", fortuneMeaning: "稳定、秩序、长期主义" },
  { name: "五棱", type: "多棱类", rarity: 6, description: "多棱异型，稀有度更高，适合偏收藏的玩家。", fortuneMeaning: "贵人、机会、扩展" },
  { name: "六棱", type: "多棱类", rarity: 7, description: "多棱异型，少见且话题性强，更偏收藏展示。", fortuneMeaning: "圆满、资源、积累" },
  { name: "连体", type: "连体类", rarity: 5, description: "连体类异型，整体感特殊，收藏话题性高。", fortuneMeaning: "合作、绑定、关系" },
  { name: "牛角", type: "连体类", rarity: 5, description: "连体类异型，造型张力强，收藏话题性高。", fortuneMeaning: "突破、锋芒、行动" },
  { name: "半壁", type: "半壁类", rarity: 4, description: "半壁类异型，形制有趣，辨识度高。", fortuneMeaning: "取舍、专注、克制" },
  { name: "蛇头", type: "蛇头类", rarity: 5, description: "蛇头类异型，个性强，适合喜欢特殊造型的玩家。", fortuneMeaning: "灵活、敏锐、转机" }
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
  select.innerHTML = `<option value="">${select.id === "birthMonth" ? "月份" : "日"}</option>`;
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

function getFortuneLevel(score) {
  return fortuneLevels.find((level) => score >= level.min) || fortuneLevels[fortuneLevels.length - 1];
}

function buildKeywordSet(profile, goalInfo, level, seed) {
  const pool = [
    pick(level.keywords, seed),
    pick(goalInfo.keywords, seed + 7),
    pick(profile.keywordAffinity, seed + 13),
    pick(profile.personalityTags, seed + 19)
  ];
  return Array.from(new Set(pool)).slice(0, 3);
}

function composeReading(goalInfo, level, profile, keywords, seed) {
  const template = goalInfo.templates[level.name];
  const base = pick(template.readings, seed + 23);
  const personality = pick(profile.personalityTags, seed + 31);
  const focus = pick(goalInfo.focus, seed + 37);
  return `${base}${profile.trait}的你今天可以借一点“${personality}”的优势，把注意力放在${focus}上。关键词“${keywords.join("、")}”不是玄学结论，更像一张提醒卡：顺势处多推进，卡住处慢半拍。`;
}

function shouldUseSpecialShape(style, level, seed) {
  let chance = 30;

  if (["稀有", "收藏级", "霸气"].includes(style)) {
    chance += 22;
  }

  if (["极佳", "良好"].includes(level.name)) {
    chance += 8;
  }

  if (["盘玩舒适", "性价比", "老派经典"].includes(style)) {
    chance -= 20;
  }

  return seed % 100 < chance;
}

function scoreVariety(variety, goal, style, profile, zodiac, level, keywords, seed) {
  const styleScore = variety.suitableStyle.includes(style) ? 10 : 0;
  const goalScore = variety.suitableGoals.includes(goal) ? 14 : 0;
  const zodiacScore = variety.zodiac.includes(zodiac) || profile.preferredBases.includes(variety.name) ? 6 : 0;
  const keywordScore = keywords.filter((keyword) => variety.suitableKeywords.includes(keyword)).length * 8;
  const levelScore = ["极佳", "良好"].includes(level.name) ? variety.collectValue : variety.playValue;
  const styleValue = ["稀有", "收藏级", "霸气"].includes(style) ? variety.collectValue : variety.playValue;

  return styleScore + goalScore + zodiacScore + keywordScore + levelScore + styleValue + (seed % 5);
}

function scoreSpecialShape(shape, goal, style, level, keywords, seed) {
  const shapeSeed = stableHash(`${shape.name}-${seed}`) % 7;
  const styleScore = ["稀有", "收藏级", "霸气"].includes(style) ? shape.rarity : Math.ceil(shape.rarity / 2);
  const levelBonus = ["极佳", "良好"].includes(level.name) ? 3 : 0;
  const comfortPenalty = ["盘玩舒适", "性价比", "老派经典"].includes(style) ? -shape.rarity : 0;
  const keywordText = `${keywords.join("")}${shape.fortuneMeaning}`;
  const keywordBonus = keywords.some((keyword) => keywordText.includes(keyword)) ? 4 : 0;
  const styleShapeBonus =
    (style === "霸气" && ["牛角", "蛇头", "六棱"].includes(shape.name) ? 5 : 0) +
    (style === "收藏级" && ["四棱", "五棱", "连体"].includes(shape.name) ? 5 : 0) +
    (style === "稀有" && ["蛇头", "连体", "五棱", "六棱"].includes(shape.name) ? 4 : 0);
  const goalBonus =
    (["财运", "求职"].includes(goal) && ["多棱类", "连体类"].includes(shape.type) ? 3 : 0) +
    (goal === "人缘" && shape.name === "连体" ? 3 : 0) +
    (["心态", "健康"].includes(goal) && shape.name === "半壁" ? 3 : 0);

  return styleScore + levelBonus + comfortPenalty + keywordBonus + styleShapeBonus + goalBonus + shapeSeed;
}

function buildRecommendationReason(recommendation, goal, keywords) {
  const keywordText = keywords.join("、");
  const { variety, shape } = recommendation;

  if (!shape) {
    return `今天你的运势关键词是“${keywordText}”，${variety.name}的气质与这种状态契合。它代表${variety.fortuneMeaning}，适合今天在「${goal}」上稳步推进，也让文玩核桃推荐真正落在今日运势里。`;
  }

  return `今天你的关键词偏向“${keywordText}”，${variety.name}本身代表${variety.fortuneMeaning}，${shape.name}异型则强化了“${shape.fortuneMeaning}”的寓意。它适合你在「${goal}」相关事务里更有辨识度地行动，同时保留盘玩里的稳定感。`;
}

function chooseRecommendation(goal, style, zodiac, level, keywords, seed) {
  const profile = zodiacProfiles[zodiac];
  const variety = chooseByScore(walnutVarieties, (item) => scoreVariety(item, goal, style, profile, zodiac, level, keywords, seed));
  const shape = shouldUseSpecialShape(style, level, seed + variety.name.length)
    ? chooseByScore(specialShapes, (item) => scoreSpecialShape(item, goal, style, level, keywords, seed + variety.name.length))
    : null;
  const name = shape ? `${variety.name}${shape.name}` : variety.name;
  const fortuneMeaning = shape ? `${variety.fortuneMeaning}；${shape.fortuneMeaning}` : variety.fortuneMeaning;

  return {
    name,
    variety,
    shape,
    fortuneMeaning,
    reason: buildRecommendationReason({ variety, shape }, goal, keywords),
    play: shape
      ? `${variety.name}叠加${shape.name}异型后，盘玩时要照顾边角和特殊结构；慢盘少刷，保持手部干净，顺其自然形成包浆。`
      : `${variety.name}适合日常净手慢盘，先把底色盘稳；慢盘少刷，保持手部干净，顺其自然形成包浆。`
  };
}

function buildResult({ zodiac, birthday, today, goal, walnutStyle }) {
  const profile = zodiacProfiles[zodiac];
  const goalInfo = goalLibrary[goal];
  const seed = stableHash(`${zodiac}-${birthday.key}-${goal}-${walnutStyle}-${today.key}`);
  const todayScore = today.month * 7 + today.day + today.weekday * 3;
  const birthdayScore = birthday.month * 5 + birthday.day;
  const score = 60 + ((seed + profile.boost + todayScore + birthdayScore) % 40);
  const level = getFortuneLevel(score);
  const keywords = buildKeywordSet(profile, goalInfo, level, seed);
  const levelTemplate = goalInfo.templates[level.name];
  const recommendation = chooseRecommendation(goal, walnutStyle, zodiac, level, keywords, seed);

  return {
    score,
    level: level.name,
    keywords,
    reading: composeReading(goalInfo, level, profile, keywords, seed),
    advice: levelTemplate.advice,
    doList: levelTemplate.doList,
    dontList: levelTemplate.dontList,
    recommendation,
    luckyColor: pick(luckyColors, seed + score),
    luckyNumber: ((seed + score) % 99) + 1,
    playAdvice: recommendation.play
  };
}

function renderList(items, marker) {
  return items.map((item) => `<span>${marker} ${item}</span>`).join("");
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
        <span class="tag">${result.level}</span>
      </div>

      <div class="lucky-row">
        <div class="lucky-token"><span>生日</span><strong>${formData.birthday.label}</strong></div>
        <div class="lucky-token"><span>星座</span><strong>${formData.zodiac}</strong></div>
        <div class="lucky-token"><span>今日日期</span><strong>${formData.today.label}</strong></div>
      </div>

      <div class="score-panel">
        <div class="score-ring"><span>${result.score}</span></div>
        <div>
          <div class="keyword">今日综合运势：${result.score}分</div>
          <p class="reading">今日等级：${result.level}</p>
          <p class="reading">今日关键词：${result.keywords.join(" · ")}</p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-box full">
          <div class="label">今日解读</div>
          <p class="value">${result.reading}</p>
        </div>
        <div class="info-box full">
          <div class="label">今日建议</div>
          <p class="value">${result.advice}</p>
        </div>
        <div class="info-box">
          <div class="label">今日宜</div>
          <p class="value action-list">${renderList(result.doList, "✔")}</p>
        </div>
        <div class="info-box">
          <div class="label">今日忌</div>
          <p class="value action-list">${renderList(result.dontList, "✘")}</p>
        </div>
        <div class="info-box">
          <div class="label">今日幸运核桃</div>
          <p class="value walnut-name">${result.recommendation.name}</p>
        </div>
        <div class="info-box">
          <div class="label">核桃寓意</div>
          <p class="value">${result.recommendation.fortuneMeaning}</p>
        </div>
        <div class="info-box full">
          <div class="label">推荐理由</div>
          <p class="value">${result.recommendation.reason}</p>
        </div>
        <div class="info-box full">
          <div class="label">今日盘玩建议</div>
          <p class="value">${result.playAdvice}</p>
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

const fortuneLevels = [
  { name: "极佳", min: 90, keywords: ["突破", "贵人", "顺势"], tone: "火候很足" },
  { name: "良好", min: 80, keywords: ["稳健", "推进", "机会"], tone: "气口顺畅" },
  { name: "平稳", min: 70, keywords: ["积累", "整理", "守成"], tone: "适合稳住节奏" },
  { name: "谨慎", min: 63, keywords: ["观察", "克制", "复盘"], tone: "宜慢不宜急" },
  { name: "低迷", min: 60, keywords: ["修整", "避险", "定心"], tone: "先养状态" }
];

const goalLibrary = {
  "财运": {
    focus: ["消费", "投资", "机会", "资源整理"],
    keywords: ["稳健", "积累", "机会", "守成", "聚财", "理性"],
    templates: {
      "极佳": {
        readings: [
          "今天适合推进与金钱相关的重要决定。你更容易发现被忽视的机会，但仍需保持理性判断，不宜因短期收益而忽略长期规划。",
          "财务灵敏度较高，适合谈合作、做预算或处理资源分配。真正的好运来自清楚知道钱该往哪里去，而不是一时冲动。"
        ],
        advice: "把机会和风险写下来，先确认信息来源，再推进关键决定。",
        doList: ["梳理预算", "推进合作"],
        dontList: ["冲动加码", "听信小道消息"]
      },
      "良好": {
        readings: [
          "今天适合整理收入支出、复盘计划和观察新机会。你不一定要马上行动，但很适合把长期有价值的方向先标记出来。",
          "财运处在稳步回暖的位置，适合处理报价、预算、账目和资源置换。小的耐心会换来更稳的判断。"
        ],
        advice: "适合做计划和小步推进，别把所有资源一次押上。",
        doList: ["完善计划", "比较选择"],
        dontList: ["草率决定", "忽略细节"]
      },
      "平稳": {
        readings: [
          "今天财运不适合大起大落，更适合守住基本盘。把现有资源整理清楚，比追逐新机会更容易带来安全感。",
          "金钱相关事项以稳定为主，适合复盘消费习惯、清理订阅和检查长期目标。慢一点，反而更不容易漏掉关键。"
        ],
        advice: "先稳住现金流和已有资源，新的想法可以记下但不急着执行。",
        doList: ["整理账目", "控制预算"],
        dontList: ["盲目跟风", "情绪消费"]
      },
      "谨慎": {
        readings: [
          "今天更适合观察和整理现有资源，而不是贸然投入新的计划。面对诱人的机会时，多花一点时间验证信息会更稳妥。",
          "财务判断容易被情绪或外界话术带偏，越是看起来稳赚的事，越需要慢下来核对细节。"
        ],
        advice: "把消费和投资都延迟半拍，等信息更完整再决定。",
        doList: ["核对信息", "保留余地"],
        dontList: ["冲动消费", "借钱冒险"]
      },
      "低迷": {
        readings: [
          "今天不适合做高风险财务决定。与其急着寻找突破，不如先减少损耗，把账目和心态都盘顺。",
          "财运能量偏弱，容易被焦虑推着做决定。越是这种时候，越要守住预算和边界。"
        ],
        advice: "今天以止损和休整为主，避免用消费补偿情绪。",
        doList: ["减少支出", "复盘账目"],
        dontList: ["冒险投入", "超预算购物"]
      }
    }
  },
  "求职": {
    focus: ["面试", "简历", "Networking", "表达"],
    keywords: ["突破", "贵人", "表达", "主动", "机会", "稳场"],
    templates: {
      "极佳": {
        readings: [
          "今天适合主动争取机会，投递、面试、联系招聘人员都更容易有回应。你的表达状态较好，适合把优势讲得具体而有分寸。",
          "求职气场打开，适合推动关键沟通。一次看似普通的交流，可能成为后续机会的入口。"
        ],
        advice: "把核心经历压缩成清晰案例，主动联系值得跟进的人。",
        doList: ["主动投递", "联系招聘方"],
        dontList: ["临场失焦", "夸大经历"]
      },
      "良好": {
        readings: [
          "今天适合主动投递岗位、联系招聘人员或完善简历。一次看似普通的交流，可能为后续机会埋下伏笔。",
          "求职运势偏顺，适合把作品、简历和自我介绍再磨一轮。机会不一定立刻落地，但会看见新的入口。"
        ],
        advice: "重点优化简历第一屏和面试开场，别把亮点藏太深。",
        doList: ["完善简历", "主动沟通"],
        dontList: ["拖延回复", "过度自我怀疑"]
      },
      "平稳": {
        readings: [
          "今天适合稳定推进求职计划。与其海投，不如筛选更匹配的岗位，把每一次沟通都做扎实。",
          "求职节奏不快，但适合积累。复盘过往面试、更新作品集，会比盲目刷新岗位更有效。"
        ],
        advice: "选择少量高匹配岗位认真准备，稳定比数量更重要。",
        doList: ["筛选岗位", "复盘面试"],
        dontList: ["盲目海投", "忽略反馈"]
      },
      "谨慎": {
        readings: [
          "今天求职上不宜过度冒进，容易因为急于证明自己而表达失衡。先把信息核准，再决定是否推进。",
          "面试和沟通需要更稳一点，尤其要避免被临时问题带乱节奏。准备越具体，表现越踏实。"
        ],
        advice: "面试前列好三段核心经历，少讲空话，多给证据。",
        doList: ["核对岗位", "准备案例"],
        dontList: ["草率承诺", "急着表态"]
      },
      "低迷": {
        readings: [
          "今天求职能量偏低，不适合硬撑着做大量沟通。更适合休整表达状态，检查简历和作品里的低级错误。",
          "你可能会对机会判断偏悲观。先别急着否定自己，做一点可控的小优化，会比强行冲刺更有用。"
        ],
        advice: "减少无效投递，把精力放在修正材料和恢复状态上。",
        doList: ["修正材料", "整理案例"],
        dontList: ["情绪投递", "否定自己"]
      }
    }
  },
  "学业": {
    focus: ["学习效率", "专注力", "考试表现", "理解力"],
    keywords: ["专注", "理解", "突破", "整理", "坚持", "复盘"],
    templates: {
      "极佳": {
        readings: [
          "你的理解力和专注度较高，适合处理平时觉得困难的内容。复杂知识点可能会比预期更容易掌握。",
          "今天适合攻克硬题、写论文结构或做系统复盘。越是需要深度思考的内容，越容易进入状态。"
        ],
        advice: "把最难的任务放在精力最好的时段，别浪费高峰状态。",
        doList: ["攻克难点", "系统复盘"],
        dontList: ["碎片刷题", "频繁分心"]
      },
      "良好": {
        readings: [
          "学习状态比较顺，适合推进计划、整理笔记和补齐薄弱点。今天的进步未必夸张，但会比较扎实。",
          "理解和记忆都在可用状态，适合把分散知识点串成框架。框架搭起来，后面会轻松很多。"
        ],
        advice: "用一张纸整理知识框架，再针对薄弱点做练习。",
        doList: ["整理笔记", "补齐短板"],
        dontList: ["临时抱佛脚", "只看不练"]
      },
      "平稳": {
        readings: [
          "今天适合保持学习惯性，不必追求爆发。按计划完成关键任务，就已经是在给后续积累优势。",
          "学习运势平稳，适合复习、背诵和重复训练。看似普通的练习，会慢慢把手感养回来。"
        ],
        advice: "设定小目标并按时完成，重点是不中断节奏。",
        doList: ["按计划复习", "定时专注"],
        dontList: ["临时改计划", "拖到深夜"]
      },
      "谨慎": {
        readings: [
          "今天容易在细节上卡住，越急越学不进去。建议先拆小任务，再逐段处理。",
          "学习效率有波动，不适合一口气啃太多新内容。先稳住基础，再处理难点更合适。"
        ],
        advice: "先做一轮轻复习，让大脑进入状态后再攻难题。",
        doList: ["拆分任务", "复习基础"],
        dontList: ["硬啃难题", "和别人比较"]
      },
      "低迷": {
        readings: [
          "今天学习状态偏弱，适合低强度维护。不要因为效率不高就彻底放弃，完成一个小任务也算稳住节奏。",
          "注意力容易飘，越需要逼自己越容易反弹。换成短时专注和轻量复盘，会更实际。"
        ],
        advice: "用二十五分钟完成一个小目标，先恢复学习手感。",
        doList: ["轻量复盘", "短时专注"],
        dontList: ["熬夜硬学", "自责内耗"]
      }
    }
  },
  "人缘": {
    focus: ["沟通", "关系修复", "合作", "表达分寸"],
    keywords: ["沟通", "贵人", "合作", "温和", "顺势", "边界"],
    templates: {
      "极佳": {
        readings: [
          "今天适合主动沟通、修复关系或推进合作。你更容易被看见，也更容易把话说到对方心里。",
          "人缘运势很亮，适合发起邀约、表达感谢或打开新社交场景。真诚会比技巧更有效。"
        ],
        advice: "主动发出善意，但保留清晰边界，关系会更舒服。",
        doList: ["主动沟通", "表达感谢"],
        dontList: ["过度讨好", "抢话争辩"]
      },
      "良好": {
        readings: [
          "今天适合经营关系和推进合作。一次轻松的交流，可能让别人重新认识你的可靠。",
          "你在人际场合里更容易取得平衡，适合把误会说开，也适合为之后合作铺路。"
        ],
        advice: "多用具体回应替代客套话，关系会更有温度。",
        doList: ["回应消息", "推进合作"],
        dontList: ["冷处理", "含糊表态"]
      },
      "平稳": {
        readings: [
          "人缘状态平稳，适合保持礼貌和稳定输出。无需刻意热络，但要避免忽略身边人的感受。",
          "今天适合做关系维护，回消息、补感谢、兑现承诺，比制造热闹更有用。"
        ],
        advice: "把该回的消息回掉，把该兑现的小事完成。",
        doList: ["维护关系", "兑现承诺"],
        dontList: ["临时失约", "忽略反馈"]
      },
      "谨慎": {
        readings: [
          "今天沟通容易因为语气或误解出现偏差。重要事情尽量说清楚，别让对方猜。",
          "你可能会对别人的反应过度解读。先确认事实，再表达情绪，会更稳妥。"
        ],
        advice: "重要沟通多确认一次，不急着下判断。",
        doList: ["确认信息", "温和表达"],
        dontList: ["阴阳怪气", "过度猜测"]
      },
      "低迷": {
        readings: [
          "今天人际能量偏低，不适合硬撑社交。减少无效消耗，把注意力放回真正重要的人和事。",
          "容易因为疲惫而说重话。保持安静不是坏事，先照顾好自己的状态。"
        ],
        advice: "少参加消耗型社交，必要沟通保持简洁清楚。",
        doList: ["减少消耗", "保持礼貌"],
        dontList: ["情绪发言", "勉强应酬"]
      }
    }
  },
  "健康": {
    focus: ["作息", "精力", "运动", "饮食"],
    keywords: ["调息", "舒展", "节制", "养气", "修复", "规律"],
    templates: {
      "极佳": {
        readings: [
          "今天身体和精神的协调度不错，适合建立新的健康小习惯。轻运动、早睡或规律饮食都会更容易坚持。",
          "精力状态较好，适合做舒展训练、整理作息和补充水分。越规律，越能把好运留住。"
        ],
        advice: "选一个能长期坚持的小动作，比突然猛练更有价值。",
        doList: ["轻运动", "规律饮食"],
        dontList: ["过度透支", "暴饮暴食"]
      },
      "良好": {
        readings: [
          "健康状态整体顺畅，适合把身体节奏调回正轨。多走动、多喝水、早点休息，会很快有反馈。",
          "今天适合做温和修复，不必追求强度。稳定作息就是最实际的转运。"
        ],
        advice: "给身体一点确定性，按时吃饭和休息。",
        doList: ["早点休息", "拉伸放松"],
        dontList: ["久坐不动", "熬夜硬撑"]
      },
      "平稳": {
        readings: [
          "健康运势平稳，重点是别打乱节奏。维持基础作息，就能避免很多不必要的疲惫。",
          "今天适合做简单维护，别给身体加太多额外压力。轻量活动和规律饮食足够了。"
        ],
        advice: "保持基础节律，别因为状态尚可就过度透支。",
        doList: ["规律作息", "适度活动"],
        dontList: ["临时熬夜", "忽略疲劳"]
      },
      "谨慎": {
        readings: [
          "今天身体提醒比较明显，适合放慢节奏。不要把疲惫当成意志力问题，及时休息更明智。",
          "精力容易被琐事消耗，饮食和作息需要更克制。小心越忙越乱。"
        ],
        advice: "减少高强度安排，给自己留出恢复时间。",
        doList: ["及时休息", "清淡饮食"],
        dontList: ["硬撑到底", "过量咖啡"]
      },
      "低迷": {
        readings: [
          "今天健康能量偏低，适合把任务降级。先保证睡眠、饮食和基础活动，不要强迫自己满负荷运转。",
          "身体和情绪都需要修整。少一点刺激，多一点规律，是今天最稳的选择。"
        ],
        advice: "把恢复放在第一位，能推迟的事先推迟。",
        doList: ["补充睡眠", "减少刺激"],
        dontList: ["强行加班", "忽略不适"]
      }
    }
  },
  "心态": {
    focus: ["情绪稳定", "自我接纳", "压力管理", "节奏感"],
    keywords: ["松弛", "回稳", "定心", "取舍", "克制", "清醒"],
    templates: {
      "极佳": {
        readings: [
          "今天内在状态比较清明，适合做决定、整理情绪或重新设定边界。你会更容易看清自己真正想要什么。",
          "心态能量很稳，适合把拖了很久的心结拆开处理。轻一点，但很有力量。"
        ],
        advice: "趁状态清楚，写下下一步，不要只停留在想法里。",
        doList: ["整理情绪", "设定边界"],
        dontList: ["反复内耗", "讨好别人"]
      },
      "良好": {
        readings: [
          "今天适合把节奏慢慢调回来。你不需要立刻解决所有问题，先解决一个最具体的小结就够了。",
          "心态正在回稳，适合做轻量整理、散步或和可信的人聊聊。表达出来，压力会松一些。"
        ],
        advice: "把压力写成清单，再挑一件最小的事处理。",
        doList: ["写下计划", "适度倾诉"],
        dontList: ["憋着不说", "无限拖延"]
      },
      "平稳": {
        readings: [
          "今天情绪总体平稳，适合维持节奏。别急着追求巨大改变，把手边的小事做完就会更踏实。",
          "心态运势不惊不喜，适合休整和维护。稳定本身就是一种好运。"
        ],
        advice: "保持简单节奏，减少不必要的信息刺激。",
        doList: ["完成小事", "保持节奏"],
        dontList: ["过度刷屏", "临时较劲"]
      },
      "谨慎": {
        readings: [
          "今天容易被细节牵动情绪。遇到不顺时，先暂停十分钟，不要马上做反应。",
          "心态需要一点保护，不适合和自己硬碰硬。把标准放低一点，反而能走得更稳。"
        ],
        advice: "先稳定呼吸和节奏，再处理让你烦躁的事情。",
        doList: ["暂停反应", "降低标准"],
        dontList: ["急着争输赢", "否定自己"]
      },
      "低迷": {
        readings: [
          "今天心态能量偏低，适合安静恢复。不要把暂时的低潮解读成长期失败，先让自己喘口气。",
          "你可能会对很多事情失去耐心。少做重大决定，多做能让自己回到身体里的小事。"
        ],
        advice: "把今日目标降到最小，只保留必要任务。",
        doList: ["安静休整", "减少任务"],
        dontList: ["重大决定", "情绪硬扛"]
      }
    }
  }
};
