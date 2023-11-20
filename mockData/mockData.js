export const mockVenueList = [
  {
    index: 1,
    name: "Badminton Court",
    imgUrl: "https://rent.pe.ntu.edu.tw/udf/1_600x399.png",
    space: 2343,
    userCount: 102,
    userMax: 521,

  },
  {
    index: 2,
    name: "Table Tennis Room",
    imgUrl: "https://rent.pe.ntu.edu.tw/udf/5_600x399.jpg",
    space: 2343,
    userCount: 52,
    userMax: 604,
  },
  {
    index: 3,
    name: "Badminton Court",
    imgUrl: "https://rent.pe.ntu.edu.tw/udf/1_600x399.png",
    space: 2343,
    userCount: 102,
    userMax: 521,

  },
  {
    index: 4,
    name: "Table Tennis Room",
    imgUrl: "https://rent.pe.ntu.edu.tw/udf/5_600x399.jpg",
    space: 2343,
    userCount: 52,
    userMax: 604,
  }
];

export const mockRentalRecords = [{
  date: "2021-10-11",
  time: "10:00~11:00",
  stadium: "綜合體育館",
  venue: "一樓多功能球場 A場",
  status: "已核准",
  numOfPeople: "3/6",
  renter: "許姍姍",
  members: [
    { name: "王曉明", email: "ming@gmail.com" },
  ]
},
{
  date: "2021-10-05",
  time: "10:00~11:00",
  stadium: "綜合體育館",
  venue: "一樓多功能球場 A場",
  status: "已核准",
  numOfPeople: "4/6",
  renter: "許姍姍",
  members: [
    { name: "王曉明", email: "ming@gmail.com" },
    { name: "吳小華", email: "wu@gmail.com" },
    { name: "陳大明", email: "chen@gmail.com" }
  ]
},
{
  date: "2021-10-01",
  time: "10:00~11:00",
  stadium: "綜合體育館",
  venue: "一樓多功能球場 A場",
  status: "已取消",
  numOfPeople: "4/6",
  renter: "許姍姍",
  members: [
    { name: "王曉明", email: "ming@gmail.com" },
    { name: "吳小華", email: "wu@gmail.com" },
    { name: "陳大明", email: "chen@gmail.com" }
  ]
}
];


export const mockPairingRecords = [{
  date: "2021-10-11",
  time: "10:00~11:00",
  stadium: "綜合體育館",
  venue: "一樓多功能球場 A場",
  status: "已加入",
  numOfPeople: "3/6",
  renter: {
    name: "許姍姍", email: "shan@gmail.com"
  }
  ,
  members: [
    { name: "王曉明", email: "ming@gmail.com" },
  ]
},
{
  date: "2021-10-05",
  time: "10:00~11:00",
  stadium: "綜合體育館",
  venue: "一樓多功能球場 A場",
  status: "已取消",
  numOfPeople: "4/6",
  renter: {
    name: "許姍姍", email: "shan@gmail.com"
  },
  members: [
    { name: "王曉明", email: "ming@gmail.com" },
    { name: "吳小華", email: "wu@gmail.com" },
    { name: "陳大明", email: "chen@gmail.com" }
  ]
},
{
  date: "2021-10-01",
  time: "10:00~11:00",
  stadium: "綜合體育館",
  venue: "一樓多功能球場 A場",
  status: "已退出",
  numOfPeople: "4/6",
  renter: {
    name: "許姍姍", email: "shan@gmail.com"
  },
  members: [
    { name: "王曉明", email: "ming@gmail.com" },
    { name: "吳小華", email: "wu@gmail.com" },
    { name: "陳大明", email: "chen@gmail.com" }
  ]
}
];

export const mockVenueDetail = [{
  stadium: {
    imgUrl: "https://rent.pe.ntu.edu.tw/udf/1_600x399.png",
    imgBase64: "",
    stadium_id: 0,
    stadium_name: "綜合體育館",
    max_number_of_people: 4,
    start_time: "08:00",
    end_time: "22:00",
    open_day: [1, 2, 3, 4, 5],
    name: "桌球桌",
    address: "臺北市羅斯福路四段一號",
    picture: "base64 image",
    area: 50,
    description: "8.1公尺國際標準壁球室。",
    created_user: 0
  },
  stadium_courts: [
    "A桌", "B桌"
    // {name: "A桌"},
    // {name: "B桌"}
  ]
},
{
  stadium: {
    imgUrl: "",
    imgBase64: "",
    stadium_id: 0,
    stadium_name: "",
    max_number_of_people: 0,
    start_time: "00:00",
    end_time: "00:00",
    open_day: [],
    name: "",
    address: "",
    picture: "",
    area: 0,
    description: "",
    created_user: 0
  },
  stadium_courts: []
}
];