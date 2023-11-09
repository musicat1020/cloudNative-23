import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	lng: "en",
	fallbackLng: "en",
	resources: {
		en: {
			translation: {
				"Stadium Matching System": "Stadium Matching System",
				"Home": "Home",
				"Venue": "Venue",
				"Login": "Login",
				"Rent": "Rent",
				"Admin": "Admin",
				"Session": "Session",
				"欲使用人數": "Number of People",
				"人": "",
				"加入": "Join",
				"租借": "Rent",
				"球技程度": "Level",
				"初級": "Beginner",
				"中級": "Intermediate",
				"高級": "Advanced",
				"已租借": "Rented",
				"開放中": "Open",
				"場地資訊": "Info",
				"場地時段": "Schedule",
				"租借場地": "Rent",
				"場地": "Venue",
				"時段": "Session",
				"租借人": "Renter",
				"使用人數": "People",
				"球技要求": "Level",
				"狀態": "Status",
				"無": "None",
				"點擊上傳圖片": "Click to upload image",
				"場館地址": "Stadium location",
				"場館名稱": "Stadium name",
				"場地名稱": "Venue name",
				"單一場地可容納人數": "Capacity per court",
				"人": "people",
				"場地列表": "Court list",
				"新增": "Add",
				"場地面積": "Area",
				"開放時間": "Open time",
				"至": "to",
				"開放日": "Open days",
				"週一": "Mon",
				"週二": "Tue",
				"週三": "Wed",
				"週四": "Thu",
				"週五": "Fri",
				"週六": "Sat",
				"週日": "Sun",
				"說明": "Description",
				"球場名稱": "Court name",
				"取消": "Cancel",
				"確認": "Confirm",
				"新增": "Add",
				"修改": "Edit",
				"下架場地": "Delete venue",
				"刪除場地": "Delete whole venue",
				"下架特定時段場地": "Take down specific time slots for the venue",
				"已加入隊伍": "Joined Success",
				"租借成功": "Rented Success",
				"允許配對球友?": "Teammates Matching Needed?",
				"想再找幾名球友?": "Number of Teammates Needed?",
				"球友球技要求": "Teammates Level",
				"確定": "Confirm",
				"Session": "Session",
				"欲使用人數": "Number of People",
				"人": "",
				"加入": "Join",
				"租借": "Rent",
				"球技程度": "Level",
				"初級": "Beginner",
				"中級": "Intermediate",
				"高級": "Advanced",
				"已租借": "Rented",
				"開放中": "Open",
				"場地資訊": "Info",
				"場地時段": "Schedule",
				"租借場地": "Rent",
				"場地": "Venue",
				"時段": "Session",
				"租借人": "Renter",
				"使用人數": "People",
				"球技要求": "Level",
				"狀態": "Status",
				"無": "None",
				"點擊上傳圖片": "Click to upload image",
				"場館地址": "Stadium location",
				"場館名稱": "Stadium name",
				"場地名稱": "Venue name",
				"單一場地可容納人數": "Capacity per court",
				"人": "people",
				"場地列表": "Court list",
				"新增": "Add",
				"場地面積": "Area",
				"開放時間": "Open time",
				"至": "to",
				"開放日": "Open days",
				"週一": "Mon",
				"週二": "Tue",
				"週三": "Wed",
				"週四": "Thu",
				"週五": "Fri",
				"週六": "Sat",
				"週日": "Sun",
				"說明": "Description",
				"球場名稱": "Court name",
				"取消": "Cancel",
				"確認": "Confirm",
				"新增": "Add",
				"修改": "Edit",
				"下架場地": "Delete venue",
				"刪除場地": "Delete whole venue",
				"下架特定時段場地": "Take down specific time slots for the venue",
				"已加入隊伍": "Joined Success",
				"租借成功": "Rented Success",
				"允許配對球友?": "Teammates Matching Needed?",
				"想再找幾名球友?": "Number of Teammates Needed?",
				"球友球技要求": "Teammates Level",
				"確定": "Confirm",
				"Session": "Session",
				"欲使用人數": "Number of People",
				"人": "",
				"加入": "Join",
				"租借": "Rent",
				"球技程度": "Level",
				"初級": "Beginner",
				"中級": "Intermediate",
				"高級": "Advanced",
				"已租借": "Rented",
				"開放中": "Open",
				"場地資訊": "Info",
				"場地時段": "Schedule",
				"租借場地": "Rent",
				"場地": "Venue",
				"時段": "Session",
				"租借人": "Renter",
				"使用人數": "People",
				"球技要求": "Level",
				"狀態": "Status",
				"無": "None",
				"點擊上傳圖片": "Click to upload image",
				"場館地址": "Stadium location",
				"場館名稱": "Stadium name",
				"場地名稱": "Venue name",
				"單一場地可容納人數": "Capacity per court",
				"人": "people",
				"場地列表": "Court list",
				"新增": "Add",
				"場地面積": "Area",
				"開放時間": "Open time",
				"至": "to",
				"開放日": "Open days",
				"週一": "Mon",
				"週二": "Tue",
				"週三": "Wed",
				"週四": "Thu",
				"週五": "Fri",
				"週六": "Sat",
				"週日": "Sun",
				"說明": "Description",
				"球場名稱": "Court name",
				"取消": "Cancel",
				"確認": "Confirm",
				"新增": "Add",
				"修改": "Edit",
				"下架場地": "Delete venue",
				"刪除場地": "Delete whole venue",
				"下架特定時段場地": "Take down specific time slots for the venue",
				"已加入隊伍": "Joined Success",
				"租借成功": "Rented Success",
				"允許配對球友?": "Teammates Matching Needed?",
				"想再找幾名球友?": "Number of Teammates Needed?",
				"球友球技要求": "Teammates Level",
				"確定": "Confirm",
				"Square Meter": "m²",
				"Sport Center": "Sport Center",
				"Table Tennis Room": "Table Tennis Room",
				"Badminton Court": "Badminton Court",
				"Click to add a venue": "Click to add a venue",
				"Rental Period": "Rental Period",
				"Order Status": "Order Status",
				"Number of People": "Number of People",
				"Members": "Members",
				"Renter": "Renter",
				"Unpair": "Unpair",
				"Records": "Records",
				"Pairing Records": "Pairing Records",
				"Rental Records": "Rental Records",
				"Logout": "Logout",
				"Cancel Rental": "Cancel",
			}
		},
		zh: {
			translation: {
				"Stadium Matching System": "Stadium Matching System",
				"Home": "首頁",
				"Venue": "場地",
				"Login": "登入",
				"Rent": "租借場地",
				"Admin": "管理員",
				"Session": "時段",
				"欲使用人數": "欲使用人數",
				"人": "人",
				"能力程度": "能力程度",
				"初級": "初級",
				"中級": "中級",
				"高級": "高級",
				"已租借": "已租借",
				"開放中": "開放中",
				"場地資訊": "場地資訊",
				"場地時段": "場地時段",
				"Square Meter": "平方公尺",
				"Sport Center": "綜合體育館",
				"Table Tennis Room": "桌球室",
				"Badminton Court": "羽球室",
				"Click to add a venue": "新增場地",
				"Records": "紀錄",
				"Logout": "登出",
				"Cancel Rental": "取消租借",
			}
		},
	},
});

export default i18n;
