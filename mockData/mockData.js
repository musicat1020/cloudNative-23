export const mockVenueList = [
    {
        name: "Badminton Court",
        imgUrl: "https://rent.pe.ntu.edu.tw/udf/1_600x399.png",
        space: 2343,
        userCount: 102,
        userMax: 521,

    },
    {
        name: "Table Tennis Room",
        imgUrl: "https://rent.pe.ntu.edu.tw/udf/5_600x399.jpg",
        space: 2343,
        userCount: 52,
        userMax: 604,
    },
    {
        name: "Badminton Court",
        imgUrl: "https://rent.pe.ntu.edu.tw/udf/1_600x399.png",
        space: 2343,
        userCount: 102,
        userMax: 521,

    },
    {
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
