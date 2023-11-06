import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources: {
		en: {
			translation: {
				'Stadium Matching System': 'Stadium Matching System',
				'Home': 'Home',
				'Venue': 'Venue',
				'Login': 'Login',
				'Rent': 'Rent',
				'Admin': 'Admin',
				'Session': 'Session',
				'欲使用人數': 'Number of People',
				'人': '',
				'能力程度': 'Level',
				'初級': 'Beginner',
				'中級': 'Intermediate',
				'高級': 'Advanced',
				'已租借': 'Rented',
				'開放中': 'Open',
				'場地資訊': 'Info',
				'場地時段': 'Schedule',
				'租借場地': 'Rent',
				'場地': 'Venue',
				'時段': 'Session',
				'租借人': 'Renter',
				'使用人數': 'People',
				'程度要求': 'Level',
				'狀態': 'Status',
				'無': 'None',
			}
		},
		zh: {
			translation: {
				'Stadium Matching System': 'Stadium Matching System',
				'Home': '首頁',
				'Venue': '場地',
				'Login': '登入',
				'Rent': '租借場地',
				'Admin': '管理員',
				'Session': '時段',
				'欲使用人數': '欲使用人數',
				'人': '人',
				'能力程度': '能力程度',
				'初級': '初級',
				'中級': '中級',
				'高級': '高級',
				'已租借': '已租借',
				'開放中': '開放中',
				'場地資訊': '場地資訊',
				'場地時段': '場地時段',
				'租借場地': '租借場地',
				'場地': '場地',
				'時段': '時段',
				'租借人': '租借人',
				'使用人數': '使用人數',
				'程度要求': '程度要求',
				'狀態': '狀態',
				'無': '無',
			}
		},
	},
});

export default i18n;