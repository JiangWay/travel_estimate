export function Example() {
  this.name = 'wyn'
}

// 公司
export function Company() {
  this.name = '偉康科技 Webcomm Technology'
  this.taxId = '16590299'
  this.taxTitle = '偉康科技股份有限公司 '
  this.phone = '02 7701 5899'
  this.address = '105台北市松山區南京東路五段89號9樓'
  this.travelLimit = 10000 // 旅遊補助上限
}

// 旅遊者 參加的旅遊項目
export function JoinedItem() {
  this.itemId = ''
  this.name = ''
  this.enrollment = 1 // 報名人數
  this.note = ''// 備註
}

// 旅遊者 參加的某一旅遊
export function JoinedTravel() {
  this.travelId = ''
  this.travelStatus = ''
  this.joinedItems = []
}

// 參加該項目的旅遊者
export function Traveler() {
  this.id = 'wyn'
  this.name = ''
  this.email = ''
  this.travelOwner = []
  this.company = new Company()
  this.joinedTravels = []
}

export function TravelInfo() {
  this.title = ''
  this.subTitle = ''
  this.desc = ''
  this.startDate = ''
  this.endDate = ''
  this.type = ''
}

export function TravelType() {
  this.type = 'empTravel' //  員工旅遊
  this.company = new Company()
}

// export function TravelCost() {
//   this.type = 'itinerary' // itinerary, togetherBuy, private 行程, 團購, 個人
//   this.countType = 'total' // total,perPerson,private  計算方式 總額 或 每人多少 或私人項目
//   this.cost = '25000'
//   this.isTax = true // 可否打統編
// }

// FIXME:引用ts後 可改用enum
export const TravelCostType = {
  Itinerary: 'itinerary', // 行程
  TogetherBuy: 'togetherBuy', // 團購
  Private: 'private', // 個人
}
export const TravelCostCountType = {
  Total: 'total', // 總額
  PerPerson: 'perPerson', // 每人多少(均分)
  ByCase: 'byCase', // 個案(如雙人房 四人房 不同價格)
  Private: 'Private', // 個人
}

export function TravelCost(type = TravelCostType.Itinerary, countType = TravelCostCountType.Total, cost = 0, isTax = false) {
  this.type = type // itinerary, togetherBuy, private 行程, 團購, 個人
  this.countType = countType// total,perPerson,byCase,private  計算方式 總額 或 每人多少 或 個案(如雙人房 四人房 不同價格) 或私人項目
  this.cost = cost
  this.isTax = isTax // 可否打統編
}

// export function TravelItem() {
//   this.name = '六福村'
//   this.type = '遊樂園'
//   this.desc = '開心玩'
//   this.start_date = ''
//   this.end_date = ''
//   this.travelers = [...new Traveler()]
// }
export function TravelItem(name, type, desc, travelCost, startDate, endDate, travelers) {
  this.name = name
  this.type = type
  this.desc = desc
  this.travelCost = travelCost
  this.startDate = startDate
  this.endDate = endDate
  this.travelers = travelers
}

export const TravelStatus = {
  Opened: 'opened', // 可報名
  Ing: 'ing', // 旅程進行中
  End: 'end', // 已結束
  Joined: 'joined', // 已報名
}

export function Travel() {
  this.id = ''
  this.status = TravelStatus.Ing // open,ing,end,joined 開團招募中 進行中 已結束 已報名
  this.info = new TravelInfo()
  this.travelType = new TravelType()// 旅遊型態 員工旅遊
  this.travelItems = []// TravelItem()
}

// Firestore data converter
// export const travelerConverter = {
//   toFirestore: traveler => ({
//     id: traveler.id,
//     name: traveler.name,
//     email: traveler.email,
//     travelOwner: traveler.travelOwner,
//     company: traveler.company,
//     joinedTravels: traveler.joinedTravels.map(join => ({ ...join })),
//   }),
//   fromFirestore: (snapshot, options) => {
//     const data = snapshot.data(options)
//     const traveler = new Traveler()
//     traveler.id = data.id
//     traveler.name = data.name
//     traveler.email = data.email
//     traveler.travelOwner = data.travelOwner
//     traveler.company = data.company

//     // traveler.joinedTravels = data.joinedTravels.map(join => new JoinedTravel())
//     return new Traveler(data.name, data.state, data.country)
//   },
// }
